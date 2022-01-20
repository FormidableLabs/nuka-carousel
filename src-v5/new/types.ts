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
  frameWidth: number | null;
  hasFocus: boolean;
  hasInteraction: boolean;
  isWrappingAround: boolean;
  left: number;
  pauseOnHover?: boolean;
  resetWrapAroundPosition: boolean;
  count: number;
  slideHeight: number | 'auto';
  slidesToScroll: number;
  slidesToShow: number;
  slideWidth: number;
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
  frameWidth?: number | null; // obsolete
  goToSlide: (index: number) => void;
  left?: number; // obsolete
  nextSlide: () => void;
  previousSlide: () => void;
  scrollMode: ScrollMode;
  slideCount: number;
  slidesToScroll: number;
  slidesToShow: number;
  slideWidth?: number; // obsolete
  top?: number; // obsolete
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
  afterSlide: (index: number) => void; // migrated
  animation?: 'zoom' | 'fade'; // migrated
  autoGenerateStyleTag: boolean; // to be deprecated
  autoplay: boolean; // migrated - tested for !wrapAround
  autoplayInterval: number; // migrated - tested for !wrapAround
  autoplayReverse: boolean; // migrated - tested for !wrapAround
  beforeSlide: (currentSlideIndex: number, endSlideIndex: number) => void; // migrated
  cellAlign: Alignment; // migrated
  cellSpacing: number; // migrated
  children: ReactNode | ReactNode[]; // migrated - tested
  className?: string; // migrated
  defaultControlsConfig: DefaultControlsConfig; // migrated, needs more testing
  disableAnimation: boolean; // migrated
  disableEdgeSwiping: boolean; // migrated
  dragging: boolean; // migrated
  easing: D3EasingFunctions;
  edgeEasing: D3EasingFunctions;
  enableKeyboardControls: boolean; // migrated
  framePadding: string; // to be deprecated
  getControlsContainerStyles: (key: Positions) => CSSProperties; // to be deprecated
  height: string; // to be deprecated
  heightMode: HeightMode; // to be deprecated
  initialSlideHeight?: number; // to be deprecated
  initialSlideWidth?: number; // to be deprecated
  innerRef?: MutableRefObject<HTMLDivElement>; // migrated
  keyCodeConfig: KeyCodeConfig; // migrated
  onDragStart: (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => void; // migrated
  opacityScale?: number;
  pauseOnHover: boolean; // migrated - tested
  renderAnnounceSlideMessage: RenderAnnounceSlideMessage; // migrated
  renderBottomCenterControls: RenderControls; // migrated
  renderBottomLeftControls?: RenderControls; // migrated
  renderBottomRightControls?: RenderControls; // migrated
  renderCenterCenterControls?: RenderControls; // migrated
  renderCenterLeftControls: RenderControls; // migrated
  renderCenterRightControls: RenderControls; // migrated
  renderTopCenterControls?: RenderControls; // migrated
  renderTopLeftControls?: RenderControls; // migrated
  renderTopRightControls?: RenderControls; // migrated
  scrollMode: ScrollMode; // to be deprecated
  slideIndex: number; // to be deprecated
  slideOffset: number; // to be deprecated
  slidesToScroll: number; // migrated
  slidesToShow: number; // migrated - tested for !wrapAround
  slideWidth: number | string; // to be deprecated
  speed: number; // migrated
  style: CSSProperties; // migrated
  swiping: boolean; // migrated
  transitionMode: TransitionMode; // to be deprecated
  vertical: boolean;
  width: string; // to be deprecated
  withoutControls: boolean; // migrated
  wrapAround: boolean; // migrated
  zoomScale?: number; // migrated
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
    | 'count'
    | 'slideHeight'
    | 'slideWidth'
    | 'slidesToShow'
    | 'top'
  > & { deltaX: number; deltaY: number };
