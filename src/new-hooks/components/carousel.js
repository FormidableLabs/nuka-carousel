import React, { useState } from 'react';
import Slider from './slider';
import Controls from './controls';

import useSlideManager from '../utils/manager-api';

const Carousel = props => {
  console.log('carousel props', props);
  const {
    currentSlides,
    prevSlides,
    nextSlides,
    goToNext,
    goToPrev,
    goToSlide,
    slideCount
  } = useSlideManager(props);

  const handlePrev = goToPrev;
  const handleNext = goToNext;
  const handleGoTo = goToSlide;

  return (
    <div className={`container ${props.carouselContainerClassName || ''}`}>
      <Slider
        prev={prevSlides}
        current={currentSlides}
        next={nextSlides}
        {...props}
      />

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
