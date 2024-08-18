import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FriendsService {
  constructor(private readonly prisma: PrismaService) {}

  async add(userId: number, friendId: number) {
    try {
      return await this.prisma.friendship.create({
        data: {
          user_id: userId,
          friend_id: friendId,
        },
      });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }

  async accept(userId: number, friendId: number) {
    try {
      return await this.prisma.friendship.update({
        where: {
          user_id_friend_id: {
            user_id: userId,
            friend_id: friendId,
          },
        },
        data: {
          status: 'ACCEPTED',
        },
      });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }

  async reject(userId: number, friendId: number) {
    try {
      return await this.prisma.friendship.delete({
        where: {
          user_id_friend_id: {
            user_id: userId,
            friend_id: friendId,
          },
        },
      });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }
}
