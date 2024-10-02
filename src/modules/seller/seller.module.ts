import { Module } from '@nestjs/common';
import { SellerService } from './services/seller.service';
import { SellerController } from './controllers/seller.controller';
import { SellerMongooseModule } from 'src/common/modules/mongoose/seller';

@Module({
  imports: [SellerMongooseModule],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
