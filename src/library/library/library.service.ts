/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
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

  async update(
    id: number,
    title?: string,
    description?: string,
    page?: number,
    author?: string,
    cover?: string,
    overview?: string,
  ): Promise<LibraryResponse> {
    const library = await this.prismaService.library.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!library) {
      throw new ErrorService(404, 'Library not found');
    }

    if (title) library.title = title;
    if (description) library.description = description;
    if (page) library.page = Number(page);
    if (author) library.author = author;
    if (cover) library.cover = cover;
    if (overview) library.overview = overview;

    await this.prismaService.library.update({
      where: {
        id: Number(id),
      },
      data: library,
    });

    return {
      status: 201,
      message: 'Library updated successfully!',
      data: library,
    };
  }

  async delete(id: number): Promise<LibraryResponse> {
    const library = await this.prismaService.library.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!library) {
      throw new ErrorService(404, 'Library not found');
    }

    await this.prismaService.library.delete({
      where: {
        id: Number(id),
      },
    });

    return {
      status: 201,
      message: 'Library deleted successfully!',
      data: library,
    };
  }

  async getLibraries(): Promise<LibraryResponse> {
    const libraries = await this.prismaService.library.findMany();

    if (libraries.length === 0) {
      throw new ErrorService(404, 'Libraries not found');
    }

    return {
      status: 200,
      message: 'Libraries found successfully!',
      data: libraries,
    };
  }
}
