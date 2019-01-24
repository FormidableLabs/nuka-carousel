/*eslint max-nested-callbacks: ["error", 4]*/
import ScrollTransition from '../../src/transitions/scroll-transition';

describe('<ScrollTransition />', () => {
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

  describe('#getSlideStyles', () => {
    describe('calculating zoomScale', () => {
      it('should return a scale of 1 for all slides when animation !== zoom , ', () => {
        const wrapper = mount(
          <ScrollTransition>
            <p>Slide 1</p>
            <p>Slide 2</p>
            <p>Slide 3</p>
          </ScrollTransition>
        );
        const instance = wrapper.instance();
        expect(instance.getSlideStyles(0, 0).transform).toEqual(`scale(1)`);
        expect(instance.getSlideStyles(1, 0).transform).toEqual(`scale(1)`);
        expect(instance.getSlideStyles(2, 0).transform).toEqual(`scale(1)`);
      });

      it('should return a scale of 1 for the current slide and 0.85 as a default for the remaining slides when animation === zoom but no zoomScale defined ', () => {
        const wrapper = mount(
          <ScrollTransition animation="zoom">
            <p>Slide 1</p>
            <p>Slide 2</p>
            <p>Slide 3</p>
          </ScrollTransition>
        );
        const instance = wrapper.instance();
        expect(instance.getSlideStyles(0, 0).transform).toEqual(`scale(1)`);
        expect(instance.getSlideStyles(1, 0).transform).toEqual(`scale(0.85)`);
        expect(instance.getSlideStyles(2, 0).transform).toEqual(`scale(0.85)`);
      });

      it('should return a scale of 1 for the current slide and zoomScale of 0.1 for the remaining slides when animation === zoom and zoomScale = 0.1 ', () => {
        const wrapper = mount(
          <ScrollTransition animation="zoom" zoomScale={0.1}>
            <p>Slide 1</p>
            <p>Slide 2</p>
            <p>Slide 3</p>
          </ScrollTransition>
        );
        const instance = wrapper.instance();
        expect(instance.getSlideStyles(0, 0).transform).toEqual(`scale(1)`);
        expect(instance.getSlideStyles(1, 0).transform).toEqual(`scale(0.1)`);
        expect(instance.getSlideStyles(2, 0).transform).toEqual(`scale(0.1)`);
      });

      it('should return a scale of 1 for the current slide and 1 for the remaining slides when animation === zoom and zoomScale value is more than 1 ', () => {
        const wrapper = mount(
          <ScrollTransition animation="zoom" zoomScale={2.5}>
            <p>Slide 1</p>
            <p>Slide 2</p>
            <p>Slide 3</p>
          </ScrollTransition>
        );
        const instance = wrapper.instance();
        expect(instance.getSlideStyles(0, 0).transform).toEqual(`scale(1)`);
        expect(instance.getSlideStyles(1, 0).transform).toEqual(`scale(1)`);
        expect(instance.getSlideStyles(2, 0).transform).toEqual(`scale(1)`);
      });

      it('should return a scale of 1 for the current slide and 0 for the remaining slides when animation === zoom and zoomScale value is less than 0 ', () => {
        const wrapper = mount(
          <ScrollTransition animation="zoom" zoomScale={-2.5}>
            <p>Slide 1</p>
            <p>Slide 2</p>
            <p>Slide 3</p>
          </ScrollTransition>
        );
        const instance = wrapper.instance();
        expect(instance.getSlideStyles(0, 0).transform).toEqual(`scale(1)`);
        expect(instance.getSlideStyles(1, 0).transform).toEqual(`scale(0)`);
        expect(instance.getSlideStyles(2, 0).transform).toEqual(`scale(0)`);
      });

      it('should ignore the zoomScale value and return a scale of 1 for all slides when animation !== zoom', () => {
        const wrapper = mount(
          <ScrollTransition zoomScale={0.5}>
            <p>Slide 1</p>
            <p>Slide 2</p>
            <p>Slide 3</p>
          </ScrollTransition>
        );
        const instance = wrapper.instance();
        expect(instance.getSlideStyles(0, 0).transform).toEqual(`scale(1)`);
        expect(instance.getSlideStyles(1, 0).transform).toEqual(`scale(1)`);
        expect(instance.getSlideStyles(2, 0).transform).toEqual(`scale(1)`);
      });
    });
  });
});
