import { z } from 'zod';

export const UpdateProjectSchema = z
  .object({
    name: z.string().min(1).max(255).optional(),
    description: z.string().max(5000).nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
