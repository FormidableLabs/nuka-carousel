import React from 'react';
import Slider from './slider';
import './anim-style.css';
import Controls from './controls';
import { getContainerStyle } from '../style-utils/container-styles';

import useSlideManager from '../utils/manager-api';

const Carousel = props => {
  const {
    goToNext,
    goToPrev,
    goToSlide,
    slideCount,
    slideIndex,
    slideDirection
  } = useSlideManager(props);

  const handlePrev = goToPrev;
  const handleNext = goToNext;
  const handleGoTo = goToSlide;

  return (
    <div
      className={`container ${props.carouselContainerClassName || ''}`}
      style={getContainerStyle(props)}
    >
      <Slider
        slideIndex={slideIndex}
        slideDirection={slideDirection}
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
