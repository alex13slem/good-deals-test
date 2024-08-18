import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.service';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
