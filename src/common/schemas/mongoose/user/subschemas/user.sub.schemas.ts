import { Schema } from 'mongoose';
import {
  Address,
  Cart,
  CartItem,
  Order,
  OrderItem,
  OrderStatus,
} from './user.sub.types';

export const AddressSchema = new Schema<Address>(
  {
    street: { type: String, required: true },
    apartmentOrSuite: { type: String, required: false },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  {
    _id: false,
    timestamps: false,
  },
);

export const OrderItemSchema = new Schema<OrderItem>(
  {
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    _id: false,
    timestamps: false,
  },
);

export const OrderSchema = new Schema<Order>(
  {
    userId: { type: String, required: true },
    items: { type: [OrderItemSchema], required: true },
    shippingAddress: { type: AddressSchema, required: true },
    status: {
      type: String,
      enum: OrderStatus,
      default: OrderStatus.PENDING,
    },
    totalAmount: { type: Number, required: true },
  },
  {
    _id: false,
    timestamps: false,
  },
);

export const CartItemSchema = new Schema<CartItem>(
  {
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    _id: false,
    timestamps: false,
  },
);

export const CartSchema = new Schema<Cart>(
  {
    items: { type: [CartItemSchema], required: true },
    totalAmount: { type: Number, required: true },
  },
  {
    _id: false,
    timestamps: false,
  },
);
