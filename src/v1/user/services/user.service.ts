import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(condition: any): Promise<User> {
    return await this.userRepository.findOneBy(condition);
  }

  async find(condition: any): Promise<User[]> {
    return await this.userRepository.findBy(condition);
  }

  async store(data: CreateUserDto): Promise<User> {
    return await this.userRepository.save(data);
  }
}
