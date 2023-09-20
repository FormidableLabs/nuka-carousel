/// <reference types="react" />
import { CellAlign, ControlProps, ScrollMode } from './types';
export declare const prevButtonDisabled: ({ cellAlign, currentSlide, slidesToShow, wrapAround, }: Pick<ControlProps, 'cellAlign' | 'currentSlide' | 'slidesToShow' | 'wrapAround'>) => boolean;
export declare const PreviousButton: ({ previousSlide, defaultControlsConfig: { prevButtonClassName, prevButtonStyle, prevButtonText, prevButtonOnClick, }, carouselId, onUserNavigation, previousDisabled: disabled, }: ControlProps) => JSX.Element;
export declare const nextButtonDisabled: ({ cellAlign, currentSlide, slideCount, slidesToShow, wrapAround, }: Pick<ControlProps, 'cellAlign' | 'currentSlide' | 'slideCount' | 'slidesToShow' | 'wrapAround'>) => boolean;
export declare const NextButton: ({ nextSlide, defaultControlsConfig: { nextButtonClassName, nextButtonStyle, nextButtonText, nextButtonOnClick, }, carouselId, nextDisabled: disabled, onUserNavigation, }: ControlProps) => JSX.Element;
/**
 * Calculate the indices that each dot will jump to when clicked
 */
export declare const getDotIndexes: (slideCount: number, slidesToScroll: number, scrollMode: ScrollMode, slidesToShow: number, wrapAround: boolean, cellAlign: CellAlign) => number[];
export declare const PagingDots: ({ pagingDotsIndices, defaultControlsConfig: { pagingDotsContainerClassName, pagingDotsClassName, pagingDotsStyle, pagingDotsOnClick, }, carouselId, currentSlide, onUserNavigation, slideCount, goToSlide, tabbed, }: ControlProps) => JSX.Element | null;
//# sourceMappingURL=default-controls.d.ts.map