import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigModule } from './common/config/config.module';
import { configSchema } from './common/schemas/joi/config.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig } from './common/config/app-config/app-config.service';
import { Connection } from 'mongoose';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { SellerModule } from './modules/seller/seller.module';
import { ShopModule } from './shop/shop.module';
@Module({
  imports: [
    SellerModule,
    AdminModule,
    UserModule,
    EnvConfigModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configSchema(),
    }),
    MongooseModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [AppConfig],
      useFactory: async (appConfig: AppConfig) => {
        return {
          uri: appConfig.MONGO_URI,
          writeConcern: { w: 'majority' },
          connectionFactory: (connection: Connection) => {
            return connection;
          },
        };
      },
    }),
    ShopModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
