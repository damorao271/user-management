import { createZodDto } from 'nestjs-zod';
import { UpdateProjectSchema } from './update-project.schema';

export class UpdateProjectDto extends createZodDto(UpdateProjectSchema) {}
