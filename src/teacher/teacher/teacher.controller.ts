/* eslint-disable prettier/prettier */
import { Body, Controller, Header, HttpCode, Post } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { User } from '@prisma/client';

interface UserResponse {
    status: number;
    message: string;
    data: User;    
};

@Controller('/api/teacher')
export class TeacherController {
    constructor(
        private readonly TeacherService: TeacherService
    ) {}

    @Post('/register')
    @Header('Content-Type', 'application/json')
    @HttpCode(201)
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('nip') nip: string
    ): Promise<UserResponse> {
        return await this.TeacherService.register(name, email, password, nip);
    }

    @Post('/login')
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    async login(
        @Body('nip') nip: string,
        @Body('password') password: string
    ): Promise<UserResponse> {
        return await this.TeacherService.login(nip, password);
    }
}
