import { z } from 'zod';

/** Serialized user returned by the API (matches Prisma User select). */
export const UserResponseSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
