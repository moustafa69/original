import { Type } from 'class-transformer';
import {
  IsDate,
  IsInstance,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Model, Types } from 'mongoose';
import { IBaseInstanceMethods } from '../base';

export class Review {
  @IsInstance(Types.ObjectId)
  shop: Types.ObjectId;

  @IsInstance(Types.ObjectId)
  customer: Types.ObjectId;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsDate()
  createdAt: Date;
}

export interface IReviewInstanceMethods extends IBaseInstanceMethods {}
export interface IReviewModel
  extends Model<Review, Record<string, unknown>, IReviewInstanceMethods> {}
