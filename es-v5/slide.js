import React, { useRef, useEffect } from 'react';
import { Alignment } from './types';

var getSlideWidth = function getSlideWidth(count, wrapAround) {
  return "".concat(wrapAround ? 100 / (3 * count) : 100 / count, "%");
};

var getSlideStyles = function getSlideStyles(count, isCurrentSlide, isVisibleSlide, wrapAround, cellSpacing, animation, speed, zoomScale, adaptiveHeight) {
  var width = getSlideWidth(count, wrapAround);
  var visibleSlideOpacity = isVisibleSlide ? 1 : 0;
  var animationSpeed = animation === 'fade' ? 200 : 500;
  return {
    width: width,
    flex: 1,
    height: adaptiveHeight ? '100%' : 'auto',
    padding: "0 ".concat(cellSpacing ? cellSpacing / 2 : 0, "px"),
    transition: animation ? "".concat(speed || animationSpeed, "ms ease 0s") : undefined,
    transform: "".concat(animation === 'zoom' ? "scale(".concat(isCurrentSlide ? 1 : zoomScale || 0.85, ")") : undefined),
    opacity: animation === 'fade' ? visibleSlideOpacity : 1
  };
};

var isVisibleSlide = function isVisibleSlide(currentSlide, index, slidesToShow, cellAlign) {
  if (slidesToShow === 1) {
    return index === currentSlide;
  }

  if (cellAlign === Alignment.Left) {
    return index < currentSlide + slidesToShow && index >= currentSlide;
  }

  if (cellAlign === Alignment.Center) {
    return index >= currentSlide - slidesToShow / 2 && index <= currentSlide || index > currentSlide && index <= currentSlide + slidesToShow / 2;
  }

  if (cellAlign === Alignment.Right) {
    return index <= currentSlide && index > currentSlide - slidesToShow;
  }

  return false;
};

var generateIndex = function generateIndex(index, count, typeOfSlide) {
  if (typeOfSlide === 'prev-cloned') {
    return index - count;
  }

  if (typeOfSlide === 'next-cloned') {
    return index + count;
  }

  return index;
};

var Slide = function Slide(_ref) {
  var count = _ref.count,
      children = _ref.children,
      currentSlide = _ref.currentSlide,
      index = _ref.index,
      isCurrentSlide = _ref.isCurrentSlide,
      typeOfSlide = _ref.typeOfSlide,
      wrapAround = _ref.wrapAround,
      cellSpacing = _ref.cellSpacing,
      animation = _ref.animation,
      speed = _ref.speed,
      slidesToShow = _ref.slidesToShow,
      zoomScale = _ref.zoomScale,
      cellAlign = _ref.cellAlign,
      onVisibleSlideHeightChange = _ref.onVisibleSlideHeightChange,
      adaptiveHeight = _ref.adaptiveHeight,
      slideClassName = _ref.slideClassName;
  var customIndex = wrapAround ? generateIndex(index, count, typeOfSlide) : index;
  var isVisible = isVisibleSlide(currentSlide, customIndex, slidesToShow, cellAlign);
  var slideRef = useRef(null);
  var prevIsVisibleRef = useRef(false);
  useEffect(function () {
    var node = slideRef.current;

    if (node) {
      var _node$getBoundingClie;

      var slideHeight = (_node$getBoundingClie = node.getBoundingClientRect()) === null || _node$getBoundingClie === void 0 ? void 0 : _node$getBoundingClie.height;

      if (isVisible) {
        node.removeAttribute('inert');
      } else {
        node.setAttribute('inert', 'true');
      }

      var prevIsVisible = prevIsVisibleRef.current;

      if (isVisible && !prevIsVisible) {
        onVisibleSlideHeightChange(customIndex, slideHeight);
      } else if (!isVisible && prevIsVisible) {
        onVisibleSlideHeightChange(customIndex, null);
      }

      prevIsVisibleRef.current = isVisible;
    }
  }, [adaptiveHeight, customIndex, isVisible, onVisibleSlideHeightChange, slidesToShow]);
  return /*#__PURE__*/React.createElement("div", {
    ref: slideRef,
    className: ['slide', typeOfSlide, isVisible && 'slide-visible', slideClassName].filter(function (value) {
      return value;
    }).join(' '),
    style: getSlideStyles(count, isCurrentSlide, isVisible, wrapAround, cellSpacing, animation, speed, zoomScale, adaptiveHeight)
  }, children);
};

export default Slide;