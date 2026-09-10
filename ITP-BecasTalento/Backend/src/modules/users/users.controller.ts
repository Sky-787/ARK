import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUsersDto } from './dto/filter-users.dto';
import { AssignRolesDto } from './dto/assign-roles.dto';
import { UpdateUserStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RoleEnum } from '../roles/enums/role.enum';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMINISTRADOR)
  @ApiOperation({
    summary: 'Registrar un nuevo usuario institucional (Admin/SuperAdmin)',
  })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.' })
  @ApiResponse({ status: 409, description: 'El correo o documento ya existe.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMINISTRADOR)
  @ApiOperation({
    summary: 'Consultar usuarios con filtros y paginación (Admin/SuperAdmin)',
  })
  findAll(@Query() filterUsersDto: FilterUsersDto) {
    return this.usersService.findAll(filterUsersDto);
  }

  @Get(':id')
  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMINISTRADOR)
  @ApiOperation({ summary: 'Consultar información detallada de un usuario' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMINISTRADOR)
  @ApiOperation({ summary: 'Actualizar información de un usuario' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/status')
  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMINISTRADOR)
  @ApiOperation({
    summary: 'Activar o desactivar usuario sin eliminación física (RF-03)',
  })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: UpdateUserStatusDto,
  ) {
    return this.usersService.updateStatus(id, statusDto.isActive);
  }

  @Patch(':id/roles')
  @Roles(RoleEnum.SUPERADMIN)
  @ApiOperation({ summary: 'Asignar roles a un usuario (Solo SUPERADMIN)' })
  assignRoles(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() assignRolesDto: AssignRolesDto,
  ) {
    return this.usersService.assignRoles(id, assignRolesDto.roleNames);
  }
}
