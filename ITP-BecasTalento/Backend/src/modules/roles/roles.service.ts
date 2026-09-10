import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleEnum } from './enums/role.enum';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const existingRole = await this.rolesRepository.findOne({
      where: { name: createRoleDto.name.toUpperCase() },
    });
    if (existingRole) {
      throw new ConflictException(
        `Role with name ${createRoleDto.name} already exists`,
      );
    }

    const role = this.rolesRepository.create({
      ...createRoleDto,
      name: createRoleDto.name.toUpperCase(),
    });
    return this.rolesRepository.save(role);
  }

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { name: name.toUpperCase() },
    });
    if (!role) {
      throw new NotFoundException(`Role with name ${name} not found`);
    }
    return role;
  }

  async findByNames(names: string[]): Promise<Role[]> {
    if (!names || names.length === 0) return [];
    const upperNames = names.map((n) => n.toUpperCase());
    return this.rolesRepository.find({
      where: { name: In(upperNames) },
    });
  }

  async findByIds(ids: string[]): Promise<Role[]> {
    if (!ids || ids.length === 0) return [];
    return this.rolesRepository.find({
      where: { id: In(ids) },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);
    if (updateRoleDto.name) {
      updateRoleDto.name = updateRoleDto.name.toUpperCase();
    }
    this.rolesRepository.merge(role, updateRoleDto);
    return this.rolesRepository.save(role);
  }

  async remove(id: string): Promise<void> {
    const role = await this.findOne(id);
    await this.rolesRepository.remove(role);
  }

  async seedDefaultRoles(): Promise<Role[]> {
    const defaultRoles = [
      {
        name: RoleEnum.SUPERADMIN,
        description: 'Administrador general del sistema con acceso total',
      },
      {
        name: RoleEnum.ADMINISTRADOR,
        description: 'Administrador de convocatorias, estímulos y evaluaciones',
      },
      {
        name: RoleEnum.EVALUADOR,
        description:
          'Docente o par evaluador asignado a calificar postulaciones',
      },
      {
        name: RoleEnum.ESTUDIANTE,
        description: 'Estudiante postulante a estímulos y becas',
      },
    ];

    const results: Role[] = [];
    for (const r of defaultRoles) {
      let role = await this.rolesRepository.findOne({
        where: { name: r.name },
      });
      if (!role) {
        role = this.rolesRepository.create(r);
        role = await this.rolesRepository.save(role);
      }
      results.push(role);
    }
    return results;
  }
}
