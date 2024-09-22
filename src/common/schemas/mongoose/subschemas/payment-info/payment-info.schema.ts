import mongoose, { Schema, Document } from 'mongoose';
import { PaymentCardSchema } from '../payment-card/payment-card.schema';
import { PaymentInfo } from './payment-info.type';

export const PaymentInfoSchema = new Schema<PaymentInfo>({
  bankAccountHolderName: {
    type: String,
    required: false,
  },
  bankAccountNumber: {
    type: String,
    required: false,
  },
  paypalEmail: {
    type: String,
    required: false,
  },
  stripeAccountId: {
    type: String,
    required: false,
  },
  paymentCards: {
    type: [PaymentCardSchema], // Reference the PaymentCard schema
    default:[],
    required: false,
  },
},
{
    _id: false,
    timestamps: false
});

