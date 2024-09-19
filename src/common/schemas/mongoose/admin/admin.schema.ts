import { Connection, HydratedDocument, Schema } from 'mongoose';
import { Admin, IAdminInstanceMethods, IAdminModel } from './admin.type';
import { BaseSchema } from '../base';
import { ActorSchema } from '../base/actor/actor.schema';
import { AdminStatus } from './admin.enum';
import { validateSchema } from 'src/common/helpers/mongoose-schema-validation.helper';
import { ModelNames } from '../../constants/model-names.enum';

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

export function shopSchemaFactory(connection: Connection) {
  AdminSchema.pre('validate', async function () {
    await validateSchema(this, Admin);
  });

  AdminSchema.methods.deleteDoc = async function (
    this: HydratedDocument<Admin>,
  ) {
    await this.deleteOne();
  };

  const shopMdel = connection.model(ModelNames.ADMIN, AdminSchema);
  return shopMdel;
}
