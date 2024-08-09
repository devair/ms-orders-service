export default class OrderQueueAdapterOUTMock {
  connect = jest.fn().mockResolvedValue(undefined);
  publish = jest.fn().mockResolvedValue({});
  close = jest.fn().mockResolvedValue(undefined);
}