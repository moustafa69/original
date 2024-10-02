import { sellerSchemaFactory } from 'src/common/schemas/mongoose/seller/seller.schema';
import { FactoryProvider, Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/schemas/constants/model-names.enum';

const SellerMongooseDynamicModule: FactoryProvider = {
  provide: ModelNames.SELLER,
  inject: [getConnectionToken()],
  useFactory: sellerSchemaFactory,
};

const sellerProviders = [SellerMongooseDynamicModule];

@Module({
  imports: [],
  providers: sellerProviders,
  exports: sellerProviders,
})
export class SellerMongooseModule {}
