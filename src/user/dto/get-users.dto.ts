import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional } from 'class-validator';

export class GetUsersDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  skip?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  take?: number;

  @IsOptional()
  @IsObject()
  @Type(() => Object)
  cursor?: Prisma.UserWhereUniqueInput;

  @IsOptional()
  @IsObject()
  @Type(() => Object)
  where?: Prisma.UserWhereInput;

  @IsOptional()
  @IsObject()
  @Type(() => Object)
  orderBy?: Prisma.UserOrderByWithRelationInput;
}
