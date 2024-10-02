import { adminSchemaFactory } from 'src/common/schemas/mongoose/admin/admin.schema';
import { FactoryProvider, Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/schemas/constants/model-names.enum';

const AdminMongooseDynamicModule: FactoryProvider = {
  provide: ModelNames.ADMIN,
  inject: [getConnectionToken()],
  useFactory: adminSchemaFactory,
};

const adminProviders = [AdminMongooseDynamicModule];

@Module({
  imports: [],
  providers: adminProviders,
  exports: adminProviders,
})
export class AdminMongooseModule {}
