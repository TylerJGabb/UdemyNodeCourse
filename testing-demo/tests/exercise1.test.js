const exercise1 = require('../exercise1');

describe('fizzBuzz', () => {
  it('should throw if input is not a number', () => {
    const notNumbers = ['1', true, undefined, null, {}, []];
    notNumbers.forEach(n => {
      expect(() => exercise1.fizzBuzz(n)).toThrow();
    });
  });

  it("should return 'FizzBuzz' if input is divis by 5 and 3", () => {
    const result = exercise1.fizzBuzz(15);
    expect(result).toMatch(/fizzbuzz/i);
  });

  it("should return 'Fizz' if input only div by 3", () => {
    const result = exercise1.fizzBuzz(9);
    expect(result).toMatch(/fizz/i);
  });

  it("should return 'Buzz' if input only div by 5", () => {
    const result = exercise1.fizzBuzz(10);
    expect(result).toMatch(/buzz/i);
  });

  it("should return the inputted value is div by neither 3 nor 5", () => {
    const result = exercise1.fizzBuzz(11);
    expect(result).toEqual(11);
  });
});