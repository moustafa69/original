import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminLoginGuard extends AuthGuard('admin-login-email') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException({
          statusCode: 401,
          message: 'You need to be logged-in to access this resource.',
          error: 'Unauthorized',
          info,
        })
      );
    }
    return user;
  }
}
