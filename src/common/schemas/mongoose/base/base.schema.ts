import { Connection, SchemaDefinition, SchemaDefinitionType } from 'mongoose';
import { BaseModel } from './base.type';

export const BaseSchema: SchemaDefinition<SchemaDefinitionType<BaseModel>> = {
  deletedAt: {
    type: Date,
    default: null,
  },

  suspendedAt: {
    type: Date,
    default: null,
  },

  //   isDeleted: {
  //     type: Boolean,
  //     default: false,
  //   },

  //   isSuspended: {
  //     type: Boolean,
  //     default: false,
  //   },
};
