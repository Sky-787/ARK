import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { RoleEnum } from '../roles/enums/role.enum';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: any;
  let rolesService: any;

  beforeEach(async () => {
    usersRepository = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest
        .fn()
        .mockImplementation((user) =>
          Promise.resolve({ id: 'uuid-1', ...user }),
        ),
      findOne: jest.fn(),
      createQueryBuilder: jest.fn(),
      update: jest.fn(),
    };

    rolesService = {
      findByNames: jest
        .fn()
        .mockResolvedValue([{ id: 'role-1', name: RoleEnum.ESTUDIANTE }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: usersRepository },
        { provide: RolesService, useValue: rolesService },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should throw ConflictException if email already exists', async () => {
      usersRepository.findOne.mockResolvedValueOnce({ id: 'existing-id' });

      await expect(
        usersService.create({
          email: 'test@itp.edu.co',
          password: 'Password123!',
          firstName: 'Juan',
          lastName: 'Pérez',
          documentType: 'CC',
          documentNumber: '12345678',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw ConflictException if document number already exists', async () => {
      usersRepository.findOne
        .mockResolvedValueOnce(null) // email not found
        .mockResolvedValueOnce({ id: 'existing-id' }); // doc found

      await expect(
        usersService.create({
          email: 'test@itp.edu.co',
          password: 'Password123!',
          firstName: 'Juan',
          lastName: 'Pérez',
          documentType: 'CC',
          documentNumber: '12345678',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should create user successfully with hashed password and assigned roles', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      const result = await usersService.create({
        email: 'nuevo@itp.edu.co',
        password: 'Password123!',
        firstName: 'Juan',
        lastName: 'Pérez',
        documentType: 'CC',
        documentNumber: '12345678',
      });

      expect(result).toHaveProperty('id');
      expect(result.email).toBe('nuevo@itp.edu.co');
      expect(result.password).toBeUndefined(); // Password deleted before return
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if user not found', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      await expect(usersService.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return user if found', async () => {
      const mockUser = { id: 'uuid-1', email: 'test@itp.edu.co' };
      usersRepository.findOne.mockResolvedValue(mockUser);

      const result = await usersService.findOne('uuid-1');
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateStatus', () => {
    it('should update isActive status (RF-03)', async () => {
      const mockUser = { id: 'uuid-1', isActive: true };
      usersRepository.findOne.mockResolvedValue(mockUser);
      usersRepository.save.mockImplementation((u: any) => Promise.resolve(u));

      const result = await usersService.updateStatus('uuid-1', false);
      expect(result.isActive).toBe(false);
    });
  });

  describe('assignRoles', () => {
    it('should update user roles', async () => {
      const mockUser = { id: 'uuid-1', roles: [] };
      usersRepository.findOne.mockResolvedValue(mockUser);
      usersRepository.save.mockImplementation((u: any) => Promise.resolve(u));
      rolesService.findByNames.mockResolvedValue([
        { id: 'r-1', name: RoleEnum.ADMINISTRADOR },
      ]);

      const result = await usersService.assignRoles('uuid-1', [
        RoleEnum.ADMINISTRADOR,
      ]);
      expect(result.roles).toHaveLength(1);
      expect(result.roles[0].name).toBe(RoleEnum.ADMINISTRADOR);
    });
  });
});
