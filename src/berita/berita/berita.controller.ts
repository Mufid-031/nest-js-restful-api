/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BeritaService } from './berita.service';
import { BeritaResponse } from 'src/types/berita.type';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestHeader } from 'src/model/x-api-token.model';
import {
  BeritaRequestCreate,
  BeritaRequestUpdate,
  BeritaResponseCreate,
  BeritaResponseDelete,
  BeritaResponseGetAll,
  BeritaResponseUpdate,
} from '../model/berita.model';

@ApiTags('Berita')
@Controller('/api/berita')
export class BeritaController {
  constructor(private readonly beritaService: BeritaService) {}

  @Post('/create')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Berita' })
  @ApiHeader(RequestHeader)
  @ApiBody(BeritaRequestCreate)
  @ApiResponse(BeritaResponseCreate)
  async create(
    @Body('judul') judul: string,
    @Body('konten') konten: string,
    @Body('gambar') gambar?: string,
  ): Promise<BeritaResponse> {
    return await this.beritaService.create(judul, konten, gambar);
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update Berita' })
  @ApiHeader(RequestHeader)
  @ApiBody(BeritaRequestUpdate)
  @ApiResponse(BeritaResponseUpdate)
  async update(
    @Body('id') id: number,
    @Body('judul') judul?: string,
    @Body('konten') konten?: string,
    @Body('gambar') gambar?: string,
  ): Promise<BeritaResponse> {
    return await this.beritaService.update(id, judul, konten, gambar);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Delete Berita' })
  @ApiHeader(RequestHeader)
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse(BeritaResponseDelete)
  async delete(@Param('id') id: number): Promise<BeritaResponse> {
    return await this.beritaService.delete(id);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get All Berita' })
  @ApiHeader(RequestHeader)
  @ApiResponse(BeritaResponseGetAll)
  async getNews(): Promise<BeritaResponse> {
    return await this.beritaService.getNews();
  }
}
