import React, { Fragment } from 'react';
import { getControlContainerStyles } from './control-styles';
import {
  getDotIndexes,
  nextButtonDisabled,
  prevButtonDisabled,
} from './default-controls';
import {
  InternalCarouselProps,
  Positions,
  RenderControlFunctionNames,
} from './types';

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
  { funcName: 'renderBottomRightControls', key: Positions.BottomRight },
];

const renderControls = (
  props: InternalCarouselProps,
  slideCount: number,
  currentSlide: number,
  goToSlide: (targetSlideIndex: number) => void,
  nextSlide: () => void,
  prevSlide: () => void,
  slidesToScroll: number
): React.ReactElement[] | null => {
  if (props.withoutControls) {
    return null;
  }

  const disableCheckProps = {
    ...props,
    currentSlide,
    slideCount,
  };
  const nextDisabled = nextButtonDisabled(disableCheckProps);
  const previousDisabled = prevButtonDisabled(disableCheckProps);
  const pagingDotsIndices = getDotIndexes(
    slideCount,
    slidesToScroll,
    props.scrollMode,
    props.slidesToShow,
    props.wrapAround,
    props.cellAlign
  );

  return controlsMap.map((control) => {
    if (
      !props[control.funcName] ||
      typeof props[control.funcName] !== 'function'
    ) {
      return <Fragment key={control.funcName} />;
    }
    return (
      <div
        key={control.funcName}
        style={{
          ...getControlContainerStyles(control.key),
          pointerEvents: 'none',
        }}
      >
        <div
          className={[
            `slider-control-${control.key.toLowerCase()}`,
            props.defaultControlsConfig.containerClassName || '',
          ]
            .join(' ')
            .trim()}
          // The container has `pointerEvents: 'none'` so we need to override
          // that to make sure the controls are clickable.
          style={{ pointerEvents: 'auto' }}
        >
          {props[control.funcName]?.({
            cellAlign: props.cellAlign,
            cellSpacing: props.cellSpacing,
            currentSlide,
            defaultControlsConfig: props.defaultControlsConfig || {},
            pagingDotsIndices,
            goToSlide,
            nextDisabled,
            nextSlide,
            onUserNavigation: props.onUserNavigation,
            previousDisabled,
            previousSlide: prevSlide,
            scrollMode: props.scrollMode,
            slideCount,
            slidesToScroll,
            slidesToShow: props.slidesToShow || 1,
            vertical: props.vertical,
            wrapAround: props.wrapAround,
          })}
        </div>
      </div>
    );
  });
};

export default renderControls;
