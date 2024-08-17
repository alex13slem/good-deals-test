import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod';
import { GetUsersDto, UpdateUserDto } from './dto';
import { getUsersSchema, updateUserSchema } from './schemas';
import { UserService } from './user.service';

@Controller('user')
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
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
