"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _controlStyles = require("./control-styles");

var _types = require("./types");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var renderControls = function renderControls(props, count, currentSlide, moveSlide, _nextSlide, prevSlide, slidesToScroll) {
  if (props.withoutControls) {
    return null;
  }

  return controlsMap.map(function (control) {
    var _props$control$funcNa;

    if (!props[control.funcName] || typeof props[control.funcName] !== 'function') {
      return /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
        key: control.funcName
      });
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      key: control.funcName,
      style: (0, _controlStyles.getControlContainerStyles)(control.key)
    }, /*#__PURE__*/_react["default"].createElement("div", {
      key: control.funcName,
      className: ["slider-control-".concat(control.key.toLowerCase()), props.defaultControlsConfig.containerClassName || ''].join(' ').trim() // The container has `pointerEvents: 'none'` so we need to override
      // that to make sure the controls are clickable.
      ,
      style: {
        pointerEvents: 'auto'
      }
    }, (_props$control$funcNa = props[control.funcName]) === null || _props$control$funcNa === void 0 ? void 0 : _props$control$funcNa.call(props, {
      cellAlign: props.cellAlign,
      cellSpacing: props.cellSpacing,
      currentSlide: currentSlide,
      defaultControlsConfig: props.defaultControlsConfig || {},
      goToSlide: function goToSlide(index) {
        return moveSlide(index);
      },
      nextSlide: function nextSlide() {
        return _nextSlide();
      },
      previousSlide: function previousSlide() {
        return prevSlide();
      },
      scrollMode: props.scrollMode,
      slideCount: count,
      slidesToScroll: slidesToScroll,
      slidesToShow: props.slidesToShow || 1,
      vertical: props.vertical,
      wrapAround: props.wrapAround
    })));
  });
};

var _default = renderControls;
exports["default"] = _default;