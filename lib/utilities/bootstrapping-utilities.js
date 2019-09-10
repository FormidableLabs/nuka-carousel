"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSlideHeight = exports.getValidChildren = exports.addAccessibility = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addAccessibility = function addAccessibility(children, slidesToShow) {
  if (slidesToShow > 1) {
    return _react["default"].Children.map(children, function (child) {
      return _react["default"].cloneElement(child, child.props);
    });
  } else {
    // when slidesToshow is 1
    return _react["default"].Children.map(children, function (child) {
      return _react["default"].cloneElement(child, child.props);
    });
  }
};

exports.addAccessibility = addAccessibility;

var getValidChildren = function getValidChildren(children) {
  // .toArray automatically removes invalid React children
  return _react["default"].Children.toArray(children);
};

exports.getValidChildren = getValidChildren;

var findMaxHeightSlide = function findMaxHeightSlide(slides) {
  var maxHeight = 0;

  for (var i = 0; i < slides.length; i++) {
    if (slides[i].offsetHeight > maxHeight) {
      maxHeight = slides[i].offsetHeight;
    }
  }

  return maxHeight;
};

var getSlideHeight = function getSlideHeight(props, state) {
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

exports.getSlideHeight = getSlideHeight;