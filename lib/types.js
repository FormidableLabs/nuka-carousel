"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollMode = exports.Positions = exports.Directions = exports.Alignment = void 0;
/** @deprecated use string literals for the values instead */
var Alignment = /*#__PURE__*/function (Alignment) {
  Alignment["Center"] = "center";
  Alignment["Right"] = "right";
  Alignment["Left"] = "left";
  return Alignment;
}({});
exports.Alignment = Alignment;
var Directions = /*#__PURE__*/function (Directions) {
  Directions["Next"] = "next";
  Directions["Prev"] = "prev";
  Directions["Up"] = "up";
  Directions["Down"] = "down";
  return Directions;
}({});
exports.Directions = Directions;
var Positions = /*#__PURE__*/function (Positions) {
  Positions["TopLeft"] = "TopLeft";
  Positions["TopCenter"] = "TopCenter";
  Positions["TopRight"] = "TopRight";
  Positions["CenterLeft"] = "CenterLeft";
  Positions["CenterCenter"] = "CenterCenter";
  Positions["CenterRight"] = "CenterRight";
  Positions["BottomLeft"] = "BottomLeft";
  Positions["BottomCenter"] = "BottomCenter";
  Positions["BottomRight"] = "BottomRight";
  return Positions;
}({});
exports.Positions = Positions;
var ScrollMode = /*#__PURE__*/function (ScrollMode) {
  ScrollMode["page"] = "page";
  ScrollMode["remainder"] = "remainder";
  return ScrollMode;
}({});
/* eslint-disable @typescript-eslint/no-empty-interface */
/** @deprecated This is not actually used for anything */
/* eslint-enable @typescript-eslint/no-empty-interface */
/**
 * A function to override what to render on an edge/corner of the modal.
 *
 * Pass in null to not render the default controls on an edge.
 */
/**
 * Animation easing function accepting a normalized time between 0 and 1,
 * inclusive, and returning an eased time, which equals 0 at normalizedTime==0
 * and equals 1 at normalizedTime==1
 */
/**
 * This component has no required props.
 */
exports.ScrollMode = ScrollMode;