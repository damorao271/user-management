import { z } from 'zod';

export const TaskIdParamsSchema = z.object({
  id: z.string().cuid(),
});

export type TaskIdParams = z.infer<typeof TaskIdParamsSchema>;
