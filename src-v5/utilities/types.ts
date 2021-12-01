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

type SlideChildren = {
  offsetHeight: number;
};

export interface Slide {
  children?: [SlideChildren];
  offsetHeight: number;
}
