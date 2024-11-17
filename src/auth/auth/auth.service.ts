/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { MailService } from 'src/mail/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { v4 as uuid } from 'uuid';

interface User {
  email: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private mailService: MailService,
    private prismaService: PrismaService,
    private errorService: ErrorService,
  ) {}

  async singUp(user: User) {
    const token = Math.floor(1000 + Math.random() * 9000).toString();

    await this.mailService.sendUserConfirmation(user, token);
  }

  async requestPasswordRecovery(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw this.errorService.throwError(404, 'User not found');
    }

    const recoveryToken = uuid();

    await this.prismaService.user.update({
      where: {
        email: email,
      },
      data: {
        recoveryToken: recoveryToken,
      },
    });

    const resetLink = `http://localhost:3000/api/user/${recoveryToken}`;
    await this.mailService.sendRecoveryEmail(email, resetLink);
  }
}
