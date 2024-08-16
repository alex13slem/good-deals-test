import { Prisma } from '@prisma/client';

export class NewUser implements Prisma.UserCreateInput {
  public username: string;
  public email: string;
  public password_hash: string;

  constructor(username: string, email: string, passwordHash: string) {
    this.username = username;
    this.email = email;
    this.password_hash = passwordHash;
  }
}

export class UpdateUser implements Prisma.UserUpdateInput {
  public username?: string;
  public email?: string;
  public password_hash?: string;

  constructor(
    username?: string,
    email?: string,
    passwordHash?: string
  ) {
    this.username = username;
    this.email = email;
    this.password_hash = passwordHash;
  }
}
