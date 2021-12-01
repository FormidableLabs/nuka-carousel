/* eslint-disable no-shadow */

import { ReactNode } from 'react';

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

type SlideChildren = {
  offsetHeight: number;
};

export interface Slide {
  children?: [SlideChildren];
  offsetHeight: number;
}

export interface Transition {
  animation: 'zoom';
  cellAlign: Alignment;
  cellSpacing: number;
  currentSlide: number;
  children: ReactNode[];
  deltaX: number;
  deltaY: number;
  dragging: boolean;
  frameWidth: number;
  hasInteraction: boolean;
  heightMode: HeightMode;
  isWrappingAround: boolean;
  left: number;
  opacityScale: number;
  slideCount: number;
  slideHeight: number;
  slidesToScroll: number;
  slideListMargin: number;
  slideOffset: number;
  slidesToShow: number;
  slideWidth: number;
  top: number;
  vertical: boolean;
  wrapAround: boolean;
  zoomScale: number;
}
