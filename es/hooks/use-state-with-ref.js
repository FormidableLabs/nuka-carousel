"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStateWithRef = void 0;
var _react = require("react");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Like useState, but also returns a ref that's always instantly updated.
 *
 * This is useful in two cases:
 *
 * 1. You need to both force a re-render when a variable changes, and
 *    also avoid re-running side effects (for example, a network call), even
 *    before the state fully updates for the component.
 * 2. Multiple callbacks need to modify the same object or array before the
 *    state updates. For example, if one callback tries to append 4 to
 *    `[1, 2, 3]` and another tries to append 5, we may end up with only
 *    `[1, 2, 3, 5]` instead of `[1, 2, 3, 4, 5]`
 */
var useStateWithRef = function useStateWithRef(initialState) {
  var _useState = (0, _react.useState)(initialState),
    _useState2 = _slicedToArray(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];
  // Need to explicitly type this out, or the overloads can confuse the
  // compiler to think that this might be a React Component ref
  var valueRef = (0, _react.useRef)(initialState);
  var setValueAndRef = (0, _react.useCallback)(function (newValue) {
    valueRef.current = newValue;
    setValue(newValue);
  }, []);
  return [value, setValueAndRef, valueRef];
};
exports.useStateWithRef = useStateWithRef;