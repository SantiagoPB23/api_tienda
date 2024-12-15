import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/schemas/product.schema';

export class CreateOrderDto {
  @ApiProperty()
  clientId: string;

  @ApiProperty({ type: [Product] })
  products: Product[];

  @ApiProperty()
  totalAmount: number;
}
