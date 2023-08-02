import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { EmailAlreadyTakenException } from '../exceptions/email-already-taken.exception';
import { PhoneNumberAlreadyTakenException } from '../exceptions/phone-number-already-taken.exception';

@Injectable()
export class RegisterService {
  constructor(private userService: UserService) {}

  async register(user: CreateUserDto): Promise<User> {
    const { email, phone } = user;

    const existingUser = await this.userService.find({
      $or: [{ email }, { phone }],
    });

    if (existingUser.length > 0) {
      if (existingUser.some((u) => u.email === email)) {
        throw new EmailAlreadyTakenException();
      } else {
        throw new PhoneNumberAlreadyTakenException();
      }
    }

    const userFormatted = {
      email: user.email,
      name: user.name,
      username: user.username,
      password: await bcrypt.hash(user.password, 12),
      phone: user.phone,
      address: user.address,
      is_active: 1,
    };

    return this.userService.store(userFormatted);
  }
}
