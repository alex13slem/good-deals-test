import { Injectable } from '@nestjs/common';

import { FriendshipStatus, Prisma } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { NewUser, UpdateUser } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService
  ) {}
  async create(dto: CreateUserDto) {
    const passwordHash = await this.authService.hashPassword(
      dto.password
    );
    const data = new NewUser(dto.username, dto.email, passwordHash);
    return this.prisma.user.create({ data });
  }

  users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  }

  async findFriends(id: number) {
    return this.prisma.friendship
      .findMany({
        where: {
          OR: [
            { user_id: id, status: FriendshipStatus.ACCEPTED },
            { friend_id: id, status: 'ACCEPTED' },
          ],
        },
        select: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
          friend: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
      })
      .then((friends) =>
        friends.map((f) => (f.user.id === id ? f.friend : f.user))
      );
  }

  async findOneById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, dto: UpdateUserDto) {
    const data = new UpdateUser(dto.username, dto.email);
    if (dto.password) {
      data.password_hash = await this.authService.hashPassword(
        dto.password
      );
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
