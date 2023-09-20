import { CellAlign, ScrollMode } from './types';
export declare const getNextMoveIndex: (scrollMode: ScrollMode, wrapAround: boolean, currentSlide: number, slideCount: number, slidesToScroll: number, slidesToShow: number, cellAlign: CellAlign) => number;
export declare const getPrevMoveIndex: (scrollMode: ScrollMode, wrapAround: boolean, currentSlide: number, slidesToScroll: number, slidesToShow: number, cellAlign: CellAlign) => number;
export declare const getDefaultSlideIndex: (slideIndex: number | undefined, slideCount: number, slidesToShow: number, slidesToScroll: number, cellAlign: CellAlign, autoplayReverse: boolean, scrollMode: ScrollMode) => number;
/**
 * Boils down an unbounded index (-Infinity < index < Infinity) to a bounded one
 * (0 ≤ index < slideCount)
 */
export declare const getBoundedIndex: (rawIndex: number, slideCount: number) => number;
//# sourceMappingURL=utils.d.ts.map