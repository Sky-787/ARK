import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'estudiante@itp.edu.co',
    description: 'Correo institucional del estudiante',
  })
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido' })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  email: string;

  @ApiProperty({
    example: 'ClaveSegura2026*',
    minLength: 8,
    description: 'Contraseña de la cuenta',
  })
  @IsString()
  @MinLength(8, {
    message: 'La contraseña debe contener al menos 8 caracteres',
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;

  @ApiProperty({ example: 'María', description: 'Nombres' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  firstName: string;

  @ApiProperty({ example: 'Rodríguez', description: 'Apellidos' })
  @IsString()
  @IsNotEmpty({ message: 'Los apellidos son requeridos' })
  lastName: string;

  @ApiProperty({
    example: 'CC',
    description: 'Tipo de documento (CC, TI, CE, etc.)',
  })
  @IsString()
  @IsNotEmpty({ message: 'El tipo de documento es requerido' })
  documentType: string;

  @ApiProperty({
    example: '1005678901',
    description: 'Número de documento de identidad',
  })
  @IsString()
  @IsNotEmpty({ message: 'El número de documento es requerido' })
  documentNumber: string;

  @ApiPropertyOptional({
    example: '+57 3201234567',
    description: 'Teléfono de contacto',
  })
  @IsOptional()
  @IsString()
  phone?: string;
}
