import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks';
import { NewTask } from './tasks.entity';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateTaskDto) {
    const data = new NewTask(dto);
    try {
      return await this.prisma.task.create({ data });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }

  async tasks(userId: number) {
    try {
      return await this.prisma.task.findMany({
        where: {
          OR: [
            { user_id: userId },
            {
              user: {
                received_requests: {
                  some: {
                    user_id: userId,
                    status: 'ACCEPTED',
                  },
                },
                sent_requests: {
                  some: {
                    user_id: userId,
                    status: 'ACCEPTED',
                  },
                },
              },
            },
          ],
        },
      });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }

  // async tasks(userId: number) {
  //   // Получаем задачи, принадлежащие пользователю или его друзьям
  //   return this.prisma.task.findMany({
  //     where: {
  //       OR: [
  //         { userId: userId },
  //         {
  //           user: {
  //             friends: {
  //               some: {
  //                 status: 'ACCEPTED',
  //                 friend_id: userId,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   });
  // }

  async findOneById(id: number) {
    try {
      return await this.prisma.task.findUnique({ where: { id } });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }

  async update(id: number, dto: UpdateTaskDto) {
    try {
      return await this.prisma.task.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.task.delete({ where: { id } });
    } catch (error) {
      this.prisma.handleDatabaseError(error);
    }
  }
}
