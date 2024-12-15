import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Órdenes')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('client')
  @ApiOperation({ summary: 'Realizar una nueva compra (solo cliente)' })
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Obtener todas las órdenes (solo admin)' })
  @ApiResponse({ status: 200, description: 'Lista de órdenes obtenida correctamente' })
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get('/stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Obtener estadísticas de ventas (solo admin)' })
  @ApiResponse({ status: 200, description: 'Estadísticas obtenidas correctamente' })
  async getStats() {
    return this.ordersService.getStats();
  }

  @Get(':clientId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener las compras de un cliente' })
  @ApiResponse({ status: 200, description: 'Compras obtenidas correctamente' })
  async findByClient(@Param('clientId') clientId: string) {
    return this.ordersService.findByClient(clientId);
  }
}
