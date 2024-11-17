/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Header, HttpCode, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/sendMail')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sendMail(
    @Body('email') email: string,
    @Res() res: any,
  ): Promise<any> {
    const mail = this.appService.sendMail(email);

    return res.status(200).json({
      message: "Email sent successfully",
      mail,
    });
  }
}
