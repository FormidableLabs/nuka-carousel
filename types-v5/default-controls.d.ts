import { ControlProps, ScrollMode } from './types';
export declare const prevButtonDisabled: ({ currentSlide, slideCount, slidesToShow, wrapAround }: ControlProps) => boolean;
export declare const PreviousButton: (props: ControlProps) => JSX.Element;
export declare const nextButtonDisabled: ({ currentSlide, slideCount, slidesToShow, slidesToScroll, wrapAround, scrollMode }: ControlProps) => boolean;
export declare const NextButton: (props: ControlProps) => JSX.Element;
export declare const getDotIndexes: (slideCount: number, slidesToScroll: number, scrollMode: ScrollMode, slidesToShow: number, wrapAround: boolean) => number[];
export declare const PagingDots: (props: ControlProps) => JSX.Element;
