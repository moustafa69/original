import {
  Connection,
  HydratedDocument,
  Schema,
  SchemaDefinition,
  SchemaDefinitionType,
} from 'mongoose';
import { Actor, IActorInstanceMethods, IActorModel } from './actor.type';
import { BaseSchema } from '..';
import { validateSchema } from 'src/common/helpers/mongoose-schema-validation.helper';
import * as bcrypt from 'bcrypt';

export const ActorSchema: SchemaDefinition<SchemaDefinitionType<Actor>> = {
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

  deletedAt: {
    type: Date,
    default: null,
  },

  suspendedAt: {
    type: Date,
    default: null,
  },
};
