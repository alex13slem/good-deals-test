import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UsePipes,
} from '@nestjs/common';
import { AuthenticatedRequest } from '../auth/auth.guard';
import { ZodValidationPipe } from '../pipes/zod';
import { CreateTaskDto, UpdateTaskDto } from './tasks';
import { createTaskSchema, updateTaskSchema } from './tasks.schema';
import { TaskService } from './tasks.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createTaskSchema))
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() dto: CreateTaskDto,
    @Request() req: AuthenticatedRequest
  ) {
    const userId = req.user.sub;
    return this.taskService.create(userId, dto);
  }

  @Get(':viewerId')
  findTasks(
    @Param('viewerId', ParseIntPipe) viewerId: number,
    @Request() req: AuthenticatedRequest
  ) {
    const userId = req.user.sub;
    return this.taskService.getUserTasks(viewerId, userId);
  }

  @Get(':viewerId/:id')
  findOneById(
    @Param('viewerId', ParseIntPipe) viewerId: number,
    @Param('id', ParseIntPipe) taskId: number,
    @Request() req: AuthenticatedRequest
  ) {
    const userId = req.user.sub;
    return this.taskService.findOneById(viewerId, userId, taskId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) taskId: number,
    @Body(new ZodValidationPipe(updateTaskSchema))
    @Request()
    req: AuthenticatedRequest,
    updateTaskDto: UpdateTaskDto
  ) {
    const userId = req.user.sub;
    return this.taskService.update(userId, taskId, updateTaskDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) taskId: number,
    @Request()
    req: AuthenticatedRequest
  ) {
    const userId = req.user.sub;
    return this.taskService.remove(userId, taskId);
  }
}
