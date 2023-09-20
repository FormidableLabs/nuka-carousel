"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagingDots = exports.PreviousButton = exports.NextButton = exports.default = void 0;
var carousel_1 = require("./carousel");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return carousel_1.Carousel; } });
__exportStar(require("./types"), exports);
var default_controls_1 = require("./default-controls");
Object.defineProperty(exports, "NextButton", { enumerable: true, get: function () { return default_controls_1.NextButton; } });
Object.defineProperty(exports, "PreviousButton", { enumerable: true, get: function () { return default_controls_1.PreviousButton; } });
Object.defineProperty(exports, "PagingDots", { enumerable: true, get: function () { return default_controls_1.PagingDots; } });
//# sourceMappingURL=index.js.map