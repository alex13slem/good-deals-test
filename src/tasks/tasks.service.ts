import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks';
import { NewTask } from './tasks.entity';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  async create(userId: number, dto: CreateTaskDto) {
    const data = new NewTask({ ...dto, userId });
    try {
      return await this.prisma.task.create({ data });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }

  async getUserTasks(viewerId: number, userId: number) {
    try {
      await this.checkAccess(viewerId, userId);

      return await this.prisma.task.findMany({
        where: { user_id: userId },
      });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }

  async findOneById(
    viewerId: number,
    userId: number,
    taskId: number
  ) {
    try {
      await this.checkAccess(viewerId, userId);

      return await this.prisma.task.findUnique({
        where: { id: taskId },
      });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }

  async update(userId: number, taskId: number, dto: UpdateTaskDto) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      if (task.user_id !== userId) {
        throw new UnauthorizedException(
          'You can only update your own tasks'
        );
      }

      return await this.prisma.task.update({
        where: { id: taskId },
        data: dto,
      });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }

  async remove(userId: number, taskId: number) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      if (task.user_id !== userId) {
        throw new UnauthorizedException(
          'You can only delete your own tasks'
        );
      }
      return await this.prisma.task.delete({ where: { id: taskId } });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }

  private async checkAccess(viewerId: number, userId: number) {
    const isFriendOrOwner = await this.prisma.user.findFirst({
      where: {
        id: userId,
        OR: [
          { id: viewerId },
          {
            received_requests: {
              some: {
                user_id: viewerId,
                status: 'ACCEPTED',
              },
            },
            sent_requests: {
              some: {
                user_id: viewerId,
                status: 'ACCEPTED',
              },
            },
          },
        ],
      },
    });

    if (!isFriendOrOwner) {
      throw new UnauthorizedException(
        'You do not have access to these tasks'
      );
    }
  }
}
