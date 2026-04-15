import { z } from 'zod';

export const CreateProjectSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(5000).optional(),
});

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
