import React from 'react';
import { mount } from 'enzyme';
import Carousel from '../../src';

describe('<Carousel />', () => {
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
});
