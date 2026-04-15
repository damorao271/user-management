import { z } from 'zod';
import { TaskStatusSchema } from './task-status.schema';

export const CreateTaskSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().max(5000).optional(),
  status: TaskStatusSchema.optional(),
  assigneeId: z.string().cuid(),
  projectId: z.string().cuid(),
  completedAt: z.coerce.date().optional(),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
