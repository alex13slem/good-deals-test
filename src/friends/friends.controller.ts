import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { AuthenticatedRequest } from '../auth/auth.guard';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('/add/:id')
  @HttpCode(HttpStatus.CREATED)
  add(
    @Param('id', ParseIntPipe) friendId: number,
    @Request() req: AuthenticatedRequest
  ) {
    const userId = req.user.sub;
    return this.friendsService.add(userId, friendId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.friendsService.findOne(+id);
  // }

  @Patch('/accept/:id')
  @HttpCode(HttpStatus.OK)
  accept(
    @Param('id', ParseIntPipe) friendId: number,
    @Request() req: AuthenticatedRequest
  ) {
    const userId = req.user.sub;
    return this.friendsService.accept(userId, friendId);
  }

  @Patch('/reject/:id')
  @HttpCode(HttpStatus.OK)
  reject(
    @Param('id', ParseIntPipe) friendId: number,
    @Request() req: AuthenticatedRequest
  ) {
    const userId = req.user.sub;
    return this.friendsService.reject(userId, friendId);
  }
}
