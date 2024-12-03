/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PembayaranService } from './pembayaran.service';
import {
  JenisPembayaran,
  PembayaranResponse,
  StatusPembayaran,
} from 'src/types/pembayaran.type';
import { GetStudent } from 'src/decorators/student.decorator';
import { Student } from '@prisma/client';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  PembayaranRequestCreate,
  PembayaranResponseConfirm,
  PembayaranResponseCreate,
  PembayaranResponseGetStudent,
} from '../model/pembayaran.model';
import { RequestHeader } from 'src/model/x-api-token.model';

@ApiTags('Pembayaran')
@Controller('/api/pembayaran')
export class PembayaranController {
  constructor(private readonly pembayaranService: PembayaranService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Pembayaran' })
  @ApiHeader(RequestHeader)
  @ApiBody(PembayaranRequestCreate)
  @ApiResponse(PembayaranResponseCreate)
  async create(
    @Body('studentId') studentId: number,
    @Body('total') total: number,
    @Body('jenisPembayaran') jenisPembayaran: JenisPembayaran,
    @Body('tanggal') tanggal: Date,
    @Body('statusPembayaran') statusPembayaran: StatusPembayaran,
  ): Promise<PembayaranResponse> {
    return await this.pembayaranService.create(
      studentId,
      total,
      jenisPembayaran,
      tanggal,
      statusPembayaran,
    );
  }

  @Patch('/confirm/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Confirm Pembayaran' })
  @ApiHeader(RequestHeader)
  @ApiParam({ name: 'id' })
  @ApiResponse(PembayaranResponseConfirm)
  async confirm(
    @Param('id') id: number,
    @GetStudent() student: Student,
  ): Promise<PembayaranResponse> {
    return await this.pembayaranService.confirm(id, student);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get Pembayaran' })
  @ApiHeader(RequestHeader)
  @ApiResponse(PembayaranResponseGetStudent)
  async getPembayaranStudent(@GetStudent() student: Student): Promise<PembayaranResponse> {
    return await this.pembayaranService.getPembayaranStudent(student);
  }
}
