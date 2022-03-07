import React from 'react';
import { Alignment, ControlProps, D3EasingFunctions } from './types';
import { PagingDots, PreviousButton, NextButton } from './default-controls';
import { defaultRenderAnnounceSlideMessage } from './announce-slide';

const defaultProps = {
  afterSlide: () => {
    // do nothing
  },
  autoGenerateStyleTag: true,
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
  easing: D3EasingFunctions.EaseCircleOut,
  edgeEasing: D3EasingFunctions.EaseElasticOut,
  enableKeyboardControls: false,
  frameAriaLabel: 'carousel-slider',
  getControlsContainerStyles: () => ({}),
  keyCodeConfig: {
    nextSlide: [39, 68, 38, 87],
    previousSlide: [37, 65, 40, 83],
    firstSlide: [81],
    lastSlide: [69],
    pause: [32]
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
  slideIndex: 0,
  slideOffset: 25,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  style: {},
  swiping: true,
  vertical: false,
  withoutControls: false,
  wrapAround: false,
  children: <></>
};

export default defaultProps;
