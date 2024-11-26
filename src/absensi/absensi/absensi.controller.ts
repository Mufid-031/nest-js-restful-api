/* eslint-disable prettier/prettier */
import { Body, Controller, Header, HttpCode, Patch, Post } from '@nestjs/common';
import { AbsensiService } from './absensi.service';
import { AbsensiResponse, StatusKehadiran } from 'src/types/absensi.type';

@Controller('/api/absensi')
export class AbsensiController {
    constructor(
        private readonly absensiService: AbsensiService
    ) {}

    @Post('/register')
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    async register(
        @Body('studentId') studentId: number,
        @Body('scheduleId') scheduleId: number,
        @Body('statusKehadiran') statusKehadiran: StatusKehadiran,
        @Body('pertemuan') pertemuan: number,
        @Body('materi') materi: string,
        @Body('keterangan') keterangan?: string,
    ): Promise<AbsensiResponse> {
        return await this.absensiService.register(studentId, scheduleId, statusKehadiran, pertemuan, materi, keterangan);
    }

    @Patch()
    @Header('Content-Type', 'application/json')
    @HttpCode(201)
    async update(
        @Body('studentId') studentId: number,
        @Body('scheduleId') scheduleId: number,
        @Body('statusKehadiran') statusKehadiran: StatusKehadiran,
        @Body('pertemuan') pertemuan: number,
        @Body('materi') materi?: string,
        @Body('keterangan') keterangan?: string,
    ): Promise<AbsensiResponse> {
        return await this.absensiService.update(studentId, scheduleId, statusKehadiran, pertemuan, materi, keterangan);
    }
}
