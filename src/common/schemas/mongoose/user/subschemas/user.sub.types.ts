import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  IsPostalCode,
  Length,
  IsArray,
  IsEnum,
  ValidateNested,
} from 'class-validator';

export class Address {
  @IsString()
  @Length(5, 100)
  street: string;

  @IsString()
  @IsOptional()
  @Length(1, 10)
  apartmentOrSuite?: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  @IsPostalCode('any')
  postalCode: string;
}


//Order Subschema and its Stuff//
export enum OrderStatus {
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

export class OrderItem {
  @IsString()
  productId: string; 

  @IsInt()
  @Min(1)
  quantity: number; 

  @IsInt()
  @Min(0)
  price: number; 
}

export class Order {
  @IsString()
  userId: string; 

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];

  @ValidateNested()
  @Type(() => Address)
  shippingAddress: Address; 

  @IsEnum(OrderStatus)
  status: OrderStatus; 

  @IsInt()
  @Min(0)
  totalAmount: number; 
}


//Cart Subschema and its Stuff//
export class CartItem {
  @IsString()
  productId: string; 
  @IsInt()
  @Min(1)
  quantity: number; 

  @IsInt()
  @Min(0)
  price: number; 
}

export class Cart {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItem)
  items: CartItem[]; 
  @IsInt()
  @Min(0)
  totalAmount: number; 
}
