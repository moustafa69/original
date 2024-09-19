import {
  IsArray,
  IsEnum,
  IsInstance,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Model, Types } from 'mongoose';
import { ShopStatus } from './shop-status-enum';
import { Review } from '../review/review.type';
import { IBaseInstanceMethods } from '../base';

export class Shop {
  @IsInstance(Types.ObjectId)
  seller: Types.ObjectId;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  phone: string;

  @IsString()
  commercialRegisterNumber: string;

  @IsString()
  taxRegisterNumber: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  logo?: string;

  @IsEnum(ShopStatus)
  @IsOptional()
  status?: ShopStatus;

  @IsArray()
  @IsInstance(Types.ObjectId, { each: true })
  products: [Types.ObjectId];

  @IsNumber()
  averageRating: number;

  @IsArray()
  latestReviews: [Review];
}

export interface IShopInstanceMethods extends IBaseInstanceMethods {}
export interface IShopModel
  extends Model<Shop, Record<string, unknown>, IShopInstanceMethods> {}
