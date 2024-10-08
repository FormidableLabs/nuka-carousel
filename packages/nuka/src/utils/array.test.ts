import { arraySeq, arraySum } from '.';

describe('utils', () => {
  describe('arraySeq', () => {
    it('should return an array of sequential numbers', () => {
      const result = arraySeq(5, 2);
      expect(result).toEqual([0, 2, 4, 6, 8]);
    });
  });

  describe('arraySum', () => {
    it('should return a compounded array', () => {
      const result = arraySum([0, 1, 2, 3, 4]);
      expect(result).toEqual([0, 1, 3, 6, 10]);
    });
  });
});
