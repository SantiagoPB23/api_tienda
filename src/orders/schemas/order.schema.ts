import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from '../../products/schemas/product.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  clientId: string;

  @Prop({ type: [Product], required: true })
  products: Product[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
