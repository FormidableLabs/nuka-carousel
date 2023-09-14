"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollMode = exports.Positions = exports.Directions = exports.Alignment = void 0;

/** @deprecated use string literals for the values instead */
var Alignment;
exports.Alignment = Alignment;

(function (Alignment) {
  Alignment["Center"] = "center";
  Alignment["Right"] = "right";
  Alignment["Left"] = "left";
})(Alignment || (exports.Alignment = Alignment = {}));

var Directions;
exports.Directions = Directions;

(function (Directions) {
  Directions["Next"] = "next";
  Directions["Prev"] = "prev";
  Directions["Up"] = "up";
  Directions["Down"] = "down";
})(Directions || (exports.Directions = Directions = {}));

var Positions;
exports.Positions = Positions;

(function (Positions) {
  Positions["TopLeft"] = "TopLeft";
  Positions["TopCenter"] = "TopCenter";
  Positions["TopRight"] = "TopRight";
  Positions["CenterLeft"] = "CenterLeft";
  Positions["CenterCenter"] = "CenterCenter";
  Positions["CenterRight"] = "CenterRight";
  Positions["BottomLeft"] = "BottomLeft";
  Positions["BottomCenter"] = "BottomCenter";
  Positions["BottomRight"] = "BottomRight";
})(Positions || (exports.Positions = Positions = {}));

var ScrollMode;
exports.ScrollMode = ScrollMode;

(function (ScrollMode) {
  ScrollMode["page"] = "page";
  ScrollMode["remainder"] = "remainder";
})(ScrollMode || (exports.ScrollMode = ScrollMode = {}));