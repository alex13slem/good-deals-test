import { Injectable } from '@nestjs/common';

import { FriendshipStatus } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './users';
import { NewUser, UpdateUser } from './users.entity';

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
    const data = new NewUser({ ...dto, passwordHash });
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }

  async users() {
    try {
      return await this.prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
        },
      });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }

  async findFriends(id: number) {
    try {
      return await this.prisma.friendship
        .findMany({
          where: {
            OR: [
              { user_id: id, status: FriendshipStatus.ACCEPTED },
              { friend_id: id, status: FriendshipStatus.ACCEPTED },
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
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }

  async findOneById(id: number) {
    try {
      return await this.prisma.user.findUnique({ where: { id } });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({ where: { email } });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }

  async update(id: number, dto: UpdateUserDto) {
    const data = new UpdateUser(dto);
    if (dto.password) {
      data.password_hash = await this.authService.hashPassword(
        dto.password
      );
    }
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }
}
