/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Header, HttpCode, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { User } from '@prisma/client';

interface UserResponse {
    status: number;
    message: string;
    data: User | User[];
}

@Controller('/api/student')
export class StudentController {

    constructor(
        private readonly studentService: StudentService
    ) {}

    @Post('/register')
    @Header('Content-Type', 'application/json')
    @HttpCode(201)
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('nim') nim: string
    ): Promise<UserResponse> {
        return await this.studentService.register(name, email, password, nim);
    }

    @Post('/login')
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    async login(
        @Body('nim') nim: string,
        @Body('password') password: string
    ): Promise<UserResponse> {
        return await this.studentService.login(nim, password);
    }

    @Get()
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    async getStudents(): Promise<UserResponse> {
        return await this.studentService.getStudents();
    }
}
