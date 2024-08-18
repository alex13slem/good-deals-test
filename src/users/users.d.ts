import { z } from 'zod';
import {
  createUserDtoSchema,
  createUserSchema,
  // findUsersSchema,
  selectUserSchema,
  updateUserDtoSchema,
  updateUserSchema,
} from './users.schema';

export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type SelectUser = z.infer<typeof selectUserSchema>;

// export type FindUsersQuery = z.infer<typeof findUsersSchema>;

export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
export type UpdateUserDto = z.infer<typeof updateUserDtoSchema>;
