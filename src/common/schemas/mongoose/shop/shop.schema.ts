import { Connection, HydratedDocument, Schema, Types } from 'mongoose';
import { IShopInstanceMethods, IShopModel, Shop } from './shop.type';
import { ModelNames } from '../../constants/model-names.enum';
import { ShopStatus } from './shop-status-enum';
import { Review } from '../review/review.type';
import { BaseSchema } from '../base';
import { validateSchema } from 'src/common/helpers/mongoose-schema-validation.helper';

export const ShopSchema = new Schema<Shop, IShopModel, IShopInstanceMethods>(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: ModelNames.SELLER,
    },
    name: {
      type: String,
      required: true,
    },
    commercialRegisterNumber: {
      type: String,
      required: true,
    },
    taxRegisterNumber: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ShopStatus,
      default: ShopStatus.PENDING_ACTIVATION,
    },
    products: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: ModelNames.PRODUCT,
    },
    logo: {
      type: String,
      required: false,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    latestReviews: {
      type: [Review],
      default: [],
    },
    ...BaseSchema,
  },
  { timestamps: true },
);

export function shopSchemaFactory(connection: Connection) {
  ShopSchema.pre('validate', async function () {
    await validateSchema(this, Shop);
  });

  ShopSchema.methods.deleteDoc = async function (this: HydratedDocument<Shop>) {
    await this.deleteOne();
  };

  const shopMdel = connection.model(ModelNames.SHOP, ShopSchema);
  return shopMdel;
}
