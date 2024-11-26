/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { BeasiswaResponse } from 'src/types/beasiswa.type';
import { BeasiswaService as BeasiswaValidationService } from 'src/validation/beasiswa/beasiswa.service';

@Injectable()
export class BeasiswaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly beasiswaValidationService: BeasiswaValidationService,
  ) {}

  async register(
    nama: string,
    mulai: Date,
    akhir: Date,
    deskripsi?: string,
  ): Promise<BeasiswaResponse> {
    const requestRegister = this.beasiswaValidationService.register(
      nama,
      mulai,
      akhir,
      deskripsi,
    );

    const beasiswa = await this.prismaService.beasiswa.create({
      data: {
        nama: requestRegister.nama,
        mulai: requestRegister.mulai,
        akhir: requestRegister.akhir,
        deskripsi: requestRegister.deskripsi || null,
      },
    });

    return {
      status: 200,
      message: 'Success to register beasiswa',
      data: beasiswa,
    };
  }

  async update(
    id: number,
    nama?: string,
    mulai?: Date,
    akhir?: Date,
    deskripsi?: string,
  ): Promise<BeasiswaResponse> {
    const requestUpdate = this.beasiswaValidationService.update(
      nama,
      mulai,
      akhir,
      deskripsi,
    );

    const beasiswa = await this.prismaService.beasiswa.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (requestUpdate.nama) {
      beasiswa.nama = requestUpdate.nama;
    }

    if (requestUpdate.mulai) {
      beasiswa.mulai = requestUpdate.mulai;
    }

    if (requestUpdate.akhir) {
      beasiswa.akhir = requestUpdate.akhir;
    }

    if (requestUpdate.deskripsi) {
      beasiswa.deskripsi = requestUpdate.deskripsi;
    }

    const updatedBeasiswa = await this.prismaService.beasiswa.update({
      where: {
        id: beasiswa.id,
      },
      data: beasiswa,
    });

    return {
      status: 201,
      message: 'Success update beasiswa',
      data: updatedBeasiswa,
    };
  }
}
