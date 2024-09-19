import { Connection, HydratedDocument, Schema } from 'mongoose';
import { Admin, IAdminInstanceMethods, IAdminModel } from './admin.type';
import { BaseSchema } from '../base';
import { ActorSchema } from '../base/actor/actor.schema';
import { AdminStatus } from './admin.enum';
import { validateSchema } from 'src/common/helpers/mongoose-schema-validation.helper';
import { ModelNames } from '../../constants/model-names.enum';
import * as bcrypt from 'bcrypt';

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

export function adminSchemaFactory(connection: Connection) {
  AdminSchema.pre('validate', async function () {
    await validateSchema(this, Admin);
  });

  AdminSchema.pre('save', async function () {
    if (!this.isModified('password')) {
      return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  AdminSchema.methods.comparePassword = async function (
    this: HydratedDocument<Admin>,
    password: string,
  ) {
    return bcrypt.compare(password, this.password);
  };

  AdminSchema.methods.deleteDoc = async function (this: HydratedDocument<Admin>) {
    await this.deleteOne();
  };

  const adminModel = connection.model(ModelNames.ADMIN, AdminSchema);

  return adminModel;
}
