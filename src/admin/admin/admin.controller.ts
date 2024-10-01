/* eslint-disable prettier/prettier */
import { Body, Controller, Header, HttpCode, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { User } from '@prisma/client';

interface UserResponse {
    status: number;
    message: string;
    data: User;
}

@Controller('/api/admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService
    ) {}

    @Post('/register')
    @Header('Content-Type', 'application/json')
    @HttpCode(201)
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string
    ): Promise<UserResponse> {
        return await this.adminService.register(name, email, password);
    }

    @Post('/login')
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    async login(
        @Body('email') email: string,
        @Body('password') password: string
    ): Promise<UserResponse> {
        return await this.adminService.login(email, password);
    }
}
