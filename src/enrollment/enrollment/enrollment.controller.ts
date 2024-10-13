/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Header, HttpCode, Param, Post } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from '@prisma/client';

interface EnrollmentResponse {
    status: number;
    message: string;
    data?: Enrollment | Enrollment[];
}

@Controller('/api/enrollment')
export class EnrollmentController {
    constructor(
        private readonly enrollmentService: EnrollmentService,
    ) {}

    @Post('/register')
    @Header('Content-Type', 'application/json')
    @HttpCode(201)
    async register(
        @Body('studentId') studentId: number,
        @Body('courseId') courseId: number
    ): Promise<EnrollmentResponse> {
        return this.enrollmentService.register(studentId, courseId);
    }

    @Post('/registerMany')
    @Header('Content-Type', 'application/json')
    @HttpCode(201)
    async registerMany(
        @Body('studentId') studentId: number,
        @Body('coursesId') coursesId: number[]
    ): Promise<EnrollmentResponse> {
        return this.enrollmentService.registerMany(studentId, coursesId);
    }

    @Delete('/:courseId')
    @Header('Content-Type', 'application/json')
    @HttpCode(201)
    async delete(
        @Body('studentId') studentId: number,
        @Param('courseId') courseId: number
    ): Promise<EnrollmentResponse> {
        return this.enrollmentService.delete(studentId, courseId);
    }

    @Delete()
    @Header('Content-Type', 'application/json')
    @HttpCode(201)
    async deleteMany(
        @Body('studentId') studentId: number,
        @Body('coursesId') courseId: number[]
    ): Promise<EnrollmentResponse> {
        return this.enrollmentService.deleteMany(studentId,courseId);
    }
}
