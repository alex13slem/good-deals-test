import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const createUserSchema = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
  })
  .required();

export const updateUserSchema = createUserSchema.partial();

export const getUsersSchema = z
  .object({
    skip: z.number(),
    take: z.number(),
    cursor: z.custom<Prisma.UserWhereUniqueInput>((value) => {
      return Prisma.validator<Prisma.UserWhereUniqueInput>()(value);
    }),
    where: z.custom<Prisma.UserWhereInput>((value) => {
      return Prisma.validator<Prisma.UserWhereInput>()(value);
    }),
    orderBy: z.custom<Prisma.UserOrderByWithRelationInput>(
      (value) => {
        return Prisma.validator<Prisma.UserOrderByWithRelationInput>()(
          value
        );
      }
    ),
  })
  .partial();
