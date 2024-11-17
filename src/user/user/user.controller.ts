/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';

interface UserResponse {
  status: number;
  message: string;
  data?: User | User[];
}

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/recovery')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async recovery(
    @GetUser() user: User,
    @Query('recoveryToken') recoveryToken: string,
    @Body('password') password: string,
  ): Promise<UserResponse> {
    return await this.userService.recovery(user, recoveryToken, password);
  }

  @Post('/sendMail')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sendMail(
    @Body('email') email: string,
    @Res() res: any,
  ): Promise<any> {
    const mail = this.userService.sendMail(email);

    return res.status(200).json({
      message: "Email sent successfully",
      mail,
    });
  }
}
