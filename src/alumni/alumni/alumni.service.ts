/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { AlumniResponse } from 'src/types/alumni.type';
import { AlumniService as AlumniValidationService } from 'src/validation/alumni/alumni.service';

@Injectable()
export class AlumniService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly alumniValidationService: AlumniValidationService,
  ) {}

  async create(studentId: number, tanggalLulus: Date): Promise<AlumniResponse> {
    const requestCreate = this.alumniValidationService.create(
      studentId,
      tanggalLulus,
    );

    const alumniCount = await this.prismaService.alumni.count({
      where: {
        studentId: requestCreate.studentId,
      },
    });

    if (alumniCount > 0) {
      throw new ErrorService(400, 'Alumni already exists');
    }

    const alumni = await this.prismaService.alumni.create({
      data: {
        studentId: requestCreate.studentId,
        tanggalLulus: requestCreate.tanggalLulus,
      },
    });

    return {
      status: 201,
      message: 'Alumni created successfully',
      data: alumni,
    };
  }

  async getAllAlumni(): Promise<AlumniResponse> {
    const alumni = await this.prismaService.alumni.findMany();

    return {
      status: 200,
      message: 'Get all alumni successfully',
      data: alumni,
    };
  }
}
