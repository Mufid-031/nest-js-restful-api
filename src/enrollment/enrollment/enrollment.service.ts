/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { EnrollmentResponse } from 'src/types/enrollment.type';
import { EnrollmentService as EnrollmentValidationService } from 'src/validation/enrollment/enrollment.service';

@Injectable()
export class EnrollmentService {
  private errors: {
    scheduleId: number;
    message: string;
  }[];

  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly EnrollmentValidationService: EnrollmentValidationService,
  ) {}

  async register(
    studentId: number,
    scheduleId: number,
  ): Promise<EnrollmentResponse> {
    const requestRegister = this.EnrollmentValidationService.register(
      studentId,
      scheduleId,
    );

    const schedule = await this.prismaService.schedule.findFirst({
      where: {
        id: requestRegister.scheduleId,
      },
    });

    if (schedule.kouta < 0) {
      this.errors.push({
        scheduleId,
        message: 'Kouta is full',
      });
      return;
    }

    const enrollment = await this.prismaService.enrollment.create({
      data: {
        studentId: requestRegister.studentId,
        scheduleId: requestRegister.scheduleId,
      },
      include: {
        schedule: {
          include: {
            course: true,
          }
        },
      },
    });

    await this.prismaService.schedule.updateMany({
      where: {
        id: enrollment.scheduleId,
      },
      data: {
        kouta: {
          decrement: 1,
        },
      },
    });

    await this.prismaService.student.update({
      where: {
        id: enrollment.studentId,
      },
      data: {
        sksOFSemester: {
          increment: enrollment.schedule.course.sks,
        },
        sks: {
          increment: enrollment.schedule.course.sks,
        },
      },
    });

    return {
      status: 200,
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

    // const register = requestRegister.coursesId.map((scheduleId) => this.register(requestRegister.studentId, scheduleId));

    const enrollments = await this.prismaService.enrollment.findMany({
      where: {
        studentId: requestRegister.studentId,
        scheduleId: { in: requestRegister.coursesId },
      },
      include: {
        student: true,
        schedule: {
          include: {
            course: true,
          }
        }
      },
    });

    await this.prismaService.schedule.updateMany({
      where: {
        id: { in: requestRegister.coursesId },
      },
      data: {
        kouta: {
          decrement: 1,
        },
      },
    });

    await this.prismaService.student.update({
      where: {
        id: requestRegister.studentId,
      },
      data: {
        sksOFSemester: {
          increment: enrollments
            .map((enrollment) => enrollment.schedule.course.sks)
            .reduce((a, b) => a + b, 0),
        },
        sks: {
          increment: enrollments
            .map((enrollment) => enrollment.schedule.course.sks)
            .reduce((a, b) => a + b, 0),
        },
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
    scheduleId: number,
  ): Promise<EnrollmentResponse> {
    const enrollment = await this.prismaService.enrollment.deleteMany({
      where: {
        studentId: studentId,
        scheduleId: scheduleId,
      },
    });

    if (!enrollment) {
      throw new ErrorService(404, 'Enrollment not found');
    }

    return {
      status: 201,
      message: 'Success delete enrollment',
    };
  }

  async deleteMany(
    studentId: number,
    scheduleId: number[],
  ): Promise<EnrollmentResponse> {
    const enrollments = await this.prismaService.enrollment.findMany({
      where: {
        studentId: studentId,
        scheduleId: { in: scheduleId },
      },
      include: {
        student: true,
        schedule: {
          include: {
            course: true,
          }
        }
      },
    });

    await this.prismaService.schedule.updateMany({
      where: {
        id: { in: scheduleId },
      },
      data: {
        kouta: {
          increment: 1,
        },
      },
    });

    await this.prismaService.student.update({
      where: {
        id: studentId,
      },
      data: {
        sksOFSemester: {
          decrement: enrollments
            .map((enrollment) => enrollment.schedule.course.sks)
            .reduce((a, b) => a + b, 0),
        },
      },
    });

    if (!enrollments) {
      throw new ErrorService(404, 'Enrollment not found');
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
      include: {
        schedule: {
          include: {
            course: true,
          }
        }
      },
    });

    if (!enrollments) {
      throw new ErrorService(404, 'Enrollment not found');
    }

    return {
      status: 200,
      message: 'Success get enrollments',
      data: enrollments,
    };
  }
}
