import React from 'react';
import { InternalCarouselProps, ControlProps, ScrollMode } from './types';
import { NextButton, PagingDots, PreviousButton } from './default-controls';
import { defaultRenderAnnounceSlideMessage } from './announce-slide';

const easeOut = (t: number) => (t - 1) ** 3 + 1;

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
  carouselId: 'nuka-carousel',
  cellAlign: 'left',
  cellSpacing: 0,
  defaultControlsConfig: {},
  disableAnimation: false,
  disableEdgeSwiping: false,
  dragging: true,
  dragThreshold: 0.5,
  easing: easeOut,
  edgeEasing: easeOut,
  enableKeyboardControls: false,
  frameAriaLabel: 'Slider',
  keyCodeConfig: {
    nextSlide: [39, 68, 38, 87],
    previousSlide: [37, 65, 40, 83],
    firstSlide: [81],
    lastSlide: [69],
    pause: [32],
  },
  landmark: false,
  onDragStart: () => {
    // do nothing
  },
  onDrag: () => {
    // do nothing
  },
  onDragEnd: () => {
    // do nothing
  },
  onUserNavigation: () => {
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
  resumeAfterPause: true,
  scrollMode: ScrollMode.page,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  style: {},
  swiping: true,
  tabbed: true,
  vertical: false,
  withoutControls: false,
  wrapAround: false,
  children: <></>,
};

export default defaultProps;
