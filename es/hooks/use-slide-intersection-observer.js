"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSlideIntersectionObserver = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useSlideIntersectionObserver = function useSlideIntersectionObserver(elementRef, rootRef, callback) {
  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      entry = _useState2[0],
      setEntry = _useState2[1];

  var callbackRef = (0, _react.useRef)(callback);
  (0, _react.useEffect)(function () {
    callbackRef.current = callback;
  }, [callback]);
  (0, _react.useEffect)(function () {
    var node = elementRef === null || elementRef === void 0 ? void 0 : elementRef.current;
    var root = rootRef === null || rootRef === void 0 ? void 0 : rootRef.current;
    if (!window.IntersectionObserver || !node || !root) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        setEntry(entry);
        callbackRef.current(entry);
      });
    }, {
      threshold: [0.05, 0.95],
      root: root
    });
    observer.observe(node);
    return function () {
      return observer.disconnect();
    };
  }, [elementRef, rootRef]);
  return entry;
};

exports.useSlideIntersectionObserver = useSlideIntersectionObserver;