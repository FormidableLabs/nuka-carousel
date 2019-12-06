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

const getMax = (a, b) => {
  return a > b ? a : b;
};

// end - is exclusive
export const findMaxHeightSlideInRange = (slides, start, end) => {
  let maxHeight = 0;

  if (
    slides.length === 0 ||
    start < 0 ||
    end < 0 ||
    start > slides.length - 1 ||
    end > slides.length
  ) {
    return maxHeight;
  }

  if (start < end) {
    for (let i = start; i < end; i++) {
      maxHeight = getMax(slides[i].offsetHeight, maxHeight);
    }
  } else if (start > end) {
    // Finding max in a wrap around
    for (let i = start; i < slides.length; i++) {
      maxHeight = getMax(slides[i].offsetHeight, maxHeight);
    }

    for (let i = 0; i < end; i++) {
      maxHeight = getMax(slides[i].offsetHeight, maxHeight);
    }
  } else {
    // start === end
    maxHeight = slides[start].offsetHeight;
  }

  return maxHeight;
};

export const findCurrentHeightSlide = (
  currentSlide,
  slidesToShow,
  alignment,
  wrapAround,
  slides
) => {
  if (slidesToShow > 1) {
    let startIndex = currentSlide;
    let lastIndex = Math.min(
      Math.ceil(slidesToShow) + currentSlide,
      slides.length
    );

    const offset =
      alignment === 'center' ? (slidesToShow - 1) / 2 : slidesToShow - 1;

    switch (alignment) {
      case 'center':
        startIndex = Math.floor(currentSlide - offset);
        lastIndex = Math.ceil(currentSlide + offset) + 1;
        break;

      case 'right':
        startIndex = Math.floor(currentSlide - offset);
        lastIndex = currentSlide + 1;
        break;
    }

    // inclusive
    startIndex =
      wrapAround && startIndex < 0
        ? slides.length + startIndex
        : Math.max(startIndex, 0);

    // exclusive
    lastIndex =
      wrapAround && lastIndex > slides.length
        ? lastIndex - slides.length
        : Math.min(lastIndex, slides.length);

    return findMaxHeightSlideInRange(slides, startIndex, lastIndex);
  } else {
    return slides[currentSlide].offsetHeight;
  }
};

export const getSlideHeight = (props, state, childNodes = []) => {
  const { heightMode, vertical, initialSlideHeight, wrapAround } = props;
  const { slidesToShow, currentSlide, cellAlign } = state;
  const firstSlide = childNodes[0];

  if (firstSlide && heightMode === 'first') {
    return vertical
      ? firstSlide.offsetHeight * slidesToShow
      : firstSlide.offsetHeight;
  }

  if (heightMode === 'max') {
    return findMaxHeightSlideInRange(childNodes, 0, childNodes.length);
  }

  if (heightMode === 'current') {
    return findCurrentHeightSlide(
      currentSlide,
      slidesToShow,
      cellAlign,
      wrapAround,
      childNodes
    );
  }

  return initialSlideHeight || 100;
};
