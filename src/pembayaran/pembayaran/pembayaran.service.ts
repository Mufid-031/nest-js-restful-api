/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import {
  JenisPembayaran,
  PembayaranResponse,
  StatusPembayaran,
} from 'src/types/pembayaran.type';
import { PembayaranService as PembayaranValidationService } from 'src/validation/pembayaran/pembayaran.service';

@Injectable()
export class PembayaranService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly pembayaranValidationService: PembayaranValidationService,
  ) {}

  async create(
    studentId: number,
    total: number,
    jenisPembayaran: JenisPembayaran,
    tanggal: Date,
    statusPembayaran: StatusPembayaran,
  ): Promise<PembayaranResponse> {
    const requestCreate = this.pembayaranValidationService.create(
      studentId,
      total,
      jenisPembayaran,
      tanggal,
      statusPembayaran,
    );

    const pembayaran = await this.prismaService.pembayaran.create({
      data: {
        studentId: requestCreate.studentId,
        total: requestCreate.total,
        jenisPembayaran: requestCreate.jenisPembayaran,
        tanggal: requestCreate.tanggal,
        statusPembayaran: StatusPembayaran.PENDING,
      },
    });

    return {
      status: 201,
      message: 'Success Create Pembayaran',
      data: pembayaran,
    };
  }

  async confirm(id: number, student: Student): Promise<PembayaranResponse> {
    const pembayaran = await this.prismaService.pembayaran.update({
      where: {
        id: id,
        studentId: student.id,
      },
      data: {
        statusPembayaran: StatusPembayaran.SUCCESS,
      },
    });

    return {
      status: 201,
      message: 'Success Confirm Pembayaran',
      data: pembayaran,
    };
  }

  async getPembayaranStudent(student: Student): Promise<PembayaranResponse> {
    const pembayaran = await this.prismaService.pembayaran.findMany({
      where: {
        studentId: student.id,
      },
    });

    if (pembayaran.length === 0) {
      throw new ErrorService(404, 'Pembayaran not found');
    }

    return {
      status: 200,
      message: 'Success Get Pembayaran',
      data: pembayaran,
    };
  }
}
