/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { LibraryResponse } from 'src/types/library.type';

@Injectable()
export class LibraryService {
  constructor(private prismaService: PrismaService) {}

  async create(
    title: string,
    description: string,
    page: number,
    author: string,
    cover: string,
    overview: string,
  ): Promise<LibraryResponse> {

    const library = await this.prismaService.library.create({
      data: {
        title,
        description,
        page: Number(page),
        author,
        cover,
        overview,
      },
    });

    return {
      status: 200,
      message: 'Library created successfully!',
      data: library,
    };
  }
}
