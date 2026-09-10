import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RoleEnum } from '../roles/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email, true);

    if (!user || !user.password) {
      throw new UnauthorizedException('Credenciales de acceso inválidas');
    }

    const isPasswordValid = await argon2.verify(
      user.password,
      loginDto.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales de acceso inválidas');
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        'La cuenta de usuario se encuentra inactiva. Contacte al administrador.',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles.map((role) => role.name),
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        documentType: user.documentType,
        documentNumber: user.documentNumber,
        roles: user.roles.map((r) => r.name),
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const newUser = await this.usersService.create({
      ...registerDto,
      roleNames: [RoleEnum.ESTUDIANTE],
    });

    const payload = {
      sub: newUser.id,
      email: newUser.email,
      roles: newUser.roles.map((role) => role.name),
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Usuario registrado exitosamente',
      accessToken,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        documentType: newUser.documentType,
        documentNumber: newUser.documentNumber,
        roles: newUser.roles.map((r) => r.name),
      },
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);

    if (!user) {
      // Por seguridad perimetral no revelamos si el email existe o no
      return {
        message:
          'Si el correo electrónico está registrado, recibirás las instrucciones de recuperación.',
      };
    }

    // Generar token criptográfico seguro
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora de validez

    await this.usersService.setResetPasswordToken(
      user.id,
      resetToken,
      expiresAt,
    );

    return {
      message:
        'Si el correo electrónico está registrado, recibirás las instrucciones de recuperación.',
      // Se expone en el payload para facilitar el flujo en desarrollo/pruebas hasta integrar un proveedor SMTP
      resetToken,
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.usersService.findByResetPasswordToken(
      resetPasswordDto.token,
    );

    if (!user || !user.resetPasswordExpires) {
      throw new BadRequestException(
        'El token de recuperación es inválido o no existe',
      );
    }

    if (new Date() > new Date(user.resetPasswordExpires)) {
      throw new BadRequestException(
        'El token de recuperación ha expirado. Solicite uno nuevo.',
      );
    }

    await this.usersService.updatePassword(
      user.id,
      resetPasswordDto.newPassword,
    );

    return {
      message:
        'Contraseña actualizada correctamente. Ya puede iniciar sesión con su nueva contraseña.',
    };
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findOne(userId);
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      documentType: user.documentType,
      documentNumber: user.documentNumber,
      phone: user.phone,
      isActive: user.isActive,
      roles: user.roles.map((r) => r.name),
      createdAt: user.createdAt,
    };
  }
}
