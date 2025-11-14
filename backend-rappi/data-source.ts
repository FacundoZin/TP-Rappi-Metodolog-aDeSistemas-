import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME || 'nest_user',
  password: process.env.DB_PASSWORD || 'nest_password',
  database: process.env.DB_DATABASE || 'nest_db',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],

  synchronize: false,
});
