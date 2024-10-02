import { Module } from '@nestjs/common';
import { AdminMongooseModule } from 'src/common/modules/mongoose/admin';
import { AdminController } from './controller/admin.controller';
import { AdminService } from './service/admin.service';
@Module({
  imports: [AdminMongooseModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [],
})
export class AdminModule {}
