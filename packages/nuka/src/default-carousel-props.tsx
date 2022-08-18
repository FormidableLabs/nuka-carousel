import React from 'react';
import {
  Alignment,
  InternalCarouselProps,
  ControlProps,
  D3EasingFunctions,
  ScrollMode,
} from './types';
import { NextButton, PagingDots, PreviousButton } from './default-controls';
import { defaultRenderAnnounceSlideMessage } from './announce-slide';

const defaultProps: InternalCarouselProps = {
  adaptiveHeight: false,
  adaptiveHeightAnimation: true,
  afterSlide: () => {
    // do nothing
  },
  autoplay: false,
  autoplayInterval: 3000,
  autoplayReverse: false,
  beforeSlide: () => {
    // do nothing
  },
  cellAlign: Alignment.Left,
  cellSpacing: 0,
  defaultControlsConfig: {},
  disableAnimation: false,
  disableEdgeSwiping: false,
  dragging: true,
  dragThreshold: 0.5,
  easing: D3EasingFunctions.EaseCircleOut,
  enableKeyboardControls: false,
  frameAriaLabel: 'carousel-slider',
  keyCodeConfig: {
    nextSlide: [39, 68, 38, 87],
    previousSlide: [37, 65, 40, 83],
    firstSlide: [81],
    lastSlide: [69],
    pause: [32],
  },
  onDragStart: () => {
    // do nothing
  },
  onDrag: () => {
    // do nothing
  },
  onDragEnd: () => {
    // do nothing
  },
  pauseOnHover: true,
  renderAnnounceSlideMessage: defaultRenderAnnounceSlideMessage,
  renderBottomCenterControls: (props: ControlProps) => (
    <PagingDots {...props} />
  ),
  renderCenterLeftControls: (props: ControlProps) => (
    <PreviousButton {...props} />
  ),
  renderCenterRightControls: (props: ControlProps) => <NextButton {...props} />,
  scrollMode: ScrollMode.page,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  style: {},
  swiping: true,
  vertical: false,
  withoutControls: false,
  wrapAround: false,
  children: <></>,
};

export default defaultProps;
