import * as React from 'react';

export type CarouselScrollModeProp = 'page' | 'remainder';

export type CarouselCellAlignProp = 'left' | 'center' | 'right';

export type CarouselSlidesToScrollProp = number | 'auto';

export type CarouselSlideWidthProp = string | number;

export type CarouselSlideActions =
  | 'nextSlide'
  | 'previousSlide'
  | 'firstSlide'
  | 'lastSlide'
  | 'pause';

export type CarouselControlContainerProp =
  | 'TopLeft'
  | 'TopCenter'
  | 'TopRight'
  | 'CenterLeft'
  | 'CenterCenter'
  | 'CenterRight'
  | 'BottomLeft'
  | 'BottomCenter'
  | 'BottomRight';

export interface CarouselSlideRenderControlProps {
  /**
   * When displaying more than one slide, sets which position to anchor the current slide to.
   */
  cellAlign: CarouselCellAlignProp;

  /**
   * Space between slides, as an integer, but reflected as px
   */
  cellSpacing: number;

  /**
   * Current slide index
   */
  currentSlide: number;

  /**
   * Current frame width (px)
   */
  frameWidth: number;

  /**
   * Go to X slide method
   * @param index Slide's index to go
   */
  goToSlide: (index: number) => void;

  /**
   * Go to the next slide method
   */
  nextSlide: () => void;

  /**
   * Go to the previous slide method
   */
  previousSlide: () => void;

  /**
   * Total amount of slides
   */
  slideCount: number;

  /**
   * Slides to scroll at once
   */
  slidesToScroll: CarouselSlidesToScrollProp;

  /**
   * Slides to show at once
   */
  slidesToShow: number;

  /**
   * Current slide width (px)
   */
  slideWidth: number;

  /**
   * Infinite mode enabled
   */
  wrapAround: boolean;
}

export type CarouselRenderControl = (
  props: CarouselSlideRenderControlProps
) => React.ReactNode;

export interface CarouselProps {
  /**
   * If it's set to true, the carousel will adapt its height to the visible slides.
   */
  adaptiveHeight?: boolean;

  /**
   * Hook to be called after a slide is changed
   * @param index Index of the current slide
   */
  afterSlide?: (index: number) => void;

  /**
   * Adds a zoom or fade effect on the currently visible slide.
   */
  animation?: 'zoom' | 'fade';

  /**
   * Autoplay mode active
   * @default false
   */
  autoplay?: boolean;

  /**
   * Interval for autoplay iteration (ms)
   * @default 3000
   */
  autoplayInterval?: number;

  /**
   * Autoplay cycles through slide indexes in reverse
   * @default false
   */
  autoplayReverse?: boolean;

  /**
   * Hook to be called before a slide is changed
   * @param currentSlide Index of the current slide
   * @param endSlide Index of the last slide
   */
  beforeSlide?: (currentSlide: number, endSlide: number) => void;

  /**
   * When displaying more than one slide,
   * sets which position to anchor the current slide to
   */
  cellAlign?: CarouselCellAlignProp;

  /**
   * Space between slides, as an integer, but reflected as px
   */
  cellSpacing?: number;

  /**
   * Explicit children prop to resolve issue with @types/react v18
   */
  children?: React.ReactNode;

  /**
   * Additional className
   */
  className?: string;

  /**
   * This prop lets you apply custom classes and styles to the default Next, Previous, and Paging Dots controls
   */
  defaultControlsConfig?: {
    containerClassName?: string;
    nextButtonClassName?: string;
    nextButtonStyle?: React.CSSProperties;
    nextButtonText?: string;
    prevButtonClassName?: string;
    prevButtonStyle?: React.CSSProperties;
    prevButtonText?: string;
    pagingDotsContainerClassName?: string;
    pagingDotsClassName?: string;
    pagingDotsStyle?: React.CSSProperties;
  };

  /**
   * Disable slides animation
   * @default false
   */
  disableAnimation?: boolean;

  /**
   * Disable swipe before first slide and after last slide
   * @default false
   */
  disableEdgeSwiping?: boolean;

  /**
   * Enable mouse swipe/dragging
   */
  dragging?: boolean;

  /**
   * The percentage (from 0 to 1) of a slide that the user needs to drag before a slide change is triggered.
   */
  dragThreshold?: number;

  /**
   * Animation easing function
   * @see https://github.com/d3/d3-ease
   */
  easing?: string;

  /**
   * Animation easing function when swipe exceeds edge
   * @see https://github.com/d3/d3-ease
   */
  edgeEasing?: string;

  /**
   * When set to true, disable keyboard controls
   * @default false
   */
  enableKeyboardControls?: boolean;

  /**
   * Customize the aria-label of the frame container of the carousel. This is useful when you have more than one carousel on the page.
   */
  frameAriaLabel?: string;

  /**
   * Ref to pass to carousel element
   */
  innerRef?: React.RefObject<HTMLInputElement>;

  /**
   * When enableKeyboardControls is enabled, Configure keyCodes for corresponding slide actions as array of keyCodes
   */
  keyCodeConfig?: {
    [slideAction in CarouselSlideActions]?: number[];
  };

  /**
   * optional callback function
   */
  onDragStart?: (
    e?: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => void;

  /**
   * optional callback function
   */
  onDrag?: (
    e?: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => void;

  /**
   * optional callback function
   */
  onDragEnd?: (
    e?: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => void;

  /**
   * Pause autoPlay when mouse is over carousel
   * @default true
   */
  pauseOnHover?: boolean;

  /**
   * Function for rendering top left control
   */
  renderTopLeftControls?: CarouselRenderControl | null;

  /**
   * Function for rendering top center control
   */
  renderTopCenterControls?: CarouselRenderControl | null;

  /**
   * Function for rendering top right control
   */
  renderTopRightControls?: CarouselRenderControl | null;

  /**
   * Function for rendering center left control
   */
  renderCenterLeftControls?: CarouselRenderControl | null;

  /**
   * Function for rendering center center control
   */
  renderCenterCenterControls?: CarouselRenderControl | null;

  /**
   * Function for rendering center right control
   */
  renderCenterRightControls?: CarouselRenderControl | null;

  /**
   * Function for rendering bottom left control
   */
  renderBottomLeftControls?: CarouselRenderControl | null;

  /**
   * Function for rendering bottom center control
   */
  renderBottomCenterControls?: CarouselRenderControl | null;

  /**
   * Function for rendering bottom right control
   */
  renderBottomRightControls?: CarouselRenderControl | null;

  /**
   * Function for rendering aria-live announcement messages
   */
  renderAnnounceSlideMessage?: ({
    currentSlide,
    slideCount
  }: CarouselSlideRenderControlProps) => string;

  /**
   * Supports 'page' and 'remainder' scroll modes.
   * Defaults to 'remainder'.
   */
  scrollMode?: CarouselScrollModeProp;

  /**
   * Manually set the index of the slide to be shown
   */
  slideIndex?: number;

  /**
   * Slides to scroll at once.
   */
  slidesToScroll?: CarouselSlidesToScrollProp;

  /**
   * Slides to show at once
   */
  slidesToShow?: number;

  /**
   * Animation duration
   */
  speed?: number;

  /**
   * style object
   */
  style?: React.CSSProperties;

  /**
   * Enable touch swipe/dragging
   */
  swiping?: boolean;

  /**
   * Enable the slides to transition vertically
   */
  vertical?: boolean;

  /**
   * Sets infinite wrapAround mode
   * @default false
   */
  wrapAround?: boolean;

  /**
   * Used to remove all controls at once. Overwrites the render[Top, Right, Bottom, Left]CenterControls()
   * @default false
   */
  withoutControls?: boolean;

  /**
   * Adds a number value to set the scale of zoom when animation === "zoom".
   * The number value should be set in a range of (0,1).
   * @default 0.85
   */
  zoomScale?: number;
}

export interface CarouselState {
  /**
   * Current slide index
   */
  currentSlide: number;

  /**
   * Is dragging enabled
   */
  dragging: boolean;

  /**
   * Easing function name
   */
  easing: string;

  isWrappingAround: boolean;

  pauseOnHover: boolean;

  resetWrapAroundPosition: boolean;

  /**
   * Total amount of slides
   */
  slideCount: number;

  /**
   * Slides to scroll at once
   */
  slidesToScroll: CarouselSlidesToScrollProp;

  /**
   * Current slide width
   */
  slideWidth: CarouselSlideWidthProp;

  /**
   * Is infinite mode enabled
   */
  wrapToIndex: boolean;
}

export default class Carousel extends React.Component<
  CarouselProps,
  CarouselState
> {}

export type PreviousButtonProps = CarouselSlideRenderControlProps;
export const PreviousButton: React.FC<PreviousButtonProps>;

export type NextButtonProps = CarouselSlideRenderControlProps;
export const NextButton: React.FC<NextButtonProps>;

export type PagingDotsProps = CarouselSlideRenderControlProps;
export const PagingDots: React.FC<PagingDotsProps>;
