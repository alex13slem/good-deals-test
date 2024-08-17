import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private usersService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async signIn(dto: SignInDto) {
    const user = await this.usersService.findOneByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password_hash } = user;
    const isMatch = await bcrypt.compare(dto.password, password_hash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateRefreshToken(userId: number): Promise<string> {
    const refreshToken = randomBytes(32).toString('base64'); // Генерируем случайный токен
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Токен действует 7 дней

    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: userId,
        expiresAt: expiresAt,
      },
    });

    return refreshToken;
  }

  async refreshAccessToken(refreshToken: string) {
    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      throw new UnauthorizedException(
        'Invalid or expired refresh token'
      );
    }

    const user = await this.usersService.findOneById(
      tokenRecord.userId
    );

    if (!user) {
      throw new UnauthorizedException(
        'Invalid or expired refresh token'
      );
    }

    const payload = { sub: user.id, email: user.email };
    const newAccessToken = await this.jwtService.signAsync(payload);

    return { accessToken: newAccessToken };
  }

  async signOut(userId: number) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
