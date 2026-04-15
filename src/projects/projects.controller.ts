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
  CreateProjectDto,
  ProjectIdParamsDto,
  ProjectQueryDto,
  UpdateProjectDto,
} from '../dto/project';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() body: CreateProjectDto) {
    return this.projectsService.create(body);
  }

  @Get()
  findMany(@Query() query: ProjectQueryDto) {
    return this.projectsService.findMany(query);
  }

  @Get(':id')
  findOne(@Param() params: ProjectIdParamsDto) {
    return this.projectsService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: ProjectIdParamsDto, @Body() body: UpdateProjectDto) {
    return this.projectsService.update(params.id, body);
  }

  @Delete(':id')
  remove(@Param() params: ProjectIdParamsDto) {
    return this.projectsService.remove(params.id);
  }
}
