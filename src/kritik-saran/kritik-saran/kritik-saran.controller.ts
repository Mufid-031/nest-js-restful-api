/* eslint-disable prettier/prettier */
import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Patch,
  Post,
} from '@nestjs/common';
import { KritikSaranService } from './kritik-saran.service';
import { KritikSaranType } from 'src/types/kritik-saran.model';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Kritik Saran')
@Controller('/api/kritikSaran')
export class KritikSaranController {
  constructor(private readonly kritikSaranService: KritikSaranService) {}

  @Post('/create')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async create(@GetUser() user: User, pesan: string, type: KritikSaranType) {
    return this.kritikSaranService.create(user, pesan, type);
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async update(
    @GetUser() user: User,
    id: number,
    pesan?: string,
    type?: KritikSaranType,
  ) {
    return this.kritikSaranService.update(user, id, pesan, type);
  }

  @Delete()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async delete(@GetUser() user: User, id: number) {
    return this.kritikSaranService.delete(user, id);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getKritikSaran(@GetUser() user: User) {
    return this.kritikSaranService.getKritikSaran(user);
  }
}
