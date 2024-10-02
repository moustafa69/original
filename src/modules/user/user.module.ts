import { Module } from '@nestjs/common';
import { UserMongooseModule } from 'src/common/modules/mongoose/user';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
@Module({
  imports: [UserMongooseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
