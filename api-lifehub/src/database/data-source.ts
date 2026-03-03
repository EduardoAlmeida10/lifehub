import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.LIFEHUB_DB_HOST,
  port: Number(process.env.LIFEHUB_DB_PORT),
  username: process.env.LIFEHUB_DB_USER,
  password: process.env.LIFEHUB_DB_PASSWORD,
  database: process.env.LIFEHUB_DB_NAME,

  entities: [__dirname + '/../**/entities/*.entity.{ts,js}'],
  migrations: ['src/database/migrations/*.ts'],
});
