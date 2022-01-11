import React from 'react';
import {
  Alignment,
  ControlProps,
  D3EasingFunctions,
  HeightMode,
  ScrollMode,
  TransitionMode
} from './types';
import { PagingDots, PreviousButton, NextButton } from './default-controls';
import AnnounceSlide, {
  defaultRenderAnnounceSlideMessage
} from './announce-slide';

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
  framePadding: '0px',
  getControlsContainerStyles: () => ({}),
  height: 'inherit',
  heightMode: HeightMode.Max,
  keyCodeConfig: {},
  onDragStart: () => {
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
  scrollMode: ScrollMode.Remainder,
  slideIndex: 0,
  slideOffset: 25,
  slidesToScroll: 1,
  slidesToShow: 1,
  slideWidth: 1,
  speed: 500,
  style: {},
  swiping: true,
  transitionMode: TransitionMode.Scroll,
  vertical: false,
  width: '100%',
  withoutControls: false,
  wrapAround: false,
  children: <></>
};

export default defaultProps;
