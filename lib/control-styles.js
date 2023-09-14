"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getControlContainerStyles = void 0;
const types_1 = require("./types");
const commonStyles = {
    position: 'absolute',
    display: 'flex',
    zIndex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
};
/**
 * Gets flexbox alignment and justify-content styles for a given position.
 */
const getControlContainerFlexStyles = (pos) => {
    let alignItems;
    switch (pos) {
        case types_1.Positions.TopLeft:
        case types_1.Positions.TopCenter:
        case types_1.Positions.TopRight:
            alignItems = 'flex-start';
            break;
        case types_1.Positions.CenterLeft:
        case types_1.Positions.CenterCenter:
        case types_1.Positions.CenterRight:
            alignItems = 'center';
            break;
        case types_1.Positions.BottomLeft:
        case types_1.Positions.BottomCenter:
        case types_1.Positions.BottomRight:
            alignItems = 'flex-end';
            break;
    }
    let justifyContent;
    switch (pos) {
        case types_1.Positions.TopLeft:
        case types_1.Positions.CenterLeft:
        case types_1.Positions.BottomLeft:
            justifyContent = 'flex-start';
            break;
        case types_1.Positions.TopCenter:
        case types_1.Positions.CenterCenter:
        case types_1.Positions.BottomCenter:
            justifyContent = 'center';
            break;
        case types_1.Positions.TopRight:
        case types_1.Positions.CenterRight:
        case types_1.Positions.BottomRight:
            justifyContent = 'flex-end';
            break;
    }
    return { alignItems, justifyContent };
};
/**
 * Gets the styles for a back/forward control container to align the control
 * properly within the parent.
 */
const getControlContainerStyles = (pos) => {
    return Object.assign(Object.assign({}, getControlContainerFlexStyles(pos)), commonStyles);
};
exports.getControlContainerStyles = getControlContainerStyles;
//# sourceMappingURL=control-styles.js.map