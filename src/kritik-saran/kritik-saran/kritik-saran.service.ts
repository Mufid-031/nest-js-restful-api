/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import {
  KritikSaranResponse,
  KritikSaranType,
} from 'src/types/kritik-saran.model';
import { KritikSaranService as KritikSaranValidationService } from 'src/validation/kritik-saran/kritik-saran.service';

@Injectable()
export class KritikSaranService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly kritikSaranValidationService: KritikSaranValidationService,
  ) {}

  async create(
    user: User,
    pesan: string,
    type: KritikSaranType,
  ): Promise<KritikSaranResponse> {
    const requestCreate = this.kritikSaranValidationService.create(pesan, type);

    const kritikSaran = await this.prismaService.kritikSaran.create({
      data: {
        userId: user.id,
        pesan: requestCreate.pesan,
        type: requestCreate.type,
      },
    });

    return {
      status: 201,
      message: 'Kritik saran created successfully',
      data: kritikSaran,
    };
  }

  async update(
    user: User,
    id: number,
    pesan?: string,
    type?: KritikSaranType,
  ): Promise<KritikSaranResponse> {
    const requestUpdate = this.kritikSaranValidationService.update(
      id,
      pesan,
      type,
    );

    const kritikSaran = await this.prismaService.kritikSaran.findUnique({
      where: {
        id: requestUpdate.id,
      },
    });

    if (!kritikSaran) {
      throw new ErrorService(404, 'Kritik saran not found');
    }

    if (requestUpdate.pesan) {
      kritikSaran.pesan = requestUpdate.pesan;
    }

    if (requestUpdate.type) {
      kritikSaran.type = requestUpdate.type;
    }

    const kritikSaranUpdated = await this.prismaService.kritikSaran.update({
      where: {
        userId: user.id,
        id: kritikSaran.id,
      },
      data: {
        pesan: kritikSaran.pesan,
        type: kritikSaran.type,
      },
    });

    return {
      status: 201,
      message: 'Kritik saran updated successfully',
      data: kritikSaranUpdated,
    };
  }

  async delete(user: User, id: number) {
    const kritikSaran = await this.prismaService.kritikSaran.delete({
      where: {
        userId: user.id,
        id: id,
      },
    });

    return {
      status: 201,
      message: 'Kritik saran deleted successfully',
      data: kritikSaran,
    };
  }

  async getKritikSaran(user: User) {
    if (user.role !== 'ADMIN') {
      throw new ErrorService(401, 'You are not admin');
    }

    const kritikSaran = await this.prismaService.kritikSaran.findMany();

    if (kritikSaran.length === 0) {
      throw new ErrorService(404, 'Kritik saran not found');
    }

    return {
      status: 200,
      message: 'Kritik saran found successfully',
      data: kritikSaran,
    };
  }
}
