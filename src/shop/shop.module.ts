import { Module } from '@nestjs/common';
import { ShopController } from './controllers/shop.controller';
import { ShopService } from './services/shop.service';
import { ShopMongooseModule } from 'src/common/modules/mongoose/shop';

@Module({
  imports: [ShopMongooseModule],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
