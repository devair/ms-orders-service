import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config()

const commonConfig = {
  entities: [__dirname + '/entities/*.ts','dist/adapters/**/entities/*.js'],
  synchronize: true,  
  logging: false
};

const developmentConfig: DataSourceOptions = {
  ...commonConfig,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
};

const testConfig: DataSourceOptions = {
  ...commonConfig,
  type: 'sqlite',
  database: ':memory:',
};

const dataSourceConfig  = process.env.NODE_ENV === 'test' ? testConfig : developmentConfig;

const AppDataSource = new DataSource(dataSourceConfig);

export { AppDataSource }