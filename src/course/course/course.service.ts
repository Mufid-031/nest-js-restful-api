/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Course } from '@prisma/client';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation/validation.service';
import { z } from 'zod';

enum Semester {
    SEMESTER_1 = 'semester_1',
    SEMESTER_2 = 'semester_2',
    SEMESTER_3 = 'semester_3',
    SEMESTER_4 = 'semester_4',
    SEMESTER_5 = 'semester_5',
    SEMESTER_6 = 'semester_6',
    SEMESTER_7 = 'semester_7',
    SEMESTER_8 = 'semester_8',
}

interface CourseResponse {
    status: number;
    message: string;
    data: Course | Course[];
}

@Injectable()
export class CourseService {
    constructor(
        private readonly validation: ValidationService,
        private readonly prismaService: PrismaService,
        private readonly errorService: ErrorService
    ) {}

    async create(name: string, code: string, teacherId: number, sks: number, semester: Semester): Promise<CourseResponse> {
        
        const schema = z.object({
            name: z.string().min(1).max(100),
            code: z.string().min(1).max(100),
            teacherId: z.number().min(1),
            sks: z.number().min(1).max(100),
            semester: z.enum([Semester.SEMESTER_1, Semester.SEMESTER_2, Semester.SEMESTER_3, Semester.SEMESTER_4, Semester.SEMESTER_5, Semester.SEMESTER_6, Semester.SEMESTER_7, Semester.SEMESTER_8])
        });

        const requestCreate = this.validation.validate(schema, {
            name,
            code,
            teacherId,
            sks,
            semester
        });

        const course = await this.prismaService.course.create({
            data: {
                name: requestCreate.name,
                code: requestCreate.code,
                teacherId: requestCreate.teacherId,
                sks: requestCreate.sks,
                semester: requestCreate.semester
            }
        });

        return {
            status: 201,
            message: 'Course created successfully',
            data: course
        }
    }

    async update(name?: string, code?: string, teacherId?: number, sks?: number, semester?: Semester): Promise<CourseResponse> {

        const schema = z.object({
            name: z.string().min(1).max(100).optional(),
            code: z.string().min(1).max(100).optional(),
            teacherId: z.number().min(1).optional(),
            sks: z.number().min(1).max(100).optional(),
            semester: z.enum([Semester.SEMESTER_1, Semester.SEMESTER_2, Semester.SEMESTER_3, Semester.SEMESTER_4, Semester.SEMESTER_5, Semester.SEMESTER_6, Semester.SEMESTER_7, Semester.SEMESTER_8]).optional()
        });

        const requestUpdate = this.validation.validate(schema, {
            name,
            code,
            teacherId,
            sks,
            semester
        });

        const course = await this.prismaService.course.findUnique({
            where: {
                code: requestUpdate.code,
            }
        });

        if (!course) {
            throw this.errorService.throwError(404, "Course not found");
        };

        if (requestUpdate.name) {
            course.name = requestUpdate.name;
        };

        if (requestUpdate.code) {
            course.code = requestUpdate.code;
        };

        if (requestUpdate.teacherId) {
            course.teacherId = requestUpdate.teacherId;
        };

        if (requestUpdate.sks) {
            course.sks = requestUpdate.sks;
        };

        if (requestUpdate.semester) {
            course.semester = requestUpdate.semester;
        };

        const update = await this.prismaService.course.update({
            where: {
                code: requestUpdate.code,
            },
            data: course
        });

        return {
            status: 201,
            message: "Success update course",
            data: update
        };
    }

    async delete(code: string): Promise<CourseResponse> {
        
        const schema = z.object({
            code: z.string().min(1).max(100)
        });

        const requestDelete = this.validation.validate(schema, {
            code,
        });

        const course = await this.prismaService.course.findUnique({
            where: {
                code: requestDelete.code,
            }
        });

        if (!course) {
            throw this.errorService.throwError(404, "Course not found");
        };

        return {
            status: 200,
            message: "Success delete course",
            data: course
        };
    }

    async getCourses(): Promise<CourseResponse> {
        
        const courses = await this.prismaService.course.findMany();

        return {
            status: 200,
            message: "Success get courses",
            data: courses
        };
    }

    async getCourse(code: string): Promise<CourseResponse> {
        
        const schema = z.object({
            code: z.string().min(1).max(100)
        });

        const requestGetCourse = this.validation.validate(schema, {
            code,
        });

        const course = await this.prismaService.course.findUnique({
            where: {
                code: requestGetCourse.code,
            }
        });

        return {
            status: 200,
            message: "Succes get course",
            data: course
        };
    }
}
