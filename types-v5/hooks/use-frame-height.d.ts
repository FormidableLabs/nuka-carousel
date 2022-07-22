/**
 * Adjust the frame height based on the visible slides' height if
 * `adaptiveHeight` is enabled. Otherwise, just returns `auto`.
 */
export declare const useFrameHeight: ({ adaptiveHeight, slidesToShow }: {
    adaptiveHeight: boolean;
    slidesToShow: number;
}) => {
    /**
     * Callback that can be passed to Slides to allow them to update the
     * `visibleHeights` variable.
     */
    handleVisibleSlideHeightChange: (slideIndex: number, height: number | null) => unknown;
    /** CSS height of the frame container */
    frameHeight: string;
    /**
     * Whether heights for all slides have been calculated and we can manually
     * set frame height.
     */
    areHeightsCalculated: boolean;
};
