export interface EnvironmentConfig {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  FRONTEND_URL: string;
  NODE_ENV: string;
}

export const envs = (): EnvironmentConfig => ({
  PORT: parseInt(process.env.PORT ?? '3000', 10),
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  JWT_SECRET:
    process.env.JWT_SECRET ?? 'default_jwt_secret_itp_becas_talento_2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '24h',
  FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
});
