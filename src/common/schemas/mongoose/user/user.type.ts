import {
    IsArray,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
  } from 'class-validator';
  import { Actor, IActorInstanceMethods } from '../base';
  import { Type } from 'class-transformer';
  import { Order, Address, Cart } from './subschemas/user.sub.types';
  import { PaymentInfo } from '../subschemas/payment-info/payment-info.type';
  import { Model } from 'mongoose';
  
  export class User extends Actor<User> {
    
    @IsString()
    socketId: string; // User's socket ID for real-time connections
  
    @IsNumber()
    @IsOptional()
    walletBalance?: number; // User's wallet balance
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Cart)
    cart?: Cart; // Shopping cart items
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Order)
    orderHistory?: Order[]; // List of past orders
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Address)
    deliveryAddresses?: Address[]; // Saved delivery addresses
  
    @IsOptional()
    @ValidateNested()
    @Type(() => PaymentInfo)
    paymentMethods?: PaymentInfo; // Saved payment methods (credit cards, etc.)
  
  }

  export interface IUserInstanceMethods extends IActorInstanceMethods {}
  export interface IUserModel extends Model<User, Record<string, unknown>, IUserInstanceMethods> {}
  