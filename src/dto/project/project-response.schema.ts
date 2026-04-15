import { z } from 'zod';

export const ProjectResponseSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type ProjectResponse = z.infer<typeof ProjectResponseSchema>;
