/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { KritikSaranType } from 'src/types/kritik-saran.model';
import { z } from 'zod';

@Injectable()
export class KritikSaranService {
  constructor(private readonly validation: ValidationService) {}

  create(pesan: string, type: KritikSaranType) {
    const schema = z.object({
      pesan: z.string().min(1).max(1000),
      type: z.enum([KritikSaranType.KRITIK, KritikSaranType.SARAN]),
    });
    return this.validation.validate(schema, { pesan, type });
  }

  update(id: number, pesan?: string, type?: KritikSaranType) {
    const schema = z.object({
      id: z.number(),
      pesan: z.string().min(1).max(1000).optional(),
      type: z.enum([KritikSaranType.KRITIK, KritikSaranType.SARAN]).optional(),
    });
    return this.validation.validate(schema, { id, pesan, type });
  }
}
