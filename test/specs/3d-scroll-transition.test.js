/* eslint max-nested-callbacks: ["error", 4]*/
import Scroll3DTransition from '../../src/transitions/3d-scroll-transition';

describe('<Scroll3DTransition />', () => {
  describe('#getDistanceToCurrentSlide', () => {
    it('should calculate all distances in a linear fashion when wrapAround is false', () => {
      const wrapper = mount(
        <Scroll3DTransition slideIndex={0} slideCount={6} wrapAround={false}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          <p>Slide 4</p>
          <p>Slide 5</p>
          <p>Slide 6</p>
        </Scroll3DTransition>
      );
      const instance = wrapper.instance();

      expect(instance.getDistanceToCurrentSlide(0)).toEqual(0);
      expect(instance.getDistanceToCurrentSlide(1)).toEqual(1);
      expect(instance.getDistanceToCurrentSlide(2)).toEqual(2);
      expect(instance.getDistanceToCurrentSlide(3)).toEqual(3);
      expect(instance.getDistanceToCurrentSlide(4)).toEqual(4);
      expect(instance.getDistanceToCurrentSlide(5)).toEqual(5);
    });

    it('should calculate all distances in a circular fashion when wrapAround is true', () => {
      const wrapper = mount(
        <Scroll3DTransition slideIndex={0} slideCount={6} wrapAround>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          <p>Slide 4</p>
          <p>Slide 5</p>
          <p>Slide 6</p>
        </Scroll3DTransition>
      );
      const instance = wrapper.instance();

      expect(instance.getDistanceToCurrentSlide(0)).toEqual(0);
      expect(instance.getDistanceToCurrentSlide(1)).toEqual(1);
      expect(instance.getDistanceToCurrentSlide(2)).toEqual(2);
      expect(instance.getDistanceToCurrentSlide(3)).toEqual(3);
      expect(instance.getDistanceToCurrentSlide(4)).toEqual(2);
      expect(instance.getDistanceToCurrentSlide(5)).toEqual(1);
    });
  });

  describe('#getRelativeDistanceToCurrentSlide', () => {
    it('should calculate all distances in a linear fashion when wrapAround is false', () => {
      const wrapper = mount(
        <Scroll3DTransition slideIndex={0} slideCount={6} wrapAround={false}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          <p>Slide 4</p>
          <p>Slide 5</p>
          <p>Slide 6</p>
        </Scroll3DTransition>
      );
      const instance = wrapper.instance();

      expect(instance.getRelativeDistanceToCurrentSlide(0)).toEqual(0);
      expect(instance.getRelativeDistanceToCurrentSlide(1)).toEqual(1);
      expect(instance.getRelativeDistanceToCurrentSlide(2)).toEqual(2);
      expect(instance.getRelativeDistanceToCurrentSlide(3)).toEqual(3);
      expect(instance.getRelativeDistanceToCurrentSlide(4)).toEqual(4);
      expect(instance.getRelativeDistanceToCurrentSlide(5)).toEqual(5);
    });

    it('should calculate all distances in a circular fashion when wrapAround is true', () => {
      const wrapper = mount(
        <Scroll3DTransition slideIndex={0} slideCount={6} wrapAround>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          <p>Slide 4</p>
          <p>Slide 5</p>
          <p>Slide 6</p>
        </Scroll3DTransition>
      );
      const instance = wrapper.instance();

      expect(instance.getRelativeDistanceToCurrentSlide(0)).toEqual(0);
      expect(instance.getRelativeDistanceToCurrentSlide(1)).toEqual(1);
      expect(instance.getRelativeDistanceToCurrentSlide(2)).toEqual(2);
      expect(instance.getRelativeDistanceToCurrentSlide(3)).toEqual(3);
      expect(instance.getRelativeDistanceToCurrentSlide(4)).toEqual(-2);
      expect(instance.getRelativeDistanceToCurrentSlide(5)).toEqual(-1);
    });
  });

  describe('#getTransformScale', () => {
    it('should calculate the scale exponentially according to distance based on the zoomScale', () => {
      const wrapper = mount(
        <Scroll3DTransition
          slideIndex={0}
          slideCount={6}
          zoomScale={0.75}
          wrapAround
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          <p>Slide 4</p>
          <p>Slide 5</p>
          <p>Slide 6</p>
        </Scroll3DTransition>
      );
      const instance = wrapper.instance();

      expect(instance.getTransformScale(0)).toEqual(1);
      expect(instance.getTransformScale(1)).toEqual(0.75 ** 1);
      expect(instance.getTransformScale(2)).toEqual(0.75 ** 2);
      expect(instance.getTransformScale(3)).toEqual(0.75 ** 3);
      expect(instance.getTransformScale(4)).toEqual(0.75 ** 2);
      expect(instance.getTransformScale(5)).toEqual(0.75 ** 1);
    });

    it('should calculate the scale exponentially according to distance based on the zoomScale', () => {
      const wrapper = mount(
        <Scroll3DTransition
          slideIndex={0}
          slideCount={6}
          zoomScale={0.5}
          wrapAround
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          <p>Slide 4</p>
          <p>Slide 5</p>
          <p>Slide 6</p>
        </Scroll3DTransition>
      );
      const instance = wrapper.instance();

      expect(instance.getTransformScale(0)).toEqual(1);
      expect(instance.getTransformScale(1)).toEqual(0.5 ** 1);
      expect(instance.getTransformScale(2)).toEqual(0.5 ** 2);
      expect(instance.getTransformScale(3)).toEqual(0.5 ** 3);
      expect(instance.getTransformScale(4)).toEqual(0.5 ** 2);
      expect(instance.getTransformScale(5)).toEqual(0.5 ** 1);
    });

    it('should calculate the scale exponentially according to distance based on the zoomScale', () => {
      const wrapper = mount(
        <Scroll3DTransition
          slideIndex={0}
          slideCount={6}
          zoomScale={0.75}
          wrapAround={false}
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          <p>Slide 4</p>
          <p>Slide 5</p>
          <p>Slide 6</p>
        </Scroll3DTransition>
      );
      const instance = wrapper.instance();

      expect(instance.getTransformScale(0)).toEqual(1);
      expect(instance.getTransformScale(1)).toEqual(0.75 ** 1);
      expect(instance.getTransformScale(2)).toEqual(0.75 ** 2);
      expect(instance.getTransformScale(3)).toEqual(0.75 ** 3);
      expect(instance.getTransformScale(4)).toEqual(0.75 ** 4);
      expect(instance.getTransformScale(5)).toEqual(0.75 ** 5);
    });

    it('should calculate the scale exponentially according to distance based on the zoomScale', () => {
      const wrapper = mount(
        <Scroll3DTransition
          slideIndex={0}
          slideCount={6}
          zoomScale={0.5}
          wrapAround={false}
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          <p>Slide 4</p>
          <p>Slide 5</p>
          <p>Slide 6</p>
        </Scroll3DTransition>
      );
      const instance = wrapper.instance();

      expect(instance.getTransformScale(0)).toEqual(1);
      expect(instance.getTransformScale(1)).toEqual(0.5 ** 1);
      expect(instance.getTransformScale(2)).toEqual(0.5 ** 2);
      expect(instance.getTransformScale(3)).toEqual(0.5 ** 3);
      expect(instance.getTransformScale(4)).toEqual(0.5 ** 4);
      expect(instance.getTransformScale(5)).toEqual(0.5 ** 5);
    });
  });

  describe('#getOpacityScale', () => {
    it('should calculate the scale exponentially according to distance based on the opacityScale', () => {
      const wrapper = mount(
        <Scroll3DTransition
          slideIndex={0}
          slideCount={6}
          opacityScale={0.75}
          wrapAround
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          <p>Slide 4</p>
          <p>Slide 5</p>
          <p>Slide 6</p>
        </Scroll3DTransition>
      );
      const instance = wrapper.instance();

      expect(instance.getOpacityScale(0)).toEqual(1);
      expect(instance.getOpacityScale(1)).toEqual(0.75 ** 1);
      expect(instance.getOpacityScale(2)).toEqual(0.75 ** 2);
      expect(instance.getOpacityScale(3)).toEqual(0.75 ** 3);
      expect(instance.getOpacityScale(4)).toEqual(0.75 ** 2);
      expect(instance.getOpacityScale(5)).toEqual(0.75 ** 1);
    });

    it('should calculate the scale exponentially according to distance based on the opacityScale', () => {
      const wrapper = mount(
        <Scroll3DTransition
          slideIndex={0}
          slideCount={6}
          opacityScale={0.5}
          wrapAround
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          <p>Slide 4</p>
          <p>Slide 5</p>
          <p>Slide 6</p>
        </Scroll3DTransition>
      );
      const instance = wrapper.instance();

      expect(instance.getOpacityScale(0)).toEqual(1);
      expect(instance.getOpacityScale(1)).toEqual(0.5 ** 1);
      expect(instance.getOpacityScale(2)).toEqual(0.5 ** 2);
      expect(instance.getOpacityScale(3)).toEqual(0.5 ** 3);
      expect(instance.getOpacityScale(4)).toEqual(0.5 ** 2);
      expect(instance.getOpacityScale(5)).toEqual(0.5 ** 1);
    });

    it('should calculate the scale exponentially according to distance based on the opacityScale', () => {
      const wrapper = mount(
        <Scroll3DTransition
          slideIndex={0}
          slideCount={6}
          opacityScale={0.75}
          wrapAround={false}
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          <p>Slide 4</p>
          <p>Slide 5</p>
          <p>Slide 6</p>
        </Scroll3DTransition>
      );
      const instance = wrapper.instance();

      expect(instance.getOpacityScale(0)).toEqual(1);
      expect(instance.getOpacityScale(1)).toEqual(0.75 ** 1);
      expect(instance.getOpacityScale(2)).toEqual(0.75 ** 2);
      expect(instance.getOpacityScale(3)).toEqual(0.75 ** 3);
      expect(instance.getOpacityScale(4)).toEqual(0.75 ** 4);
      expect(instance.getOpacityScale(5)).toEqual(0.75 ** 5);
    });

    it('should calculate the scale exponentially according to distance based on the opacityScale', () => {
      const wrapper = mount(
        <Scroll3DTransition
          slideIndex={0}
          slideCount={6}
          opacityScale={0.5}
          wrapAround={false}
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          <p>Slide 4</p>
          <p>Slide 5</p>
          <p>Slide 6</p>
        </Scroll3DTransition>
      );
      const instance = wrapper.instance();

      expect(instance.getOpacityScale(0)).toEqual(1);
      expect(instance.getOpacityScale(1)).toEqual(0.5 ** 1);
      expect(instance.getOpacityScale(2)).toEqual(0.5 ** 2);
      expect(instance.getOpacityScale(3)).toEqual(0.5 ** 3);
      expect(instance.getOpacityScale(4)).toEqual(0.5 ** 4);
      expect(instance.getOpacityScale(5)).toEqual(0.5 ** 5);
    });
  });
});
