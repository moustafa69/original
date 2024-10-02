import { FactoryProvider, Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/schemas/constants/model-names.enum';
import { userSchemaFactory } from 'src/common/schemas/mongoose/user/user.schema';

const UserMongooseDynamicModule: FactoryProvider = {
  provide: ModelNames.USER,
  inject: [getConnectionToken()],
  useFactory: userSchemaFactory,
};

const userProviders = [UserMongooseDynamicModule];

@Module({
  imports: [],
  providers: userProviders,
  exports: userProviders,
})
export class UserMongooseModule {}
