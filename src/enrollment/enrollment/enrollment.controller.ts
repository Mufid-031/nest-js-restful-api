/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentResponse } from 'src/types/enrollment.type';


@ApiTags('Enrollment')
@Controller('/api/enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post('/register')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register course for student' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'token',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        studentId: { type: 'number', example: 1 },
        scheduleId: { type: 'number', example: 1 },
      },
      required: ['studentId', 'scheduleId'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Success register course',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 201 },
        message: { type: 'string', example: 'Success register course' },
        data: {
          type: 'object',
          properties: {
            studentId: { type: 'number', example: 1 },
            scheduleId: { type: 'number', example: 1 },
            grade: { type: 'number', example: 0 },
            schedule: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                day: { type: 'string', example: 'Monday' },
                time: { type: 'string', example: '08:00' },
                courseId: { type: 'number', example: 1 },
                course: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 1 },
                    name: { type: 'string', example: 'Math' },
                    code: { type: 'string', example: 'MATH101' },
                    teacherId: { type: 'number', example: 1 },
                    semester: { type: 'string', example: 'SEMESTER_1' },
                    sks: { type: 'number', example: 3 },
                    programStudi: { type: 'string', example: 'Teknik Informatika' },
                    createdAt: { type: 'string', example: '2020-01-01T00:00:00.000Z' },
                    updatedAt: { type: 'string', example: '2020-01-01T00:00:00.000Z' },
                  },
                },
                createdAt: { type: 'string', example: '2020-01-01T00:00:00.000Z' },
                updatedAt: { type: 'string', example: '2020-01-01T00:00:00.000Z' },
              },
            },
            createdAt: { type: 'string', example: '2020-01-01T00:00:00.000Z' },
            updatedAt: { type: 'string', example: '2020-01-01T00:00:00.000Z' },
          },
        },
      },
    },
  })
  async register(
    @Body('studentId') studentId: number,
    @Body('scheduleId') scheduleId: number,
  ): Promise<EnrollmentResponse> {
    return this.enrollmentService.register(studentId, scheduleId);
  }

  @Post('/registerMany')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register many course for student' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'token',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        studentId: { type: 'number' },
        coursesId: {
          type: 'array',
          items: { type: 'number', example: 1 },
        },
      },
      required: ['studentId', 'coursesId'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Success register course',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 201 },
        message: { type: 'string', example: 'Success register course' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              studentId: { type: 'number', example: 1 },
              scheduleId: { type: 'number', example: 1 },
              grade: { type: 'number', example: 0 },
              createdAt: {
                type: 'string',
                example: '2020-01-01T00:00:00.000Z',
              },
              updatedAt: {
                type: 'string',
                example: '2020-01-01T00:00:00.000Z',
              },
            },
          },
        },
      },
    },
  })
  async registerMany(
    @Body('studentId') studentId: number,
    @Body('coursesId') coursesId: number[],
  ): Promise<EnrollmentResponse> {
    return this.enrollmentService.registerMany(studentId, coursesId);
  }

  @Delete('/:scheduleId')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Delete course for student' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'token',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiParam({
    name: 'scheduleId',
    type: 'number',
    description: 'Course ID to delete',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Success delete course',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 201 },
        message: { type: 'string', example: 'Success delete course' },
      },
    },
  })
  async delete(
    @Body('studentId') studentId: number,
    @Param('scheduleId') scheduleId: number,
  ): Promise<EnrollmentResponse> {
    return this.enrollmentService.delete(studentId, scheduleId);
  }

  @Delete()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Delete many course for student' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'token',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        studentId: { type: 'number' },
        coursesId: {
          type: 'array',
          items: { type: 'number', example: 1 },
        },
      },
      required: ['studentId', 'coursesId'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Success delete course',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 201 },
        message: { type: 'string', example: 'Success delete course' },
      },
    },
  })
  async deleteMany(
    @Body('studentId') studentId: number,
    @Body('coursesId') scheduleId: number[],
  ): Promise<EnrollmentResponse> {
    return this.enrollmentService.deleteMany(studentId, scheduleId);
  }

  @Get('/:studentId')
  @Header('content-type', 'application/json')
  @HttpCode(200)
  async getEnrollments(
    @Param('studentId') studentId: number
  ): Promise<EnrollmentResponse> {
    return this.enrollmentService.getEnrollments(studentId);
  }
}
