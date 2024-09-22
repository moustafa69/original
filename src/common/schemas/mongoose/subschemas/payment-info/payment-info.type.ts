import { IsString, IsOptional, ValidateNested } from "class-validator";
import { PaymentCard } from "../payment-card/payment-card.type";
import { Type } from "class-transformer";

export class PaymentInfo { 
    
    @IsOptional()
    @IsString()
    bankAccountHolderName?: string;

    @IsOptional()
    @IsString()
    bankAccountNumber?: string;

    @IsOptional()
    @IsString()
    paypalEmail?: string;

    @IsOptional()
    @IsString()
    stripeAccountId?: string; 
    
    @IsOptional()
    @IsString()
    @ValidateNested({ each: true })
    @Type(() => PaymentCard)
    paymentCards?: PaymentCard[]; }
    