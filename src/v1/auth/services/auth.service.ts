import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { LoginResponseDto } from '../dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(credential: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findOne({
      username: credential.username,
    });

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(credential.password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const accessToken = await this.createToken(user.id);

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.phone,
      accessToken: accessToken,
    };
  }

  async createToken(userId: number): Promise<string> {
    return await this.jwtService.signAsync({ id: userId });
  }
}
