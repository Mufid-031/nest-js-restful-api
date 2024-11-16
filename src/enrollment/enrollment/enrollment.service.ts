/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Enrollment } from '@prisma/client';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { EnrollmentService as EnrollmentValidationService } from 'src/validation/enrollment/enrollment.service';

interface EnrollmentResponse {
  status: number;
  message: string;
  data?: Enrollment | Enrollment[];
}

@Injectable()
export class EnrollmentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly EnrollmentValidationService: EnrollmentValidationService,
  ) {}

  async register(
    studentId: number,
    courseId: number,
  ): Promise<EnrollmentResponse> {
    const requestRegister = this.EnrollmentValidationService.register(
      studentId,
      courseId,
    );

    const enrollment = await this.prismaService.enrollment.create({
      data: {
        studentId: requestRegister.studentId,
        courseId: requestRegister.courseId,
      },
    });

    return {
      status: 201,
      message: 'Success register course',
      data: enrollment,
    };
  }

  async registerMany(
    studentId: number,
    coursesId: number[],
  ): Promise<EnrollmentResponse> {
    const requestRegister = this.EnrollmentValidationService.registerMany(
      studentId,
      coursesId,
    );

    await this.prismaService.enrollment.createMany({
      data: requestRegister.coursesId.map((courseId) => {
        return {
          studentId: requestRegister.studentId,
          courseId: courseId,
        };
      }),
    });

    const enrollments = await this.prismaService.enrollment.findMany({
      where: {
        studentId: requestRegister.studentId,
        courseId: { in: requestRegister.coursesId },
      },
    });

    return {
      status: 201,
      message: 'Success register course',
      data: enrollments,
    };
  }

  async delete(
    studentId: number,
    courseId: number,
  ): Promise<EnrollmentResponse> {
    const enrollment = await this.prismaService.enrollment.deleteMany({
      where: {
        studentId: studentId,
        courseId: courseId,
      },
    });

    if (!enrollment) {
      throw this.errorService.throwError(404, 'Enrollment not found');
    }

    return {
      status: 201,
      message: 'Success delete enrollment',
    };
  }

  async deleteMany(
    studentId: number,
    courseId: number[],
  ): Promise<EnrollmentResponse> {
    const enrollments = await this.prismaService.enrollment.deleteMany({
      where: {
        studentId: studentId,
        courseId: { in: courseId },
      },
    });

    if (!enrollments) {
      throw this.errorService.throwError(404, 'Enrollment not found');
    }

    return {
      status: 201,
      message: 'Success delete enrollments',
    };
  }

  async getEnrollments(studentId: number): Promise<EnrollmentResponse> {
    const enrollments = await this.prismaService.enrollment.findMany({
      where: {
        studentId: studentId,
      },
    });

    if (!enrollments) {
      throw this.errorService.throwError(404, 'Enrollment not found');
    }

    return {
      status: 200,
      message: 'Success get enrollments',
      data: enrollments,
    };
  }
}
