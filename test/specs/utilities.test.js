/*eslint max-nested-callbacks: ["error", 4]*/
import { _addAccessibility } from '../../src/utilities';
import Carousel from '../../src';

describe('utilities.js', () => {
  describe('#_addAccessibility', () => {
    const wrapper = mount(
      <Carousel>
        <p>Slide 1</p>
        <p>Slide 2</p>
        <p>Slide 3</p>
      </Carousel>
    );
    const children = wrapper.find('p');
    let slidesToShow;
    let currentSlide;
    describe('when slideToShow equals one', () => {
      it('should add correct props to children', () => {
        slidesToShow = 1;
        currentSlide = 0;
        const addPropsToChildren = _addAccessibility(
          children,
          slidesToShow,
          currentSlide
        );
        const firstChild = addPropsToChildren[0];
        const secondChild = addPropsToChildren[1];
        expect(addPropsToChildren).toHaveLength(3);
        expect(firstChild.props.tabIndex).toBe(0);
        expect(firstChild.props['aria-hidden']).toBe('false');
        expect(secondChild.props.tabIndex).toBe(undefined);
        expect(secondChild.props['aria-hidden']).toBe('true');
      });
    });

    describe('when slidesToShow equals 2', () => {
      it('should add correct props to children', () => {
        slidesToShow = 2;
        currentSlide = 0;
        const addPropsToChildren = _addAccessibility(
          children,
          slidesToShow,
          currentSlide
        );
        const firstChild = addPropsToChildren[0];
        const secondChild = addPropsToChildren[1];
        const thirdChild = addPropsToChildren[2];
        expect(addPropsToChildren).toHaveLength(3);
        expect(firstChild.props.tabIndex).toBe(0);
        expect(firstChild.props['aria-hidden']).toBe('false');
        expect(secondChild.props.tabIndex).toBe(0);
        expect(secondChild.props['aria-hidden']).toBe('false');
        expect(thirdChild.props.tabIndex).toBe(undefined);
        expect(thirdChild.props['aria-hidden']).toBe('true');
      });
    });
  });
});
