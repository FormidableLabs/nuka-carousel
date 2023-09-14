import { CSSProperties, ReactNode, RefObject } from 'react';
declare const Slide: ({ count, children, index, isCurrentSlide, typeOfSlide, wrapAround, cellSpacing, slideWidth, animation, speed, zoomScale, onVisibleSlideHeightChange, adaptiveHeight, initializedAdaptiveHeight, updateIOEntry, id, carouselRef, carouselId, tabbed, }: {
    count: number;
    id: string;
    children: ReactNode | ReactNode[];
    index: number;
    isCurrentSlide: boolean;
    typeOfSlide: 'prev-cloned' | 'next-cloned' | undefined;
    wrapAround: boolean;
    cellSpacing: number;
    animation: 'zoom' | 'fade' | undefined;
    speed: number;
    zoomScale: number | undefined;
    slideWidth?: CSSProperties['width'];
    updateIOEntry: (id: string, isFullyVisible: boolean) => void;
    carouselRef: RefObject<Element>;
    /**
     * Called with `height` when slide becomes visible and `null` when it becomes
     * hidden.
     */
    onVisibleSlideHeightChange: (index: number, height: number | null) => unknown;
    adaptiveHeight: boolean;
    initializedAdaptiveHeight: boolean;
    carouselId: string;
    tabbed: boolean;
}) => JSX.Element;
export default Slide;
//# sourceMappingURL=slide.d.ts.map