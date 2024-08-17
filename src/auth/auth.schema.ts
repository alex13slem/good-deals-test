import { z } from 'zod';
import { createUserSchema } from '../users/users.schema';

export const signUpSchema = createUserSchema;

export const signInSchema = signUpSchema.omit({
  username: true,
});

export const refreshTokenSchema = z
  .object({
    refreshToken: z.string(),
  })
  .required();

export const signOutSchema = z
  .object({
    userId: z.number(),
  })
  .required();
