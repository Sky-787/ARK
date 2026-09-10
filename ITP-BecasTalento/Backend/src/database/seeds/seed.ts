import { AppDataSource } from '../../config/typeorm.config';
import { Role } from '../../modules/roles/entities/role.entity';
import { User } from '../../modules/users/entities/user.entity';
import { RoleEnum } from '../../modules/roles/enums/role.enum';
import * as argon2 from 'argon2';

async function runSeed() {
  console.log('--- Iniciando Semilla de Base de Datos (ITP-BecasTalento) ---');

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const roleRepo = AppDataSource.getRepository(Role);
  const userRepo = AppDataSource.getRepository(User);

  // 1. Semilla de Roles
  const rolesData = [
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
      description: 'Docente o par evaluador asignado a calificar postulaciones',
    },
    {
      name: RoleEnum.ESTUDIANTE,
      description: 'Estudiante postulante a estímulos y becas',
    },
  ];

  const rolesMap: Record<string, Role> = {};

  for (const r of rolesData) {
    let role = await roleRepo.findOne({ where: { name: r.name } });
    if (!role) {
      role = roleRepo.create(r);
      role = await roleRepo.save(role);
      console.log(`+ Rol creado: ${role.name}`);
    } else {
      console.log(`= Rol existente: ${role.name}`);
    }
    rolesMap[r.name] = role;
  }

  // 2. Semilla de SuperAdministrador Inicial
  const superAdminEmail = 'superadmin@itp.edu.co';
  const existingSuperAdmin = await userRepo.findOne({
    where: { email: superAdminEmail },
  });

  if (!existingSuperAdmin) {
    const defaultPassword = 'SuperAdmin2026*';
    const hashedPassword = await argon2.hash(defaultPassword);

    const superAdmin = userRepo.create({
      email: superAdminEmail,
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Administrador',
      documentType: 'CC',
      documentNumber: '0000000001',
      phone: '+57 3000000000',
      isActive: true,
      roles: [rolesMap[RoleEnum.SUPERADMIN], rolesMap[RoleEnum.ADMINISTRADOR]],
    });

    await userRepo.save(superAdmin);
    console.log(
      `+ Usuario SuperAdmin inicial creado: ${superAdminEmail} / Password: ${defaultPassword}`,
    );
  } else {
    console.log(`= Usuario SuperAdmin existente: ${superAdminEmail}`);
  }

  console.log('--- Semilla completada exitosamente ---');
  await AppDataSource.destroy();
}

runSeed().catch((err) => {
  console.error('Error al ejecutar semilla:', err);
  process.exit(1);
});
