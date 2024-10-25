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
import { TeacherService } from './teacher.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';

interface UserResponse {
  status: number;
  message: string;
  data?: User | User[];
}

@Controller('/api/teacher')
export class TeacherController {
  constructor(private readonly TeacherService: TeacherService) {}

  @Post('/register')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('nip') nip: string,
  ): Promise<UserResponse> {
    return await this.TeacherService.register(name, email, password, nip);
  }

  @Post('/login')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
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
  async getTeachers(): Promise<UserResponse> {
    return await this.TeacherService.getTeachers();
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
    return await this.TeacherService.update(user, name, email, password);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async delete(@Param('id') id: number): Promise<UserResponse> {
    return this.TeacherService.delete(id);
  }

  @Get('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getTeacher(@Param('id') id: number): Promise<UserResponse> {
    return this.TeacherService.getTeacher(id);
  }
}
