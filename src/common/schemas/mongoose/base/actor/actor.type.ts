import { extname } from 'path';
import { BaseModel, IBaseInstanceMethods } from '../base.type';
import { Model } from 'mongoose';
import { IsEmail, IsOptional, IsString } from 'class-validator';
export class Actor extends BaseModel {
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

  //   @IsOptional()
  //   @IsBoolean()
  //   isDeleted;               LATER

  //   @IsOptional()
  //   @IsBoolean()
  //   isSuspended;
}
export interface IActorInstanceMethods extends IBaseInstanceMethods {
  comparePassword(password: string): Promise<Boolean>;
}
export interface IActorModel
  extends Model<Actor, Record<string, unknown>, IActorInstanceMethods> {}
