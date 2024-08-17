import { Prisma } from '@prisma/client';
import { z } from 'zod';

const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8, 'Password too short'),
});

export const createUserSchema = userSchema.required();
export const updateUserSchema = userSchema.partial().strict();
export const selectUserSchema = userSchema
  .omit({ password: true })
  .extend({
    id: z.number(),
    password_hash: z.string().optional(),
  });

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
