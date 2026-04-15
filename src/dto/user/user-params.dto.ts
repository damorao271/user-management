import { createZodDto } from 'nestjs-zod';
import { UserIdParamsSchema } from './user-params.schema';

export class UserIdParamsDto extends createZodDto(UserIdParamsSchema) {}
