import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type {
  CreateUserInput,
  UpdateUserInput,
  UserQueryInput,
} from '../dto/user';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserInput) {
    try {
      return await this.prisma.user.create({ data });
    } catch (e) {
      if (this.isUniqueViolation(e)) {
        throw new ConflictException('Email already in use');
      }
      throw e;
    }
  }

  async findMany(query: UserQueryInput) {
    const { page, limit, email, search } = query;
    const skip = (page - 1) * limit;
    const where = this.buildWhere({ email, search });

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { data, meta: { page, limit, total } };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, data: UpdateUserInput) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (e) {
      if (this.isNotFound(e)) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      if (this.isUniqueViolation(e)) {
        throw new ConflictException('Email already in use');
      }
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (e) {
      if (this.isNotFound(e)) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw e;
    }
  }

  private buildWhere(filters: {
    email?: string;
    search?: string;
  }): Prisma.UserWhereInput {
    const { email, search } = filters;
    const and: Prisma.UserWhereInput[] = [];

    if (email) {
      and.push({ email });
    }
    if (search) {
      and.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      });
    }

    if (and.length === 0) {
      return {};
    }
    if (and.length === 1) {
      return and[0] as Prisma.UserWhereInput;
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

  private isUniqueViolation(
    e: unknown,
  ): e is Prisma.PrismaClientKnownRequestError {
    return (
      e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
    );
  }
}
