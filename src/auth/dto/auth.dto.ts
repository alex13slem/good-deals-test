import { z } from 'zod';
import {
  refreshTokenSchema,
  signInSchema,
  signUpSchema,
} from '../schemas';

export type SignInDto = z.infer<typeof signInSchema>;
export type SignUpDto = z.infer<typeof signUpSchema>;
export type RefreshTokenDto = z.infer<typeof refreshTokenSchema>;
