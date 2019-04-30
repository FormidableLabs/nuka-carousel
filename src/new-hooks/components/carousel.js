import React, { useState } from 'react';
import Slider from './slider';
import Controls from './controls';
import { getContainerStyle } from '../style-utils/container-styles';
import SlideManager from '../utils/manager-api';

const Carousel = props => {
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderLength = props.children.length;

  const handlePrev = () =>
    setSlideIndex((slideIndex - 1 + sliderLength) % sliderLength);

  const handleNext = () => setSlideIndex((slideIndex + 1) % sliderLength);

  return (
    <div
      className={`container ${props.carouselContainerClassName || ''}`}
      style={getContainerStyle(props)}
    >
      <SlideManager {...props} />
      <Slider slideIndex={slideIndex}>{props.children}</Slider>
      <Controls handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  );
};

export default Carousel;
