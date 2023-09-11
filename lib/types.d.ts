import { ReactNode, CSSProperties, MutableRefObject } from 'react';
export declare type CellAlign = 'center' | 'right' | 'left';
/** @deprecated use string literals for the values instead */
export declare enum Alignment {
    Center = "center",
    Right = "right",
    Left = "left"
}
export declare enum Directions {
    Next = "next",
    Prev = "prev",
    Up = "up",
    Down = "down"
}
export declare enum Positions {
    TopLeft = "TopLeft",
    TopCenter = "TopCenter",
    TopRight = "TopRight",
    CenterLeft = "CenterLeft",
    CenterCenter = "CenterCenter",
    CenterRight = "CenterRight",
    BottomLeft = "BottomLeft",
    BottomCenter = "BottomCenter",
    BottomRight = "BottomRight"
}
declare type SlideChildren = {
    offsetHeight: number;
};
export declare type SlideHeight = {
    height: number;
    slideIndex: number;
};
export interface Slide {
    children?: [SlideChildren];
    offsetHeight: number;
}
export declare enum ScrollMode {
    page = "page",
    remainder = "remainder"
}
interface DefaultControlsConfig {
    containerClassName?: string;
    nextButtonClassName?: string;
    nextButtonOnClick?: React.MouseEventHandler;
    nextButtonStyle?: CSSProperties;
    nextButtonText?: ReactNode;
    pagingDotsClassName?: string;
    pagingDotsContainerClassName?: string;
    pagingDotsOnClick?: React.MouseEventHandler;
    pagingDotsStyle?: CSSProperties;
    prevButtonClassName?: string;
    prevButtonOnClick?: React.MouseEventHandler;
    prevButtonStyle?: CSSProperties;
    prevButtonText?: ReactNode;
}
export interface KeyCodeConfig {
    firstSlide?: number[];
    lastSlide?: number[];
    nextSlide?: number[];
    pause?: number[];
    previousSlide?: number[];
}
export declare type KeyCodeFunction = 'nextSlide' | 'previousSlide' | 'firstSlide' | 'lastSlide' | 'pause' | null;
export interface KeyCodeMap {
    [key: number]: keyof KeyCodeConfig;
}
/** @deprecated This is not actually used for anything */
export interface CarouselState {
}
declare type RenderAnnounceSlideMessage = (props: {
    currentSlide: number;
    count: number;
}) => string;
export interface ControlProps extends Pick<InternalCarouselProps, 'autoplay' | 'cellAlign' | 'cellSpacing' | 'defaultControlsConfig' | 'id' | 'onUserNavigation' | 'scrollMode' | 'slidesToScroll' | 'slidesToShow' | 'tabbed' | 'vertical' | 'wrapAround'> {
    /**
     * Current slide index
     */
    currentSlide: number;
    /**
     * The indices for the paging dots
     */
    pagingDotsIndices: number[];
    /**
     * Go to a specific slide
     * @param targetIndex Index to go to
     */
    goToSlide: (targetIndex: number) => void;
    /**
     * Whether the "next" button should be disabled or not
     */
    nextDisabled: boolean;
    /**
     * Go to the next slide
     */
    nextSlide: () => void;
    /**
     * Whether the carousel is paused or not
     */
    pause: boolean;
    /**
     * Whether the "previous" button should be disabled or not
     */
    previousDisabled: boolean;
    /**
     * Go to the previous slide
     */
    previousSlide: () => void;
    /**
     * Pause or play autoplay
     * @param pause
     */
    setPause: (pause: boolean) => void;
    /**
     * Total number of slides
     */
    slideCount: number;
}
export declare type RenderControlFunctionNames = 'renderTopLeftControls' | 'renderTopCenterControls' | 'renderTopRightControls' | 'renderCenterLeftControls' | 'renderCenterCenterControls' | 'renderCenterRightControls' | 'renderBottomLeftControls' | 'renderBottomCenterControls' | 'renderBottomRightControls';
/**
 * A function to override what to render on an edge/corner of the modal.
 *
 * Pass in null to not render the default controls on an edge.
 */
declare type RenderControls = ((props: ControlProps) => ReactNode) | null;
/**
 * Animation easing function accepting a normalized time between 0 and 1,
 * inclusive, and returning an eased time, which equals 0 at normalizedTime==0
 * and equals 1 at normalizedTime==1
 */
export declare type EasingFunction = (normalizedTime: number) => number;
export interface InternalCarouselProps {
    /**
     * If it's set to true, the carousel will adapt its height to the visible slides.
     */
    adaptiveHeight: boolean;
    /**
     * Whether to smoothly transition the height of the frame when using
     * `adaptiveHeight`.
     * @default true
     */
    adaptiveHeightAnimation: boolean;
    /**
     * Hook to be called after a slide is changed
     * @param index Index of the current slide
     */
    afterSlide: (index: number) => void;
    /**
     * Adds a zoom or fade effect on the currently visible slide.
     */
    animation?: 'zoom' | 'fade';
    /**
     * Autoplay mode active
     * @default false
     */
    autoplay: boolean;
    /**
     * Interval for autoplay iteration (ms)
     * @default 3000
     */
    autoplayInterval: number;
    /**
     * Autoplay cycles through slide indexes in reverse
     * @default false
     */
    autoplayReverse: boolean;
    /**
     * Hook to be called before a slide is changed
     * @param currentSlide Index of the current slide
     * @param endSlide Index of the last slide
     */
    beforeSlide: (currentSlideIndex: number, endSlideIndex: number) => void;
    /**
     * When displaying more than one slide,
     * sets which position to anchor the current slide to
     */
    cellAlign: CellAlign;
    /**
     * Space between slides, as an integer, but reflected as px
     */
    cellSpacing: number;
    /**
     * Explicit children prop to resolve issue with @types/react v18
     */
    children: ReactNode | ReactNode[];
    /**
     * Additional className
     */
    className?: string;
    /**
     * This prop lets you apply custom classes and styles to the default Next, Previous, and Paging Dots controls
     */
    defaultControlsConfig: DefaultControlsConfig;
    /**
     * Disable slides animation
     * @default false
     */
    disableAnimation: boolean;
    /**
     * Disable swipe before first slide and after last slide
     * @default false
     */
    disableEdgeSwiping: boolean;
    /**
     * Enable mouse swipe/dragging
     */
    dragging: boolean;
    /**
     * The percentage (from 0 to 1) of a slide that the user needs to drag before
     * @default `0.5`
     */
    dragThreshold: number;
    /**
     * Animation easing function
     */
    easing: EasingFunction;
    /**
     * Animation easing function when swipe exceeds edge
     */
    edgeEasing: EasingFunction;
    /**
     * When set to true, disable keyboard controls
     * @default false
     */
    enableKeyboardControls: boolean;
    /**
     * Customize the aria-label of the frame container of the carousel. This is useful when you have more than one carousel on the page.
     */
    frameAriaLabel?: string;
    /**
     * Unique id for the carousel
     */
    id: string;
    /**
     * Ref to pass to carousel element
     */
    innerRef?: MutableRefObject<HTMLDivElement>;
    /**
     * When enableKeyboardControls is enabled, Configure keyCodes for corresponding slide actions as array of keyCodes
     */
    keyCodeConfig: KeyCodeConfig;
    /**
     * optional callback function
     */
    onDragStart: (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => void;
    /**
     * optional callback function
     */
    onDrag: (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => void;
    /**
     * optional callback function
     */
    onDragEnd: (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => void;
    /**
     * Callback called when user-triggered navigation occurs: dragging/swiping,
     * clicking one of the controls (custom controls not included), or using a
     * keyboard shortcut
     */
    onUserNavigation: (e: React.TouchEvent | React.MouseEvent | React.KeyboardEvent) => void;
    /**
     * Pause autoPlay when mouse is over carousel
     * @default true
     */
    pauseOnHover: boolean;
    /**
     * Function for rendering aria-live announcement messages
     */
    renderAnnounceSlideMessage: RenderAnnounceSlideMessage;
    /**
     * Function for rendering bottom center control
     */
    renderBottomCenterControls: RenderControls;
    /**
     * Function for rendering bottom left control
     */
    renderBottomLeftControls?: RenderControls;
    /**
     * Function for rendering bottom right control
     */
    renderBottomRightControls?: RenderControls;
    /**
     * Function for rendering center center control
     */
    renderCenterCenterControls?: RenderControls;
    /**
     * Function for rendering center left control
     */
    renderCenterLeftControls: RenderControls;
    /**
     * Function for rendering center right control
     */
    renderCenterRightControls: RenderControls;
    /**
     * Function for rendering top center control
     */
    renderTopCenterControls?: RenderControls;
    /**
     * Function for rendering top left control
     */
    renderTopLeftControls?: RenderControls;
    /**
     * Function for rendering top right control
     */
    renderTopRightControls?: RenderControls;
    /**
     * Supports 'page' and 'remainder' scroll modes.
     */
    scrollMode: ScrollMode;
    /**
     * Manually set the index of the initial slide to be shown
     */
    slideIndex?: number;
    /**
     * Slides to scroll at once.
     */
    slidesToScroll: number | 'auto';
    /**
     * Slides to show at once
     */
    slidesToShow: number;
    /**
     * Sets a fixed slide width
     */
    slideWidth?: CSSProperties['width'];
    /**
     * Animation duration
     */
    speed: number;
    /**
     * style object
     */
    style: CSSProperties;
    /**
     * Enable touch swipe/dragging
     */
    swiping: boolean;
    /**
     * Whether dot tabbed are displayed or not
     */
    tabbed: boolean;
    /**
     * Not migrated yet
     *
     * Enable the slides to transition vertically
     */
    vertical: boolean;
    /**
     * Used to remove all controls at once. Overwrites the render[Top, Right, Bottom, Left]CenterControls()
     * @default false
     */
    withoutControls: boolean;
    /**
     * Sets infinite wrapAround mode
     * @default false
     */
    wrapAround: boolean;
    /**
     * Adds a number value to set the scale of zoom when animation === "zoom".
     * The number value should be set in a range of (0,1).
     * @default 0.85
     */
    zoomScale?: number;
}
/**
 * This component has no required props.
 */
export declare type CarouselProps = Partial<InternalCarouselProps>;
export {};
//# sourceMappingURL=types.d.ts.map