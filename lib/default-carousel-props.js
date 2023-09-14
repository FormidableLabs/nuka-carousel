"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const types_1 = require("./types");
const default_controls_1 = require("./default-controls");
const announce_slide_1 = require("./announce-slide");
const easeOut = (t) => Math.pow((t - 1), 3) + 1;
const defaultProps = {
    adaptiveHeight: false,
    adaptiveHeightAnimation: true,
    afterSlide: () => {
        // do nothing
    },
    autoplay: false,
    autoplayInterval: 3000,
    autoplayReverse: false,
    beforeSlide: () => {
        // do nothing
    },
    carouselId: 'nuka-carousel',
    cellAlign: 'left',
    cellSpacing: 0,
    defaultControlsConfig: {},
    disableAnimation: false,
    disableEdgeSwiping: false,
    dragging: true,
    dragThreshold: 0.5,
    easing: easeOut,
    edgeEasing: easeOut,
    enableKeyboardControls: false,
    frameAriaLabel: 'Slider',
    keyCodeConfig: {
        nextSlide: [39, 68, 38, 87],
        previousSlide: [37, 65, 40, 83],
        firstSlide: [81],
        lastSlide: [69],
        pause: [32],
    },
    landmark: false,
    onDragStart: () => {
        // do nothing
    },
    onDrag: () => {
        // do nothing
    },
    onDragEnd: () => {
        // do nothing
    },
    onUserNavigation: () => {
        // do nothing
    },
    pauseOnHover: true,
    renderAnnounceSlideMessage: announce_slide_1.defaultRenderAnnounceSlideMessage,
    renderBottomCenterControls: (props) => ((0, jsx_runtime_1.jsx)(default_controls_1.PagingDots, Object.assign({}, props))),
    renderCenterLeftControls: (props) => ((0, jsx_runtime_1.jsx)(default_controls_1.PreviousButton, Object.assign({}, props))),
    renderCenterRightControls: (props) => (0, jsx_runtime_1.jsx)(default_controls_1.NextButton, Object.assign({}, props)),
    scrollMode: types_1.ScrollMode.page,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
    style: {},
    swiping: true,
    tabbed: true,
    vertical: false,
    withoutControls: false,
    wrapAround: false,
    children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}),
};
exports.default = defaultProps;
//# sourceMappingURL=default-carousel-props.js.map