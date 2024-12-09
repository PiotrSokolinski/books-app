import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Book } from '../books/books.entity';
console.log({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Book],
  // TODO: B8 - Add migrations
  synchronize: true, // Don't use this in production
  logging: true, // Don't use this in production
});

// TODO: B6 - Feed the environment variables using secrets
export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Book],
  // TODO: B8 - Add migrations
  synchronize: true, // Don't use this in production
  logging: true, // Don't use this in production
});
