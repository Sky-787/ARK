import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { RoleEnum } from './enums/role.enum';

describe('RolesService', () => {
  let rolesService: RolesService;
  let rolesRepository: any;

  beforeEach(async () => {
    rolesRepository = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest
        .fn()
        .mockImplementation((role) =>
          Promise.resolve({ id: 'uuid-role-1', ...role }),
        ),
      findOne: jest.fn(),
      find: jest.fn(),
      merge: jest
        .fn()
        .mockImplementation((target, source) => Object.assign(target, source)),
      remove: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        { provide: getRepositoryToken(Role), useValue: rolesRepository },
      ],
    }).compile();

    rolesService = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(rolesService).toBeDefined();
  });

  describe('create', () => {
    it('should throw ConflictException if role already exists', async () => {
      rolesRepository.findOne.mockResolvedValueOnce({
        id: 'existing-role-id',
        name: 'ADMINISTRADOR',
      });

      await expect(
        rolesService.create({ name: 'ADMINISTRADOR', description: 'Desc' }),
      ).rejects.toThrow(ConflictException);
    });

    it('should create role with uppercase name', async () => {
      rolesRepository.findOne.mockResolvedValueOnce(null);

      const result = await rolesService.create({
        name: 'evaluador',
        description: 'Desc',
      });
      expect(result.name).toBe('EVALUADOR');
      expect(rolesRepository.save).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if role not found by ID', async () => {
      rolesRepository.findOne.mockResolvedValueOnce(null);

      await expect(rolesService.findOne('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return role when found', async () => {
      const mockRole = { id: 'r-1', name: RoleEnum.ESTUDIANTE };
      rolesRepository.findOne.mockResolvedValueOnce(mockRole);

      const result = await rolesService.findOne('r-1');
      expect(result).toEqual(mockRole);
    });
  });

  describe('seedDefaultRoles', () => {
    it('should seed 4 default system roles if they do not exist', async () => {
      rolesRepository.findOne.mockResolvedValue(null);

      const roles = await rolesService.seedDefaultRoles();
      expect(roles).toHaveLength(4);
      expect(rolesRepository.save).toHaveBeenCalledTimes(4);
    });
  });
});
