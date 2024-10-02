import { extname } from 'path';
import { BaseModel, IBaseInstanceMethods } from '../base.type';
import { Model } from 'mongoose';
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';
export class Actor<T = any> {
  constructor(data: T) {
    Object.assign(this, data);
  }

  @IsString()
  @IsEmail()
  email;

  @IsString()
  password;

  @IsString()
  phoneNumber;

  @IsString()
  firstName;

  @IsString()
  lastName;

  @IsString()
  nationalId;

  @IsOptional()
  @IsString()
  lang?: string;

  @IsOptional()
  @IsDate()
  deletedAt?: Date;

  @IsOptional()
  @IsDate()
  suspendedAt?: Date;
}
export interface IActorInstanceMethods extends IBaseInstanceMethods {
  comparePassword(password: string): Promise<Boolean>;
}
export interface IActorModel
  extends Model<Actor, Record<string, unknown>, IActorInstanceMethods> {}
