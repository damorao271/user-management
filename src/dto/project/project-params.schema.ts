import { z } from 'zod';

export const ProjectIdParamsSchema = z.object({
  id: z.string().cuid(),
});

export type ProjectIdParams = z.infer<typeof ProjectIdParamsSchema>;
