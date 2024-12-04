/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { LogResponse } from 'src/types/log.type';

@Injectable()
export class LogService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
  ) {}

  async getLogs(user: User): Promise<LogResponse> {
    if (user.role !== 'ADMIN') {
      throw new ErrorService(401, 'You are not admin');
    }

    const logs = await this.prismaService.log.findMany();

    if (logs.length === 0) {
      throw new ErrorService(404, 'Logs not found');
    }

    return {
      status: 200,
      message: 'Success get logs',
      data: logs,
    };
  }
}
