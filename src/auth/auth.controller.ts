import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '../users/users.service';
import {
  RefreshTokenDto,
  SignInDto,
  SignOutDto,
  SignUpDto,
} from './auth.dto';
import { AuthService } from './auth.service';

import { ZodValidationPipe } from '../pipes/zod';
import { Public } from './auth.decorator';
import { AuthenticatedRequest } from './auth.guard';
import {
  refreshTokenSchema,
  signInSchema,
  signOutSchema,
  signUpSchema,
} from './auth.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Get('user')
  @HttpCode(HttpStatus.OK)
  async user(@Request() req: AuthenticatedRequest) {
    const user = await this.userService.findOneById(req.user.sub);
    return user;
  }

  @Public()
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
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Body(new ZodValidationPipe(refreshTokenSchema))
    dto: RefreshTokenDto
  ) {
    return this.authService.refreshAccessToken(dto.refreshToken);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signOut(
    @Body(new ZodValidationPipe(signOutSchema))
    dto: SignOutDto
  ) {
    await this.authService.signOut(dto.userId);
    return { message: 'Signed out successfully' };
  }
}
