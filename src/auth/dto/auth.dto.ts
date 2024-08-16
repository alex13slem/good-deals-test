export class SignInDto {
  email: string;
  password: string;
}

export class SignUpDto extends SignInDto {
  username: string;
}
