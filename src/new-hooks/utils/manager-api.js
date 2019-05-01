import _ from 'lodash';
import { slides } from '../components/slide';
import React, { useState } from 'react';

const useSlideManager = props => {
  const [slideIndex, setSlideIndex] = useState(props.slideIndex || 0);
  const slidesToShow = props.slidesToShow || 1;
  const children = slides(props.children);
  const slideCount = children.length;
  console.log('slideIndex', slideIndex);

  const getCurrentSlides = () => {
    const currentSlides = _.slice(
      children,
      slideIndex,
      slideIndex + slidesToShow
    );
    return currentSlides;
  };

  const getPrevSlides = () => {
    const prevSlides = _.slice(children, slideIndex - slidesToShow, slideIndex);
    return prevSlides;
  };

  const getNextSlides = () => {
    const nextSlides = _.slice(
      children,
      slideIndex + 1,
      slideIndex + 1 + slidesToShow
    );
    return nextSlides;
  };

  const goToSlide = index => {
    console.log('clicked', index);
    setSlideIndex(index);
    return children[index];
  };

  const goToNext = () => {
    setSlideIndex((slideIndex + 1) % slideCount);
  };

  const goToPrev = () => {
    setSlideIndex((slideIndex - 1 + slideCount) % slideCount);
  };

  return {
    currentSlides: getCurrentSlides(),
    prevSlides: getPrevSlides(),
    nextSlides: getNextSlides(),
    slideCount,
    goToNext,
    goToPrev,
    goToSlide
  };
};

export default useSlideManager;
