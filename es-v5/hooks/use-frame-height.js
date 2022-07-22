function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useCallback, useMemo, useState } from 'react';
import { useStateWithRef } from './use-state-with-ref';
/**
 * Adjust the frame height based on the visible slides' height if
 * `adaptiveHeight` is enabled. Otherwise, just returns `auto`.
 */

export var useFrameHeight = function useFrameHeight(_ref) {
  var adaptiveHeight = _ref.adaptiveHeight,
      slidesToShow = _ref.slidesToShow;

  var _useStateWithRef = useStateWithRef([]),
      _useStateWithRef2 = _slicedToArray(_useStateWithRef, 3),
      visibleHeights = _useStateWithRef2[0],
      setVisibleHeights = _useStateWithRef2[1],
      visibleHeightsRef = _useStateWithRef2[2];

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      areHeightsCalculated = _useState2[0],
      setAreHeightsCalculated = _useState2[1];

  var handleVisibleSlideHeightChange = useCallback(function (slideIndex, height) {
    // Use the ref's value since it's always the latest value
    var latestVisibleHeights = visibleHeightsRef.current;
    var newVisibleHeights;

    if (height === null) {
      newVisibleHeights = latestVisibleHeights.filter(function (slideHeight) {
        return slideHeight.slideIndex !== slideIndex;
      });
    } else {
      newVisibleHeights = [].concat(_toConsumableArray(latestVisibleHeights), [{
        slideIndex: slideIndex,
        height: height
      }]);
    }

    setVisibleHeights(newVisibleHeights);

    if (newVisibleHeights.length === Math.ceil(slidesToShow)) {
      setAreHeightsCalculated(true);
    }
  }, [setVisibleHeights, visibleHeightsRef]);
  var frameHeight = useMemo(function () {
    if (adaptiveHeight) {
      var maxHeight = visibleHeights.reduce(function (acc, value) {
        if (acc >= value.height) {
          return acc;
        }

        return value.height;
      }, 0);
      return "".concat(maxHeight, "px");
    } else {
      return 'auto';
    }
  }, [adaptiveHeight, visibleHeights]);
  return {
    handleVisibleSlideHeightChange: handleVisibleSlideHeightChange,
    frameHeight: frameHeight,
    areHeightsCalculated: areHeightsCalculated
  };
};