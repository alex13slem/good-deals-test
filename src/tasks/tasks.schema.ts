import { z } from 'zod';

const taskSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  title: z.string(),
  description: z.string().optional(),
  userId: z.number(),
  completed: z.boolean().default(false),
});

export const createTaskSchema = taskSchema
  .omit({ id: true, createdAt: true, userId: true })
  .required();
export const updateTaskSchema = taskSchema
  .omit({ id: true, createdAt: true, userId: true })
  .partial()
  .strict();

export const selectTaskSchema = taskSchema;

// export const findTasksSchema = z
//   .object({
//     skip: z.number(),
//     take: z.number(),
//     cursor: z.custom<Prisma.TaskWhereUniqueInput>((value) => {
//       return Prisma.validator<Prisma.TaskWhereUniqueInput>()(value);
//     }),
//     where: z.custom<Prisma.TaskWhereInput>((value) => {
//       return Prisma.validator<Prisma.TaskWhereInput>()(value);
//     }),
//     orderBy: z.custom<Prisma.TaskOrderByWithRelationInput>(
//       (value) => {
//         return Prisma.validator<Prisma.TaskOrderByWithRelationInput>()(
//           value
//         );
//       }
//     ),
//   })
//   .partial();
