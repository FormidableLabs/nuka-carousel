import React from 'react';
import { Alignment, D3EasingFunctions, ScrollMode } from './types';
import { NextButton, PagingDots, PreviousButton } from './default-controls';
import { defaultRenderAnnounceSlideMessage } from './announce-slide';
var defaultProps = {
  adaptiveHeight: false,
  afterSlide: function afterSlide() {// do nothing
  },
  autoplay: false,
  autoplayInterval: 3000,
  autoplayReverse: false,
  beforeSlide: function beforeSlide() {// do nothing
  },
  cellAlign: Alignment.Left,
  cellSpacing: 0,
  defaultControlsConfig: {},
  disableAnimation: false,
  disableEdgeSwiping: false,
  dragging: true,
  dragThreshold: 0.5,
  easing: D3EasingFunctions.EaseCircleOut,
  edgeEasing: D3EasingFunctions.EaseElasticOut,
  enableKeyboardControls: false,
  frameAriaLabel: 'carousel-slider',
  keyCodeConfig: {
    nextSlide: [39, 68, 38, 87],
    previousSlide: [37, 65, 40, 83],
    firstSlide: [81],
    lastSlide: [69],
    pause: [32]
  },
  onDragStart: function onDragStart() {// do nothing
  },
  onDrag: function onDrag() {// do nothing
  },
  onDragEnd: function onDragEnd() {// do nothing
  },
  pauseOnHover: true,
  renderAnnounceSlideMessage: defaultRenderAnnounceSlideMessage,
  renderBottomCenterControls: function renderBottomCenterControls(props) {
    return /*#__PURE__*/React.createElement(PagingDots, props);
  },
  renderCenterLeftControls: function renderCenterLeftControls(props) {
    return /*#__PURE__*/React.createElement(PreviousButton, props);
  },
  renderCenterRightControls: function renderCenterRightControls(props) {
    return /*#__PURE__*/React.createElement(NextButton, props);
  },
  scrollMode: ScrollMode.page,
  slideIndex: 0,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  style: {},
  swiping: true,
  vertical: false,
  withoutControls: false,
  wrapAround: false,
  children: /*#__PURE__*/React.createElement(React.Fragment, null)
};
export default defaultProps;