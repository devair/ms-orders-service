import { AppDataSource } from '../adapters/datasource/typeorm'; // Ajuste o caminho conforme necessário

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

