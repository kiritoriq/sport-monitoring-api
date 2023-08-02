import { DynamicModule, Global, Module } from '@nestjs/common';
import { EnvService } from './env.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule } from './env.module';
import { User } from './v1/user/entities/user.entity';

function DatabaseOrmModule(): DynamicModule {
  const config = new EnvService().read();

  return TypeOrmModule.forRoot({
    type: config.DB_CONNECTION,
    host: config.DB_HOST,
    port: config.DB_PORT,
    database: config.DB_DATABASE,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    entities: [User],
    synchronize: false,
  });
}

@Global()
@Module({
  imports: [EnvModule, DatabaseOrmModule()],
})
export class DatabaseModule {}
