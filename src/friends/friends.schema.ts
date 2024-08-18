import { z } from 'zod';

const friendshipStatusEnum = z.enum([
  'ACCEPTED',
  'PENDING',
  'REJECTED',
]);

export const createFriendshipDtoSchema = z.object({
  user_id: z.number(),
  friend_id: z.number(),
});

export const updateFriendshipDtoSchema = z.object({
  status: friendshipStatusEnum,
});
