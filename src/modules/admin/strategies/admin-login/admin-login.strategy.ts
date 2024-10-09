import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportSerializer, PassportStrategy } from '@nestjs/passport';
import { HydratedDocument } from 'mongoose';
import { Strategy } from 'passport-local';
import { ModelNames } from 'src/common/schemas/constants/model-names.enum';
import {
  Admin,
  IAdminInstanceMethods,
  IAdminModel,
} from 'src/common/schemas/mongoose/admin/admin.type';
import { BaseAuthService } from 'src/modules/auth/base/services/base-auth.service';
@Injectable()
export class AdminLoginStrategy extends PassportStrategy(
  Strategy,
  'admin-login-email',
) {
  constructor(
    @Inject(ModelNames.ADMIN) private adminModel: IAdminModel,
    private readonly baseAuthService: BaseAuthService,
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }
  async validate(email: string, password: string) {
    const payload = { email, password };

    const admin = await this.adminModel.findOne({ email });
    if (!admin) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Incorrect email or password!',
        error: 'Unauthorized',
      });
    }
    const isPasswordsMatch = await admin.comparePassword(password);

    if (!isPasswordsMatch) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Incorrect email or password!',
        error: 'Unauthorized',
      });
    }
    // return { ...admin, ...(await this.baseAuthService.generateTokens('admin', admin)) };
  }
}
