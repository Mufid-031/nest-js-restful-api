/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Header, HttpCode, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';

interface UserResponse {
    status: number,
    message: string,
    data?: User | User[]
}

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}


    @Get('/api/user/recovery')
    @Header('Content-Type', 'application/json')
    @HttpCode(201)
    async recovery(
        @GetUser() user: User,
        @Query('recoveryToken') recoveryToken: string,
        @Body('password') password: string
    ): Promise<UserResponse> {
        return await this.userService.recovery(user, recoveryToken, password);       
    }
}
