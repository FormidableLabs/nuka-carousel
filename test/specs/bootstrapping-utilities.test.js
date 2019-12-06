import {
  findMaxHeightSlideInRange,
  findCurrentHeightSlide
} from '../../src/utilities/bootstrapping-utilities';

describe('Bootstrapping Utilties', () => {
  const slides = [
    { offsetHeight: 100 }, // 0
    { offsetHeight: 200 }, // 1
    { offsetHeight: 800 }, // 2
    { offsetHeight: 400 }, // 3
    { offsetHeight: 500 } // 4
  ];

  describe('#findMaxHeightSlideInRange', () => {
    it('should find slide with max height', () => {
      // start < end
      expect(findMaxHeightSlideInRange(slides, 0, slides.length)).toBe(800);
      expect(findMaxHeightSlideInRange(slides, 0, 2)).toBe(200);

      // start > end
      expect(findMaxHeightSlideInRange(slides, 4, 3)).toBe(800);
      expect(findMaxHeightSlideInRange(slides, 3, 2)).toBe(500);

      // start === end
      expect(findMaxHeightSlideInRange(slides, 3, 3)).toBe(400);
      expect(findMaxHeightSlideInRange(slides, 3, 3)).toBe(400);
    });

    it('should return 0 if start/end are out of bounds', () => {
      // start out of bounds
      expect(findMaxHeightSlideInRange(slides, -1, 3)).toBe(0);
      expect(findMaxHeightSlideInRange(slides, slides.length, 3)).toBe(0);

      // end out of bounds
      expect(findMaxHeightSlideInRange(slides, 0, slides.length + 1)).toBe(0);
      expect(findMaxHeightSlideInRange(slides, 0, -3)).toBe(0);

      // both out of bounds
      expect(findMaxHeightSlideInRange(slides, -1, -1)).toBe(0);
    });
  });

  describe('#findCurrentHeightSlide', () => {
    it('should return height of current slide if slidesToShow less than equal to one', () => {
      expect(findCurrentHeightSlide(0, 1, 'left', false, slides)).toBe(100);
      expect(findCurrentHeightSlide(3, 1, 'right', true, slides)).toBe(400);
      expect(
        findCurrentHeightSlide(slides.length - 1, 1, 'center', false, slides)
      ).toBe(500);
    });

    describe('aligned left', () => {
      // wrapAround = false
      const noWrapHeight = findCurrentHeightSlide(
        1,
        1.25,
        'left',
        false,
        slides
      );

      expect(noWrapHeight).toBe(800);

      // wrapAround = true
      const wrapHeight = findCurrentHeightSlide(4, 1.25, 'left', true, slides);
      expect(wrapHeight).toBe(500);
    });

    describe('aligned center', () => {
      // wrapAround = false
      const noWrapHeight = findCurrentHeightSlide(
        3,
        1.5,
        'center',
        false,
        slides
      );

      expect(noWrapHeight).toBe(800);

      // wrapAround = true
      const wrapHeight = findCurrentHeightSlide(0, 1.5, 'center', true, slides);
      expect(wrapHeight).toBe(500);
    });

    describe('aligned right', () => {
      // wrapAround = false
      const noWrapHeight = findCurrentHeightSlide(
        3,
        1.5,
        'right',
        false,
        slides
      );

      expect(noWrapHeight).toBe(800);

      // wrapAround = true
      const wrapHeight = findCurrentHeightSlide(0, 1.5, 'right', true, slides);
      expect(wrapHeight).toBe(500);
    });
  });
});
