/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Header, HttpCode, Post } from '@nestjs/common';
import { AlumniService } from './alumni.service';
import { AlumniResponse } from 'src/types/alumni.type';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RequestHeader } from 'src/model/x-api-token.model';
import { AlumniRequestCreate, AlumniResponseCreate, AlumniResponseGetAll } from '../model/alumni.model';

@Controller('/api/alumni')
export class AlumniController {
  constructor(private readonly alumniService: AlumniService) {}

  @Post('/create')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Alumni' })
  @ApiHeader(RequestHeader)
  @ApiBody(AlumniRequestCreate)
  @ApiResponse(AlumniResponseCreate)
  async create(
    @Body('studentId') studentId: number,
    @Body('tanggalLulus') tanggalLulus: Date,
  ): Promise<AlumniResponse> {
    return await this.alumniService.create(studentId, tanggalLulus);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get All Alumni' })
  @ApiHeader(RequestHeader)
  @ApiResponse(AlumniResponseGetAll)
  async getAllAlumni(): Promise<AlumniResponse> {
    return await this.alumniService.getAllAlumni();
  }
}
