import { Connection, HydratedDocument, Schema } from 'mongoose';
import { ISellerInstanceMethods, ISellerModel, Seller } from './seller.type';
import { SellerStatus } from './seller.enum';
import { validateSchema } from 'src/common/helpers/mongoose-schema-validation.helper';
import { ModelNames } from '../../constants/model-names.enum';

export const SellerSchema = new Schema<Seller, ISellerModel, ISellerInstanceMethods>({
  shop: {
    type: Schema.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: SellerStatus,
    default: SellerStatus.PENDING_ACTIVATION,
  },
});

export function sellerSchemaFactory(connection: Connection) {
  SellerSchema.pre('validate', async function () {
    await validateSchema(this, Seller);
  });

  SellerSchema.methods.deleteDoc = async function (
    this: HydratedDocument<Seller>,
  ) {
    await this.deleteOne();
  };

  const sellerModel = connection.model(ModelNames.SELLER, SellerSchema);
  return sellerModel;
}
