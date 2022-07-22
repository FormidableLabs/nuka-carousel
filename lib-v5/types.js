"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollMode = exports.Positions = exports.Directions = exports.D3EasingFunctions = exports.Alignment = void 0;

/* eslint-disable no-shadow */
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

var D3EasingFunctions;
exports.D3EasingFunctions = D3EasingFunctions;

(function (D3EasingFunctions) {
  D3EasingFunctions["EaseLinear"] = "easeLinear";
  D3EasingFunctions["EaseQuad"] = "easeQuad";
  D3EasingFunctions["EaseQuadIn"] = "easeQuadIn";
  D3EasingFunctions["EaseQuadOut"] = "easeQuadOut";
  D3EasingFunctions["EaseQuadInOut"] = "easeQuadInOut";
  D3EasingFunctions["EaseCubic"] = "easeCubic";
  D3EasingFunctions["EaseCubicIn"] = "easeCubicIn";
  D3EasingFunctions["EaseCubicOut"] = "easeCubicOut";
  D3EasingFunctions["EaseCubicInOut"] = "easeCubicInOut";
  D3EasingFunctions["EasePoly"] = "easePoly";
  D3EasingFunctions["EasePolyIn"] = "easePolyIn";
  D3EasingFunctions["EasePolyOut"] = "easePolyOut";
  D3EasingFunctions["EasePolyInOut"] = "easePolyInOut";
  D3EasingFunctions["EaseSin"] = "easeSin";
  D3EasingFunctions["EaseSinIn"] = "easeSinIn";
  D3EasingFunctions["EaseSinOut"] = "easeSinOut";
  D3EasingFunctions["EaseSinInOut"] = "easeSinInOut";
  D3EasingFunctions["EaseExp"] = "easeExp";
  D3EasingFunctions["EaseExpIn"] = "easeExpIn";
  D3EasingFunctions["EaseExpOut"] = "easeExpOut";
  D3EasingFunctions["EaseExpInOut"] = "easeExpInOut";
  D3EasingFunctions["EaseCircle"] = "easeCircle";
  D3EasingFunctions["EaseCircleIn"] = "easeCircleIn";
  D3EasingFunctions["EaseCircleOut"] = "easeCircleOut";
  D3EasingFunctions["EaseCircleInOut"] = "easeCircleInOut";
  D3EasingFunctions["EaseBack"] = "easeBack";
  D3EasingFunctions["EaseBackIn"] = "easeBackIn";
  D3EasingFunctions["EaseBackOut"] = "easeBackOut";
  D3EasingFunctions["EaseBackInOut"] = "easeBackInOut";
  D3EasingFunctions["EaseBounce"] = "easeBounce";
  D3EasingFunctions["EaseBounceIn"] = "easeBounceIn";
  D3EasingFunctions["EaseBounceOut"] = "easeBounceOut";
  D3EasingFunctions["EaseBounceInOut"] = "easeBounceInOut";
  D3EasingFunctions["EaseElastic"] = "easeElastic";
  D3EasingFunctions["EaseElasticIn"] = "easeElasticIn";
  D3EasingFunctions["EaseElasticOut"] = "easeElasticOut";
  D3EasingFunctions["EaseElasticInOut"] = "easeElasticInOut";
})(D3EasingFunctions || (exports.D3EasingFunctions = D3EasingFunctions = {}));