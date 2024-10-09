/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Grade } from '@prisma/client';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { GradeService as GradeValidationService } from 'src/validation/grade/grade.service';

interface GradeResponse {
    status: number;
    message: string;
    data?: Grade | Grade[];
}

@Injectable()
export class GradeService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly errorService: ErrorService,
        private readonly GradeValidationService: GradeValidationService
    ) {}

    async create(enrollmentId: number, grade: number): Promise<GradeResponse> {
        
        const requestCreate = this.GradeValidationService.create(enrollmentId, grade);

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
        
        const requestUpdate = this.GradeValidationService.update(enrollmentId, grade);

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
