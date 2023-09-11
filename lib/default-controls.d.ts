import { CellAlign, ControlProps, ScrollMode } from './types';
export declare const prevButtonDisabled: ({ cellAlign, currentSlide, slidesToShow, wrapAround, }: Pick<ControlProps, 'cellAlign' | 'currentSlide' | 'slidesToShow' | 'wrapAround'>) => boolean;
export declare const PreviousButton: ({ previousSlide, defaultControlsConfig: { prevButtonClassName, prevButtonStyle, prevButtonText, prevButtonOnClick, }, id, onUserNavigation, previousDisabled: disabled, }: ControlProps) => JSX.Element;
export declare const nextButtonDisabled: ({ cellAlign, currentSlide, slideCount, slidesToShow, wrapAround, }: Pick<ControlProps, 'cellAlign' | 'currentSlide' | 'slideCount' | 'slidesToShow' | 'wrapAround'>) => boolean;
export declare const NextButton: ({ nextSlide, defaultControlsConfig: { nextButtonClassName, nextButtonStyle, nextButtonText, nextButtonOnClick, }, id, nextDisabled: disabled, onUserNavigation, }: ControlProps) => JSX.Element;
export declare const PauseButton: ({ autoplay, pause, setPause }: ControlProps) => JSX.Element | null;
/**
 * Calculate the indices that each dot will jump to when clicked
 */
export declare const getDotIndexes: (slideCount: number, slidesToScroll: number, scrollMode: ScrollMode, slidesToShow: number, wrapAround: boolean, cellAlign: CellAlign) => number[];
export declare const PagingDots: ({ pagingDotsIndices, defaultControlsConfig: { pagingDotsContainerClassName, pagingDotsClassName, pagingDotsStyle, pagingDotsOnClick, }, id, currentSlide, onUserNavigation, slideCount, tabbed, goToSlide, }: ControlProps) => JSX.Element | null;
//# sourceMappingURL=default-controls.d.ts.map