import { Connection, HydratedDocument, Schema } from 'mongoose';
import { IReviewInstanceMethods, IReviewModel, Review } from './review.type';
import { BaseSchema } from '../base';
import { validateSchema } from 'src/common/helpers/mongoose-schema-validation.helper';
import { ModelNames } from '../../constants/model-names.enum';

export const ReviewSchema = new Schema<
  Review,
  IReviewModel,
  IReviewInstanceMethods
>(
  {
    shop: {
      type: Schema.ObjectId,
      required: true,
    },
    customer: {
      type: Schema.ObjectId,
      required: true,
    },
    comment: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      default: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    ...BaseSchema,
  },
  {
    timestamps: true,
  },
);

export function reviewSchemaFactory(connection: Connection) {
  ReviewSchema.pre('validate', async function () {
    validateSchema(this, Review);
  });

  ReviewSchema.methods.deleteDoc = async function (
    this: HydratedDocument<Review>,
  ) {
    this.deleteOne();
  };

  const reviewModel = connection.model(ModelNames.REVIEW, ReviewSchema);
  return reviewModel;
}
