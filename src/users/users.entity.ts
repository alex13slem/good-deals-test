import { Prisma } from '@prisma/client';
import { CreateUser } from './users';

export class NewUser implements Prisma.UserCreateInput {
  public username: string;
  public email: string;
  public password_hash: string;

  constructor(user: CreateUser) {
    this.username = user.username;
    this.email = user.email;
    this.password_hash = user.passwordHash;
  }
}

export class UpdateUser implements Prisma.UserUpdateInput {
  public username?: string;
  public email?: string;
  public password_hash?: string;

  constructor(user: Partial<CreateUser>) {
    this.username = user.username;
    this.email = user.email;
    this.password_hash = user.passwordHash;
  }
}
