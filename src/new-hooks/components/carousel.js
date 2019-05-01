import React, { useState } from 'react';
import Slider from './slider';
import Controls from './controls';
import { getContainerStyle } from '../style-utils/container-styles';

import useSlideManager from '../utils/manager-api';

const Carousel = props => {
  const {
    currentSlides,
    prevSlides,
    nextSlides,
    goToNext,
    goToPrev,
    goToSlide
  } = useSlideManager(props);

  const handlePrev = goToPrev;

  const handleNext = goToNext;

  return (
    <div
      className={`container ${props.carouselContainerClassName || ''}`}
      style={getContainerStyle(props)}
    >
      <Slider slides={currentSlides} />
      <Controls handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  );
};

export default Carousel;
