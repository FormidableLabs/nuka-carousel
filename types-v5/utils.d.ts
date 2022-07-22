import { ScrollMode } from './types';
export declare const getIndexes: (slide: number, endSlide: number, count: number) => [number, number];
export declare const addEvent: (elem: Window | Document, type: string, eventHandler: EventListener) => void;
export declare const removeEvent: (elem: Window | Document, type: string, eventHandler: EventListener) => void;
export declare const getNextMoveIndex: (scrollMode: ScrollMode, wrapAround: boolean, currentSlide: number, count: number, slidesToScroll: number, slidesToShow: number) => number;
export declare const getPrevMoveIndex: (scrollMode: ScrollMode, wrapAround: boolean, currentSlide: number, slidesToScroll: number) => number;
