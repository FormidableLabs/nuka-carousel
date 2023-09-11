"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getControlContainerStyles = void 0;
var _types = require("./types");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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