import { IsString, Length, Matches, IsOptional, IsDate, IsInt, Min, Max, IsNumberString } from 'class-validator';
import { BaseModel, IBaseInstanceMethods } from '../../base';

export class PaymentCard extends BaseModel<PaymentCard> {
  @IsNumberString()
  @Length(16, 16)
  @Matches(/^\d+$/)
  cardNumber: string;

  @IsString()
  @Length(2, 50)
  cardholderName: string;

  @IsDate()
  expiryDate: Date;

  @IsNumberString()
  @Length(3, 4)
  @Matches(/^\d+$/) 
  cvv: string;
}
