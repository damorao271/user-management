import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { emptyToUndefined } from '../common/optional-query';
import { paginationQuerySchema } from '../common/pagination.schema';

export const CreateProjectSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(5000).optional(),
});

export class CreateProjectDto extends createZodDto(CreateProjectSchema) {}

export const UpdateProjectSchema = CreateProjectSchema.partial();

export class UpdateProjectDto extends createZodDto(UpdateProjectSchema) {}

export const ProjectQuerySchema = paginationQuerySchema.extend({
  name: emptyToUndefined(z.string().min(1).max(255).optional()),
});

export class ProjectQueryDto extends createZodDto(ProjectQuerySchema) {}

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
export type ProjectQueryInput = z.infer<typeof ProjectQuerySchema>;
