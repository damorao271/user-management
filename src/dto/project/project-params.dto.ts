import { createZodDto } from 'nestjs-zod';
import { ProjectIdParamsSchema } from './project-params.schema';

export class ProjectIdParamsDto extends createZodDto(ProjectIdParamsSchema) {}
