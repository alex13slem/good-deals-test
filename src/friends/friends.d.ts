import { z } from 'zod';
import {
  createFriendshipDtoSchema,
  updateFriendshipDtoSchema,
} from './friends.schema';

export type CreateFriendDto = z.infer<
  typeof createFriendshipDtoSchema
>;
export type UpdateFriendshipDto = z.infer<
  typeof updateFriendshipDtoSchema
>;
