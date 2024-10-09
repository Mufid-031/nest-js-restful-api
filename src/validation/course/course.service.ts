/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
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

@Injectable()
export class CourseService {
    constructor(
        private readonly validation: ValidationService
    ) {}

    create(name: string, code: string, teacherId: number, sks: number, semester: Semester) {
        
        const schema = z.object({
            name: z.string().min(1).max(100),
            code: z.string().min(1).max(100),
            teacherId: z.number().min(1),
            sks: z.number().min(1).max(100),
            semester: z.enum([Semester.SEMESTER_1, Semester.SEMESTER_2, Semester.SEMESTER_3, Semester.SEMESTER_4, Semester.SEMESTER_5, Semester.SEMESTER_6, Semester.SEMESTER_7, Semester.SEMESTER_8])
        });

        return this.validation.validate(schema, { name, code, teacherId, sks, semester });
    }

    update(name?: string, code?: string, teacherId?: number, sks?: number, semester?: Semester) {

        const schema = z.object({
            name: z.string().min(1).max(100).optional(),
            code: z.string().min(1).max(100).optional(),
            teacherId: z.number().min(1).optional(),
            sks: z.number().min(1).max(100).optional(),
            semester: z.enum([Semester.SEMESTER_1, Semester.SEMESTER_2, Semester.SEMESTER_3, Semester.SEMESTER_4, Semester.SEMESTER_5, Semester.SEMESTER_6, Semester.SEMESTER_7, Semester.SEMESTER_8]).optional()
        });

        return this.validation.validate(schema, { name, code, teacherId, sks, semester });
    }

    delete(code: string) {

        const schema = z.object({
            code: z.string().min(1).max(100)
        });

        return this.validation.validate(schema, { code });
    }

    getCourse(code: string) {

        const schema = z.object({
            code: z.string().min(1).max(100)
        });

        return this.validation.validate(schema, { code });
    }
}
