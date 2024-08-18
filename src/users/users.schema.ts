import { z } from 'zod';

const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  passwordHash: z.string(),
});
export const createUserSchema = userSchema
  .omit({ id: true })
  .required();
export const updateUserSchema = userSchema.partial().strict();
export const selectUserSchema = userSchema;

const userDtoSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8, 'Password too short'),
});
export const createUserDtoSchema = userDtoSchema.required();
export const updateUserDtoSchema = userDtoSchema.partial().strict();

// export const findUsersSchema = z
//   .object({
//     skip: z
//       .string()
//       .transform((value) => parseInt(value))
//       .refine((value) => !isNaN(value), {
//         message: 'Invalid skip value',
//       }),
//     take: z
//       .string()
//       .transform((value) => parseInt(value))
//       .refine((value) => !isNaN(value), {
//         message: 'Invalid take value',
//       }),
//     // cursor: z.custom<Prisma.UserWhereUniqueInput>((value) => {
//     //   return Prisma.validator<Prisma.UserWhereUniqueInput>()(value);
//     // }),
//     cursor: z.string().transform((value) => {
//       try {
//         const data = JSON.parse(value);
//         const validator =
//           Prisma.validator<Prisma.UserWhereUniqueInput>();
//         if (!validator(data)) {
//           throw new Error(
//             'Invalid data structure for Prisma.UserWhereUniqueInput'
//           );
//         }
//         return data as Prisma.UserWhereUniqueInput;
//       } catch (error) {
//         throw new Error('Invalid JSON format or data structure');
//       }
//     }),
//     where: z.custom<Prisma.UserWhereInput>((value) => {
//       return Prisma.validator<Prisma.UserWhereInput>()(value);
//     }),
//     orderBy: z.custom<Prisma.UserOrderByWithRelationInput>(
//       (value) => {
//         return Prisma.validator<Prisma.UserOrderByWithRelationInput>()(
//           value
//         );
//       }
//     ),
//   })
//   .partial();
