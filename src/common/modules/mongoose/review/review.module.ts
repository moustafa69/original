import { reviewSchemaFactory } from 'src/common/schemas/mongoose/review/review.schema';
import { FactoryProvider, Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/schemas/constants/model-names.enum';

const ReviewMongooseDynamicModule: FactoryProvider = {
  provide: ModelNames.REVIEW,
  inject: [getConnectionToken()],
  useFactory: reviewSchemaFactory,
};

const reviewProviders = [ReviewMongooseDynamicModule];

@Module({
  imports: [],
  providers: reviewProviders,
  exports: reviewProviders,
})
export class ReviewMongooseModule {}
