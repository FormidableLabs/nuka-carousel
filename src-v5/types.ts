import {
  ReactNode,
  CSSProperties,
  MutableRefObject,
  ReactElement
} from 'react';

/* eslint-disable no-shadow */

export enum Alignment {
  Center = 'center',
  Right = 'right',
  Left = 'left'
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

export enum ScrollMode {
  Page = 'page',
  Remainder = 'remainder'
}

export enum HeightMode {
  First = 'first',
  Max = 'max',
  Current = 'current'
}

export enum TransitionMode {
  Scroll = 'scroll',
  Fade = 'fade',
  Scroll3D = 'scroll3d'
}

type SlideChildren = {
  offsetHeight: number;
};

export interface Slide {
  children?: [SlideChildren];
  offsetHeight: number;
}

type D3EasingFunctionNames =
  | 'easeLinear'
  | 'easeQuad'
  | 'easeQuadIn'
  | 'easeQuadOut'
  | 'easeQuadInOut'
  | 'easeCubic'
  | 'easeCubicIn'
  | 'easeCubicOut'
  | 'easeCubicInOut'
  | 'easePoly'
  | 'easePolyIn'
  | 'easePolyOut'
  | 'easePolyInOut'
  | 'easeSin'
  | 'easeSinIn'
  | 'easeSinOut'
  | 'easeSinInOut'
  | 'easeExp'
  | 'easeExpIn'
  | 'easeExpOut'
  | 'easeExpInOut'
  | 'easeCircle'
  | 'easeCircleIn'
  | 'easeCircleOut'
  | 'easeCircleInOut'
  | 'easeBack'
  | 'easeBackIn'
  | 'easeBackOut'
  | 'easeBackInOut'
  | 'easeBounce'
  | 'easeBounceIn'
  | 'easeBounceOut'
  | 'easeBounceInOut'
  | 'easeElastic'
  | 'easeElasticIn'
  | 'easeElasticOut'
  | 'easeElasticInOut';

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

export interface CarouselState {
  cellAlign: Alignment;
  currentSlide: number;
  dragging: boolean;
  easing: (normalizedTime: number) => number;
  frameWidth: number | null;
  hasFocus: boolean;
  hasInteraction: boolean;
  isWrappingAround: boolean;
  left: number;
  pauseOnHover?: boolean;
  resetWrapAroundPosition: boolean;
  slideCount: number;
  slideHeight: number | string;
  slidesToScroll: number;
  slidesToShow: number;
  slideWidth: number;
  top: number;
  wrapToIndex: number | null;
}

type RenderAnnounceSlideMessage = (
  props: Pick<CarouselState, 'currentSlide' | 'slideCount'>
) => string;

export interface ControlProps {
  cellAlign: Alignment;
  cellSpacing: number;
  currentSlide: number;
  defaultControlsConfig: DefaultControlsConfig;
  frameWidth: number | null;
  goToSlide: (index: number) => void;
  left: number;
  nextSlide: () => void;
  previousSlide: () => void;
  scrollMode: ScrollMode;
  slideCount: number;
  slidesToScroll: number;
  slidesToShow: number;
  slideWidth: number;
  top: number;
  vertical: boolean;
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

type RenderControls = (props: ControlProps) => ReactElement;

export interface CarouselProps {
  afterSlide: (index: number) => void;
  animation?: 'zoom';
  autoGenerateStyleTag: boolean;
  autoplay: boolean;
  autoplayInterval: number;
  autoplayReverse: boolean;
  beforeSlide: (currentSlideIndex: number, endSlideIndex: number) => void;
  cellAlign: Alignment;
  cellSpacing: number;
  children: ReactNode | ReactNode[];
  className?: string;
  defaultControlsConfig: DefaultControlsConfig;
  disableAnimation: boolean;
  disableEdgeSwiping: boolean;
  dragging: boolean;
  easing: D3EasingFunctionNames;
  edgeEasing: D3EasingFunctionNames;
  enableKeyboardControls: boolean;
  frameOverflow: string;
  framePadding: string;
  getControlsContainerStyles: (key: Positions) => CSSProperties;
  height: string;
  heightMode: HeightMode;
  initialSlideHeight?: number;
  initialSlideWidth?: number;
  innerRef?: MutableRefObject<HTMLDivElement>;
  keyCodeConfig: KeyCodeConfig;
  onDragStart: (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => void;
  onResize: () => void;
  opacityScale?: number;
  pauseOnHover: boolean;
  renderAnnounceSlideMessage: RenderAnnounceSlideMessage;
  renderBottomCenterControls: RenderControls;
  renderBottomLeftControls?: RenderControls;
  renderBottomRightControls?: RenderControls;
  renderCenterCenterControls?: RenderControls;
  renderCenterLeftControls: RenderControls;
  renderCenterRightControls: RenderControls;
  renderTopCenterControls?: RenderControls;
  renderTopLeftControls?: RenderControls;
  renderTopRightControls?: RenderControls;
  scrollMode: ScrollMode;
  slideIndex: number;
  slideListMargin: number;
  slideOffset: number;
  slidesToScroll: 'auto' | number;
  slidesToShow: number;
  slideWidth: number | string;
  speed: number;
  style: CSSProperties;
  swiping: boolean;
  transitionMode: TransitionMode;
  vertical: boolean;
  width: string;
  withoutControls: boolean;
  wrapAround: boolean;
  zoomScale?: number;
}

export type TransitionProps = Pick<
  CarouselProps,
  | 'animation'
  | 'cellAlign'
  | 'cellSpacing'
  | 'children'
  | 'dragging'
  | 'heightMode'
  | 'opacityScale'
  | 'slideListMargin'
  | 'slideOffset'
  | 'slidesToScroll'
  | 'vertical'
  | 'wrapAround'
  | 'zoomScale'
> &
  Pick<
    CarouselState,
    | 'currentSlide'
    | 'frameWidth'
    | 'hasInteraction'
    | 'isWrappingAround'
    | 'left'
    | 'slideCount'
    | 'slideHeight'
    | 'slideWidth'
    | 'slidesToShow'
    | 'top'
  > & { deltaX: number; deltaY: number };
