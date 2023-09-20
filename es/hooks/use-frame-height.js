"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFrameHeight = void 0;

var _react = require("react");

var _useStateWithRef3 = require("./use-state-with-ref");

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

/**
 * The frame height is normally, just `auto` (i.e., it expands to fit the
 * items), but in adaptiveHeight mode, it's the height of the tallest visible
 * item.
 *
 * In adaptiveHeight mode, we also switch between two states to ensure that
 * slides don't render with zero height when server-side-rendering:
 *
 * - When initializedAdaptiveHeight is false: the frame has height auto; visible
 *   slides have height auto; invisible slides have height 0
 * - The client sets initializedAdaptiveHeight to true once we've measured all
 *   the visible slides' heights
 * - When initializedAdaptiveHeight is true: the frame has height set to the
 *   tallest visible slide; all slides have height 100%
 */
var useFrameHeight = function useFrameHeight(adaptiveHeight, slidesToShow, slideCount) {
  var _useStateWithRef = (0, _useStateWithRef3.useStateWithRef)([]),
      _useStateWithRef2 = _slicedToArray(_useStateWithRef, 3),
      visibleHeights = _useStateWithRef2[0],
      setVisibleHeights = _useStateWithRef2[1],
      visibleHeightsRef = _useStateWithRef2[2]; // Whether we've received heights of all initial visible heights


  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      initializedAdaptiveHeight = _useState2[0],
      setInitializedAdaptiveHeight = _useState2[1];

  var handleVisibleSlideHeightChange = (0, _react.useCallback)(function (slideIndex, height) {
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

    if (newVisibleHeights.length >= Math.min(slideCount, Math.ceil(slidesToShow))) {
      setInitializedAdaptiveHeight(true);
    }
  }, [slideCount, setVisibleHeights, slidesToShow, visibleHeightsRef]);
  var frameHeight = (0, _react.useMemo)(function () {
    if (adaptiveHeight) {
      // We want server-side-rendering to render the carousel with non-zero
      // height. to achieve this, we first set the height to `auto` until
      // we've received the heights of the visible slides. Then, we switch to
      // a mode where the frame controls the height.
      if (!initializedAdaptiveHeight) {
        return 'auto';
      }

      var maxHeight = Math.max.apply(Math, [0].concat(_toConsumableArray(visibleHeights.map(function (height) {
        return height.height;
      }))));
      return "".concat(maxHeight, "px");
    } else {
      return 'auto';
    }
  }, [adaptiveHeight, initializedAdaptiveHeight, visibleHeights]);
  return {
    handleVisibleSlideHeightChange: handleVisibleSlideHeightChange,
    frameHeight: frameHeight,
    initializedAdaptiveHeight: initializedAdaptiveHeight
  };
};

exports.useFrameHeight = useFrameHeight;