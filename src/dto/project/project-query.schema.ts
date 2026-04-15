import { z } from 'zod';
import { emptyToUndefined } from '../common/optional-query';
import { paginationQuerySchema } from '../common/pagination.schema';

export const ProjectQuerySchema = paginationQuerySchema.extend({
  name: emptyToUndefined(z.string().min(1).max(255).optional()),
});

export type ProjectQueryInput = z.infer<typeof ProjectQuerySchema>;
