"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFrameHeight = void 0;
const react_1 = require("react");
const use_state_with_ref_1 = require("./use-state-with-ref");
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
const useFrameHeight = (adaptiveHeight, slidesToShow, slideCount) => {
    const [visibleHeights, setVisibleHeights, visibleHeightsRef] = (0, use_state_with_ref_1.useStateWithRef)([]);
    // Whether we've received heights of all initial visible heights
    const [initializedAdaptiveHeight, setInitializedAdaptiveHeight] = (0, react_1.useState)(false);
    const handleVisibleSlideHeightChange = (0, react_1.useCallback)((slideIndex, height) => {
        // Use the ref's value since it's always the latest value
        const latestVisibleHeights = visibleHeightsRef.current;
        let newVisibleHeights;
        if (height === null) {
            newVisibleHeights = latestVisibleHeights.filter((slideHeight) => slideHeight.slideIndex !== slideIndex);
        }
        else {
            newVisibleHeights = [...latestVisibleHeights, { slideIndex, height }];
        }
        setVisibleHeights(newVisibleHeights);
        if (newVisibleHeights.length >=
            Math.min(slideCount, Math.ceil(slidesToShow))) {
            setInitializedAdaptiveHeight(true);
        }
    }, [slideCount, setVisibleHeights, slidesToShow, visibleHeightsRef]);
    const frameHeight = (0, react_1.useMemo)(() => {
        if (adaptiveHeight) {
            // We want server-side-rendering to render the carousel with non-zero
            // height. to achieve this, we first set the height to `auto` until
            // we've received the heights of the visible slides. Then, we switch to
            // a mode where the frame controls the height.
            if (!initializedAdaptiveHeight) {
                return 'auto';
            }
            const maxHeight = Math.max(0, ...visibleHeights.map((height) => height.height));
            return `${maxHeight}px`;
        }
        else {
            return 'auto';
        }
    }, [adaptiveHeight, initializedAdaptiveHeight, visibleHeights]);
    return {
        handleVisibleSlideHeightChange,
        frameHeight,
        initializedAdaptiveHeight,
    };
};
exports.useFrameHeight = useFrameHeight;
//# sourceMappingURL=use-frame-height.js.map