/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async singUp(@Body('name') name: string, @Body('email') email: string) {
    return this.authService.singUp({ email, name });
  }

  @Post('/recovery')
  async requestPasswordRecovery(@Body('email') email: string) {
    return this.authService.requestPasswordRecovery(email);
  }
}
