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
  cellAlign: Alignment;
  cellSpacing: number;
  currentSlide: number;
  defaultControlsConfig: DefaultControlsConfig;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  previousSlide: () => void;
  scrollMode: ScrollMode;
  slideCount: number;
  slidesToScroll: number;
  slidesToShow: number;
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
  adaptiveHeight: boolean;
  afterSlide: (index: number) => void;
  animation?: 'zoom' | 'fade';
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
  dragThreshold: number;
  easing: D3EasingFunctions; // not migrated yet
  edgeEasing: D3EasingFunctions; // not migrated yet
  enableKeyboardControls: boolean;
  frameAriaLabel?: string;
  innerRef?: MutableRefObject<HTMLDivElement>;
  keyCodeConfig: KeyCodeConfig;
  onDragStart: (
    e?: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => void;
  onDrag: (
    e?: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => void;
  onDragEnd: (
    e?: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => void;
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
  slideIndex: number; // ???
  slidesToScroll: number;
  slidesToShow: number;
  speed: number;
  style: CSSProperties;
  swiping: boolean;
  vertical: boolean; // not migrated yet
  withoutControls: boolean;
  wrapAround: boolean;
  zoomScale?: number;
}
