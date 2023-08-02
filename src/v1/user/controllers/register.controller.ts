import { Controller, Body, Res, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Response } from 'express';
import { RegisterService } from '../services/register.service';
import { User } from '../entities/user.entity';

@Controller({
  path: 'v1/register',
  version: '1',
})
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('/')
  async register(@Body() body: CreateUserDto, @Res() res: Response) {
    const registered: User = await this.registerService.register(body);

    return res.json({
      success: true,
      data: registered,
    });
  }
}
