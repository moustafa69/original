import { IsOptional, IsString } from 'class-validator';
import { Model } from 'mongoose';
import { IBaseInstanceMethods } from '../base';

export class PaymentInfo {
  @IsString()
  bankAccountHolderName?: string;
  s;
  @IsString()
  bankAccountNumber?: string;

  @IsString()
  @IsOptional()
  paypalEmail?: string;

  @IsString()
  @IsOptional()
  stripeAccountId?: string;

  @IsString()
  @IsOptional()
  cardNumber?: string;
}
export interface IPaymentInfoInstanceMethods extends IBaseInstanceMethods {}
export interface IPaymentInfoModel
  extends Model<
    PaymentInfo,
    Record<string, unknown>,
    IPaymentInfoInstanceMethods
  > {}
