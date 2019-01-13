import React from 'react';

export const addEvent = function(elem, type, eventHandle) {
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

export const removeEvent = function(elem, type, eventHandle) {
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

export const addAccessibility = (children, slidesToShow, currentSlide) => {
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
        ...child.props,
        ...ariaProps
      });
    });
  } else {
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

export const getPropsByTransitionMode = (props, keys) => {
  const { slidesToShow, transitionMode } = props;
  const updatedDefaults = {};
  if (transitionMode === 'fade') {
    keys.forEach(key => {
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
    keys.forEach(key => {
      updatedDefaults[key] = props[key];
    });
  }

  return updatedDefaults;
};

export const swipeDirection = (x1, x2, y1, y2, vertical) => {
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
    } else {
      return -1;
    }
  }
  return 0;
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

export const calcSomeInitialState = props => {
  const { slidesToScroll, slidesToShow, cellAlign } = getPropsByTransitionMode(
    props,
    ['slidesToScroll', 'slidesToShow', 'cellAlign']
  );
  const slideWidth = props.vertical
    ? props.initialSlideHeight || 0
    : props.initialSlideWidth || 0;
  const slideHeight = props.vertical
    ? (props.initialSlideHeight || 0) * props.slidesToShow
    : props.initialSlideHeight || 0;

  const frameHeight = slideHeight + props.cellSpacing * (slidesToShow - 1);

  const frameWidth = props.vertical ? frameHeight : '100%';
  return {
    slideWidth,
    slideHeight,
    frameWidth,
    slidesToScroll,
    slidesToShow,
    cellAlign
  };
};
