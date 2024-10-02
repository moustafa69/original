import { FactoryProvider, Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/schemas/constants/model-names.enum';
import { adminSchemaFactory } from 'src/common/schemas/mongoose/admin/admin.schema';

const ShopMongooseDynamicModule: FactoryProvider = {
  provide: ModelNames.SHOP,
  inject: [getConnectionToken()],
  useFactory: adminSchemaFactory,
};

const shopProviders = [ShopMongooseDynamicModule];

@Module({
  imports: [],
  providers: shopProviders,
  exports: shopProviders,
})
export class ShopMongooseModule {}
