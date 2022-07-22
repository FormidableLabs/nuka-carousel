import React from 'react';
var styles = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  padding: 0,
  margin: '-1px',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0
};

var AnnounceSlide = function AnnounceSlide(_ref) {
  var message = _ref.message,
      _ref$ariaLive = _ref.ariaLive,
      ariaLive = _ref$ariaLive === void 0 ? 'polite' : _ref$ariaLive;
  return /*#__PURE__*/React.createElement("div", {
    "aria-live": ariaLive,
    "aria-atomic": "true",
    style: styles,
    tabIndex: -1
  }, message);
};

export var defaultRenderAnnounceSlideMessage = function defaultRenderAnnounceSlideMessage(_ref2) {
  var currentSlide = _ref2.currentSlide,
      count = _ref2.count;
  return "Slide ".concat(currentSlide + 1, " of ").concat(count);
};
export default AnnounceSlide;