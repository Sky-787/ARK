import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUsersDto } from './dto/filter-users.dto';
import { RolesService } from '../roles/roles.service';
import { RoleEnum } from '../roles/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const normalizedEmail = createUserDto.email.trim().toLowerCase();

    // Comprobar si el email ya existe
    const existingByEmail = await this.usersRepository.findOne({
      where: { email: normalizedEmail },
      withDeleted: true,
    });
    if (existingByEmail) {
      throw new ConflictException(
        `El correo electrónico ${normalizedEmail} ya está registrado`,
      );
    }

    // Comprobar si el número de documento ya existe
    const existingByDoc = await this.usersRepository.findOne({
      where: { documentNumber: createUserDto.documentNumber.trim() },
      withDeleted: true,
    });
    if (existingByDoc) {
      throw new ConflictException(
        `El número de documento ${createUserDto.documentNumber} ya está registrado`,
      );
    }

    // Asignar roles (por defecto ESTUDIANTE si no se especifican)
    const roleNamesToAssign =
      createUserDto.roleNames && createUserDto.roleNames.length > 0
        ? createUserDto.roleNames
        : [RoleEnum.ESTUDIANTE];

    const roles = await this.rolesService.findByNames(roleNamesToAssign);
    if (roles.length === 0) {
      throw new BadRequestException(
        'Ninguno de los roles especificados es válido',
      );
    }

    // Hashing seguro de contraseña con Argon2
    const hashedPassword = await argon2.hash(createUserDto.password);

    const user = this.usersRepository.create({
      ...createUserDto,
      email: normalizedEmail,
      documentNumber: createUserDto.documentNumber.trim(),
      password: hashedPassword,
      roles,
    });

    const savedUser = await this.usersRepository.save(user);
    delete savedUser.password;
    return savedUser;
  }

  async findAll(filterDto: FilterUsersDto) {
    const { page = 1, limit = 10, search, role, isActive } = filterDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .orderBy('user.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    if (isActive !== undefined) {
      queryBuilder.andWhere('user.isActive = :isActive', { isActive });
    }

    if (role) {
      queryBuilder.andWhere('role.name = :role', { role: role.toUpperCase() });
    }

    if (search) {
      const searchTerm = `%${search.trim().toLowerCase()}%`;
      queryBuilder.andWhere(
        '(LOWER(user.email) LIKE :search OR LOWER(user.firstName) LIKE :search OR LOWER(user.lastName) LIKE :search OR user.documentNumber LIKE :search)',
        { search: searchTerm },
      );
    }

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  async findByEmail(
    email: string,
    includePassword = false,
  ): Promise<User | null> {
    const normalizedEmail = email.trim().toLowerCase();
    const query = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('LOWER(user.email) = :email', { email: normalizedEmail });

    if (includePassword) {
      query.addSelect('user.password');
    }

    return query.getOne();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (
      updateUserDto.documentNumber &&
      updateUserDto.documentNumber !== user.documentNumber
    ) {
      const existingDoc = await this.usersRepository.findOne({
        where: { documentNumber: updateUserDto.documentNumber.trim() },
      });
      if (existingDoc && existingDoc.id !== id) {
        throw new ConflictException(
          'El número de documento ya está en uso por otro usuario',
        );
      }
    }

    this.usersRepository.merge(user, {
      ...updateUserDto,
      documentNumber: updateUserDto.documentNumber?.trim(),
    });

    return this.usersRepository.save(user);
  }

  async updateStatus(id: string, isActive: boolean): Promise<User> {
    const user = await this.findOne(id);
    user.isActive = isActive;
    return this.usersRepository.save(user);
  }

  async assignRoles(id: string, roleNames: string[]): Promise<User> {
    const user = await this.findOne(id);
    const roles = await this.rolesService.findByNames(roleNames);

    if (roles.length === 0) {
      throw new BadRequestException(
        'No se encontraron roles válidos para asignar',
      );
    }

    user.roles = roles;
    return this.usersRepository.save(user);
  }

  async updatePassword(id: string, newPlainPassword: string): Promise<void> {
    const hashedPassword = await argon2.hash(newPlainPassword);
    await this.usersRepository.update(id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });
  }

  async setResetPasswordToken(
    id: string,
    token: string,
    expires: Date,
  ): Promise<void> {
    await this.usersRepository.update(id, {
      resetPasswordToken: token,
      resetPasswordExpires: expires,
    });
  }

  async findByResetPasswordToken(token: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.resetPasswordToken')
      .addSelect('user.resetPasswordExpires')
      .leftJoinAndSelect('user.roles', 'role')
      .where('user.resetPasswordToken = :token', { token })
      .getOne();
  }
}
