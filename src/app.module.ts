import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './v1/auth/auth.module';
import { UserModule } from './v1/user/user.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
