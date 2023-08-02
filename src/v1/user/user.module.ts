import { Module } from '@nestjs/common';
import { RegisterController } from './controllers/register.controller';
import { RegisterService } from './services/register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RegisterController],
  providers: [UserService, RegisterService],
  exports: [UserService],
})
export class UserModule {}
