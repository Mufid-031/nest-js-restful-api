/* eslint-disable prettier/prettier */
import { Body, Controller, Header, HttpCode, Patch, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';

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

    @Patch('/logout')
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    async logout(
        @GetUser() user: User
    ): Promise<UserResponse> {
        return await this.adminService.logout(user);
    }

    @Patch()
    @Header('Content-Type', 'application/json')
    @HttpCode(201)
    async update(
        @GetUser() user: User,
        @Body('name') name?: string,
        @Body('email') email?: string,
        @Body('password') password?: string
    ): Promise<UserResponse> {
        return await this.adminService.update(user, name, email, password);
    }
}
