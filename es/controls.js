"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _controlStyles = require("./control-styles");
var _defaultControls = require("./default-controls");
var _types = require("./types");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var controlsMap = [{
  funcName: 'renderTopLeftControls',
  key: _types.Positions.TopLeft
}, {
  funcName: 'renderTopCenterControls',
  key: _types.Positions.TopCenter
}, {
  funcName: 'renderTopRightControls',
  key: _types.Positions.TopRight
}, {
  funcName: 'renderCenterLeftControls',
  key: _types.Positions.CenterLeft
}, {
  funcName: 'renderCenterCenterControls',
  key: _types.Positions.CenterCenter
}, {
  funcName: 'renderCenterRightControls',
  key: _types.Positions.CenterRight
}, {
  funcName: 'renderBottomLeftControls',
  key: _types.Positions.BottomLeft
}, {
  funcName: 'renderBottomCenterControls',
  key: _types.Positions.BottomCenter
}, {
  funcName: 'renderBottomRightControls',
  key: _types.Positions.BottomRight
}];
var renderControls = function renderControls(props, slideCount, currentSlide, goToSlide, nextSlide, pause, prevSlide, setPause, slidesToScroll) {
  if (props.withoutControls) {
    return null;
  }
  var disableCheckProps = _objectSpread(_objectSpread({}, props), {}, {
    currentSlide: currentSlide,
    slideCount: slideCount
  });
  var nextDisabled = (0, _defaultControls.nextButtonDisabled)(disableCheckProps);
  var previousDisabled = (0, _defaultControls.prevButtonDisabled)(disableCheckProps);
  var pagingDotsIndices = (0, _defaultControls.getDotIndexes)(slideCount, slidesToScroll, props.scrollMode, props.slidesToShow, props.wrapAround, props.cellAlign);
  return controlsMap.map(function (control) {
    var _props$control$funcNa;
    if (!props[control.funcName] || typeof props[control.funcName] !== 'function') {
      return /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
        key: control.funcName
      });
    }
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: control.funcName,
      style: _objectSpread(_objectSpread({}, (0, _controlStyles.getControlContainerStyles)(control.key)), {}, {
        pointerEvents: 'none'
      })
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: ["slider-control-".concat(control.key.toLowerCase()), props.defaultControlsConfig.containerClassName || ''].join(' ').trim()
      // The container has `pointerEvents: 'none'` so we need to override
      // that to make sure the controls are clickable.
      ,
      style: {
        pointerEvents: 'auto'
      }
    }, (_props$control$funcNa = props[control.funcName]) === null || _props$control$funcNa === void 0 ? void 0 : _props$control$funcNa.call(props, {
      autoplay: props.autoplay,
      cellAlign: props.cellAlign,
      cellSpacing: props.cellSpacing,
      currentSlide: currentSlide,
      defaultControlsConfig: props.defaultControlsConfig || {},
      id: props.id,
      pagingDotsIndices: pagingDotsIndices,
      pause: pause,
      goToSlide: goToSlide,
      nextDisabled: nextDisabled,
      nextSlide: nextSlide,
      onUserNavigation: props.onUserNavigation,
      previousDisabled: previousDisabled,
      previousSlide: prevSlide,
      setPause: setPause,
      scrollMode: props.scrollMode,
      slideCount: slideCount,
      slidesToScroll: slidesToScroll,
      slidesToShow: props.slidesToShow || 1,
      tabbed: props.tabbed,
      vertical: props.vertical,
      wrapAround: props.wrapAround
    })));
  });
};
var _default = renderControls;
exports["default"] = _default;