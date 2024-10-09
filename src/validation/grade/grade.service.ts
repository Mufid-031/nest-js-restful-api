/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { z } from 'zod';

@Injectable()
export class GradeService {
    constructor(
        private readonly validation: ValidationService
    ) {}

    create(enrollmentId: number, grade: number) {

        const schema = z.object({
            enrollmentId: z.number().min(1),
            grade: z.number().min(0).max(100)
        });

        return this.validation.validate(schema, { enrollmentId, grade });
    }

    update(enrollmentId: number, grade: number) {

        const schema = z.object({
            enrollmentId: z.number().min(1),
            grade: z.number().min(0).max(100)
        });

        return this.validation.validate(schema, { enrollmentId, grade });
    }
}
