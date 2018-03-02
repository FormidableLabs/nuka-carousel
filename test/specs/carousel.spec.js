import React from 'react';
import { mount } from 'enzyme';
import Carousel from '../../src';

describe('<Carousel />', () => {
  describe('Rendering and Mounting', () => {
    it('should correctly mount with children.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const children = wrapper.find('p');
      expect(children).toHaveLength(3);
    });

    it('should render a div with the class `slider`.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const sliderDiv = wrapper.find('div.slider');
      expect(sliderDiv).toHaveLength(1);
    });

    it('should render a div with the class `slider-frame`.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const sliderFrameDiv = wrapper.find('div.slider-frame');
      expect(sliderFrameDiv).toHaveLength(1);
    });

    it('should render an ul with the class `slider-list`.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const sliderListUl = wrapper.find('ul.slider-list');
      expect(sliderListUl).toHaveLength(1);
    });

    it('should render children with the `slider-slide` class.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const children = wrapper.find('.slider-slide');
      expect(children).toHaveLength(3);
    });

    it('should render decorators by default.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const decorator1 = wrapper.find('.slider-decorator-0');
      const decorator2 = wrapper.find('.slider-decorator-0');
      const decorator3 = wrapper.find('.slider-decorator-0');
      expect(decorator1).toHaveLength(1);
      expect(decorator2).toHaveLength(1);
      expect(decorator3).toHaveLength(1);
    });
  });

  describe('Props', () => {
    it('should render with the class `slider` when no props are supplied.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const slider = wrapper.find('div.slider');
      expect(slider).toHaveLength(1);
    });

    it('should render with the class `test` with className supplied.', () => {
      const wrapper = mount(
        <Carousel className="test">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const slider = wrapper.find('div.test');
      expect(slider).toHaveLength(1);
    });

    it('should merge provided styles with default styles.', () => {
      const wrapper = mount(
        <Carousel style={{ backgroundColor: 'black' }}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const slider = wrapper.find('div.slider');
      expect(slider.props().style).toEqual(
        expect.objectContaining({ backgroundColor: 'black', display: 'block' })
      );
    });

    it('should align to 0 when `cellAlign` is `left`.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const slider = wrapper.find('.slider-list');
      expect(slider.props().style).toEqual(
        expect.objectContaining({ transform: 'translate3d(0px, 0px, 0)' })
      );
    });
  });

  describe('methods', () => {
    it('should advance if nextSlide() is called.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper.state().currentSlide).toEqual(0);
      wrapper.instance().nextSlide();
      expect(wrapper.state().currentSlide).toEqual(1);
    });

    it('should not advance past the last slide.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      wrapper.instance().nextSlide();
      wrapper.instance().nextSlide();
      expect(wrapper.state().currentSlide).toEqual(2);
      wrapper.instance().nextSlide();
      expect(wrapper.state().currentSlide).toEqual(2);
    });

    it('should not go back to the previous slide when index is 0.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper.state().currentSlide).toEqual(0);
      wrapper.instance().previousSlide();
      expect(wrapper.state().currentSlide).toEqual(0);
    });

    it('should go back to the previous slide when `previousSlide` is called.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper.state().currentSlide).toEqual(0);
      wrapper.instance().nextSlide();
      wrapper.instance().nextSlide();
      wrapper.instance().previousSlide();
      expect(wrapper.state().currentSlide).toEqual(1);
    });

    it('should go to correct slide when `goToSlide` is called.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper.state().currentSlide).toEqual(0);
      wrapper.instance().goToSlide(2);
      expect(wrapper.state().currentSlide).toEqual(2);
    });
  });
});
