"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultRenderAnnounceSlideMessage = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  return /*#__PURE__*/_react["default"].createElement("div", {
    "aria-live": ariaLive,
    "aria-atomic": "true",
    style: styles,
    tabIndex: -1
  }, message);
};

var defaultRenderAnnounceSlideMessage = function defaultRenderAnnounceSlideMessage(_ref2) {
  var currentSlide = _ref2.currentSlide,
      count = _ref2.count;
  return "Slide ".concat(currentSlide + 1, " of ").concat(count);
};

exports.defaultRenderAnnounceSlideMessage = defaultRenderAnnounceSlideMessage;
var _default = AnnounceSlide;
exports["default"] = _default;