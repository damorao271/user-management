import { z } from 'zod';
import { emptyToUndefined } from '../common/optional-query';
import { paginationQuerySchema } from '../common/pagination.schema';
import { TaskStatusSchema } from './task-status.schema';

export const TaskQuerySchema = paginationQuerySchema.extend({
  assigneeId: emptyToUndefined(z.string().cuid().optional()),
  projectId: emptyToUndefined(z.string().cuid().optional()),
  status: emptyToUndefined(TaskStatusSchema.optional()),
  completedFrom: emptyToUndefined(z.coerce.date().optional()),
  completedTo: emptyToUndefined(z.coerce.date().optional()),
});

export type TaskQueryInput = z.infer<typeof TaskQuerySchema>;
