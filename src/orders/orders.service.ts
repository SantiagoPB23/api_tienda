import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async create(order: Partial<Order>): Promise<Order> {
    const newOrder = new this.orderModel(order);
    return newOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findByClient(clientId: string): Promise<Order[]> {
    return this.orderModel.find({ clientId }).exec();
  }

  async getStats(): Promise<{ totalAmount: number }> { 
    const orders = await this.orderModel.find().exec(); 
    const totalAmount = orders.reduce((total, order) => total + order.totalAmount, 0); 
    return { totalAmount };
  }
}
