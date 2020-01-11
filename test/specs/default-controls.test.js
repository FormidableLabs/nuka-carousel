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
  describe('nextButtonDisabled', () => {
    const defaultParams = {
      wrapAround: false,
      cellAlign: 'left',
      cellSpacing: 0,
      currentSlide: 0,
      frameWidth: 100,
      slideCount: 6,
      slidesToShow: 1,
      slideWidth: 100,
      positionValue: 0
    };

    let instance;

    beforeEach(async () => {
      const wrapper = mount(<NextButton buttonDisable={() => null} />);
      instance = wrapper.instance();
    });

    it('should return false when wrapAround is true', () => {
      const disabled = instance.nextButtonDisabled({
        ...defaultParams,
        wrapAround: true
      });

      expect(disabled).toBe(false);
    });

    it('should return false on first slide of 2 or more slides', () => {
      const params = {
        ...defaultParams
      };

      const disabled = instance.nextButtonDisabled(params);
      expect(disabled).toBe(false);
    });

    it('should return false on second to last slide', () => {
      const slideIndex = 4;
      const params = {
        ...defaultParams,
        currentSlide: slideIndex,
        positionValue: -defaultParams.slideWidth * slideIndex
      };

      const disabled = instance.nextButtonDisabled(params);
      expect(disabled).toBe(false);
    });

    it('should return true on last slide', () => {
      const slideIndex = 5;
      const params = {
        ...defaultParams,
        currentSlide: slideIndex,
        positionValue: -defaultParams.slideWidth * slideIndex
      };

      const disabled = instance.nextButtonDisabled(params);
      expect(disabled).toBe(true);
    });
  });
});
