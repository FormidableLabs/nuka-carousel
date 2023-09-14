"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTween = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Provides an interpolated value, beginning at 0 and ending at 1, based on a
 * provided duration and animation timing function.
 */
var useTween = function useTween(durationMs, easingFunction, navigationNum, shouldInterrupt) {
  var _useState = (0, _react.useState)(1),
      _useState2 = _slicedToArray(_useState, 2),
      normalizedTimeRaw = _useState2[0],
      setNormalizedTime = _useState2[1];

  var startTime = (0, _react.useRef)(Date.now());
  var rAF = (0, _react.useRef)();
  var isFirstRender = (0, _react.useRef)(true);
  var lastNavigationNum = (0, _react.useRef)(null); // Detect on the first render following navigation if the animation should
  // be running. If we wait for the useEffect, the first render will flash with
  // the slide in its destination position, before the animation triggers,
  // sending it back to the position of the first frame of the animation. This
  // approach is done in place of a useLayoutEffect, which has issues with SSR.

  var normalizedTime = lastNavigationNum.current === null || lastNavigationNum.current === navigationNum || shouldInterrupt ? normalizedTimeRaw : 0; // 0 here indicates the animation has begun

  (0, _react.useEffect)(function () {
    lastNavigationNum.current = navigationNum; // Skip the first render as we don't want to trigger the animation right off
    // the bat

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (shouldInterrupt) {
      return;
    }

    startTime.current = Date.now();
    setNormalizedTime(0);

    var tick = function tick() {
      rAF.current = requestAnimationFrame(function () {
        var currentTime = Date.now();
        var normalizedTime = Math.min(1, (currentTime - startTime.current) / durationMs);
        setNormalizedTime(normalizedTime);

        if (normalizedTime < 1) {
          tick();
        } else {
          // Clean up so we can use this value to determine if the most recent
          // animation completed
          rAF.current = undefined;
        }
      });
    };

    tick();
    return function () {
      // If the most recent animation did not complete, cut it short and reset
      // the animation
      if (rAF.current !== undefined) {
        cancelAnimationFrame(rAF.current);
        setNormalizedTime(1);
      }
    };
  }, [navigationNum, durationMs, shouldInterrupt]);
  return {
    isAnimating: normalizedTime !== 1,
    value: easingFunction(normalizedTime)
  };
};

exports.useTween = useTween;