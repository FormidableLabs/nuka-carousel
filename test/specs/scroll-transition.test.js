/*eslint max-nested-callbacks: ["error", 4]*/
import ScrollTransition from '../../src/transitions/scroll-transition';

describe('<ScrollTransition />', () => {
  describe('methods', () => {
    describe('#getSlideDirection', () => {
      let instance;

      beforeEach(async () => {
        const wrapper = mount(
          <ScrollTransition>
            <p>Slide 1</p>
            <p>Slide 2</p>
            <p>Slide 3</p>
          </ScrollTransition>
        );
        instance = wrapper.instance();
      });

      it('should return zero if start and end slide are the same regardless of isWrapping', () => {
        expect(instance.getSlideDirection(2, 2, true)).toEqual(0);
        expect(instance.getSlideDirection(2, 2, false)).toEqual(0);
      });

      it('should return -1 if isWrapping is true and start is less than end', () => {
        const isWrapping = true;
        const start = 0;
        const end = 6;

        expect(instance.getSlideDirection(start, end, isWrapping)).toEqual(-1);
      });

      it('should return 1 if isWrapping is true and start is greater than end', () => {
        const isWrapping = true;
        const start = 6;
        const end = 0;

        expect(instance.getSlideDirection(start, end, isWrapping)).toEqual(1);
      });

      it('should return 1 if isWrapping is false and start is less than end', () => {
        const isWrapping = false;
        const start = 0;
        const end = 6;

        expect(instance.getSlideDirection(start, end, isWrapping)).toEqual(1);
      });

      it('should return -1 if isWrapping is false and start is greater than end', () => {
        const isWrapping = false;
        const start = 6;
        const end = 0;

        expect(instance.getSlideDirection(start, end, isWrapping)).toEqual(-1);
      });
    });
  });
});
