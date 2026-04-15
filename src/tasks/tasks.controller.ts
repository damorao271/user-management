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
  CreateTaskDto,
  TaskIdParamsDto,
  TaskQueryDto,
  UpdateTaskDto,
} from '../dto/task';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() body: CreateTaskDto) {
    return this.tasksService.create(body);
  }

  @Get()
  findMany(@Query() query: TaskQueryDto) {
    return this.tasksService.findMany(query);
  }

  @Get(':id')
  findOne(@Param() params: TaskIdParamsDto) {
    return this.tasksService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: TaskIdParamsDto, @Body() body: UpdateTaskDto) {
    return this.tasksService.update(params.id, body);
  }

  @Delete(':id')
  remove(@Param() params: TaskIdParamsDto) {
    return this.tasksService.remove(params.id);
  }
}
