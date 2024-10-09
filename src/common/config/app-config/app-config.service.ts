import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { string } from 'joi';

@Injectable()
export class AppConfig {
  constructor(private readonly configService: ConfigService) {}

  NODE_ENV: string = this.configService.get('NODE_ENV');
  MONGO_URI: string = this.configService.get('MONGO_URI');
  PORT: string = this.configService.get('PORT');
  ADMIN_JWT_SECRET: string = this.configService.get('ADMIN_JWT_SECRET');
  ADMIN_JWT_REFRESH_SECRET: string = this.configService.get(
    'ADMIN_JWT_REFRESH_SECRET',
  );
  USER_JWT_SECRET: string = this.configService.get('USER_JWT_SECRET');
  USER_JWT_REFRESH_SECRET: string = this.configService.get(
    'USER_JWT_REFRESH_SECRET',
  );
  SELLER_JWT_SECRET: string = this.configService.get('SELLER_JWT_SECRET');
  SELLER_JWT_REFRESH_SECRET: string = this.configService.get(
    'SELLER_JWT_REFRESH_SECRET',
  );
  JWT_EXPIRY: number = this.configService.get(' JWT_EXPIRY');
  JWT_REFRESH_EXPIRY: string = this.configService.get('JWT_REFRESH_EXPIRY');

  REDIS_HOST: string = this.configService.get('REDIS_HOST');
  REDIS_PORT: number = this.configService.get('REDIS_PORT');
}
