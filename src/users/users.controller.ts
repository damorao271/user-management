import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  UserIdParamsDto,
  UserQueryDto,
} from '../dto/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get()
  findMany(@Query() query: UserQueryDto) {
    return this.usersService.findMany(query);
  }

  @Get(':id')
  findOne(@Param() params: UserIdParamsDto) {
    return this.usersService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: UserIdParamsDto, @Body() body: UpdateUserDto) {
    return this.usersService.update(params.id, body);
  }

  @Delete(':id')
  remove(@Param() params: UserIdParamsDto) {
    return this.usersService.remove(params.id);
  }
}
