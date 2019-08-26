import React from 'react';

export const addAccessibility = (children, slidesToShow, currentSlide) => {
  let needsTabIndex;
  if (slidesToShow > 1) {
    return React.Children.map(children, (child, index) => {
      // create a range from first visible slide to last visible slide
      const firstVisibleSlide = index >= currentSlide;
      const lastVisibleSlide = index < slidesToShow + currentSlide;
      needsTabIndex = firstVisibleSlide && lastVisibleSlide;
      // if the index of the slide is in range add ariaProps to the slide
      const ariaProps = needsTabIndex
        ? { 'aria-hidden': 'false', tabIndex: 0 }
        : { 'aria-hidden': 'true' };
      return React.cloneElement(child, {
        ...child.props,
        ...ariaProps
      });
    });
  } else {
    // when slidesToshow is 1
    return React.Children.map(children, (child, index) => {
      needsTabIndex = index !== currentSlide;
      const ariaProps = needsTabIndex
        ? { 'aria-hidden': 'true' }
        : { 'aria-hidden': 'false', tabIndex: 0 };
      return React.cloneElement(child, {
        ...child.props,
        ...ariaProps
      });
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
    const currentSlideHeight = slides[i].offsetHeight;
    if (currentSlideHeight > maxHeight) {
      maxHeight = currentSlideHeight;
    }
  }
  return maxHeight;

  // return Array.from(slides).reduce((maxHeight, currentSlide) => {
  //   const currentSlideHeight = currentSlide.getBoundingClientRect().height;
  //   return currentSlideHeight > maxHeight ? currentSlideHeight : maxHeight;
  // }, 0);
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
