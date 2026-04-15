import { z } from 'zod';

export const TaskStatusSchema = z.enum(['TODO', 'IN_PROGRESS', 'DONE']);

export type TaskStatusValue = z.infer<typeof TaskStatusSchema>;
