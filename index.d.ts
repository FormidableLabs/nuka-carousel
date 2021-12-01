// Definitions by: Roman Charugin <https://github.com/Romic>
//                 Alex Smith <https://github.com/altaudio>
//                 matt-sungwook <https://github.com/matt-sungwook>

import * as React from 'react';

export type CarouselScrollModeProp = 'page' | 'remainder';

export type CarouselCellAlignProp = 'left' | 'center' | 'right';

export type CarouselHeightModeProp = 'first' | 'current' | 'max';

export type CarouselTransitionModeProp = 'fade' | 'scroll' | 'scroll3d';

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
   * Hook to be called after a slide is changed
   * @param index Index of the current slide
   */
  afterSlide?: (index: number) => void;

  /**
   * Adds a zoom effect on the currently visible slide.
   */
  animation?: 'zoom';

  /**
   * Will generate a style tag to help ensure images are displayed properly
   * @default true
   */
  autoGenerateStyleTag?: boolean;

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
   * Additional className
   */
  className?: string;

  /**
   * When set to true, disable keyboard controls
   * @default false
   */
  enableKeyboardControls?: boolean;

  /**
   * When enableKeyboardControls is enabled, Configure keyCodes for corresponding slide actions as array of keyCodes
   */
  keyCodeConfig?: {
    [slideAction in CarouselSlideActions]?: number[];
  };

  /**
   * Optional callback to apply styles to the container of a control.
   */
  getControlsContainerStyles?: (
    key: CarouselControlContainerProp
  ) => React.CSSProperties;

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
   * Used to set overflow style property on slider frame
   * @default 'hidden'
   */
  frameOverflow?: string;

  /**
   * Used to set the margin of the slider frame.
   * Accepts any string dimension value such as "0px 20px" or "500px"
   * @example '0px 20px'
   * @example '500px'
   */
  framePadding?: string;

  /**
   * Used to hardcode the slider height
   * @example '80%'
   * @example '500px'
   */
  height?: string;

  /**
   * Ref to pass to carousel element
   */
  innerRef?: React.RefObject<HTMLInputElement>;

  /**
   * Change the height of the slides based either on the first slide,
   * the current slide, or the maximum height of all slides.
   */
  heightMode?: CarouselHeightModeProp;

  /**
   * Initial height of the slides (px)
   */
  initialSlideHeight?: number;

  /**
   * Initial width of the slides (px)
   */
  initialSlideWidth?: number;

  /**
   * optional callback function
   */
  onDragStart?: (e?: Event) => void;

  /**
   * Window onResize callback
   */
  onResize?: () => void;

  /**
   * Adds a number value to set the scale of the opacity for the 'scroll3d' transition mode.
   * @default 0.65
   */
  opacityScale?: number;

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
   * While using prop animation = "zoom", you can
   * configure space around current slide with slideOffset.
   */
  slideOffset?: number;

  /**
   * Slides to scroll at once. Set to "auto"
   * to always scroll the current number of visible slides
   */
  slidesToScroll?: CarouselSlidesToScrollProp;

  /**
   * Slides to show at once
   */
  slidesToShow?: number;

  /**
   * Manually set slideWidth
   * @example '20px'
   * @example 0.8
   */
  slideWidth?: CarouselSlideWidthProp;

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
   * Set the way slides transition from one to the next
   */
  transitionMode?: CarouselTransitionModeProp;

  /**
   * Enable the slides to transition vertically
   */
  vertical?: boolean;

  /**
   * Used to hardcode the slider width
   * @example '80%'
   * @example '500px'
   */
  width?: string;

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

  /**
   * Current frame width
   */
  frameWidth: number;

  isWrappingAround: boolean;

  /**
   * Current left value
   */
  left: number;

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
   * Current top value
   */
  top: number;

  /**
   * Is infinite mode enabled
   */
  wrapToIndex: boolean;
}

export default class Carousel extends React.Component<
  CarouselProps,
  CarouselState
> {}

export interface PreviousButtonProps extends CarouselSlideRenderControlProps {}
export const PreviousButton: React.FC<PreviousButtonProps>;

export interface NextButtonProps extends CarouselSlideRenderControlProps {}
export const NextButton: React.FC<NextButtonProps>;

export interface PagingDotsProps extends CarouselSlideRenderControlProps {}
export const PagingDots: React.FC<PagingDotsProps>;
