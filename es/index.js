"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  NextButton: true,
  PreviousButton: true,
  PagingDots: true
};
Object.defineProperty(exports, "NextButton", {
  enumerable: true,
  get: function get() {
    return _defaultControls.NextButton;
  }
});
Object.defineProperty(exports, "PagingDots", {
  enumerable: true,
  get: function get() {
    return _defaultControls.PagingDots;
  }
});
Object.defineProperty(exports, "PreviousButton", {
  enumerable: true,
  get: function get() {
    return _defaultControls.PreviousButton;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _carousel.Carousel;
  }
});
var _carousel = require("./carousel");
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});
var _defaultControls = require("./default-controls");