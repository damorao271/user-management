import { z } from 'zod';

export const UserIdParamsSchema = z.object({
  id: z.string().cuid(),
});

export type UserIdParams = z.infer<typeof UserIdParamsSchema>;
