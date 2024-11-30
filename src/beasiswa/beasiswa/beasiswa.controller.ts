/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Header, HttpCode, Patch, Post } from '@nestjs/common';
import { BeasiswaService } from './beasiswa.service';
import { BeasiswaResponse } from 'src/types/beasiswa.type';

@Controller('/api/beasiswa')
export class BeasiswaController {
  constructor(private readonly beasiswaService: BeasiswaService) {}

  @Post('register')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async register(
    @Body('name') name: string,
    @Body('mulai') mulai: Date,
    @Body('akhir') akhir: Date,
    @Body('link') link: string,
    @Body('deskripsi') deskripsi?: string,
  ): Promise<BeasiswaResponse> {
    return await this.beasiswaService.register(name, mulai, akhir, link, deskripsi);
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async update(
    @Body('id') id: number,
    @Body('name') name?: string,
    @Body('mulai') mulai?: Date,
    @Body('akhir') akhir?: Date,
    @Body('deskripsi') deskripsi?: string,
  ): Promise<BeasiswaResponse> {
    return await this.beasiswaService.update(id, name, mulai, akhir, deskripsi);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async delete(@Body('id') id: number): Promise<BeasiswaResponse> {
    return await this.beasiswaService.delete(id);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getBeasiswa(): Promise<BeasiswaResponse> {
    return await this.beasiswaService.getBeasiswa();
  }
}
