import { Controller, Body, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { LoginDto } from '../dto/login.dto';

@Controller({
  path: '/v1/auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any, @Res() res: Response) {
    const loginData: LoginDto = {
      username: body.username,
      password: body.password,
    };

    const signed = await this.authService.login(loginData);

    return res.json({
      success: true,
      data: signed,
    });
  }
}
