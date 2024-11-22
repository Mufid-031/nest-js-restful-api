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
import { TeacherService } from './teacher.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';

interface UserResponse {
  status: number;
  message: string;
  data?: User | User[];
}

@ApiTags('Teacher')
@Controller('/api/teacher')
export class TeacherController {
  constructor(private readonly TeacherService: TeacherService) {}

  @Post('/register')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register Teacher' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        nip: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Success Register Teacher',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 201 },
        message: { type: 'string', example: 'Success Register Teacher' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'XHkQO@example.com' },
            teacher: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                userId: { type: 'number', example: 1 },
                nip: { type: 'string', example: '1234567890' },
                gelar: { type: 'string', example: 'Profesor' },
                keahlian: { type: 'string', example: 'Web Programmer' },
                createdAt: {
                  type: 'string',
                  example: '2022-01-01T00:00:00.000Z',
                },
                updatedAt: {
                  type: 'string',
                  example: '2022-01-01T00:00:00.000Z',
                },
              },
            },
            role: { type: 'string', example: 'TEACHER' },
            createdAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
            updatedAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
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
    @Body('nip') nip: string,
    @Body('gelar') gelar: string,
    @Body('keahlian') keahlian: string
  ): Promise<UserResponse> {
    return await this.TeacherService.register(name, email, password, nip, gelar, keahlian);
  }

  @Post('/login')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login Teacher' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nip: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['nip', 'password'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Success Login Teacher',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Success Login Teacher' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'XHkQO@example.com' },
            teacher: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                userId: { type: 'number', example: 1 },
                nip: { type: 'string', example: '1234567890' },
                createdAt: {
                  type: 'string',
                  example: '2022-01-01T00:00:00.000Z',
                },
                updatedAt: {
                  type: 'string',
                  example: '2022-01-01T00:00:00.000Z',
                },
              },
            },
            role: { type: 'string', example: 'TEACHER' },
            createdAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
            updatedAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
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
    @Body('nip') nip: string,
    @Body('password') password: string,
  ): Promise<UserResponse> {
    return await this.TeacherService.login(nip, password);
  }

  @Patch('/logout')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async logout(@GetUser() user: User): Promise<UserResponse> {
    return await this.TeacherService.logout(user);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get All Teachers' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'API token for authentication',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiResponse({
    status: 200,
    description: 'Success Get All Teachers',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Success Get All Teachers' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'John Doe' },
              email: { type: 'string', example: 'XHkQO@example.com' },
              teacher: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1 },
                  userId: { type: 'number', example: 1 },
                  nip: { type: 'string', example: '1234567890' },
                  createdAt: {
                    type: 'string',
                    example: '2022-01-01T00:00:00.000Z',
                  },
                  updatedAt: {
                    type: 'string',
                    example: '2022-01-01T00:00:00.000Z',
                  },
                },
              },
              role: { type: 'string', example: 'TEACHER' },
              createdAt: {
                type: 'string',
                example: '2022-01-01T00:00:00.000Z',
              },
              updatedAt: {
                type: 'string',
                example: '2022-01-01T00:00:00.000Z',
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
  async getTeachers(): Promise<UserResponse> {
    return await this.TeacherService.getTeachers();
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update Teacher' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'API token for authentication',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'XHkQO@example.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Success Update Teacher',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 201 },
        message: { type: 'string', example: 'Success Update Teacher' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'XHkQO@example.com' },
            teacher: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                userId: { type: 'number', example: 1 },
                nip: { type: 'string', example: '1234567890' },
                createdAt: {
                  type: 'string',
                  example: '2022-01-01T00:00:00.000Z',
                },
                updatedAt: {
                  type: 'string',
                  example: '2022-01-01T00:00:00.000Z',
                },
              },
            },
            role: { type: 'string', example: 'TEACHER' },
            createdAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
            updatedAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
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
    @Body('gelar') gelar?: string,
    @Body('keahlian') keahlian?: string,
  ): Promise<UserResponse> {
    return await this.TeacherService.update(user, name, email, password, gelar, keahlian);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Delete Teacher' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'API token for authentication',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiParam({
    name: 'id',
    description: 'Teacher ID',
    required: true,
    example: '1',
  })
  @ApiResponse({
    status: 201,
    description: 'Success Delete Teacher',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 201 },
        message: { type: 'string', example: 'Success Delete Teacher' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'XHkQO@example.com' },
            teacher: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                userId: { type: 'number', example: 1 },
                nip: { type: 'string', example: '1234567890' },
                createdAt: {
                  type: 'string',
                  example: '2022-01-01T00:00:00.000Z',
                },
                updatedAt: {
                  type: 'string',
                  example: '2022-01-01T00:00:00.000Z',
                },
              },
            },
            role: { type: 'string', example: 'TEACHER' },
            createdAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
            updatedAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
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
    return this.TeacherService.delete(id);
  }

  @Get('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get Teacher' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'API token for authentication',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiParam({
    name: 'id',
    description: 'Teacher ID',
    required: true,
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Success Get Teacher',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Success Get Teacher' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'XHkQO@example.com' },
            teacher: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                userId: { type: 'number', example: 1 },
                nip: { type: 'string', example: '1234567890' },
                createdAt: {
                  type: 'string',
                  example: '2022-01-01T00:00:00.000Z',
                },
                updatedAt: {
                  type: 'string',
                  example: '2022-01-01T00:00:00.000Z',
                },
              },
            },
          },
        },
      },
    },
  })
  async getTeacher(@Param('id') id: number): Promise<UserResponse> {
    return this.TeacherService.getTeacher(id);
  }
}
