/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Student, User } from '@prisma/client';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Semester } from 'src/types/course.type';
import {
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

  async create(total: number, semester: Semester): Promise<PembayaranResponse> {
    const requestCreate = this.pembayaranValidationService.create(
      total,
      semester,
    );

    const students = await this.prismaService.user.findMany({
      where: {
        role: 'STUDENT',
      },
    });

    await this.prismaService.pembayaran.createMany({
      data: students.map((student) => ({
        studentId: student.id,
        total: requestCreate.total,
        statusPembayaran: StatusPembayaran.PENDING,
        semester: requestCreate.semester,
      })),
    });

    return {
      status: 201,
      message: 'Success Create Pembayaran',
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

  async getAllPembayaranDetail(user: User): Promise<PembayaranResponse> {
    if (user.role !== 'ADMIN') {
      throw new ErrorService(403, 'You are not admin');
    }

    const groupedPembayaran = await this.prismaService.pembayaran.groupBy({
      by: ['semester', 'statusPembayaran'],
      _count: {
        _all: true,
      },
      _min: {
        total: true,
        createdAt: true,
      },
    });

    if (groupedPembayaran.length === 0) {
      throw new ErrorService(404, 'Pembayaran not found');
    }

    const formattedData = groupedPembayaran.reduce((acc, group) => {
      const { semester, statusPembayaran, _count } = group;
      const existingSemester = acc.find((item) => item.semester === semester);

      if (existingSemester) {
        existingSemester.statusCounts.push({
          statusPembayaran,
          count: _count._all,
          total: group._min.total,
          createdAt: group._min.createdAt,
        });
      } else {
        acc.push({
          semester,
          statusCounts: [
            {
              statusPembayaran,
              count: _count._all,
              total: group._min.total,
              createdAt: group._min.createdAt,
            },
          ],
        });
      }

      return acc;
    }, []);

    return {
      status: 200,
      message:
        'Success Get Pembayaran grouped by semester and statusPembayaran',
      data: formattedData,
    };
  }
}
