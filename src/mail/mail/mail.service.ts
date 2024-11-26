/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface User {
  email: string;
  name: string;
}

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  constructor(private mailService: MailerService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      service: 'gmail',
      port: 587,
      auth: {
        user: 'amelie49@ethereal.email?recoveryToken={}',
        pass: '3AFdbK1y6zgVKtUK9v',
      },
    });
  }

  async sendUserConfirmation(user: User, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Confirm your email',
      template: '../templates/confirmation',
      context: {
        name: user.name,
        url,
      },
    });
  }

  async sendRecoveryEmail(email: string, resetLink: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'risqimufid50@gmail.com',
      to: email,
      subject: 'Reset Password',
      html: `<p>Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    });
  }
}
