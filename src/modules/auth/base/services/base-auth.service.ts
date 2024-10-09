import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { Redis } from 'ioredis';
import { string } from 'joi';
import { HydratedDocument } from 'mongoose';
import { AppConfig } from 'src/common/config/app-config/app-config.service';
import { Actor } from 'src/common/schemas/mongoose/base';
import { v4 as uuidV4, v5 as uuidV5 } from 'uuid';

@Injectable()
export class BaseAuthService {
  protected readonly redis: Redis;
  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private appConfig: AppConfig,
  ) {
    this.redis = redisService.getClient();
  }

  private async forgotPassword() {}
  private async resetPassword() {}

  private async accessToken(type: string, actor: HydratedDocument<Actor>) {
    const actorId = actor._id;

    const actorSession = await this.createSession(actor);
    switch (type.toLowerCase()) {
      case 'admin':
        var accessToken = this.jwtService.sign(
          {
            _id: actorId,
            actorSession,
          },
          {
            secret: this.appConfig.ADMIN_JWT_SECRET,
            expiresIn: Number(this.appConfig.JWT_EXPIRY) || 1200,
          },
        );

        break;
      case 'user':
        var accessToken = this.jwtService.sign(
          {
            _id: actorId,
            actorSession,
          },
          {
            secret: this.appConfig.USER_JWT_SECRET,
            expiresIn: Number(this.appConfig.JWT_EXPIRY) || 1200,
          },
        );
        break;
      case 'seller':
        var accessToken = this.jwtService.sign(
          {
            _id: actorId,
            actorSession,
          },
          {
            secret: this.appConfig.SELLER_JWT_SECRET,
            expiresIn: Number(this.appConfig.JWT_EXPIRY) || 1200,
          },
        );
        break;
    }
    return { accessToken, sessionId: actorSession };
  }

  private async createSession(actor: HydratedDocument<Actor>) {
    const session = uuidV5(uuidV4(), uuidV4());
    await this.redis.lpush(actor._id?.toString(), session);
    return session;
  }

  private async refreshToken(
    actorSession: string,
    type: string,
    actor: HydratedDocument<Actor>,
  ) {
    const actorId = actor._id;

    switch (type.toLowerCase()) {
      case 'admin':
        var refreshToken = this.jwtService.sign(
          {
            _id: actorId,
            actorSession,
          },
          {
            secret: this.appConfig.ADMIN_JWT_REFRESH_SECRET,
            expiresIn: Number(this.appConfig.JWT_EXPIRY) || 1200,
          },
        );

        break;
      case 'user':
        var refreshToken = this.jwtService.sign(
          {
            _id: actorId,
            actorSession,
          },
          {
            secret: this.appConfig.USER_JWT_REFRESH_SECRET,
            expiresIn: Number(this.appConfig.JWT_EXPIRY) || 1200,
          },
        );
        break;
      case 'seller':
        var refreshToken = this.jwtService.sign(
          {
            _id: actorId,
            actorSession,
          },
          {
            secret: this.appConfig.SELLER_JWT_REFRESH_SECRET,
            expiresIn: Number(this.appConfig.JWT_REFRESH_EXPIRY) || 1200,
          },
        );
        break;
    }
    return refreshToken;
  }

  async generateTokens(type: string, actor: HydratedDocument<Actor>) {
    const { accessToken, sessionId } = await this.accessToken(type, actor);
    const refreshToken = await this.refreshToken(sessionId, type, actor);

    return { accessToken, refreshToken };
  }
}
