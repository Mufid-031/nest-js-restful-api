/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Absensi } from '@prisma/client';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { AbsensiService as AbsensiValidationService } from 'src/validation/absensi/absensi.service';

interface AbsensiResponse {
  status: number;
  message: string;
  data: Absensi | Absensi[];
}

enum StatusKehadiran {
  HADIR = 'HADIR',
  ALPA = 'ALPA',
  SAKIT = 'SAKIT',
  IZIN = 'IZIN',
}

@Injectable()
export class AbsensiService {
  constructor(
    private readonly absensiService: AbsensiValidationService,
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
  ) {}

  async register(
    studentId: number,
    scheduleId: number,
    statusKehadiran: StatusKehadiran,
    pertemuan: number,
    keterangan?: string,
  ): Promise<AbsensiResponse> {
    const requestRegister = this.absensiService.register(
      studentId,
      scheduleId,
      statusKehadiran,
      pertemuan,
      keterangan,
    );

    const pertemuanCheck = await this.prismaService.absensi.findMany({
      where: {
        studentId: requestRegister.studentId,
        scheduleId: requestRegister.scheduleId,
        pertemuan: requestRegister.pertemuan,
      },
    });

    if (pertemuanCheck.length > 0) {
      throw new ErrorService(400, 'Absensi already exists');
    }

    const absensi = await this.prismaService.absensi.create({
      data: {
        studentId: requestRegister.studentId,
        scheduleId: requestRegister.scheduleId,
        statusKehadiran: requestRegister.statusKehadiran,
        pertemuan: requestRegister.pertemuan,
        keterangan: requestRegister.keterangan || null,
      },
    });

    return {
      status: 200,
      message: 'Absensi created successfully',
      data: absensi,
    };
  }

  async update(
    studentId: number,
    scheduleId: number,
    statusKehadiran: StatusKehadiran,
    pertemuan: number,
    keterangan?: string,
  ): Promise<AbsensiResponse> {
    const requestUpdate = this.absensiService.update(
      studentId,
      scheduleId,
      statusKehadiran,
      pertemuan,
      keterangan,
    );

    const absensiId = await this.prismaService.absensi.findFirst({
      where: {
        studentId: requestUpdate.studentId,
        scheduleId: requestUpdate.scheduleId,
        pertemuan: requestUpdate.pertemuan,
      },
      select: {
        id: true,
      },
    });

    if (!absensiId) {
      throw new ErrorService(404, 'Absensi not found');
    }

    let absensi;
    if (requestUpdate.statusKehadiran) {
      absensi = await this.prismaService.absensi.update({
        where: {
          id: absensiId.id,
        },
        data: {
          statusKehadiran: requestUpdate.statusKehadiran,
        },
      });
    }

    if (requestUpdate.keterangan) {
      absensi = await this.prismaService.absensi.update({
        where: {
          id: absensiId.id,
        },
        data: {
          keterangan: requestUpdate.keterangan,
        },
      });
    }

    return {
      status: 201,
      message: 'Absensi updated successfully',
      data: absensi,
    };
  }
}
