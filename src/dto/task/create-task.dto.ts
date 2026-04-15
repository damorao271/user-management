import { createZodDto } from 'nestjs-zod';
import { CreateTaskSchema } from './create-task.schema';

export class CreateTaskDto extends createZodDto(CreateTaskSchema) {}
