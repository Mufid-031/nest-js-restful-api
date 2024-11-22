/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

interface UserResponse {
  status: number;
  message: string;
  data?: User | User[];
}

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly mailService: MailerService,
  ) {}

  async recovery(
    user: User,
    recoveryToken: string,
    password: string,
  ): Promise<UserResponse> {
    const userResponse = await this.prismaService.user.findFirst({
      where: {
        recoveryToken: recoveryToken,
      },
    });

    if (!user) {
      throw new ErrorService(404, 'User not found');
    }

    userResponse.password = await this.prismaService.hashPassword(password);

    const userUpdated = await this.prismaService.user.update({
      where: {
        id: userResponse.id,
      },
      data: {
        password: userResponse.password,
        recoveryToken: null,
      },
    });

    return {
      status: 201,
      message: 'Recovery success',
      data: userUpdated,
    };
  }

  sendMail(email: string): void {
    const message =
      "Forget your password? if you didn't forget your password please ignore this email!";

    this.mailService.sendMail({
      from: "risqimufid50@gmail.com",
      to: email,
      subject: "Forget Password",
      text: message,
    });
  }
}
