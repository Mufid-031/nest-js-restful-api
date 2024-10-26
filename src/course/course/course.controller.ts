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
  Query,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from '@prisma/client';

enum Semester {
  SEMESTER_1 = 'semester_1',
  SEMESTER_2 = 'semester_2',
  SEMESTER_3 = 'semester_3',
  SEMESTER_4 = 'semester_4',
  SEMESTER_5 = 'semester_5',
  SEMESTER_6 = 'semester_6',
  SEMESTER_7 = 'semester_7',
  SEMESTER_8 = 'semester_8',
}

interface CourseResponse {
  status: number;
  message: string;
  data?: Course | Course[];
}

@Controller('/api/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('/create')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async create(
    @Body('name') name: string,
    @Body('code') code: string,
    @Body('teacherId') teacherId: number,
    @Body('sks') sks: number,
    @Body('semester') semester: Semester,
  ): Promise<CourseResponse> {
    return await this.courseService.create(
      name,
      code,
      teacherId,
      sks,
      semester,
    );
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async update(
    @Body('code') code: string,
    @Body('name') name?: string,
    @Body('teacherId') teacherId?: number,
    @Body('sks') sks?: number,
    @Body('semester') semester?: Semester,
  ): Promise<CourseResponse> {
    return this.courseService.update(
      code,
      name,
      teacherId,
      sks,
      semester,
    );
  }

  @Delete('/:code')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async delete(@Param('code') code: string): Promise<CourseResponse> {
    return await this.courseService.delete(code);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getCourses(): Promise<CourseResponse> {
    return await this.courseService.getCourses();
  }

  @Get('/:code')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getCourse(@Param('code') code: string): Promise<CourseResponse> {
    return await this.courseService.getCourse(code);
  }

  @Get('/search')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getCourseByName(@Query('name') name: string): Promise<CourseResponse> {
    return await this.courseService.getCourseByName(name);
  }
}
