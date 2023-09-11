"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRenderAnnounceSlideMessage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styles = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    padding: 0,
    margin: '-1px',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
};
const AnnounceSlide = ({ message, ariaLive = 'polite', }) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ "aria-live": ariaLive, "aria-atomic": "true", style: styles, tabIndex: -1 }, { children: message }), void 0));
const defaultRenderAnnounceSlideMessage = ({ currentSlide, count, }) => `Slide ${currentSlide + 1} of ${count}`;
exports.defaultRenderAnnounceSlideMessage = defaultRenderAnnounceSlideMessage;
exports.default = AnnounceSlide;
//# sourceMappingURL=announce-slide.js.map