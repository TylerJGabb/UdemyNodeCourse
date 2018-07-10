const lib = require('../lib');

describe('absolute', () => {
  it('should return positive if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
  
  it('should return positive if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });
  
  it('should return 0 if input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Tyler');
    expect(result).toMatch(/Tyler/);
  })
});

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();

    //Too general
    //expect(result).toBeDefined();
    //expect(result).not.toBeNull();

    //Too specific
    // expect(result[0]).toBe('USD');
    // expect(result[1]).toBe('AUD');
    // expect(result[2]).toBe('EUR');
    //   or
    // expect(result.length).toBe(3);
    
    //Proper way
    // expect(result).toContain('USD');
    // expect(result).toContain('AUD');
    // expect(result).toContain('EUR');

    //Ideal way
    expect(result).toEqual(expect.arrayContaining(['USD','AUD','EUR']));
  });
});