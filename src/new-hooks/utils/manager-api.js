import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { slides } from '../components/slider';

const SlideManager = props => {
  const [slideIndex, setSlideIndex] = useState(2);
  const slidesToShow = props.slidesToShow || 1;
  const children = slides(props.children);
  const slideCount = children.length;
  console.log(children, slidesToShow);

  const getCurrentSlides = () => {
    const currentSlides = _.slice(
      children,
      slideIndex,
      slideIndex + slidesToShow
    );
    console.log(currentSlides);
    return currentSlides;
  };

  const getPrevSlides = () => {
    const prevSlide = slideIndex - 1;
    const prevSlides = _.slice(children, slideIndex - slidesToShow, slideIndex);
    console.log(prevSlides);
    return prevSlides;
  };

  const getNextSlides = () => {
    const nextSlides = _.slice(
      children,
      slideIndex + 1,
      slideIndex + 1 + slidesToShow
    );
    console.log(nextSlides);
    return nextSlides;
  };

  const goToSlide = ({ index }) => {
    return children[index];
  };
  return [getCurrentSlides, getPrevSlides, getNextSlides, goToSlide];
};

export default SlideManager;

// export const getSlideIndex = () => {};

// export const getCurrentSlide = () => {};

// export const getPrevSlide = () => {};

// export const getNextSlide = () => {};

// export const getSlideCount = () => {};
