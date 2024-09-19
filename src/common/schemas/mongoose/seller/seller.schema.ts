import { Connection, HydratedDocument, Schema } from 'mongoose';
import { ISellerInstanceMethods, ISellerModel, Seller } from './seller.type';
import { SellerStatus } from './seller.enum';
import { PaymentInfo } from '../payment-info/payment-Info.type';
import { validateSchema } from 'src/common/helpers/mongoose-schema-validation.helper';
import { ModelNames } from '../../constants/model-names.enum';

export const SellerSchema = new Schema<
  Seller,
  ISellerModel,
  ISellerInstanceMethods
>({
  shop: {
    type: Schema.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: SellerStatus,
    default: SellerStatus.PENDING_ACTIVATION,
  },

  //   paymentInfo: {
  //     type: PaymentInfo,     TO DO: YOUSSEF
  //     required: false,
  //   },
});

export function shopSchemaFactory(connection: Connection) {
  SellerSchema.pre('validate', async function () {
    await validateSchema(this, Seller);
  });

  SellerSchema.methods.deleteDoc = async function (
    this: HydratedDocument<Seller>,
  ) {
    await this.deleteOne();
  };

  const shopMdel = connection.model(ModelNames.SELLER, SellerSchema);
  return shopMdel;
}
