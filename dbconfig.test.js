const { connectAndQuery } = require('./index');
const { Client } = require('pg');

jest.mock('pg'); // pg 모듈을 모킹합니다.

describe('connectAndQuery', () => {
  let mockClient;

  beforeEach(() => {
    mockClient = {
      connect: jest.fn(),
      query: jest.fn(),
      end: jest.fn(),
    };
    Client.mockImplementation(() => mockClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('정상적으로 현재 시간을 반환해야 한다', async () => {
    const mockResult = { rows: [{ now: new Date() }] };
    mockClient.query.mockResolvedValue(mockResult);

    const result = await connectAndQuery();

    expect(mockClient.connect).toHaveBeenCalled();
    expect(mockClient.query).toHaveBeenCalledWith('SELECT NOW()');
    expect(mockClient.end).toHaveBeenCalled();
    expect(result).toEqual(mockResult.rows[0]);
  });

  test('오류 발생 시 오류를 던져야 한다', async () => {
    mockClient.connect.mockRejectedValue(new Error('Connection Error'));

    await expect(connectAndQuery()).rejects.toThrow('Connection Error');

    expect(mockClient.connect).toHaveBeenCalled();
    expect(mockClient.end).toHaveBeenCalled();
  });
});