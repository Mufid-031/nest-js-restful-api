/* eslint-disable prettier/prettier */
import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { KritikSaranService } from './kritik-saran.service';
import { KritikSaranType } from 'src/types/kritik-saran.model';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestHeader } from 'src/model/x-api-token.model';
import { KritikSaranRequestCreate, KritikSaranRequestUpdate, KritikSaranResponseCreate, KritikSaranResponseDelete, KritikSaranResponseGetAll, KritikSaranResponseUpdate } from '../model/kritik-saran.model';

@ApiTags('Kritik Saran')
@Controller('/api/kritikSaran')
export class KritikSaranController {
  constructor(private readonly kritikSaranService: KritikSaranService) {}

  @Post('/create')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Kritik Saran' })
  @ApiHeader(RequestHeader)
  @ApiBody(KritikSaranRequestCreate)
  @ApiResponse(KritikSaranResponseCreate)
  async create(@GetUser() user: User, pesan: string, type: KritikSaranType) {
    return this.kritikSaranService.create(user, pesan, type);
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update Kritik Saran' })
  @ApiHeader(RequestHeader)
  @ApiBody(KritikSaranRequestUpdate)
  @ApiResponse(KritikSaranResponseUpdate)
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
  @ApiOperation({ summary: 'Delete Kritik Saran' })
  @ApiHeader(RequestHeader)
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse(KritikSaranResponseDelete)
  async delete(@GetUser() user: User, @Param('id') id: number) {
    return this.kritikSaranService.delete(user, id);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get All Kritik Saran' })
  @ApiHeader(RequestHeader)
  @ApiResponse(KritikSaranResponseGetAll)
  async getKritikSaran(@GetUser() user: User) {
    return this.kritikSaranService.getKritikSaran(user);
  }
}
