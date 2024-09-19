import { Connection, HydratedDocument, Schema } from 'mongoose';
import { AddressSchema } from './subschemas/user.sub.schemas';
import { OrderSchema } from './subschemas/user.sub.schemas';
import { CartSchema } from './subschemas/user.sub.schemas';
import { PaymentInfoSchema } from '../subschemas/payment-info/payment-info.schema';
import { IUserInstanceMethods, IUserModel, User } from './user.type';
import { ActorSchema } from '../base';
import { validateSchema } from 'src/common/helpers/mongoose-schema-validation.helper';
import * as bcrypt from 'bcrypt';
import { ModelNames } from '../../constants/model-names.enum';

export const UserSchema = new Schema<User, IUserModel, IUserInstanceMethods>(
  {
    socketId: { type: String, required: true }, // Socket ID for real-time connections

    walletBalance: { type: Number, required: false }, // Optional wallet balance

    cart: {
      type: CartSchema, // Cart schema reference
      required: false,
    },

    orderHistory: {
      type: [OrderSchema], // Array of order history
      required: false,
    },

    deliveryAddresses: {
      type: [AddressSchema], // Array of delivery addresses
      required: false,
    },

    paymentMethods: {
      type: PaymentInfoSchema, // Payment methods schema
      required: false,
    },

    ...ActorSchema,
  },
  {
    timestamps: true, // Optional, for tracking creation and modification times, remove dont remove b3den b2a
  },
);

export function userSchemaFactory(connection: Connection) {
  UserSchema.pre('validate', async function () {
    await validateSchema(this, User);
  });

  UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
      return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  UserSchema.methods.comparePassword = async function (
    this: HydratedDocument<User>,
    password: string,
  ) {
    return bcrypt.compare(password, this.password);
  };

  UserSchema.methods.deleteDoc = async function (this: HydratedDocument<User>) {
    await this.deleteOne();
  };

  const userModel = connection.model(ModelNames.USER, UserSchema);

  return userModel;
}
