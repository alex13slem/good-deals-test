import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configuration from './infra/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './tasks/tasks.module';
import { UserModule } from './users/users.module';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    // CacheModule.register({
    //   isGlobal: true,
    // }),

    PrismaModule,
    AuthModule,
    UserModule,
    TaskModule,
    FriendsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
