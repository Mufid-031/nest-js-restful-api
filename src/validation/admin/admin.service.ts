/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { z } from 'zod';

@Injectable()
export class AdminService {
    constructor(
        private readonly validation: ValidationService,
    ) {}

    register(name: string, email: string, password: string) {
        const schema = z.object({
            name: z.string().min(1).max(100),
            email: z.string().min(1).max(100),
            password: z.string().min(1).max(100),
        });

        return this.validation.validate(schema, { name, email, password });
    }

    login(email: string, password: string) {
        const schema = z.object({
            email: z.string().min(1).max(100),
            password: z.string().min(1).max(100),
        });

        return this.validation.validate(schema, { email, password });
    }

    

}
