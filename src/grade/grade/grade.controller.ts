/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Header, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { Grade } from '@prisma/client';
import { GradeService } from './grade.service';

interface GradeResponse {
    status: number;
    message: string;
    data?: Grade | Grade[];
}

@Controller('/api/grade')
export class GradeController {
    constructor(
        private readonly gradeService: GradeService
    ) {}

    @Post('/create')
    @Header('Content-Type', 'application/json')
    @HttpCode(201)
    async create(
        @Body('enrollmentId') enrollmentId: number,
        @Body('grade') grade: number
    ): Promise<GradeResponse> {
        return this.gradeService.create(enrollmentId, grade);
    }

    @Patch()
    @Header('Content-Type', 'application/json')
    @HttpCode(201)
    async update(
        @Body('enrollmentId') enrollmentId: number,
        @Body('grade') grade: number
    ): Promise<GradeResponse> {
        return this.gradeService.update(enrollmentId, grade);
    }

    @Delete('/:enrollmentId')
    @Header('Content-Type', 'application/json')
    @HttpCode(201)
    async delete(
        @Param('enrollmentId') enrollmentId: number
    ): Promise<GradeResponse> {
        return this.gradeService.delete(enrollmentId);
    }
}
