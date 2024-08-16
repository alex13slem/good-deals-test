import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  description?: string;
}
