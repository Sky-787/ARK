import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'a1b2c3d4e5f67890...',
    description: 'Token temporal de recuperación recibido',
  })
  @IsString()
  @IsNotEmpty({ message: 'El token de recuperación es requerido' })
  token: string;

  @ApiProperty({
    example: 'NuevaContraseña2026*',
    minLength: 8,
    description: 'Nueva contraseña a establecer',
  })
  @IsString()
  @MinLength(8, {
    message: 'La nueva contraseña debe tener al menos 8 caracteres',
  })
  @IsNotEmpty({ message: 'La nueva contraseña es requerida' })
  newPassword: string;
}
