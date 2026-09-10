import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class AssignRolesDto {
  @ApiProperty({
    example: ['ADMINISTRADOR', 'EVALUADOR'],
    description: 'Nombres de los roles a asignar al usuario',
  })
  @IsArray({ message: 'Los roles deben proporcionarse en un arreglo' })
  @ArrayNotEmpty({ message: 'Debe incluir al menos un rol' })
  @IsString({ each: true, message: 'Cada rol debe ser una cadena de texto' })
  roleNames: string[];
}
