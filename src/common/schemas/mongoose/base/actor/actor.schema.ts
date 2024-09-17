import { Connection, HydratedDocument, Schema } from 'mongoose';
import { Actor, IActorInstanceMethods, IActorModel } from './actor.type';
import { BaseSchema } from '..';
import { validateSchema } from 'src/common/helpers/mongoose-schema-validation.helper';
import * as bcrypt from 'bcrypt';

export const ActorSchema = new Schema<
  Actor,
  IActorModel,
  IActorInstanceMethods
>(
  {
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
    nationalId: {
      type: String,
      required: true,
    },

    lang: {
      type: String,
      default: 'en',
    },

    ...BaseSchema,
  },
  { timestamps: true },
);

export function ActorSchemaFactory(connection: Connection) {
  ActorSchema.pre('validate', async function () {
    await validateSchema(this, Actor);
  });

  ActorSchema.pre('save', async function () {
    if (!this.isModified('password')) {
      return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  ActorSchema.methods.comparePassword = async function comparePassword(
    this: HydratedDocument<Actor>,
    password: string,
  ) {
    return bcrypt.compare(password, this.password);
  };

  ActorSchema.methods.deleteDoc = async function (
    this: HydratedDocument<Actor>,
  ) {
    await this.deleteOne();
  };
}
