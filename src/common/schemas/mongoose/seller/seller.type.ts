import { IsEnum, IsInstance, IsNumber, IsOptional } from 'class-validator';
import { Actor, IBaseInstanceMethods } from '../base';
import { SellerStatus } from './seller.enum';
import { Model, Types } from 'mongoose';
import { PaymentInfo } from '../payment-info/payment-Info.type';

export class Seller extends Actor {
  @IsInstance(Types.ObjectId)
  shop: Types.ObjectId;

  @IsEnum(SellerStatus)
  status?: SellerStatus;

  @IsOptional()
  paymentInfo: PaymentInfo;
}

export interface ISellerInstanceMethods extends IBaseInstanceMethods {}
export interface ISellerModel
  extends Model<Seller, Record<string, unknown>, ISellerInstanceMethods> {}
