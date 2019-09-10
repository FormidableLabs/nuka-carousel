import React from 'react';
export var addAccessibility = function addAccessibility(children, slidesToShow) {
  if (slidesToShow > 1) {
    return React.Children.map(children, function (child) {
      return React.cloneElement(child, child.props);
    });
  } else {
    // when slidesToshow is 1
    return React.Children.map(children, function (child) {
      return React.cloneElement(child, child.props);
    });
  }
};
export var getValidChildren = function getValidChildren(children) {
  // .toArray automatically removes invalid React children
  return React.Children.toArray(children);
};

var findMaxHeightSlide = function findMaxHeightSlide(slides) {
  var maxHeight = 0;

  for (var i = 0; i < slides.length; i++) {
    if (slides[i].offsetHeight > maxHeight) {
      maxHeight = slides[i].offsetHeight;
    }
  }

  return maxHeight;
};

export var getSlideHeight = function getSlideHeight(props, state) {
  var childNodes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var heightMode = props.heightMode,
      vertical = props.vertical,
      initialSlideHeight = props.initialSlideHeight;
  var slidesToShow = state.slidesToShow,
      currentSlide = state.currentSlide;
  var firstSlide = childNodes[0];

  if (firstSlide && heightMode === 'first') {
    return vertical ? firstSlide.offsetHeight * slidesToShow : firstSlide.offsetHeight;
  }

  if (heightMode === 'max') {
    return findMaxHeightSlide(childNodes);
  }

  if (heightMode === 'current') {
    return childNodes[currentSlide].offsetHeight;
  }

  return initialSlideHeight || 100;
};