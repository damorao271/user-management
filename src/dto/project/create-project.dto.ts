import { createZodDto } from 'nestjs-zod';
import { CreateProjectSchema } from './create-project.schema';

export class CreateProjectDto extends createZodDto(CreateProjectSchema) {}
