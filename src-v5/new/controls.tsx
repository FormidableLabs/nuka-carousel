/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Fragment } from 'react';
import { getDecoratorStyles } from './control-styles';
import { CarouselProps, Positions, RenderControlFunctionNames } from './types';

type ControlMap = { funcName: RenderControlFunctionNames; key: Positions }[];
const controlsMap: ControlMap = [
  { funcName: 'renderTopLeftControls', key: Positions.TopLeft },
  { funcName: 'renderTopCenterControls', key: Positions.TopCenter },
  { funcName: 'renderTopRightControls', key: Positions.TopRight },
  { funcName: 'renderCenterLeftControls', key: Positions.CenterLeft },
  { funcName: 'renderCenterCenterControls', key: Positions.CenterCenter },
  { funcName: 'renderCenterRightControls', key: Positions.CenterRight },
  { funcName: 'renderBottomLeftControls', key: Positions.BottomLeft },
  { funcName: 'renderBottomCenterControls', key: Positions.BottomCenter },
  { funcName: 'renderBottomRightControls', key: Positions.BottomRight }
];

const renderControls = (
  props: CarouselProps,
  count: number
): React.ReactElement[] =>
  controlsMap.map((control) => {
    if (
      !props[control.funcName] ||
      typeof props[control.funcName] !== 'function'
    ) {
      return <Fragment key={control.funcName} />;
    }
    return (
      <div
        key={control.funcName}
        className={[
          `slider-control-${control.key.toLowerCase()}`,
          props.defaultControlsConfig.containerClassName || ''
        ]
          .join(' ')
          .trim()}
        style={{
          ...getDecoratorStyles(control.key),
          ...props.getControlsContainerStyles(control.key)
        }}
      >
        {props[control.funcName]?.({
          cellAlign: props.cellAlign,
          cellSpacing: props.cellSpacing,
          // currentSlide: state.currentSlide,
          currentSlide: 0,
          defaultControlsConfig: props.defaultControlsConfig || {},
          // frameWidth: state.frameWidth, // but why?
          // goToSlide: (index) => goToSlide(index),
          // nextSlide: () => nextSlide(),
          // previousSlide: () => previousSlide(),
          goToSlide: () => {},
          nextSlide: () => {},
          previousSlide: () => {},
          scrollMode: props.scrollMode,
          slideCount: count,
          slidesToScroll: props.slidesToScroll,
          slidesToShow: props.slidesToShow || 1,
          // slideWidth: props.slideWidth,
          vertical: props.vertical,
          wrapAround: props.wrapAround
        })}
      </div>
    );
  });

export default renderControls;
