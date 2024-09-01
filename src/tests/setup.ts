import { AppDataSource } from '../infra/datasource/typeorm'; // Ajuste o caminho conforme necessário

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

jest.mock('../infra/messaging/RabbitMQOrderQueueAdapterOUT', () => require('../tests/infra/messaging/mocks/OrderQueueAdapterOUTMock').default);
