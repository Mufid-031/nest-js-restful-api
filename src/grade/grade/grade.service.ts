/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Grade } from '@prisma/client';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation/validation.service';
import { z } from 'zod';

interface GradeResponse {
    status: number;
    message: string;
    data?: Grade | Grade[];
}

@Injectable()
export class GradeService {
    constructor(
        private readonly validation: ValidationService,
        private readonly prismaService: PrismaService,
        private readonly errorService: ErrorService
    ) {}

    async create(enrollmentId: number, grade: number): Promise<GradeResponse> {
        
        const schema = z.object({
            enrollmentId: z.number().min(1),
            grade: z.number().min(0).max(100)
        });

        const requestCreate = this.validation.validate(schema, {
            enrollmentId,
            grade
        });

        const enrollmentGrade = await this.prismaService.grade.update({
            where: {
                id: requestCreate.enrollmentId,
            },
            data: {
                grade: requestCreate.grade,
            }
        });

        if (!enrollmentGrade) {
            throw this.errorService.throwError(404, "Enrollment not found");
        };

        return {
            status: 201,
            message: "Success create grade",
            data: enrollmentGrade
        };
    }

    async update(enrollmentId: number, grade: number): Promise<GradeResponse> {
        
        const schema = z.object({
            enrollmentId: z.number().min(1),
            grade: z.number().min(0).max(100)
        });

        const requestUpdate = this.validation.validate(schema, {
            enrollmentId,
            grade
        });

        const enrollmentGrade = await this.prismaService.grade.update({
            where: {
                id: requestUpdate.enrollmentId,
            },
            data: {
                grade: requestUpdate.grade,
            }
        });

        if (!enrollmentGrade) {
            throw this.errorService.throwError(404, "Enrollment not found");
        };

        return {
            status: 201,
            message: "Success update grade",
            data: enrollmentGrade
        };
    }

    async delete(enrollmentId: number): Promise<GradeResponse> {
        
        const enrollmentGrade = await this.prismaService.grade.deleteMany({
            where: {
                id: enrollmentId,
            }
        });

        if (!enrollmentGrade) {
            throw this.errorService.throwError(404, "Enrollment not found");
        };

        return {
            status: 201,
            message: "Success delete grade",
        }
    }
}
