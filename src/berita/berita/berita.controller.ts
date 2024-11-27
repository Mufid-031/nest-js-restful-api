/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Header, HttpCode, Patch, Post } from '@nestjs/common';
import { BeritaService } from './berita.service';
import { BeritaResponse } from 'src/types/berita.type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Berita')
@Controller('/api/berita')
export class BeritaController {
    constructor(private readonly beritaService: BeritaService) {}

    @Post('/create')
    @Header('Content-Type', 'application/json')
    @HttpCode(201)
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
    async update(
        @Body('id') id: number,
        @Body('judul') judul?: string,
        @Body('konten') konten?: string,
        @Body('gambar') gambar?: string,
    ): Promise<BeritaResponse> {
        return await this.beritaService.update(id, judul, konten, gambar);
    }

    @Delete()
    @Header('Content-Type', 'application/json')
    @HttpCode(201)
    async delete(@Body('id') id: number): Promise<BeritaResponse> {
        return await this.beritaService.delete(id);
    }

    @Get()
    @Header('Content-Type', 'application/json')
    @HttpCode(201)
    async getNews(): Promise<BeritaResponse> {
        return await this.beritaService.getNews();
    }
}
