import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type {
  CreateProjectInput,
  ProjectQueryInput,
  UpdateProjectInput,
} from '../dto/project';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProjectInput) {
    return this.prisma.project.create({ data });
  }

  async findMany(query: ProjectQueryInput) {
    const { page, limit, name } = query;
    const skip = (page - 1) * limit;
    const where = this.buildWhere({ name });

    const [data, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.project.count({ where }),
    ]);

    return { data, meta: { page, limit, total } };
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return project;
  }

  async update(id: string, data: UpdateProjectInput) {
    try {
      return await this.prisma.project.update({
        where: { id },
        data,
      });
    } catch (e) {
      if (this.isNotFound(e)) {
        throw new NotFoundException(`Project with id ${id} not found`);
      }
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.project.delete({ where: { id } });
    } catch (e) {
      if (this.isNotFound(e)) {
        throw new NotFoundException(`Project with id ${id} not found`);
      }
      throw e;
    }
  }

  private buildWhere(filters: { name?: string }): Prisma.ProjectWhereInput {
    const { name } = filters;
    if (!name) {
      return {};
    }
    return {
      name: { contains: name, mode: 'insensitive' },
    };
  }

  private isNotFound(
    e: unknown,
  ): e is Prisma.PrismaClientKnownRequestError {
    return (
      e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025'
    );
  }
}
