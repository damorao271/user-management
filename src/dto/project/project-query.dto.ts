import { createZodDto } from 'nestjs-zod';
import { ProjectQuerySchema } from './project-query.schema';

export class ProjectQueryDto extends createZodDto(ProjectQuerySchema) {}
