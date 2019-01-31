import { PagingDots, NextButton } from '../../src/default-controls';

describe('<PagingDots />', () => {
  describe('#getDotIndexes', () => {
    let instance;

    beforeEach(async () => {
      const wrapper = mount(<PagingDots goToSlide={() => null} />);
      instance = wrapper.instance();
    });

    it('should return valid array of paging dot indexes when cellAlign = `left`', () => {
      // testing smaller number of pages
      expect(instance.getDotIndexes(6, 1, 1)).toEqual([0, 1, 2, 3, 4, 5]);
      expect(instance.getDotIndexes(6, 2, 1, 'left')).toEqual([0, 2, 4, 5]);
      expect(instance.getDotIndexes(6, 2, 2, 'left')).toEqual([0, 2, 4]);
      expect(instance.getDotIndexes(6, 3, 5, 'left')).toEqual([0, 1]);
      expect(instance.getDotIndexes(6, 1, 3, 'left')).toEqual([0, 1, 2, 3]);

      // testing extreme scenarios on number of pages
      expect(instance.getDotIndexes(11, 5, 3, 'left')).toEqual([0, 5, 8]);
      expect(instance.getDotIndexes(11, 2, 7, 'left')).toEqual([0, 2, 4]);

      // testing edge case scenarios
      expect(instance.getDotIndexes(5, 2, 6, 'left')).toEqual([0]);
      expect(instance.getDotIndexes(5, 6, 2, 'left')).toEqual([0, 3]);
      expect(instance.getDotIndexes(5, 5, 5, 'left')).toEqual([0]);
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
    it('should return true for slide index >= 3', () => {
      const alignLeftIndex2 = {
        wrapAround: false,
        slidesToShow: 3,
        currentSlide: 2,
        cellAlign: 'left',
        slideCount: 6
      };
      expect(instance.nextButtonDisabled(alignLeftIndex2)).toEqual(false);

      // past the slide 3 should return true and disable the button
      const testLeftIndex3 = {
        wrapAround: false,
        slidesToShow: 3,
        currentSlide: 3,
        cellAlign: 'left',
        slideCount: 6
      };
      expect(instance.nextButtonDisabled(testLeftIndex3)).toEqual(true);

      const testLeftIndex4 = {
        wrapAround: false,
        slidesToShow: 3,
        currentSlide: 4,
        cellAlign: 'left',
        slideCount: 6
      };
      expect(instance.nextButtonDisabled(testLeftIndex4)).toEqual(true);

      const testLeft5 = {
        wrapAround: false,
        slidesToShow: 3,
        currentSlide: 5,
        cellAlign: 'left',
        slideCount: 6
      };
      expect(instance.nextButtonDisabled(testLeft5)).toEqual(true);
    });

    // testing extreme scenarios
    it('should return true for slide index >= 4', () => {
      const alignLeftIndex0 = {
        wrapAround: false,
        slidesToShow: 7,
        currentSlide: 0,
        cellAlign: 'left',
        slideCount: 11
      };
      expect(instance.nextButtonDisabled(alignLeftIndex0)).toEqual(false);

      const alignLeftIndex3 = {
        wrapAround: false,
        slidesToShow: 7,
        currentSlide: 3,
        cellAlign: 'left',
        slideCount: 11
      };
      expect(instance.nextButtonDisabled(alignLeftIndex3)).toEqual(false);

      const alignLeftIndex4 = {
        wrapAround: false,
        slidesToShow: 7,
        currentSlide: 4,
        cellAlign: 'left',
        slideCount: 11
      };
      expect(instance.nextButtonDisabled(alignLeftIndex4)).toEqual(true);

      const alignLeftIndex9 = {
        wrapAround: false,
        slidesToShow: 7,
        currentSlide: 9,
        cellAlign: 'left',
        slideCount: 11
      };
      expect(instance.nextButtonDisabled(alignLeftIndex9)).toEqual(true);

      const alignLeftIndex11 = {
        wrapAround: false,
        slidesToShow: 7,
        currentSlide: 11,
        cellAlign: 'left',
        slideCount: 11
      };
      expect(instance.nextButtonDisabled(alignLeftIndex11)).toEqual(true);
    });

    // testing edge case scenarios
    it('should return valid true or false value in edge cases', () => {
      // when slideCount < slidesToShow and slideCount < slidesToShow
      const alignLeftEdgeCase1 = {
        wrapAround: false,
        slidesToShow: 6,
        currentSlide: 0,
        cellAlign: 'left',
        slideCount: 5
      };
      expect(instance.nextButtonDisabled(alignLeftEdgeCase1)).toEqual(true);

      // when slideCount ===  slidesToShow
      const alignLeftEdgeCase2 = {
        wrapAround: false,
        slidesToShow: 5,
        currentSlide: 0,
        cellAlign: 'left',
        slideCount: 5
      };
      expect(instance.nextButtonDisabled(alignLeftEdgeCase2)).toEqual(true);
    });
  });
});
