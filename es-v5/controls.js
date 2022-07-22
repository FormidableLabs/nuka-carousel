import React, { Fragment } from 'react';
import { getControlContainerStyles } from './control-styles';
import { Positions } from './types';
var controlsMap = [{
  funcName: 'renderTopLeftControls',
  key: Positions.TopLeft
}, {
  funcName: 'renderTopCenterControls',
  key: Positions.TopCenter
}, {
  funcName: 'renderTopRightControls',
  key: Positions.TopRight
}, {
  funcName: 'renderCenterLeftControls',
  key: Positions.CenterLeft
}, {
  funcName: 'renderCenterCenterControls',
  key: Positions.CenterCenter
}, {
  funcName: 'renderCenterRightControls',
  key: Positions.CenterRight
}, {
  funcName: 'renderBottomLeftControls',
  key: Positions.BottomLeft
}, {
  funcName: 'renderBottomCenterControls',
  key: Positions.BottomCenter
}, {
  funcName: 'renderBottomRightControls',
  key: Positions.BottomRight
}];

var renderControls = function renderControls(props, count, currentSlide, moveSlide, _nextSlide, prevSlide, slidesToScroll) {
  if (props.withoutControls) {
    return null;
  }

  return controlsMap.map(function (control) {
    var _props$control$funcNa;

    if (!props[control.funcName] || typeof props[control.funcName] !== 'function') {
      return /*#__PURE__*/React.createElement(Fragment, {
        key: control.funcName
      });
    }

    return /*#__PURE__*/React.createElement("div", {
      key: control.funcName,
      style: getControlContainerStyles(control.key)
    }, /*#__PURE__*/React.createElement("div", {
      key: control.funcName,
      className: ["slider-control-".concat(control.key.toLowerCase()), props.defaultControlsConfig.containerClassName || ''].join(' ').trim() // The container has `pointerEvents: 'none'` so we need to override
      // that to make sure the controls are clickable.
      ,
      style: {
        pointerEvents: 'auto'
      }
    }, (_props$control$funcNa = props[control.funcName]) === null || _props$control$funcNa === void 0 ? void 0 : _props$control$funcNa.call(props, {
      cellAlign: props.cellAlign,
      cellSpacing: props.cellSpacing,
      currentSlide: currentSlide,
      defaultControlsConfig: props.defaultControlsConfig || {},
      goToSlide: function goToSlide(index) {
        return moveSlide(index);
      },
      nextSlide: function nextSlide() {
        return _nextSlide();
      },
      previousSlide: function previousSlide() {
        return prevSlide();
      },
      scrollMode: props.scrollMode,
      slideCount: count,
      slidesToScroll: slidesToScroll,
      slidesToShow: props.slidesToShow || 1,
      vertical: props.vertical,
      wrapAround: props.wrapAround
    })));
  });
};

export default renderControls;