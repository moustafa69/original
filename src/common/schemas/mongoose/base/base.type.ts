import { IsOptional, IsDate } from 'class-validator';
import { ClientSession } from 'mongoose';
export class BaseModel<T = any> {
  constructor(data: T) {
    Object.assign(this, data);
  }

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  deletedAt?: Date;

  @IsOptional()
  @IsDate()
  suspendedAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

export interface IBaseInstanceMethods {
  deleteDoc(session?: ClientSession): Promise<void>;
  suspendDoc(): Promise<void>;
  unSuspendDoc(): Promise<void>;
}
