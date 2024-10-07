/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Enrollment } from '@prisma/client';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation/validation.service';
import { z } from 'zod';

interface EnrollmentResponse {
    status: number;
    message: string;
    data?: Enrollment | Enrollment[];
}

@Injectable()
export class EnrollmentService {
    constructor(
        private readonly validation: ValidationService,
        private readonly prismaService: PrismaService,
        private readonly errorService: ErrorService
    ) {}

    async register(studentId: number, courseId: number): Promise<EnrollmentResponse> {

        const schema = z.object({
            studentId: z.number().min(1),
            courseId: z.number().min(1)
        });

        const requestRegister = this.validation.validate(schema, {
            studentId,
            courseId
        });

        const enrollment = await this.prismaService.enrollment.create({
            data: {
                studentId: requestRegister.studentId,
                courseId: requestRegister.courseId,
            }
        });

        return {
            status: 201,
            message: "Success register course",
            data: enrollment
        };
    }

    async registerMany(studentId: number, coursesId: number[]): Promise<EnrollmentResponse> {
        
        const schema = z.object({
            studentId: z.number().min(1),
            coursesId: z.array(z.number().min(1))
        });

        const requestRegister = this.validation.validate(schema, {
            studentId,
            coursesId
        });

        const { count } = await this.prismaService.enrollment.createMany({
            data: requestRegister.coursesId.map(courseId => ({
                studentId: requestRegister.studentId,
                courseId
            }))
        });

        const enrollments = await this.prismaService.enrollment.findMany({
            where: {
                studentId: requestRegister.studentId,
                courseId: { in: requestRegister.coursesId }
            }
        });

        return {
            status: 201,
            message: "Success register course",
            data: enrollments
        }
    }

    async delete(id: number): Promise<EnrollmentResponse> {

        const enrollment = await this.prismaService.enrollment.deleteMany({
            where: {
                id: id,
            }
        });

        if (!enrollment) {
            throw this.errorService.throwError(404, "Enrollment not found");
        };

        return {
            status: 201,
            message: "Success delete enrollment",
        };
    }

    async deleteMany(id: number[]): Promise<EnrollmentResponse> {
        
        const enrollments = await this.prismaService.enrollment.deleteMany({
            where: {
                id: { in: id }
            }
        });

        if (!enrollments) {
            throw this.errorService.throwError(404, "Enrollment not found");
        };

        return {
            status: 201,
            message: "Success delete enrollments"
        }
    }

}
