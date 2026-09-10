import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

export const getTypeOrmConfig = (
  configService?: ConfigService,
): DataSourceOptions => {
  const databaseUrl = configService
    ? configService.get<string>('DATABASE_URL')
    : process.env.DATABASE_URL;

  const isProduction = process.env.NODE_ENV === 'production';
  const isSslRequired =
    databaseUrl?.includes('supabase') ||
    databaseUrl?.includes('sslmode=require');

  return {
    type: 'postgres',
    url: databaseUrl,
    entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    synchronize: false, // Migraciones versionadas obligatorias
    ssl: isSslRequired
      ? {
          rejectUnauthorized: false,
        }
      : false,
    logging: !isProduction,
  };
};

export const AppDataSource = new DataSource(getTypeOrmConfig());
