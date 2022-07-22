function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Positions } from './types';
var commonStyles = {
  position: 'absolute',
  display: 'flex',
  zIndex: 1,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  pointerEvents: 'none'
};
/**
 * Gets flexbox alignment and justify-content styles for a given position.
 */

var getControlContainerFlexStyles = function getControlContainerFlexStyles(pos) {
  var alignItems;

  switch (pos) {
    case Positions.TopLeft:
    case Positions.TopCenter:
    case Positions.TopRight:
      alignItems = 'flex-start';
      break;

    case Positions.CenterLeft:
    case Positions.CenterCenter:
    case Positions.CenterRight:
      alignItems = 'center';
      break;

    case Positions.BottomLeft:
    case Positions.BottomCenter:
    case Positions.BottomRight:
      alignItems = 'flex-end';
      break;
  }

  var justifyContent;

  switch (pos) {
    case Positions.TopLeft:
    case Positions.CenterLeft:
    case Positions.BottomLeft:
      justifyContent = 'flex-start';
      break;

    case Positions.TopCenter:
    case Positions.CenterCenter:
    case Positions.BottomCenter:
      justifyContent = 'center';
      break;

    case Positions.TopRight:
    case Positions.CenterRight:
    case Positions.BottomRight:
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


export var getControlContainerStyles = function getControlContainerStyles(pos) {
  return _objectSpread(_objectSpread({}, getControlContainerFlexStyles(pos)), commonStyles);
};