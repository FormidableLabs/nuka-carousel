import { PagingDots } from '../../src/default-controls';

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
