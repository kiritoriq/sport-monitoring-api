import { DynamicModule, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { EnvService } from '../../env.service';
import { JwtModule } from '@nestjs/jwt';

function JwtModuleRegister(): DynamicModule {
  const config = new EnvService().read();

  return JwtModule.register({
    global: true,
    secret: config.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  });
}

@Module({
  imports: [UserModule, JwtModuleRegister()],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
