import { z } from 'zod';
import { createUserSchema } from '../../user/schemas';

export const signUpSchema = createUserSchema;

export const signInSchema = signUpSchema.omit({
  username: true,
});

export const refreshTokenSchema = z
  .object({
    refreshToken: z.string(),
  })
  .required();
