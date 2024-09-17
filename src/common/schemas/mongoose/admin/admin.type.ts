import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { IBaseInstanceMethods } from '../base';
import { Mode } from 'fs';
import { Model } from 'mongoose';
import { Actor } from '../base/actor/actor.type';
import { AdminStatus } from './admin.enum';

export class Admin extends Actor {
  @IsEnum(AdminStatus)
  status?: AdminStatus;
}

export interface IAdminInstanceMethods extends IBaseInstanceMethods {
  comparePassword(password: string): Promise<Boolean>;
}

export interface IAdminModel
  extends Model<Admin, Record<string, unknown>, IAdminInstanceMethods> {}
