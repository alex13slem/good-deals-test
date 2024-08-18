import { Prisma } from '@prisma/client';
import { CreateTaskDto } from './tasks';

export class NewTask {
  public title: string;
  public description: string;
  public completed: boolean;
  public user_id: number;

  constructor({
    title,
    description,
    completed,
    userId,
  }: CreateTaskDto & { userId: number }) {
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.user_id = userId;
  }

  public toPrismaInput(): Prisma.TaskCreateInput {
    return {
      title: this.title,
      description: this.description,
      completed: this.completed,
      user: {
        connect: { id: this.user_id },
      },
    };
  }
}
