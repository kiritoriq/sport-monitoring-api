import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller({
  path: 'profile',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}
}
