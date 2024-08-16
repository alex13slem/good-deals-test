import { Injectable } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor() {}
  async create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  async findAll() {
    return 'This action returns all tasks';
  }

  async findOneById(id: number) {
    return 'This action returns a #${id} task';
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return 'This action updates a #${id} task';
  }

  async remove(id: number) {
    return 'This action removes a #${id} task';
  }
}
