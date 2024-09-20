const { Client } = require('pg');

// PostgreSQL 연결 설정
const client = new Client({
  user: 'test_user', // 사용자명
  host: 'localhost',  // 호스트
  database: 'test_db', // 데이터베이스 이름
  password: 'test_password', // 비밀번호
  port: 5432,         // 포트 (기본값: 5432)
});


async function connectAndQuery() {
  try {
    // 데이터베이스에 연결
    await client.connect();
    console.log('PostgreSQL에 연결되었습니다.');
    
    return "DB연결 성공"
  } catch (err) {
    console.error('오류 발생:', err);
    throw err; // 오류를 발생시킴
  } finally {
    // 연결 종료
    await client.end();
    console.log('PostgreSQL 연결 종료.');
  }
}

module.exports = { connectAndQuery };