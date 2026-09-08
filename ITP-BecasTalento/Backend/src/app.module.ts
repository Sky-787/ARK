import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
/*
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // 1. Inicializamos el módulo de configuración para leer el archivo .env
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    
    // 2. Configuramos TypeORM de forma asíncrona para que lea la variable de entorno
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'), // Lee la URL del .env
        autoLoadEntities: true, // Carga automáticamente tus entidades
        synchronize: true, // Sincroniza los cambios (ÚTIL EN DESARROLLO, DESACTIVAR EN PRODUCCIÓN)
        ssl: {
          rejectUnauthorized: false, // Requerido por Supabase para aceptar la conexión SSL
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
*/
