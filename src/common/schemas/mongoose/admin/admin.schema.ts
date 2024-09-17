import { Schema } from 'mongoose';
import { Admin, IAdminInstanceMethods, IAdminModel } from './admin.type';
import { BaseSchema } from '../base';
import { ActorSchema } from '../base/actor/actor.schema';
import { AdminStatus } from './admin.enum';

export const AdminSchema = new Schema<
  Admin,
  IAdminModel,
  IAdminInstanceMethods
>({
  status: {
    type: String,
    enum: AdminStatus,
    default: AdminStatus.ACTIVE,
  },
  ...ActorSchema,
});
