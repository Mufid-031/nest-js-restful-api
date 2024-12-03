/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { ValidationService } from '../validation/validation.service';
import { JenisPembayaran, StatusPembayaran } from '@prisma/client';

@Injectable()
export class PembayaranService {
  constructor(private readonly validation: ValidationService) {}

  create(
    studentId: number,
    total: number,
    jenisPembayaran: JenisPembayaran,
    tanggal: Date,
    statusPembayaran: StatusPembayaran,
  ) {
    const schema = z.object({
      studentId: z.number().min(1),
      total: z.number().min(1),
      jenisPembayaran: z.enum([JenisPembayaran.BANK, JenisPembayaran.EWALLET]),
      tanggal: z.date(),
      statusPembayaran: z.enum([
        StatusPembayaran.FAILED,
        StatusPembayaran.PENDING,
        StatusPembayaran.SUCCESS,
      ]),
    });

    return this.validation.validate(schema, {
      studentId,
      total,
      jenisPembayaran,
      tanggal,
      statusPembayaran,
    });
  }
}
