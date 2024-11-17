/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) {}

  getHello(): string {
    return 'Hello World!';
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
