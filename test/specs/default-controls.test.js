import { PagingDots, NextButton } from '../../src/default-controls';

describe('<PagingDots />', () => {
  describe('#getDotIndexes', () => {
    let instance;

    beforeEach(async () => {
      const wrapper = mount(<PagingDots goToSlide={() => null} />);
      instance = wrapper.instance();
    });

    it('should return valid array of paging dot indexes', () => {
      // testing smaller number of pages
      expect(instance.getDotIndexes(6, 1, 1)).toEqual([0, 1, 2, 3, 4, 5]);
      expect(instance.getDotIndexes(6, 2, 1)).toEqual([0, 2, 4, 5]);
      expect(instance.getDotIndexes(6, 2, 2)).toEqual([0, 2, 4]);
      expect(instance.getDotIndexes(6, 3, 5)).toEqual([0, 1]);
      expect(instance.getDotIndexes(6, 1, 3)).toEqual([0, 1, 2, 3]);

      // testing extreme scenarios on number of pages
      expect(instance.getDotIndexes(11, 5, 3)).toEqual([0, 5, 8]);
      expect(instance.getDotIndexes(11, 2, 7)).toEqual([0, 2, 4]);

      // testing edge case scenarios
      expect(instance.getDotIndexes(5, 2, 6)).toEqual([0]);
      expect(instance.getDotIndexes(5, 6, 2)).toEqual([0, 3]);
      expect(instance.getDotIndexes(5, 5, 5)).toEqual([0]);
    });
  });
});

describe('<NextButton />', () => {
  describe('#nextButtonDisable', () => {
    let instance;

    beforeEach(async () => {
      const wrapper = mount(<NextButton buttonDisable={() => null} />);
      instance = wrapper.instance();
    });

    // testing smaller number of pages
    it('should return true for slide index of 3 and higher when slidesToShow > slidesToScroll', () => {
      expect(instance.nextButtonDisable(false, 3, 0, 1, 6)).toEqual(false);
      expect(instance.nextButtonDisable(false, 3, 1, 1, 6)).toEqual(false);
      expect(instance.nextButtonDisable(false, 3, 2, 1, 6)).toEqual(false);

      // past the slide 3 should return true and disable the button
      expect(instance.nextButtonDisable(false, 3, 3, 1, 6)).toEqual(true);
      expect(instance.nextButtonDisable(false, 3, 4, 1, 6)).toEqual(true);
      expect(instance.nextButtonDisable(false, 3, 5, 1, 6)).toEqual(true);
    });

    // testing extreme scenarios
    it('should return true for slide index of 4 and higher when slidesToShow > slidesToScroll', () => {
      expect(instance.nextButtonDisable(false, 7, 0, 2, 11)).toEqual(false);
      expect(instance.nextButtonDisable(false, 7, 3, 2, 11)).toEqual(false);

      expect(instance.nextButtonDisable(false, 7, 4, 2, 11)).toEqual(true);
      expect(instance.nextButtonDisable(false, 7, 9, 2, 11)).toEqual(true);
      expect(instance.nextButtonDisable(false, 7, 11, 2, 11)).toEqual(true);
    });

    it('should return true for slide index of 10 and higher when slidesToShow < slidesToScroll', () => {
      expect(instance.nextButtonDisable(false, 2, 0, 6, 11)).toEqual(false);
      expect(instance.nextButtonDisable(false, 2, 5, 6, 11)).toEqual(false);
      expect(instance.nextButtonDisable(false, 2, 8, 6, 11)).toEqual(false);

      expect(instance.nextButtonDisable(false, 2, 10, 6, 11)).toEqual(true);
      expect(instance.nextButtonDisable(false, 2, 11, 6, 11)).toEqual(true);
    });

    // testing edge case scenarios
    it('should return valid true or false value in edge cases', () => {
      // when slideCount < slidesToShow and slideCount < slidesToShow
      expect(instance.nextButtonDisable(false, 6, 0, 2, 5)).toEqual(true);

      // when slideCount < slidesToScroll
      expect(instance.nextButtonDisable(false, 2, 0, 6, 5)).toEqual(false);
      expect(instance.nextButtonDisable(false, 2, 3, 6, 5)).toEqual(true);

      // when slideCount === (slidesToScroll && slidesToShow)
      expect(instance.nextButtonDisable(false, 5, 0, 5, 5)).toEqual(true);
    });
  });
});
