import { z } from 'zod';
import { TaskStatusSchema } from './task-status.schema';

export const UpdateTaskSchema = z
  .object({
    title: z.string().min(1).max(500).optional(),
    description: z.string().max(5000).nullable().optional(),
    status: TaskStatusSchema.optional(),
    assigneeId: z.string().cuid().optional(),
    projectId: z.string().cuid().optional(),
    completedAt: z.coerce.date().nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;
