import { AppDataSource } from '../adapters/datasource/typeorm'; // Ajuste o caminho conforme necessário

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

jest.mock('../adapters/messaging/RabbitMQOrderQueueAdapterOUT', () => require('../tests/adapters/messaging/mocks/OrderQueueAdapterOUTMock').default);
