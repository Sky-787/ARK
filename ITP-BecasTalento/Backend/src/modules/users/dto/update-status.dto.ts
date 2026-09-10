import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateUserStatusDto {
  @ApiProperty({
    example: false,
    description: 'Estado activo o inactivo del usuario (no eliminación física)',
  })
  @IsBoolean({ message: 'El estado isActive debe ser un valor booleano' })
  isActive: boolean;
}
