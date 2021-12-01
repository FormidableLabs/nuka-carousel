import React from 'react';
import { getAlignmentOffset } from './style-utilities';
import { Alignment } from './types';

export const addEvent = function (
  elem: any,
  type: string,
  eventHandle: () => {}
) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }
  if (elem.addEventListener) {
    elem.addEventListener(type, eventHandle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent(`on${type}`, eventHandle);
  } else {
    elem[`on${type}`] = eventHandle;
  }
};

export const removeEvent = function (
  elem: any,
  type: string,
  eventHandle: () => {}
) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }
  if (elem.removeEventListener) {
    elem.removeEventListener(type, eventHandle, false);
  } else if (elem.detachEvent) {
    elem.detachEvent(`on${type}`, eventHandle);
  } else {
    elem[`on${type}`] = null;
  }
};

export const addAccessibility = (
  children: React.ReactNode,
  slidesToShow: number,
  currentSlide: number
) => {
  let needsTabIndex;
  if (slidesToShow > 1) {
    return React.Children.map(children, (child, index) => {
      const firstVisibleSlide = index >= currentSlide;
      const lastVisibleSlide = index < slidesToShow + currentSlide;
      needsTabIndex = firstVisibleSlide && lastVisibleSlide;
      const ariaProps = needsTabIndex
        ? { 'aria-hidden': 'false', tabIndex: 0 }
        : { 'aria-hidden': 'true' };
      return React.cloneElement(child, {
        ...ariaProps,
        ...child.props
      });
    });
  }
  return React.Children.map(children, (child, index) => {
    needsTabIndex = index !== currentSlide;
    const ariaProps = needsTabIndex
      ? { 'aria-hidden': 'true' }
      : { 'aria-hidden': 'false', tabIndex: 0 };
    return React.cloneElement(child, {
      ...ariaProps,
      ...child.props
    });
  });
};

export const getSlideClassName = (
  index: number,
  currentSlide: number,
  slidesToShow: number
): string => {
  let className = '';
  const visible = index >= currentSlide && index < currentSlide + slidesToShow;
  const current = index === currentSlide;

  if (visible) {
    className = ' slide-visible';
    if (current) {
      className = className.concat(' slide-current');
    }
  }
  return className;
};

export const getPropsByTransitionMode = (props, keys: string[]) => {
  const { slidesToShow, transitionMode } = props;
  const updatedDefaults: { [key: string]: string | number } = {};
  if (transitionMode === 'fade') {
    keys.forEach((key: string) => {
      switch (key) {
        case 'slidesToShow':
          updatedDefaults[key] = Math.max(parseInt(slidesToShow), 1);
          break;
        case 'slidesToScroll':
          updatedDefaults[key] = Math.max(parseInt(slidesToShow), 1);
          break;
        case 'cellAlign':
          updatedDefaults[key] = 'left';
          break;
        default:
          updatedDefaults[key] = props[key];
          break;
      }
    });
  } else {
    keys.forEach((key: string) => {
      updatedDefaults[key] = props[key];
    });
  }

  return updatedDefaults;
};

export const swipeDirection = (
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  vertical: boolean
): number => {
  const xDist = x1 - x2;
  const yDist = y1 - y2;
  const r = Math.atan2(yDist, xDist);
  let swipeAngle = Math.round((r * 180) / Math.PI);

  if (swipeAngle < 0) {
    swipeAngle = 360 - Math.abs(swipeAngle);
  }
  if (swipeAngle <= 45 && swipeAngle >= 0) {
    return 1;
  }
  if (swipeAngle <= 360 && swipeAngle >= 315) {
    return 1;
  }
  if (swipeAngle >= 135 && swipeAngle <= 225) {
    return -1;
  }
  if (vertical === true) {
    if (swipeAngle >= 35 && swipeAngle <= 135) {
      return 1;
    }
    return -1;
  }
  return 0;
};

export const getSlideDirection = (
  start: number,
  end: number,
  isWrapping: boolean
): number => {
  let direction = 0;

  if (start === end) return direction;
  if (isWrapping) {
    direction = start < end ? -1 : 1;
  } else {
    direction = start < end ? 1 : -1;
  }

  return direction;
};

export const shouldUpdate = (curr, next, keys) => {
  let update = false;

  for (let i = 0; i < keys.length; i++) {
    if (curr[keys[i]] !== next[keys[i]]) {
      update = true;
      break;
    }
  }

  return update;
};

export const calcSomeInitialState = (props) => {
  const {
    slidesToScroll,
    slidesToShow,
    cellAlign
  } = getPropsByTransitionMode(props, [
    'slidesToScroll',
    'slidesToShow',
    'cellAlign'
  ]);

  const slideWidth = props.vertical
    ? props.initialSlideHeight || 0
    : props.initialSlideWidth || 0;
  const slideHeight = props.vertical
    ? (props.initialSlideHeight || 0) * props.slidesToShow
    : props.initialSlideHeight || 0;

  const frameHeight = slideHeight + props.cellSpacing * (slidesToShow - 1);
  const frameWidth = props.vertical ? frameHeight : null;

  return {
    slideWidth,
    slideHeight,
    frameWidth,
    slidesToScroll,
    slidesToShow,
    cellAlign
  };
};

export const handleSelfFocus = (e) => {
  if (e && e.currentTarget) {
    e.currentTarget.focus();
  }
};

export const isFullyVisible = (
  slideIndex: number,
  config: {
    currentSlide: number;
    cellSpacing: number;
    slideCount: number;
    slideWidth: number;
    frameWidth: number;
    wrapAround: boolean;
    cellAlign: Alignment;
  }
): boolean => {
  const {
    currentSlide,
    cellSpacing,
    slideCount,
    slideWidth,
    frameWidth,
    wrapAround,
    cellAlign
  } = config;

  // Slide width can't be 0
  const fullSlideWidth = slideWidth || 1;
  // Calculate offset without cellSpacing
  const offsetWidth =
    getAlignmentOffset(currentSlide, config) + cellSpacing * currentSlide;
  const remainingWidth = frameWidth - offsetWidth;

  let fullSlidesBefore = 0;

  if (cellAlign !== Alignment.Left) {
    fullSlidesBefore = Math.max(
      Math.floor(offsetWidth / fullSlideWidth) + 1,
      0
    );
  } else {
    fullSlidesBefore = Math.max(Math.floor(offsetWidth / fullSlideWidth), 0);
  }

  let fullSlidesAfter = Math.max(
    Math.floor(remainingWidth / fullSlideWidth),
    0
  );
  // when slidesToScroll is auto enable clicking of all fully visible slides
  if (
    fullSlidesAfter + fullSlidesBefore + currentSlide >= slideCount &&
    !wrapAround
  ) {
    const fullSlidesAuto = fullSlidesBefore + fullSlidesAfter;
    fullSlidesAfter = fullSlidesAuto;
    fullSlidesBefore = fullSlidesAuto;
  }
  const currentSlideIndex = Math.ceil(currentSlide);
  const fullyVisibleSlides = [];

  for (
    let i = currentSlideIndex - fullSlidesBefore;
    i < currentSlideIndex + fullSlidesAfter + 1;
    i++
  ) {
    if (i < 0) {
      // -1 won't match a slide index
      fullyVisibleSlides.push(wrapAround ? slideCount + i : -1);
    } else {
      fullyVisibleSlides.push(i > slideCount - 1 ? i - slideCount : i);
    }
  }
  return fullyVisibleSlides.includes(slideIndex);
};
