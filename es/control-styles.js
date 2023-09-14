"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getControlContainerStyles = void 0;

var _types = require("./types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var commonStyles = {
  position: 'absolute',
  display: 'flex',
  zIndex: 1,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
};
/**
 * Gets flexbox alignment and justify-content styles for a given position.
 */

var getControlContainerFlexStyles = function getControlContainerFlexStyles(pos) {
  var alignItems;

  switch (pos) {
    case _types.Positions.TopLeft:
    case _types.Positions.TopCenter:
    case _types.Positions.TopRight:
      alignItems = 'flex-start';
      break;

    case _types.Positions.CenterLeft:
    case _types.Positions.CenterCenter:
    case _types.Positions.CenterRight:
      alignItems = 'center';
      break;

    case _types.Positions.BottomLeft:
    case _types.Positions.BottomCenter:
    case _types.Positions.BottomRight:
      alignItems = 'flex-end';
      break;
  }

  var justifyContent;

  switch (pos) {
    case _types.Positions.TopLeft:
    case _types.Positions.CenterLeft:
    case _types.Positions.BottomLeft:
      justifyContent = 'flex-start';
      break;

    case _types.Positions.TopCenter:
    case _types.Positions.CenterCenter:
    case _types.Positions.BottomCenter:
      justifyContent = 'center';
      break;

    case _types.Positions.TopRight:
    case _types.Positions.CenterRight:
    case _types.Positions.BottomRight:
      justifyContent = 'flex-end';
      break;
  }

  return {
    alignItems: alignItems,
    justifyContent: justifyContent
  };
};
/**
 * Gets the styles for a back/forward control container to align the control
 * properly within the parent.
 */


var getControlContainerStyles = function getControlContainerStyles(pos) {
  return _objectSpread(_objectSpread({}, getControlContainerFlexStyles(pos)), commonStyles);
};

exports.getControlContainerStyles = getControlContainerStyles;