import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RoleEnum } from '../roles/enums/role.enum';
import * as argon2 from 'argon2';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<Record<keyof UsersService, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      findOne: jest.fn(),
      setResetPasswordToken: jest.fn(),
      findByResetPasswordToken: jest.fn(),
      updatePassword: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mocked_jwt_token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      usersService.findByEmail!.mockResolvedValue(null);

      await expect(
        authService.login({
          email: 'inexistente@itp.edu.co',
          password: 'Password123!',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      const hashedPassword = await argon2.hash('RealPassword123!');
      usersService.findByEmail!.mockResolvedValue({
        id: '123',
        email: 'user@itp.edu.co',
        password: hashedPassword,
        isActive: true,
        roles: [{ name: RoleEnum.ESTUDIANTE }],
      });

      await expect(
        authService.login({
          email: 'user@itp.edu.co',
          password: 'WrongPassword!',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user is inactive', async () => {
      const hashedPassword = await argon2.hash('ValidPassword123!');
      usersService.findByEmail!.mockResolvedValue({
        id: '123',
        email: 'inactive@itp.edu.co',
        password: hashedPassword,
        isActive: false,
        roles: [{ name: RoleEnum.ESTUDIANTE }],
      });

      await expect(
        authService.login({
          email: 'inactive@itp.edu.co',
          password: 'ValidPassword123!',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return accessToken and user data on valid credentials', async () => {
      const password = 'CorrectPassword123!';
      const hashedPassword = await argon2.hash(password);
      const mockUser = {
        id: 'user-uuid-1',
        email: 'student@itp.edu.co',
        password: hashedPassword,
        firstName: 'Juan',
        lastName: 'Pérez',
        documentType: 'CC',
        documentNumber: '12345678',
        isActive: true,
        roles: [{ name: RoleEnum.ESTUDIANTE }],
      };

      usersService.findByEmail!.mockResolvedValue(mockUser);

      const result = await authService.login({
        email: 'student@itp.edu.co',
        password,
      });

      expect(result).toHaveProperty('accessToken', 'mocked_jwt_token');
      expect(result.user.email).toBe('student@itp.edu.co');
      expect(result.user.roles).toContain(RoleEnum.ESTUDIANTE);
    });
  });

  describe('register', () => {
    it('should register a new student and return token', async () => {
      const registerDto = {
        email: 'nuevo@itp.edu.co',
        password: 'Password123!',
        firstName: 'Ana',
        lastName: 'López',
        documentType: 'CC',
        documentNumber: '87654321',
      };

      usersService.create!.mockResolvedValue({
        id: 'new-uuid',
        ...registerDto,
        roles: [{ name: RoleEnum.ESTUDIANTE }],
      });

      const result = await authService.register(registerDto);

      expect(usersService.create).toHaveBeenCalledWith({
        ...registerDto,
        roleNames: [RoleEnum.ESTUDIANTE],
      });
      expect(result.accessToken).toBe('mocked_jwt_token');
    });
  });

  describe('forgotPassword', () => {
    it('should generate reset token if user exists', async () => {
      usersService.findByEmail!.mockResolvedValue({
        id: 'user-1',
        email: 'user@itp.edu.co',
      });

      const result = await authService.forgotPassword({
        email: 'user@itp.edu.co',
      });

      expect(usersService.setResetPasswordToken).toHaveBeenCalled();
      expect(result).toHaveProperty('resetToken');
    });
  });

  describe('resetPassword', () => {
    it('should throw BadRequestException if token is invalid or expired', async () => {
      usersService.findByResetPasswordToken!.mockResolvedValue({
        id: 'user-1',
        resetPasswordExpires: new Date(Date.now() - 10000), // Expirado
      });

      await expect(
        authService.resetPassword({
          token: 'expired-token',
          newPassword: 'NewPassword123!',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should update password if token is valid', async () => {
      usersService.findByResetPasswordToken!.mockResolvedValue({
        id: 'user-1',
        resetPasswordExpires: new Date(Date.now() + 60000), // Válido
      });

      const result = await authService.resetPassword({
        token: 'valid-token',
        newPassword: 'NewPassword123!',
      });

      expect(usersService.updatePassword).toHaveBeenCalledWith(
        'user-1',
        'NewPassword123!',
      );
      expect(result.message).toContain('correctamente');
    });
  });
});
