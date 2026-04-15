import { createZodDto } from 'nestjs-zod';
import { TaskQuerySchema } from './task-query.schema';

export class TaskQueryDto extends createZodDto(TaskQuerySchema) {}
