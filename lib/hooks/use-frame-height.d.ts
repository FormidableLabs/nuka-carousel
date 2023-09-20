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
export declare const useFrameHeight: (adaptiveHeight: boolean, slidesToShow: number, slideCount: number) => {
    /**
     * Callback that can be passed to Slides to allow them to update the
     * `visibleHeights` variable.
     */
    handleVisibleSlideHeightChange: (slideIndex: number, height: number | null) => unknown;
    /** CSS height of the frame container */
    frameHeight: string;
    /**
     * Whether we'd measured the initial slide heights and are ready for the
     * frame to control the children's height, rather than the other way around.
     */
    initializedAdaptiveHeight: boolean;
};
//# sourceMappingURL=use-frame-height.d.ts.map