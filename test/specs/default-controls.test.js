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
      expect(instance.getDotIndexes(6, 1, 1, 'left')).toEqual([
        0,
        1,
        2,
        3,
        4,
        5
      ]);
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

    it('should return valid array of paging dot indexes when cellAlign = `center` || `right`', () => {
      // testing smaller number of pages when cellAlign = `center`
      expect(instance.getDotIndexes(6, 2, 2, 'center')).toEqual([0, 2, 4, 5]);
      expect(instance.getDotIndexes(6, 3, 5, 'center')).toEqual([0, 3, 5]);
      expect(instance.getDotIndexes(6, 1, 3, 'center')).toEqual([
        0,
        1,
        2,
        3,
        4,
        5
      ]);

      // testing smaller number of pages cellAlign = `right`
      expect(instance.getDotIndexes(6, 2, 2, 'right')).toEqual([0, 2, 4, 5]);
      expect(instance.getDotIndexes(6, 3, 5, 'right')).toEqual([0, 3, 5]);
      expect(instance.getDotIndexes(6, 1, 3, 'right')).toEqual([
        0,
        1,
        2,
        3,
        4,
        5
      ]);

      // testing extreme scenarios on number of pages when cellAlign = `center`
      expect(instance.getDotIndexes(11, 5, 3, 'center')).toEqual([0, 5, 10]);
      expect(instance.getDotIndexes(11, 2, 7, 'center')).toEqual([
        0,
        2,
        4,
        6,
        8,
        10
      ]);

      // testing extreme scenarios on number of pages when cellAlign = `right`
      expect(instance.getDotIndexes(11, 5, 3, 'right')).toEqual([0, 5, 10]);
      expect(instance.getDotIndexes(11, 2, 7, 'right')).toEqual([
        0,
        2,
        4,
        6,
        8,
        10
      ]);

      // testing edge case scenarios when cellAlign = `center`
      expect(instance.getDotIndexes(5, 2, 6, 'center')).toEqual([0, 2, 4]);
      expect(instance.getDotIndexes(5, 6, 2, 'center')).toEqual([0, 4]);
      expect(instance.getDotIndexes(5, 5, 5, 'center')).toEqual([0, 4]);

      // testing edge case scenarios when cellAlign = `right`
      expect(instance.getDotIndexes(5, 2, 6, 'right')).toEqual([0, 2, 4]);
      expect(instance.getDotIndexes(5, 6, 2, 'right')).toEqual([0, 4]);
      expect(instance.getDotIndexes(5, 5, 5, 'right')).toEqual([0, 4]);

      // testing if `center` and `right` cellAlign is disabled when slidesToScroll === 1
      expect(instance.getDotIndexes(6, 2, 1, 'center')).toEqual([0, 2, 4, 5]);
      expect(instance.getDotIndexes(6, 2, 1, 'right')).toEqual([0, 2, 4, 5]);
    });
  });
});

describe('<NextButton />', () => {
  describe('#nextButtonDisable for cellAlign = `left`', () => {
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
    });

    // testing extreme scenarios
    it('should return true for slide index >= 4', () => {
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

  describe('#nextButtonDisable for cellAlign = `center`', () => {
    let instance;

    beforeEach(async () => {
      const wrapper = mount(<NextButton buttonDisable={() => null} />);
      instance = wrapper.instance();
    });

    // testing smaller number of pages
    it('should return true for slide index 5', () => {
      const alignCenterTest1 = {
        wrapAround: false,
        slidesToShow: 3,
        currentSlide: 4,
        cellAlign: 'center',
        slideCount: 6
      };
      expect(instance.nextButtonDisabled(alignCenterTest1)).toEqual(false);

      const alignCenterTest2 = {
        wrapAround: false,
        slidesToShow: 3,
        currentSlide: 5,
        cellAlign: 'center',
        slideCount: 6
      };
      expect(instance.nextButtonDisabled(alignCenterTest2)).toEqual(true);
    });

    // testing extreme scenarios
    it('should return true for slide index 22', () => {
      const alignCenterTest3 = {
        wrapAround: false,
        slidesToShow: 7,
        currentSlide: 21,
        cellAlign: 'center',
        slideCount: 23
      };
      expect(instance.nextButtonDisabled(alignCenterTest3)).toEqual(false);

      const alignCenterTest4 = {
        wrapAround: false,
        slidesToShow: 7,
        currentSlide: 22,
        cellAlign: 'center',
        slideCount: 23
      };
      expect(instance.nextButtonDisabled(alignCenterTest4)).toEqual(true);
    });

    // testing edge case scenarios
    it('should return true with slide index of 4 when slideCount < slidesToShow', () => {
      const alignCenterTest5 = {
        wrapAround: false,
        slidesToShow: 6,
        currentSlide: 3,
        cellAlign: 'center',
        slideCount: 5
      };
      expect(instance.nextButtonDisabled(alignCenterTest5)).toEqual(false);

      const alignCenterTest6 = {
        wrapAround: false,
        slidesToShow: 6,
        currentSlide: 4,
        cellAlign: 'center',
        slideCount: 5
      };
      expect(instance.nextButtonDisabled(alignCenterTest6)).toEqual(true);
    });

    // testing edge case scenarios
    it('should return true with slide index of 4 when slideCount == slidesToShow', () => {
      const alignCenterTest7 = {
        wrapAround: false,
        slidesToShow: 5,
        currentSlide: 3,
        cellAlign: 'center',
        slideCount: 5
      };
      expect(instance.nextButtonDisabled(alignCenterTest7)).toEqual(false);

      const alignCenterTest8 = {
        wrapAround: false,
        slidesToShow: 5,
        currentSlide: 4,
        cellAlign: 'center',
        slideCount: 5
      };
      expect(instance.nextButtonDisabled(alignCenterTest8)).toEqual(true);
    });
  });

  describe('#nextButtonDisable for cellAlign = `right`', () => {
    let instance;

    beforeEach(async () => {
      const wrapper = mount(<NextButton buttonDisable={() => null} />);
      instance = wrapper.instance();
    });

    // testing smaller number of pages
    it('should return true for slide index 5', () => {
      const alignRightTest1 = {
        wrapAround: false,
        slidesToShow: 3,
        currentSlide: 4,
        cellAlign: 'right',
        slideCount: 6
      };
      expect(instance.nextButtonDisabled(alignRightTest1)).toEqual(false);

      const alignRightTest2 = {
        wrapAround: false,
        slidesToShow: 3,
        currentSlide: 5,
        cellAlign: 'right',
        slideCount: 6
      };
      expect(instance.nextButtonDisabled(alignRightTest2)).toEqual(true);
    });

    // testing extreme scenarios
    it('should return true for slide index 22', () => {
      const alignRightTest3 = {
        wrapAround: false,
        slidesToShow: 7,
        currentSlide: 21,
        cellAlign: 'right',
        slideCount: 23
      };
      expect(instance.nextButtonDisabled(alignRightTest3)).toEqual(false);

      const alignRightTest4 = {
        wrapAround: false,
        slidesToShow: 7,
        currentSlide: 22,
        cellAlign: 'right',
        slideCount: 23
      };
      expect(instance.nextButtonDisabled(alignRightTest4)).toEqual(true);
    });

    // testing edge case scenarios
    it('should return true with slide index of 4 when slideCount < slidesToShow', () => {
      const alignRightTest5 = {
        wrapAround: false,
        slidesToShow: 6,
        currentSlide: 3,
        cellAlign: 'right',
        slideCount: 5
      };
      expect(instance.nextButtonDisabled(alignRightTest5)).toEqual(false);

      const alignRightTest6 = {
        wrapAround: false,
        slidesToShow: 6,
        currentSlide: 4,
        cellAlign: 'right',
        slideCount: 5
      };
      expect(instance.nextButtonDisabled(alignRightTest6)).toEqual(true);
    });

    // testing edge case scenarios
    it('should return true with slide index of 4 when slideCount == slidesToShow', () => {
      const alignRightTest7 = {
        wrapAround: false,
        slidesToShow: 5,
        currentSlide: 3,
        cellAlign: 'right',
        slideCount: 5
      };
      expect(instance.nextButtonDisabled(alignRightTest7)).toEqual(false);

      const alignRightTest8 = {
        wrapAround: false,
        slidesToShow: 5,
        currentSlide: 4,
        cellAlign: 'right',
        slideCount: 5
      };
      expect(instance.nextButtonDisabled(alignRightTest8)).toEqual(true);
    });
  });
});
