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
import { AdminService } from './admin.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';

interface UserResponse {
  status: number;
  message: string;
  data: User | User[];
}

enum Role {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

@Controller('/api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/register')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
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
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<UserResponse> {
    return await this.adminService.login(email, password);
  }

  @Patch('/logout')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async logout(@GetUser() user: User): Promise<UserResponse> {
    return await this.adminService.logout(user);
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
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
  async deleteUser(
    @Body('id') id: number,
    @Body('role') role: Role,
  ): Promise<UserResponse> {
    return await this.adminService.deleteUser(id, role);
  }

  @Get('/students')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getStudentByName(@Query('name') name: string): Promise<UserResponse> {
    return await this.adminService.getStudentByName(name);
  }

  @Get('/teachers')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getTeacherByName(@Query('name') name: string): Promise<UserResponse> {
    return await this.adminService.getTeacherByName(name);
  }

  @Get('/students/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getStudent(@Param('id') id: number): Promise<UserResponse> {
    return await this.adminService.getStudent(id);
  }

  @Get('/teachers/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getTeacher(@Param('id') id: number): Promise<UserResponse> {
    return await this.adminService.getTeacher(id);
  }
}
