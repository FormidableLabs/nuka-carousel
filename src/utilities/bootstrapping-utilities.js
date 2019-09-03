import React from 'react';

export const addAccessibility = (children, slidesToShow) => {
  if (slidesToShow > 1) {
    return React.Children.map(children, child => {
      return React.cloneElement(child, child.props);
    });
  } else {
    // when slidesToshow is 1
    return React.Children.map(children, child => {
      return React.cloneElement(child, child.props);
    });
  }
};

export const getValidChildren = children => {
  // .toArray automatically removes invalid React children
  return React.Children.toArray(children);
};

const findMaxHeightSlide = slides => {
  let maxHeight = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].offsetHeight > maxHeight) {
      maxHeight = slides[i].offsetHeight;
    }
  }
  return maxHeight;
};

export const getSlideHeight = (props, state, childNodes = []) => {
  const { heightMode, vertical, initialSlideHeight } = props;
  const { slidesToShow, currentSlide } = state;
  const firstSlide = childNodes[0];

  if (firstSlide && heightMode === 'first') {
    return vertical
      ? firstSlide.offsetHeight * slidesToShow
      : firstSlide.offsetHeight;
  }
  if (heightMode === 'max') {
    return findMaxHeightSlide(childNodes);
  }
  if (heightMode === 'current') {
    return childNodes[currentSlide].offsetHeight;
  }
  return initialSlideHeight || 100;
};
