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
    goToSlide,
    slideCount
  } = useSlideManager(props);
  console.log(goToSlide);
  const handlePrev = goToPrev;
  const handleNext = goToNext;
  const handleGoTo = goToSlide;
  console.log(handleGoTo);
  return (
    <div
      className={`container ${props.carouselContainerClassName || ''}`}
      style={getContainerStyle(props)}
    >
      <Slider slides={[...prevSlides, ...currentSlides, ...nextSlides]} />
      <Controls
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleGoTo={handleGoTo}
        slideCount={slideCount}
      />
    </div>
  );
};

export default Carousel;
