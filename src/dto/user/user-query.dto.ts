import { createZodDto } from 'nestjs-zod';
import { UserQuerySchema } from './user-query.schema';

export class UserQueryDto extends createZodDto(UserQuerySchema) {}
