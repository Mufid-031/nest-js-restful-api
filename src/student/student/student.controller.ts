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
import { StudentService } from './student.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';

interface UserResponse {
  status: number;
  message: string;
  data?: User | User[];
}

@Controller('/api/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('/register')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('nim') nim: string,
  ): Promise<UserResponse> {
    return await this.studentService.register(name, email, password, nim);
  }

  @Post('/login')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async login(
    @Body('nim') nim: string,
    @Body('password') password: string,
  ): Promise<UserResponse> {
    return await this.studentService.login(nim, password);
  }

  @Patch('/logout')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async logout(@GetUser() user: User): Promise<UserResponse> {
    return await this.studentService.logout(user);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getStudents(): Promise<UserResponse> {
    return await this.studentService.getStudents();
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
    return await this.studentService.update(user, name, email, password);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
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
