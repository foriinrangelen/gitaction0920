const { connectAndQuery } = require('./dbconfig'); // index.js 파일에서 함수 가져오기
const { Client } = require('pg'); // pg 모듈 가져오기

jest.mock('pg'); // pg 모듈을 모킹합니다.

describe('connectAndQuery', () => {
  let mockClient;

  beforeEach(() => {
    // 모킹된 클라이언트 객체 생성
    mockClient = {
      connect: jest.fn(),
      query: jest.fn(),
      end: jest.fn(),
    };
    Client.mockImplementation(() => mockClient); // Client가 mockClient를 반환하도록 설정
  });

  afterEach(() => {
    jest.clearAllMocks(); // 각 테스트 후에 모킹된 함수의 호출 기록을 초기화
  });

  test('정상적으로 현재 시간을 반환해야 한다', async () => {
    const mockResult = { rows: [{ now: new Date() }] }; // 쿼리 결과 모킹
    mockClient.query.mockResolvedValue(mockResult); // query 메서드가 mockResult를 반환하도록 설정

    await connectAndQuery(); // connectAndQuery 함수 호출

    expect(mockClient.connect).toHaveBeenCalled(); // connect 메서드 호출 확인
    expect(mockClient.query).toHaveBeenCalledWith('SELECT NOW()'); // 쿼리 메서드 호출 확인
    expect(mockClient.end).toHaveBeenCalled(); // end 메서드 호출 확인
  });

  test('오류 발생 시 오류를 던져야 한다', async () => {
    mockClient.connect.mockRejectedValue(new Error('Connection Error')); // connect 메서드가 오류를 던지도록 설정

    await expect(connectAndQuery()).rejects.toThrow('Connection Error'); // 함수 호출 시 오류가 발생하는지 확인

    expect(mockClient.connect).toHaveBeenCalled(); // connect 메서드 호출 확인
    expect(mockClient.end).toHaveBeenCalled(); // end 메서드 호출 확인
    expect(mockClient.query).not.toHaveBeenCalled(); // query 메서드는 호출되지 않아야 함
  });
});
