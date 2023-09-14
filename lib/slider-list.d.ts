import React, { ReactNode } from 'react';
import { CellAlign, InternalCarouselProps } from './types';
export declare const getPercentOffsetForSlide: (currentSlide: number, slideCount: number, slidesToShow: number, cellAlign: CellAlign, wrapAround: boolean) => number;
interface SliderListProps extends Pick<InternalCarouselProps, 'cellAlign' | 'disableAnimation' | 'disableEdgeSwiping' | 'easing' | 'edgeEasing' | 'scrollMode' | 'animation' | 'slidesToShow' | 'slideWidth' | 'speed' | 'wrapAround'> {
    slidesToScroll: number;
    animationDistance: number;
    children: ReactNode;
    currentSlide: number;
    draggedOffset: number;
    isDragging: boolean;
    slideCount: number;
    setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
}
export declare const SliderList: React.ForwardRefExoticComponent<SliderListProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=slider-list.d.ts.map