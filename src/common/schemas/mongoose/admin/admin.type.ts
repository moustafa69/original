import { IsEnum } from 'class-validator';
import { Model } from 'mongoose';
import { Actor, IActorInstanceMethods } from '../base/actor/actor.type';
import { AdminStatus } from './admin.enum';

export class Admin extends Actor<Admin> {
  @IsEnum(AdminStatus)
  status?: AdminStatus;
}

export interface IAdminInstanceMethods extends IActorInstanceMethods {}
export interface IAdminModel
  extends Model<Admin, Record<string, unknown>, IAdminInstanceMethods> {}
