/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { z } from 'zod';

@Injectable()
export class StudentService {
  constructor(private readonly validation: ValidationService) {}

  register(
    name: string,
    email: string,
    password: string,
    nim: string,
    programStudi: string,
  ) {
    const schema = z.object({
      name: z.string().min(1).max(100),
      email: z.string().min(1).max(100),
      password: z.string().min(1).max(100),
      nim: z.string().min(1).max(100),
      programStudi: z.string().min(1).max(100),
    });

    return this.validation.validate(schema, {
      name,
      email,
      password,
      nim,
      programStudi,
    });
  }

  login(nim: string, password: string) {
    const schema = z.object({
      nim: z.string().min(1).max(100),
      password: z.string().min(1).max(100),
    });

    return this.validation.validate(schema, { nim, password });
  }

  update(
    name?: string,
    email?: string,
    password?: string,
    telephone?: string,
    tanggalLahir?: Date,
  ) {
    const schema = z.object({
      name: z.string().min(1).max(100).optional(),
      email: z.string().min(1).max(100).optional(),
      password: z.string().min(1).max(100).optional(),
      telephone: z.string().min(1).max(100).optional(),
      tanggalLahir: z.date().optional(),
    });

    return this.validation.validate(schema, {
      name,
      email,
      password,
      telephone,
      tanggalLahir,
    });
  }
}
