// calculator.test.js
const calculator = require('./index.js');

test('덧셈 테스트', () => {
    const calc = calculator();
    expect(calc.add(1, 3)).toBe(4);
});

test('뺄셈 테스트', () => {
    const calc = calculator();
    expect(calc.subtract(5, 2)).toBe(3);
});

test('곱셈 테스트', () => {
    const calc = calculator();
    expect(calc.multiply(4, 2)).toBe(8);
});

test('나눗셈 테스트', () => {
    const calc = calculator();
    expect(calc.divide(8, 2)).toBe(4);
});

test('0으로 나누기 테스트', () => {
    const calc = calculator();
    expect(calc.divide(5, 0)).toBe(null);
});