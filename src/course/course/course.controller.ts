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
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CourseResponse, Semester } from 'src/types/course.type';


@ApiTags('Course')
@Controller('/api/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('/create')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new course' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'PAW' },
        code: { type: 'string', example: 'S140' },
        teacherId: { type: 'number', example: 1 },
        sks: { type: 'number', example: 4 },
        semester: { type: 'string', example: 'semester_3' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Created a new course',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 201 },
        message: { type: 'string', example: 'Course created successfully' },
        data: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'PAW' },
            code: { type: 'string', example: 'S140' },
            teacherId: { type: 'number', example: 1 },
            sks: { type: 'number', example: 4 },
            semester: { type: 'string', example: 'semester_3' },
            createAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
            updateAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
          },
        },
      },
    },
  })
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
  @ApiOperation({ summary: 'Update course' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'Token for authentication',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        code: { type: 'string', example: 'S140' },
        name: { type: 'string', example: 'DPW' },
        teacherId: { type: 'number', example: 1 },
        sks: { type: 'number', example: 4 },
        semester: { type: 'string', example: 'semester_2' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Updated course',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 201 },
        message: { type: 'string', example: 'Course updated successfully' },
        data: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'DPW' },
            code: { type: 'string', example: 'S140' },
            teacherId: { type: 'number', example: 1 },
            sks: { type: 'number', example: 4 },
            semester: { type: 'string', example: 'semester_2' },
            createAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
            updateAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
          },
        },
      },
    },
  })
  async update(
    @Body('code') code: string,
    @Body('name') name?: string,
    @Body('teacherId') teacherId?: number,
    @Body('sks') sks?: number,
    @Body('semester') semester?: Semester,
  ): Promise<CourseResponse> {
    return this.courseService.update(code, name, teacherId, sks, semester);
  }

  @Delete('/:code')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete course' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'Token for authentication',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiParam({
    name: 'code',
    description: 'Course code',
    required: true,
    example: 'S140',
  })
  @ApiResponse({
    status: 200,
    description: 'Course deleted successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Course deleted successfully' },
        data: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'PAW' },
            code: { type: 'string', example: 'S140' },
            teacherId: { type: 'number', example: 1 },
            sks: { type: 'number', example: 4 },
            semester: { type: 'string', example: 'semester_2' },
            createAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
            updateAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
          },
        },
      },
    },
  })
  async delete(@Param('code') code: string): Promise<CourseResponse> {
    return await this.courseService.delete(code);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all courses' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'Token for authentication',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all courses',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Success get courses' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'PAW' },
              code: { type: 'string', example: 'S140' },
              teacherId: { type: 'number', example: 1 },
              sks: { type: 'number', example: 4 },
              semester: { type: 'string', example: 'semester_2' },
              createAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
              updateAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
            },
          },
        },
      },
    },
  })
  async getCourses(): Promise<CourseResponse> {
    return await this.courseService.getCourses();
  }

  @Get('/:code')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get course by code' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'Token for authentication',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiParam({
    name: 'code',
    description: 'Course code',
    required: true,
    example: 'S140',
  })
  @ApiResponse({
    status: 200,
    description: 'Get course by code',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Success get course' },
        data: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'PAW' },
            code: { type: 'string', example: 'S140' },
            teacherId: { type: 'number', example: 1 },
            sks: { type: 'number', example: 4 },
            semester: { type: 'string', example: 'semester_2' },
            createAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
            updateAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
          },
        },
      },
    },
  })
  async getCourse(@Param('code') code: string): Promise<CourseResponse> {
    return await this.courseService.getCourse(code);
  }

  @Get('/search')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get course by name' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'Token for authentication',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiQuery({
    name: 'name',
    description: 'Course name',
    required: true,
    example: 'PAW',
  })
  @ApiResponse({
    status: 200,
    description: 'Get course by name',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Success get course' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'PAW' },
              code: { type: 'string', example: 'S140' },
              teacherId: { type: 'number', example: 1 },
              sks: { type: 'number', example: 4 },
              semester: { type: 'string', example: 'semester_2' },
              createAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
              updateAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
            },
          }
        },
      },
    },
  })
  async getCourseByName(@Query('name') name: string): Promise<CourseResponse> {
    return await this.courseService.getCourseByName(name);
  }
}
