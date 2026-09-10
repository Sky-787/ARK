import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Nombre del rol (ej. ADMINISTRADOR, ESTUDIANTE)',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del rol',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
