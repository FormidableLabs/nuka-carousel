/*eslint max-nested-callbacks: ["error", 5]*/
import FadeTransition from '../../src/transitions/fade-transition';

describe('<FadeTransition />', () => {
  describe('#getSlideOpacityAndLeftMap', () => {
    let instance;

    describe('single slide transition', () => {
      const slideCount = 4;

      const verifyMapForSingleSlide = (map, fadeFrom, fadeTo, fromOpacity) => {
        const toOpacity = 1.0 - fromOpacity;

        for (let i = 0; i < slideCount; i++) {
          switch (i) {
            case fadeFrom:
              expect(map[i].opacity).toEqual(fromOpacity);
              expect(map[i].left).toEqual(0);
              break;
            case fadeTo:
              expect(map[i].opacity).toEqual(toOpacity);
              expect(map[i].left).toEqual(0);
              break;
            default:
              expect(map[i]).toBeUndefined();
              break;
          }
        }
      };

      beforeEach(async () => {
        const wrapper = mount(
          <FadeTransition slideCount={slideCount} slideWidth={100}>
            <p>Slide 1</p>
            <p>Slide 2</p>
            <p>Slide 3</p>
            <p>Slide 4</p>
          </FadeTransition>
        );

        instance = wrapper.instance();
      });

      it('should calculate opacity & left for only 1 slide if fadeFrom equals fadeTo', () => {
        const fadeFrom = 2;
        const fadeTo = 2;
        const fade = 0;

        const map = instance.getSlideOpacityAndLeftMap(fadeFrom, fadeTo, fade);

        verifyMapForSingleSlide(map, fadeFrom, fadeTo, 1);
      });

      it('should calculate opacity & left between two slides next to each other', () => {
        const fadeFrom = 2;
        const fadeTo = 3;
        const fade = 2.75;

        const map = instance.getSlideOpacityAndLeftMap(fadeFrom, fadeTo, fade);

        verifyMapForSingleSlide(map, fadeFrom, fadeTo, 0.25);
      });

      it('should calculate opacity & left between two slides further apart', () => {
        const fadeFrom = 1;
        const fadeTo = 3;
        const fade = 2;

        const map = instance.getSlideOpacityAndLeftMap(fadeFrom, fadeTo, fade);

        verifyMapForSingleSlide(map, fadeFrom, fadeTo, 0.5);
      });

      it('should calculate opacity & left when wrapping around first slide to last', () => {
        const fadeFrom = 0;
        const fadeTo = slideCount - 1;
        const fade = -0.75;

        const map = instance.getSlideOpacityAndLeftMap(fadeFrom, fadeTo, fade);

        verifyMapForSingleSlide(map, fadeFrom, fadeTo, 0.25);
      });

      it('should calculate opacity & left when wrapping around last slide to first', () => {
        const fadeFrom = slideCount - 1;
        const fadeTo = 0;
        const fade = fadeFrom + 0.75;

        const map = instance.getSlideOpacityAndLeftMap(fadeFrom, fadeTo, fade);

        verifyMapForSingleSlide(map, fadeFrom, fadeTo, 0.25);
      });
    });

    describe('multple slide transtion', () => {
      const slidesToShow = 2;
      const slideCount = 6;
      const slideWidth = 100;

      const verifyMapForMultipleSlides = (
        map,
        fadeFrom,
        fadeTo,
        fromOpacity
      ) => {
        const toOpacity = 1.0 - fromOpacity;

        for (let i = 0; i < slideCount; i++) {
          switch (i) {
            case fadeFrom:
            case fadeFrom + 1:
              expect(map[i].opacity).toEqual(fromOpacity);
              expect(map[i].left).toEqual((i - fadeFrom) * slideWidth);
              break;
            case fadeTo:
            case fadeTo + 1:
              expect(map[i].opacity).toEqual(toOpacity);
              expect(map[i].left).toEqual((i - fadeTo) * slideWidth);
              break;
            default:
              expect(map[i]).toBeUndefined();
              break;
          }
        }
      };

      beforeEach(async () => {
        const wrapper = mount(
          <FadeTransition
            slidesToShow={slidesToShow}
            slideCount={slideCount}
            slideWidth={slideWidth}
          >
            <p>Slide 1</p>
            <p>Slide 2</p>
            <p>Slide 3</p>
            <p>Slide 4</p>
            <p>Slide 5</p>
            <p>Slide 6</p>
          </FadeTransition>
        );

        instance = wrapper.instance();
      });

      it(`should calculate opacity & left for only ${slidesToShow} slides if fadeFrom equals fadeTo`, () => {
        const fadeFrom = 2;
        const fadeTo = 2;
        const fade = 0;

        const map = instance.getSlideOpacityAndLeftMap(fadeFrom, fadeTo, fade);

        verifyMapForMultipleSlides(map, fadeFrom, fadeTo, 1);
      });

      it('should calculate opacity & left between two slide pages next to each other', () => {
        const fadeFrom = 0;
        const fadeTo = 2;
        const fade = 1.5;

        const map = instance.getSlideOpacityAndLeftMap(fadeFrom, fadeTo, fade);

        verifyMapForMultipleSlides(map, fadeFrom, fadeTo, 0.25);
      });

      it('should calculate opacity & left between two slide pages further apart', () => {
        const fadeFrom = 0;
        const fadeTo = 4;
        const fade = 2;

        const map = instance.getSlideOpacityAndLeftMap(fadeFrom, fadeTo, fade);

        verifyMapForMultipleSlides(map, fadeFrom, fadeTo, 0.5);
      });

      it('should calculate opacity & left when wrapping around first slide page to last', () => {
        const fadeFrom = 0;
        const fadeTo = slideCount - slidesToShow;
        const fade = -1.5;

        const map = instance.getSlideOpacityAndLeftMap(fadeFrom, fadeTo, fade);

        verifyMapForMultipleSlides(map, fadeFrom, fadeTo, 0.25);
      });

      it('should calculate opacity & left when wrapping around last slide page to first', () => {
        const fadeFrom = slideCount - slidesToShow;
        const fadeTo = 0;
        const fade = fadeFrom + 1.0;

        const map = instance.getSlideOpacityAndLeftMap(fadeFrom, fadeTo, fade);

        verifyMapForMultipleSlides(map, fadeFrom, fadeTo, 0.5);
      });
    });
  });
});
