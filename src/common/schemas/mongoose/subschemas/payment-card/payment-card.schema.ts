import { Schema } from "mongoose";
import { PaymentCard } from "./payment-card.type";

export const PaymentCardSchema = new Schema<PaymentCard>(
    {
        cardNumber: { type: String, required: true },

        cardholderName: { type: String, required: true },

        expiryDate: { type: Date, required: false },

        cvv: { type: String, required: true },
    },
    {
        _id: false,
        timestamps: false
    },
  );