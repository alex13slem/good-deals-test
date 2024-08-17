import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';

import { ZodValidationPipe } from '../pipes/zod';
import { Public } from './auth.decorator';
import {
  refreshTokenSchema,
  signInSchema,
  signUpSchema,
} from './schemas';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('signin')
  @UsePipes(new ZodValidationPipe(signInSchema))
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Public()
  @Post('signup')
  @UsePipes(new ZodValidationPipe(signUpSchema))
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() dto: SignUpDto) {
    return this.userService.create(dto);
  }

  @Post('refresh')
  @UsePipes(new ZodValidationPipe(refreshTokenSchema))
  @HttpCode(HttpStatus.OK)
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signOut(@Body('userId', ParseIntPipe) userId: number) {
    await this.authService.signOut(userId);
    return { message: 'Signed out successfully' };
  }
}
