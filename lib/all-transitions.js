"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _scrollTransition = _interopRequireDefault(require("./transitions/scroll-transition"));

var _fadeTransition = _interopRequireDefault(require("./transitions/fade-transition"));

var _dScrollTransition = _interopRequireDefault(require("./transitions/3d-scroll-transition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  fade: _fadeTransition["default"],
  scroll: _scrollTransition["default"],
  scroll3d: _dScrollTransition["default"]
};
exports["default"] = _default;