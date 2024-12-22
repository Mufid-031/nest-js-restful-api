/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { LibraryService } from './library.service';
import { LibraryResponse } from 'src/types/library.type';

@Controller('/api/library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post('/create')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './uploads/perpustakaan',
        filename: (req, file, callback) => {
          // Generate nama file unik
          const uniqueFilename = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueFilename);
        },
      }),
      fileFilter: (req, file, callback) => {
        // Validasi tipe file: hanya menerima gambar
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('page') page: number,
    @Body('author') author: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('overview') overview: string,
  ): Promise<LibraryResponse> {
    if (!file) {
      throw new Error('No file uploaded!');
    }

    // Simpan data ke database melalui service
    return await this.libraryService.create(
      title,
      description,
      page,
      author,
      file.filename,
      overview,
    );
  }
}
