import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';  
import { RolesGuard } from '../auth/guards/roles.guard';  
import { Roles } from '../auth/decorators/roles.decorator'; 
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al crear el usuario',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles('admin')  
  @ApiOperation({ summary: 'Obtener todos los usuarios (solo admin)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida correctamente',
  })
  async findAll() {
    return this.usersService.findAll();
  }
}
