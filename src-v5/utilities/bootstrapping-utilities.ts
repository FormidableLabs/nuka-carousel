import React from 'react';

export const getValidChildren = (children) => {
  // .toArray automatically removes invalid React children
  return React.Children.toArray(children);
};

const getMax = (a, b) => {
  return a > b ? a : b;
};

const getHeightOfSlide = (slide) => {
  if (!slide) {
    return 0;
  }

  if (slide.children && slide.children.length > 0) {
    let totalHeight = 0;
    for (let i = 0; i < slide.children.length; ++i) {
      totalHeight += slide.children[i].offsetHeight;
    }
    return totalHeight;
  } else {
    return slide.offsetHeight;
  }
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
      maxHeight = getMax(getHeightOfSlide(slides[i]), maxHeight);
    }
  } else if (start > end) {
    // Finding max in a wrap around
    for (let i = start; i < slides.length; i++) {
      maxHeight = getMax(getHeightOfSlide(slides[i]), maxHeight);
    }

    for (let i = 0; i < end; i++) {
      maxHeight = getMax(getHeightOfSlide(slides[i]), maxHeight);
    }
  } else {
    // start === end
    maxHeight = getHeightOfSlide(slides[start]);
  }

  return maxHeight;
};

const ensureIndexInBounds = (index, slideCount) => {
  let newIndex = index;
  while (newIndex < 0) {
    newIndex += slideCount;
  }
  while (newIndex > slideCount) {
    newIndex -= slideCount;
  }
  return newIndex;
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
      case 'left':
        startIndex = currentSlide;
        lastIndex = Math.ceil(currentSlide + offset) + 1;
        break;
    }

    // inclusive
    startIndex = wrapAround
      ? ensureIndexInBounds(startIndex, slides.length)
      : Math.max(startIndex, 0);

    // exclusive
    lastIndex = wrapAround
      ? ensureIndexInBounds(lastIndex, slides.length)
      : Math.min(lastIndex, slides.length);

    return findMaxHeightSlideInRange(slides, startIndex, lastIndex);
  } else {
    return getHeightOfSlide(slides[currentSlide]);
  }
};

export const calculateSlideHeight = (props, state, childNodes = []) => {
  const { heightMode, vertical, initialSlideHeight, wrapAround } = props;
  const { slidesToShow, currentSlide, cellAlign } = state;
  const firstSlide = childNodes[0];

  if (firstSlide && heightMode === 'first') {
    return vertical
      ? getHeightOfSlide(firstSlide) * slidesToShow
      : getHeightOfSlide(firstSlide);
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
