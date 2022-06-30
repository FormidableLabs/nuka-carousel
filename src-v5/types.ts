import { ReactNode, CSSProperties, MutableRefObject } from 'react';

/* eslint-disable no-shadow */

export enum Alignment {
  Center = 'center',
  Right = 'right',
  Left = 'left'
}

export enum Directions {
  Next = 'next',
  Prev = 'prev',
  Up = 'up',
  Down = 'down'
}

export enum Positions {
  TopLeft = 'TopLeft',
  TopCenter = 'TopCenter',
  TopRight = 'TopRight',
  CenterLeft = 'CenterLeft',
  CenterCenter = 'CenterCenter',
  CenterRight = 'CenterRight',
  BottomLeft = 'BottomLeft',
  BottomCenter = 'BottomCenter',
  BottomRight = 'BottomRight'
}

type SlideChildren = {
  offsetHeight: number;
};

export type SlideHeight = {
  height: number;
  slideIndex: number;
};

export interface Slide {
  children?: [SlideChildren];
  offsetHeight: number;
}

export enum ScrollMode {
  page = 'page',
  remainder = 'remainder'
}

export enum D3EasingFunctions {
  EaseLinear = 'easeLinear',
  EaseQuad = 'easeQuad',
  EaseQuadIn = 'easeQuadIn',
  EaseQuadOut = 'easeQuadOut',
  EaseQuadInOut = 'easeQuadInOut',
  EaseCubic = 'easeCubic',
  EaseCubicIn = 'easeCubicIn',
  EaseCubicOut = 'easeCubicOut',
  EaseCubicInOut = 'easeCubicInOut',
  EasePoly = 'easePoly',
  EasePolyIn = 'easePolyIn',
  EasePolyOut = 'easePolyOut',
  EasePolyInOut = 'easePolyInOut',
  EaseSin = 'easeSin',
  EaseSinIn = 'easeSinIn',
  EaseSinOut = 'easeSinOut',
  EaseSinInOut = 'easeSinInOut',
  EaseExp = 'easeExp',
  EaseExpIn = 'easeExpIn',
  EaseExpOut = 'easeExpOut',
  EaseExpInOut = 'easeExpInOut',
  EaseCircle = 'easeCircle',
  EaseCircleIn = 'easeCircleIn',
  EaseCircleOut = 'easeCircleOut',
  EaseCircleInOut = 'easeCircleInOut',
  EaseBack = 'easeBack',
  EaseBackIn = 'easeBackIn',
  EaseBackOut = 'easeBackOut',
  EaseBackInOut = 'easeBackInOut',
  EaseBounce = 'easeBounce',
  EaseBounceIn = 'easeBounceIn',
  EaseBounceOut = 'easeBounceOut',
  EaseBounceInOut = 'easeBounceInOut',
  EaseElastic = 'easeElastic',
  EaseElasticIn = 'easeElasticIn',
  EaseElasticOut = 'easeElasticOut',
  EaseElasticInOut = 'easeElasticInOut'
}

interface DefaultControlsConfig {
  containerClassName?: string;
  nextButtonClassName?: string;
  nextButtonStyle?: CSSProperties;
  nextButtonText?: string;
  pagingDotsClassName?: string;
  pagingDotsContainerClassName?: string;
  pagingDotsStyle?: CSSProperties;
  prevButtonClassName?: string;
  prevButtonStyle?: CSSProperties;
  prevButtonText?: string;
}

export interface KeyCodeConfig {
  firstSlide?: number[];
  lastSlide?: number[];
  nextSlide?: number[];
  pause?: number[];
  previousSlide?: number[];
}

export type KeyCodeFunction =
  | 'nextSlide'
  | 'previousSlide'
  | 'firstSlide'
  | 'lastSlide'
  | 'pause'
  | null;

export interface KeyCodeMap {
  [key: number]: keyof KeyCodeConfig;
}

export interface CarouselState {
  cellAlign: Alignment;
  currentSlide: number;
  dragging: boolean;
  easing: (normalizedTime: number) => number;
  hasFocus: boolean;
  hasInteraction: boolean;
  isWrappingAround: boolean;
  left: number;
  pauseOnHover?: boolean;
  resetWrapAroundPosition: boolean;
  count: number;
  slidesToScroll: number;
  slidesToShow: number;
  top: number;
  wrapToIndex: number | null;
}

type RenderAnnounceSlideMessage = (
  props: Pick<CarouselState, 'currentSlide' | 'count'>
) => string;

export interface ControlProps {
  /**
   * When displaying more than one slide, sets which position to anchor the current slide to.
   */
  cellAlign: Alignment;

  /**
   * Space between slides, as an integer, but reflected as px
   */
  cellSpacing: number;

  /**
   * Current slide index
   */
  currentSlide: number;

  /**
   * This prop lets you apply custom classes and styles to the default Next, Previous, and Paging Dots controls
   */
  defaultControlsConfig: DefaultControlsConfig;

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
  scrollMode: ScrollMode;

  /**
   * Total amount of slides
   */
  slideCount: number;

  /**
   * Slides to scroll at once
   */
  slidesToScroll: number;

  /**
   * Slides to show at once
   */
  slidesToShow: number;

  /**
   * Enable the slides to transition vertically
   */
  vertical: boolean;

  /**
   * Sets infinite wrapAround mode
   * @default false
   */
  wrapAround: boolean;
}

export type RenderControlFunctionNames =
  | 'renderTopLeftControls'
  | 'renderTopCenterControls'
  | 'renderTopRightControls'
  | 'renderCenterLeftControls'
  | 'renderCenterCenterControls'
  | 'renderCenterRightControls'
  | 'renderBottomLeftControls'
  | 'renderBottomCenterControls'
  | 'renderBottomRightControls';

/**
 * A function to override what to render on an edge/corner of the modal.
 *
 * Pass in null to not render the default controls on an edge.
 */
type RenderControls = ((props: ControlProps) => ReactNode) | null;

export interface InternalCarouselProps {
  /**
   * If it's set to true, the carousel will adapt its height to the visible slides.
   */
  adaptiveHeight: boolean;

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
  cellAlign: Alignment;

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
   * Not migrated yet
   *
   * Animation easing function
   * @see https://github.com/d3/d3-ease
   */
  easing: D3EasingFunctions;

  /**
   * Not migrated yet
   *
   * Animation easing function when swipe exceeds edge
   * @see https://github.com/d3/d3-ease
   */
  edgeEasing: D3EasingFunctions;

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
  onDragStart: (
    e?: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => void;

  /**
   * optional callback function
   */
  onDrag: (
    e?: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => void;

  /**
   * optional callback function
   */
  onDragEnd: (
    e?: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => void;

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
   * Defaults to 'remainder'.
   */
  scrollMode: ScrollMode;

  /**
   * Manually set the index of the initial slide to be shown
   */
  slideIndex: number;

  /**
   * Slides to scroll at once.
   */
  slidesToScroll: number;

  /**
   * Slides to show at once
   */
  slidesToShow: number;

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
export type CarouselProps = Partial<InternalCarouselProps>;
