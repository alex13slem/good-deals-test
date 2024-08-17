import { z } from 'zod';
import {
  refreshTokenSchema,
  signInSchema,
  signOutSchema,
  signUpSchema,
} from './auth.schema';

export type SignInDto = z.infer<typeof signInSchema>;
export type SignUpDto = z.infer<typeof signUpSchema>;
export type RefreshTokenDto = z.infer<typeof refreshTokenSchema>;
export type SignOutDto = z.infer<typeof signOutSchema>;
