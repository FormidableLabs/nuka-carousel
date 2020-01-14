import { getSlideDirection } from '../../src/utilities/utilities';

describe('Utilities', () => {
  describe('#getSlideDirection', () => {
    it('should return zero if start and end slide are the same regardless of isWrapping', () => {
      expect(getSlideDirection(2, 2, true)).toEqual(0);
      expect(getSlideDirection(2, 2, false)).toEqual(0);
    });

    it('should return -1 if isWrapping is true and start is less than end', () => {
      const isWrapping = true;
      const start = 0;
      const end = 6;

      expect(getSlideDirection(start, end, isWrapping)).toEqual(-1);
    });

    it('should return 1 if isWrapping is true and start is greater than end', () => {
      const isWrapping = true;
      const start = 6;
      const end = 0;

      expect(getSlideDirection(start, end, isWrapping)).toEqual(1);
    });

    it('should return 1 if isWrapping is false and start is less than end', () => {
      const isWrapping = false;
      const start = 0;
      const end = 6;

      expect(getSlideDirection(start, end, isWrapping)).toEqual(1);
    });

    it('should return -1 if isWrapping is false and start is greater than end', () => {
      const isWrapping = false;
      const start = 6;
      const end = 0;

      expect(getSlideDirection(start, end, isWrapping)).toEqual(-1);
    });
  });
});
