import { z } from 'zod';
import { TaskStatusSchema } from './task-status.schema';

export const TaskResponseSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  description: z.string().nullable(),
  status: TaskStatusSchema,
  completedAt: z.coerce.date().nullable(),
  assigneeId: z.string().cuid(),
  projectId: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type TaskResponse = z.infer<typeof TaskResponseSchema>;
