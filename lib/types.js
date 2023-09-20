"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollMode = exports.Positions = exports.Directions = exports.Alignment = void 0;
/** @deprecated use string literals for the values instead */
var Alignment;
(function (Alignment) {
    Alignment["Center"] = "center";
    Alignment["Right"] = "right";
    Alignment["Left"] = "left";
})(Alignment = exports.Alignment || (exports.Alignment = {}));
var Directions;
(function (Directions) {
    Directions["Next"] = "next";
    Directions["Prev"] = "prev";
    Directions["Up"] = "up";
    Directions["Down"] = "down";
})(Directions = exports.Directions || (exports.Directions = {}));
var Positions;
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
})(Positions = exports.Positions || (exports.Positions = {}));
var ScrollMode;
(function (ScrollMode) {
    ScrollMode["page"] = "page";
    ScrollMode["remainder"] = "remainder";
})(ScrollMode = exports.ScrollMode || (exports.ScrollMode = {}));
//# sourceMappingURL=types.js.map