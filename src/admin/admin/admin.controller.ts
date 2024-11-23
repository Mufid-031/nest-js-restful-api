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
import { AdminService } from './admin.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';
import { UserResponse, Role } from 'src/types/user.type';

@ApiTags('Admin')
@Controller('/api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/register')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'pKQ9T@example.com' },
        password: { type: 'string', example: 'password123' },
      },
      required: ['name', 'email', 'password'],
    },
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 201 },
        message: { type: 'string', example: 'Admin created successfully' },
        data: {
          type: 'object',
          example: {
            id: 1,
            name: 'John Doe',
            email: 'pKQ9T@example.com',
            role: 'ADMIN',
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
            token: null,
            recoveryToken: null,
          },
        },
      },
    },
  })
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<UserResponse> {
    return await this.adminService.register(name, email, password);
  }

  @Post('/login')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'pKQ9T@example.com' },
        password: { type: 'string', example: 'password123' },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'User logged in successfully' },
        data: {
          type: 'object',
          example: {
            id: 1,
            name: 'John Doe',
            email: 'pKQ9T@example.com',
            role: 'ADMIN',
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
            token: 'token',
            recoveryToken: null,
          },
        },
      },
    },
  })
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<UserResponse> {
    return await this.adminService.login(email, password);
  }

  @Patch('/logout')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Logout a user' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'token for authentication',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'User logged out successfully' },
        data: {
          type: 'object',
          example: {
            id: 1,
            name: 'John Doe',
            email: 'pKQ9T@example.com',
            role: 'ADMIN',
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
            token: null,
            recoveryToken: null,
          },
        },
      },
    },
  })
  async logout(@GetUser() user: User): Promise<UserResponse> {
    return await this.adminService.logout(user);
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update user profile' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John' },
        email: { type: 'string', example: 'pKQ9T@example.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'token for authentication',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 201 },
        message: { type: 'string', example: 'User updated successfully' },
        data: {
          type: 'object',
          example: {
            id: 1,
            name: 'John',
            email: 'pKQ9T@example.com',
            role: 'ADMIN',
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
            token: null,
            recoveryToken: null,
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
    return await this.adminService.update(user, name, email, password);
  }

  @Patch('/user')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update another user by admin' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'token for authentication',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        role: { type: 'string', enum: Object.values(Role) },
        name: { type: 'string', example: 'John' },
        email: { type: 'string', example: 'pKQ9T@example.com' },
        password: { type: 'string', example: 'password123' },
      },
      required: ['id', 'role'],
    },
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 201 },
        message: { type: 'string', example: 'User updated successfully' },
        data: {
          type: 'object',
          example: {
            id: 1,
            name: 'John',
            email: 'pKQ9T@example.com',
            role: 'ADMIN',
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
            token: null,
            recoveryToken: null,
          },
        },
      },
    },
  })
  async updateUser(
    @Body('id') id: number,
    @Body('role') role: Role,
    @Body('name') name?: string,
    @Body('email') email?: string,
    @Body('password') password?: string,
  ): Promise<UserResponse> {
    return await this.adminService.updateUser(id, role, name, email, password);
  }

  @Delete('/user')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Delete a user by admin' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'token for authentication',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        role: { type: 'string', enum: Object.values(Role) },
      },
      required: ['id', 'role'],
    },
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 201 },
        message: { type: 'string', example: 'User deleted successfully' },
        data: {
          type: 'object',
          example: {
            id: 1,
            name: 'John',
            email: 'pKQ9T@example.com',
            role: 'ADMIN',
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
            token: null,
            recoveryToken: null,
          },
        },
      },
    },
  })
  async deleteUser(
    @Body('id') id: number,
    @Body('role') role: Role,
  ): Promise<UserResponse> {
    return await this.adminService.deleteUser(id, role);
  }

  @Get('/students')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get students by name' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'token for authentication',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiQuery({
    name: 'name',
    example: 'John',
    required: false,
    description: 'Name of the student',
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Success get student' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'John' },
              email: { type: 'string', example: 'pKQ9T@example.com' },
              role: { type: 'string', example: 'STUDENT' },
              createdAt: {
                type: 'string',
                example: '2022-01-01T00:00:00.000Z',
              },
              updatedAt: {
                type: 'string',
                example: '2022-01-01T00:00:00.000Z',
              },
              token: { type: 'string', example: null },
              recoveryToken: { type: 'string', example: null },
            },
          },
        },
      },
    },
  })
  async getStudentByName(@Query('name') name: string): Promise<UserResponse> {
    return await this.adminService.getStudentByName(name);
  }

  @Get('/teachers')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get teachers by name' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'token for authentication',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Name of the teacher',
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Success get teacher' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'John' },
              email: { type: 'string', example: 'pKQ9T@example.com' },
              role: { type: 'string', example: 'TEACHER' },
              createdAt: {
                type: 'string',
                example: '2022-01-01T00:00:00.000Z',
              },
              updatedAt: {
                type: 'string',
                example: '2022-01-01T00:00:00.000Z',
              },
              token: { type: 'string', example: null },
              recoveryToken: { type: 'string', example: null },
            },
          },
        },
      },
    },
  })
  async getTeacherByName(@Query('name') name: string): Promise<UserResponse> {
    return await this.adminService.getTeacherByName(name);
  }

  @Get('/students/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get student by ID' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'token for authentication',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiParam({ name: 'id', required: true, description: 'ID of the student' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Success get student' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John' },
            email: { type: 'string', example: 'pKQ9T@example.com' },
            role: { type: 'string', example: 'STUDENT' },
            createdAt: {
              type: 'string',
              example: '2022-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              example: '2022-01-01T00:00:00.000Z',
            },
            token: { type: 'string', example: null },
            recoveryToken: { type: 'string', example: null },
          },
        },
      },
    },
  })
  async getStudent(@Param('id') id: number): Promise<UserResponse> {
    return await this.adminService.getStudent(id);
  }

  @Get('/teachers/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get teacher by ID' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'token for authentication',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiParam({ name: 'id', required: true, description: 'ID of the teacher' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Success get teacher' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John' },
            email: { type: 'string', example: 'pKQ9T@example.com' },
            role: { type: 'string', example: 'TEACHER' },
            createdAt: {
              type: 'string',
              example: '2022-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              example: '2022-01-01T00:00:00.000Z',
            },
            token: { type: 'string', example: null },
            recoveryToken: { type: 'string', example: null },
          },
        },
      },
    },
  })
  async getTeacher(@Param('id') id: number): Promise<UserResponse> {
    return await this.adminService.getTeacher(id);
  }
}
