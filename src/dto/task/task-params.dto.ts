import { createZodDto } from 'nestjs-zod';
import { TaskIdParamsSchema } from './task-params.schema';

export class TaskIdParamsDto extends createZodDto(TaskIdParamsSchema) {}
