import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule } from './modules/shop/shop.module';
import { AppsModule } from './modules/apps.module';

@Module({
  imports: [ShopModule, AppsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
