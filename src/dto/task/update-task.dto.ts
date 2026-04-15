import { createZodDto } from 'nestjs-zod';
import { UpdateTaskSchema } from './update-task.schema';

export class UpdateTaskDto extends createZodDto(UpdateTaskSchema) {}
