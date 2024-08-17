import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod';
import { GetUsersDto, UpdateUserDto } from './users.dto';
import { getUsersSchema, updateUserSchema } from './users.schema';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(
    @Query(new ZodValidationPipe(getUsersSchema)) query: GetUsersDto
  ) {
    return this.userService.users(query);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    console.log('findOneById', id);

    return this.userService.findOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateUserSchema))
    updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
