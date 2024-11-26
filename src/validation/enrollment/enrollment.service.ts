/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { z } from 'zod';

@Injectable()
export class EnrollmentService {
    constructor(
        private readonly validation: ValidationService
    ) {}

    register(studentId: number, scheduleId: number) {

        const schema = z.object({
            studentId: z.number().min(1),
            scheduleId: z.number().min(1)
        });

        return this.validation.validate(schema, { studentId, scheduleId });
    }

    registerMany(studentId: number, coursesId: number[]) {

        const schema = z.object({
            studentId: z.number().min(1),
            coursesId: z.array(z.number().min(1))
        });

        return this.validation.validate(schema, { studentId, coursesId });
    }

    
}
