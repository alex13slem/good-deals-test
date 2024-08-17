import { z } from 'zod';
import {
  createUserSchema,
  getUsersSchema,
  updateUserSchema,
} from '../schemas';

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type GetUsersDto = z.infer<typeof getUsersSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
