import { CSSProperties, ReactNode, RefObject } from 'react';
declare const Slide: ({ count, children, index, isCurrentSlide, typeOfSlide, wrapAround, cellSpacing, slideWidth, animation, speed, zoomScale, onVisibleSlideHeightChange, adaptiveHeight, initializedAdaptiveHeight, updateIOEntry, id, carouselRef, tabbed, }: {
    count: number;
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
    id: string;
    carouselRef: RefObject<Element>;
    tabbed: boolean;
    /**
     * Called with `height` when slide becomes visible and `null` when it becomes
     * hidden.
     */
    onVisibleSlideHeightChange: (index: number, height: number | null) => unknown;
    adaptiveHeight: boolean;
    initializedAdaptiveHeight: boolean;
}) => JSX.Element;
export default Slide;
//# sourceMappingURL=slide.d.ts.map