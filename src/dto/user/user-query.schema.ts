import { z } from 'zod';
import { emptyToUndefined } from '../common/optional-query';
import { paginationQuerySchema } from '../common/pagination.schema';

export const UserQuerySchema = paginationQuerySchema.extend({
  email: emptyToUndefined(z.string().email().optional()),
  search: emptyToUndefined(z.string().min(1).max(255).optional()),
});

export type UserQueryInput = z.infer<typeof UserQuerySchema>;
