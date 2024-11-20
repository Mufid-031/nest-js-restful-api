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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { StudentService } from './student.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';

interface UserResponse {
  status: number;
  message: string;
  data?: User | User[];
}

@ApiTags('Student')
@Controller('/api/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('/register')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register student' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        nim: { type: 'string' },
      },
      required: ['name', 'email', 'password', 'nim'],
    },
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 201 },
        message: { type: 'string', example: 'success register student' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'YqyZ4@example.com' },
            student: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                userId: { type: 'number', example: 1 },
                nim: { type: 'string', example: '123456789' },
                programStudi: { type: 'string', example: 'Teknik Informatika' },
                createdAt: {
                  type: 'string',
                  example: '2023-01-01T00:00:00.000Z',
                },
                updatedAt: {
                  type: 'string',
                  example: '2023-01-01T00:00:00.000Z',
                },
              },
            },
            createdAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
            updatedAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
            token: { type: 'string', example: null },
            recoveryToken: { type: 'string', example: null },
          },
        },
      },
    },
  })
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('nim') nim: string,
    @Body('programStudi') programStudi: string,
  ): Promise<UserResponse> {
    return await this.studentService.register(name, email, password, nim, programStudi);
  }

  @Post('/login')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login student' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nim: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['nim', 'password'],
    },
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'success login student' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'YqyZ4@example.com' },
            createAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
            updatedAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
            token: {
              type: 'string',
              example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
            },
            recoveryToken: { type: 'string', example: null },
          },
        },
      },
    },
  })
  async login(
    @Body('nim') nim: string,
    @Body('password') password: string,
  ): Promise<UserResponse> {
    return await this.studentService.login(nim, password);
  }

  @Patch('/logout')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Logout student' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'X-API-TOKEN',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'success logout student' },
      },
    },
  })
  async logout(@GetUser() user: User): Promise<UserResponse> {
    return await this.studentService.logout(user);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all students' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'X-API-TOKEN',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'success get all students' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'John Doe' },
              email: { type: 'string', example: 'YqyZ4@example.com' },
              student: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1 },
                  userId: { type: 'number', example: 1 },
                  nim: { type: 'string', example: '123456789' },
                  createdAt: {
                    type: 'string',
                    example: '2023-01-01T00:00:00.000Z',
                  },
                  updatedAt: {
                    type: 'string',
                    example: '2023-01-01T00:00:00.000Z',
                  },
                },
              },
              createAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
              updatedAt: {
                type: 'string',
                example: '2023-01-01T00:00:00.000Z',
              },
              token: {
                type: 'string',
                example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
              },
              recoveryToken: { type: 'string', example: null },
            },
          },
        },
      },
    },
  })
  async getStudents(): Promise<UserResponse> {
    return await this.studentService.getStudents();
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update student' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'X-API-TOKEN',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'YqyZ4@example.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 201 },
        message: { type: 'string', example: 'success update student' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'YqyZ4@example.com' },
            student: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                userId: { type: 'number', example: 1 },
                nim: { type: 'string', example: '123456789' },
                createdAt: {
                  type: 'string',
                  example: '2023-01-01T00:00:00.000Z',
                },
                updatedAt: {
                  type: 'string',
                  example: '2023-01-01T00:00:00.000Z',
                },
              },
            },
            createAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
            updatedAt: {
              type: 'string',
              example: '2023-01-01T00:00:00.000Z',
            },
            token: {
              type: 'string',
              example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
            },
            recoveryToken: { type: 'string', example: null },
          },
        },
      },
    },
  })
  async update(
    @GetUser() user: User,
    @Body('name') name?: string,
    @Body('email') email?: string,
    @Body('password') password?: string,
  ): Promise<UserResponse> {
    return await this.studentService.update(user, name, email, password);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Delete student' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'X-API-TOKEN',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 201 },
        message: { type: 'string', example: 'success delete student' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'YqyZ4@example.com' },
            student: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                userId: { type: 'number', example: 1 },
                nim: { type: 'string', example: '123456789' },
                createdAt: {
                  type: 'string',
                  example: '2023-01-01T00:00:00.000Z',
                },
                updatedAt: {
                  type: 'string',
                  example: '2023-01-01T00:00:00.000Z',
                },
              },
            },
            createdAt: {
              type: 'string',
              example: '2023-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              example: '2023-01-01T00:00:00.000Z',
            },
            token: {
              type: 'string',
              example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
            },
            recoveryToken: { type: 'string', example: null },
          },
        },
      },
    },
  })
  async delete(@Param('id') id: number): Promise<UserResponse> {
    return this.studentService.delete(id);
  }

  @Get('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getStudent(@Param('id') id: number): Promise<UserResponse> {
    return this.studentService.getStudent(id);
  }
}
