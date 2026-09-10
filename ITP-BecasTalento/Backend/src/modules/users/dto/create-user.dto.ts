import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'estudiante@itp.edu.co',
    description: 'Correo institucional único',
  })
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido' })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  email: string;

  @ApiProperty({
    example: 'ContraseñaSegura123!',
    minLength: 8,
    description: 'Contraseña de acceso',
  })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener mínimo 8 caracteres' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;

  @ApiProperty({ example: 'Carlos', description: 'Primer y segundo nombre' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  firstName: string;

  @ApiProperty({ example: 'Gómez', description: 'Apellidos' })
  @IsString()
  @IsNotEmpty({ message: 'Los apellidos son requeridos' })
  lastName: string;

  @ApiProperty({
    example: 'CC',
    description: 'Tipo de documento (CC, TI, CE, PASAPORTE)',
  })
  @IsString()
  @IsNotEmpty({ message: 'El tipo de documento es requerido' })
  documentType: string;

  @ApiProperty({
    example: '1006543210',
    description: 'Número de documento de identidad',
  })
  @IsString()
  @IsNotEmpty({ message: 'El número de documento es requerido' })
  documentNumber: string;

  @ApiPropertyOptional({
    example: '+57 3123456789',
    description: 'Número telefónico de contacto',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: ['ESTUDIANTE'],
    description: 'Nombres de los roles asignados al usuario',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roleNames?: string[];
}
