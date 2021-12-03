import React, { CSSProperties } from 'react';
import {
  Positions,
  Alignment,
  HeightMode,
  TransitionProps,
  CarouselProps,
  CarouselState,
  ScrollMode
} from '../types';

export const getImgTagStyles = (): string => `.slider-slide > img { width: 100%; display: block; }
          .slider-slide > img:focus { margin: auto; }`;

export const getSlideHeight = (props: {
  children: React.ReactNode;
  slideWidth: number;
  cellSpacing: number;
  slideHeight: number;
  vertical: boolean;
  heightMode: HeightMode;
}): number | 'auto' => {
  const childCount = React.Children.count(props.children);
  const listWidth = props.slideWidth * childCount;
  const spacingOffset = props.cellSpacing * childCount;

  const calculatedHeight = props.vertical
    ? listWidth + spacingOffset
    : props.slideHeight;

  return calculatedHeight > 0 && props.heightMode !== HeightMode.Current
    ? calculatedHeight
    : 'auto';
};

export const getAlignmentOffset = (
  slideIndex: number,
  config: {
    cellAlign: Alignment;
    cellSpacing: number;
    frameWidth: number;
    slideWidth: number;
  }
): number => {
  let offset = 0;

  switch (config.cellAlign) {
    case Alignment.Left: {
      offset = 0;
      offset -= config.cellSpacing * slideIndex;
      break;
    }
    case Alignment.Center: {
      offset = (config.frameWidth - config.slideWidth) / 2;
      offset -= config.cellSpacing * slideIndex;
      break;
    }
    case Alignment.Right: {
      offset = config.frameWidth - config.slideWidth;
      offset -= config.cellSpacing * slideIndex;
      break;
    }
  }

  return offset;
};

export const getDecoratorStyles = (position: Positions): CSSProperties => {
  switch (position) {
    case Positions.TopLeft: {
      return {
        position: 'absolute',
        top: 0,
        left: 0
      };
    }
    case Positions.TopCenter: {
      return {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        WebkitTransform: 'translateX(-50%)',
        msTransform: 'translateX(-50%)'
      };
    }
    case Positions.TopRight: {
      return {
        position: 'absolute',
        top: 0,
        right: 0
      };
    }
    case Positions.CenterLeft: {
      return {
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
        WebkitTransform: 'translateY(-50%)',
        msTransform: 'translateY(-50%)'
      };
    }
    case Positions.CenterCenter: {
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        WebkitTransform: 'translate(-50%, -50%)',
        msTransform: 'translate(-50%, -50%)'
      };
    }
    case Positions.CenterRight: {
      return {
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        WebkitTransform: 'translateY(-50%)',
        msTransform: 'translateY(-50%)'
      };
    }
    case Positions.BottomLeft: {
      return {
        position: 'absolute',
        bottom: 0,
        left: 0
      };
    }
    case Positions.BottomCenter: {
      return {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        WebkitTransform: 'translateX(-50%)',
        msTransform: 'translateX(-50%)'
      };
    }
    case Positions.BottomRight: {
      return {
        position: 'absolute',
        bottom: 0,
        right: 0
      };
    }
    default: {
      return {
        position: 'absolute',
        top: 0,
        left: 0
      };
    }
  }
};

export const getSliderStyles = (
  propWidth: number | string,
  propHeight: number | string
): CSSProperties => ({
  boxSizing: 'border-box',
  display: 'block',
  height: propHeight,
  MozBoxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
  width: propWidth
});

export const getFrameStyles = (
  propFrameOverFlow: string,
  propVertical: boolean,
  propFramePadding: number | string,
  stateFrameWidth: number | string | null
): CSSProperties => ({
  boxSizing: 'border-box',
  display: 'block',
  height: propVertical ? stateFrameWidth || 'initial' : '100%',
  margin: propFramePadding,
  MozBoxSizing: 'border-box',
  msTransform: 'translate(0, 0)',
  overflow: propFrameOverFlow,
  padding: 0,
  position: 'relative',
  touchAction: `pinch-zoom ${propVertical ? 'pan-x' : 'pan-y'}`,
  transform: 'translate3d(0, 0, 0)',
  WebkitTransform: 'translate3d(0, 0, 0)'
});

export const getTransitionProps = (
  props: CarouselProps,
  state: CarouselState
): Omit<TransitionProps, 'children' | 'deltaX' | 'deltaY'> => ({
  animation: props.animation,
  cellAlign: props.cellAlign,
  cellSpacing: props.cellSpacing,
  currentSlide: state.currentSlide,
  dragging: props.dragging,
  frameWidth: Math.trunc(state.frameWidth),
  hasInteraction: state.hasInteraction,
  heightMode: props.heightMode,
  isWrappingAround: state.isWrappingAround,
  left: state.left,
  opacityScale: props.opacityScale,
  slideCount: state.slideCount,
  slideHeight: state.slideHeight,
  slideListMargin: props.slideListMargin,
  slideOffset: props.slideOffset,
  slidesToScroll:
    props.scrollMode === ScrollMode.Page
      ? state.slidesToShow
      : props.slidesToScroll,
  slidesToShow: state.slidesToShow,
  slideWidth: state.slideWidth,
  top: state.top,
  vertical: props.vertical,
  wrapAround: props.wrapAround,
  zoomScale: props.zoomScale
});
