const { connectAndQuery } = require('./dbconfig'); // index.js 파일에서 함수 가져오기
const { Client } = require('pg'); // pg 모듈 가져오기

jest.mock('pg'); // pg 모듈을 모킹합니다.

describe('connectAndQuery', () => {
  let mockClient;

  beforeEach(() => {
    // 모킹된 클라이언트 객체 생성
    mockClient = {
      connect: jest.fn(),
      end: jest.fn(),
    };
    Client.mockImplementation(() => mockClient); // Client가 mockClient를 반환하도록 설정
  });

  afterEach(() => {
    jest.clearAllMocks(); // 각 테스트 후에 모킹된 함수의 호출 기록을 초기화
  });

  test('DB 연결 성공 메시지를 반환해야 한다', async () => {
    // connect 메서드가 성공적으로 호출되는 경우
    mockClient.connect.mockResolvedValueOnce(); // connect 메서드가 성공적으로 완료되도록 설정

    const result = await connectAndQuery(); // connectAndQuery 함수 호출

    expect(mockClient.connect).toHaveBeenCalled(); // connect 메서드가 호출되었는지 확인
    expect(result).toBe("DB연결 성공"); // 반환된 결과가 예상한 메시지와 일치하는지 확인
    expect(mockClient.end).toHaveBeenCalled(); // end 메서드가 호출되었는지 확인
  });

  test('오류 발생 시 오류를 던져야 한다', async () => {
    // connect 메서드가 오류를 던지도록 설정
    mockClient.connect.mockRejectedValue(new Error('Connection Error'));

    await expect(connectAndQuery()).rejects.toThrow('Connection Error'); // 함수 호출 시 오류가 발생하는지 확인

    expect(mockClient.connect).toHaveBeenCalled(); // connect 메서드가 호출되었는지 확인
    expect(mockClient.end).toHaveBeenCalled(); // end 메서드가 호출되었는지 확인
  });
});
