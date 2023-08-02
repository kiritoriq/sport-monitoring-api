import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvData {
  APP_ENV: string;

  APP_DEBUG: boolean;

  DB_CONNECTION: 'mysql' | 'mariadb';

  DB_HOST: string;

  DB_PORT?: number;

  DB_DATABASE: string;

  DB_USERNAME: string;

  DB_PASSWORD: string;

  JWT_SECRET: string;
}
export class EnvService {
  private vars: EnvData;

  constructor() {
    const environment = process.env.NODE_ENV || 'development';
    const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));

    data.APP_ENV = environment;
    data.APP_DEBUG = data.APP_DEBUG === 'true' ? true : false;
    data.DB_PORT = parseInt(data.DB_PORT);

    this.vars = data as EnvData;
  }

  read(): EnvData {
    return this.vars;
  }

  isDev(): boolean {
    return this.vars.APP_ENV === 'development';
  }

  isProd(): boolean {
    return this.vars.APP_ENV === 'production';
  }

  setJwtSecret(key: string) {
    const environment = process.env.NODE_ENV || 'development';
    const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));

    data.JWT_SECRET = key;
  }
}
