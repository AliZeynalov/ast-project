import { add, equals, not } from '../src/functions';

describe('Functions', () => {
  describe('equals', () => {
    it('returns true when values are equal', () => {
      expect(equals(1, 1)).toBe(true);
      expect(equals('test', 'test')).toBe(true);
      expect(equals(true, true)).toBe(true);
      expect(equals(null, null)).toBe(true);
    });

    it('returns false when values are not equal', () => {
      expect(equals(1, 2)).toBe(false);
      expect(equals('test', 'different')).toBe(false);
      expect(equals(true, false)).toBe(false);
    });

    it('performs strict comparison', () => {
      expect(equals(1, '1')).toBe(false);
      expect(equals(0, false)).toBe(false);
      expect(equals('', false)).toBe(false);
    });
  });

  describe('not', () => {
    it('returns the opposite of a boolean value', () => {
      expect(not(true)).toBe(false);
      expect(not(false)).toBe(true);
    });

    it('throws an error for non-boolean values', () => {
      expect(() => not(1)).toThrow('not function requires boolean parameter');
      expect(() => not('test')).toThrow('not function requires boolean parameter');
      expect(() => not(null)).toThrow('not function requires boolean parameter');
    });
  });

  describe('add', () => {
    it('adds two numbers correctly', () => {
      expect(add(1, 2)).toBe(3);
      expect(add(0, 0)).toBe(0);
      expect(add(-1, 1)).toBe(0);
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    it('throws an error for non-number values', () => {
      expect(() => add('1', 2)).toThrow('add function requires number parameters');
      expect(() => add(1, '2')).toThrow('add function requires number parameters');
      expect(() => add(null, 2)).toThrow('add function requires number parameters');
      expect(() => add(1, null)).toThrow('add function requires number parameters');
    });
  });
}); 