import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, TaskStatus } from '@prisma/client';
import type {
  CreateTaskInput,
  TaskQueryInput,
  UpdateTaskInput,
} from '../dto/task';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTaskInput) {
    const status = data.status ?? TaskStatus.TODO;
    const completedAt = this.completedAtForStatus(status, data.completedAt);

    try {
      return await this.prisma.task.create({
        data: {
          title: data.title,
          description: data.description,
          status,
          completedAt,
          assignee: { connect: { id: data.assigneeId } },
          project: { connect: { id: data.projectId } },
        },
      });
    } catch (e) {
      if (this.isForeignKeyViolation(e)) {
        throw new BadRequestException(
          'Invalid assigneeId or projectId (referenced record not found)',
        );
      }
      throw e;
    }
  }

  async findMany(query: TaskQueryInput) {
    const { page, limit, assigneeId, projectId, status, completedFrom, completedTo } =
      query;
    const skip = (page - 1) * limit;
    const where = this.buildWhere({
      assigneeId,
      projectId,
      status,
      completedFrom,
      completedTo,
    });

    const [data, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.task.count({ where }),
    ]);

    return { data, meta: { page, limit, total } };
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async update(id: string, patch: UpdateTaskInput) {
    const existing = await this.prisma.task.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    const title = patch.title ?? existing.title;
    const description =
      patch.description !== undefined ? patch.description : existing.description;
    const status = patch.status ?? existing.status;
    let completedAt =
      patch.completedAt !== undefined ? patch.completedAt : existing.completedAt;
    completedAt = this.completedAtForStatus(status, completedAt);

    const assigneeId = patch.assigneeId ?? existing.assigneeId;
    const projectId = patch.projectId ?? existing.projectId;

    try {
      return await this.prisma.task.update({
        where: { id },
        data: {
          title,
          description,
          status,
          completedAt,
          assignee: { connect: { id: assigneeId } },
          project: { connect: { id: projectId } },
        },
      });
    } catch (e) {
      if (this.isForeignKeyViolation(e)) {
        throw new BadRequestException(
          'Invalid assigneeId or projectId (referenced record not found)',
        );
      }
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.task.delete({ where: { id } });
    } catch (e) {
      if (this.isNotFound(e)) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }
      throw e;
    }
  }

  /** DONE without a timestamp defaults to now; non-DONE clears completion time. */
  private completedAtForStatus(
    status: TaskStatus,
    completedAt: Date | null | undefined,
  ): Date | null {
    if (status === TaskStatus.DONE) {
      return completedAt ?? new Date();
    }
    return null;
  }

  private buildWhere(filters: {
    assigneeId?: string;
    projectId?: string;
    status?: TaskStatus;
    completedFrom?: Date;
    completedTo?: Date;
  }): Prisma.TaskWhereInput {
    const { assigneeId, projectId, status, completedFrom, completedTo } = filters;
    const and: Prisma.TaskWhereInput[] = [];

    if (assigneeId) {
      and.push({ assigneeId });
    }
    if (projectId) {
      and.push({ projectId });
    }
    if (status) {
      and.push({ status });
    }
    if (completedFrom || completedTo) {
      and.push({
        completedAt: {
          ...(completedFrom && { gte: completedFrom }),
          ...(completedTo && { lte: completedTo }),
        },
      });
    }

    if (and.length === 0) {
      return {};
    }
    if (and.length === 1) {
      return and[0] as Prisma.TaskWhereInput;
    }
    return { AND: and };
  }

  private isNotFound(
    e: unknown,
  ): e is Prisma.PrismaClientKnownRequestError {
    return (
      e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025'
    );
  }

  private isForeignKeyViolation(
    e: unknown,
  ): e is Prisma.PrismaClientKnownRequestError {
    return (
      e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2003'
    );
  }
}
