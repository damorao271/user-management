import { z } from 'zod';
import { CreateUserSchema } from './create-user.schema';

export const UpdateUserSchema = CreateUserSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field must be provided for update' },
);

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
