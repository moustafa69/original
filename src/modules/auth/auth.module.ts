import { Module } from '@nestjs/common';
import { BaseAuthService } from './base/services/base-auth.service';

@Module({
  controllers: [],
  providers: [BaseAuthService],
})
export class AuthModule {}
