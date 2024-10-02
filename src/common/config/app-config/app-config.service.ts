import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig {
  constructor(private readonly configService: ConfigService) {}

  NODE_ENV: string = this.configService.get('NODE_ENV');
  MONGO_URI: string = this.configService.get('MONGO_URI');
  PORT: string = this.configService.get('PORT');
}
