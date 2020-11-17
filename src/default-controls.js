/* eslint-disable complexity */
import React from 'react';
import { getAlignmentOffset } from './utilities/style-utilities';

const defaultButtonStyles = (disabled) => ({
  border: 0,
  background: 'rgba(0,0,0,0.4)',
  color: 'white',
  padding: 10,
  textTransform: 'uppercase',
  opacity: disabled && 0.3,
  cursor: disabled ? 'not-allowed' : 'pointer'
});

export const PreviousButton = (props) => {
  const handleClick = (event) => {
    event.preventDefault();
    props.previousSlide();
  };

  const {
    prevButtonClassName,
    prevButtonStyle = {},
    prevButtonText
  } = props.defaultControlsConfig;

  const disabled =
    (props.currentSlide === 0 && !props.wrapAround) || props.slideCount === 0;

  return (
    <button
      className={prevButtonClassName}
      style={{
        ...defaultButtonStyles(disabled),
        ...prevButtonStyle
      }}
      disabled={disabled}
      onClick={handleClick}
      aria-label="previous"
      type="button"
    >
      {prevButtonText || 'Prev'}
    </button>
  );
};

export const nextButtonDisabled = ({
  cellAlign,
  cellSpacing,
  currentSlide,
  frameWidth,
  positionValue,
  slideCount,
  slidesToShow,
  slideWidth,
  wrapAround,
  slidesToScroll
}) => {
  let buttonDisabled = false;

  if (!wrapAround) {
    const alignmentOffset = getAlignmentOffset(currentSlide, {
      cellAlign,
      cellSpacing,
      frameWidth,
      slideWidth
    });

    const relativePosition = positionValue - alignmentOffset;

    const width = slideWidth + cellSpacing;
    const endOffset =
      cellAlign === 'center' ? 2 * alignmentOffset : alignmentOffset;
    const endPosition = -width * slideCount + width * slidesToShow - endOffset;

    buttonDisabled =
      relativePosition < endPosition ||
      Math.abs(relativePosition - endPosition) < 0.01;
  }
  if (slidesToScroll === 'auto') {
    const slidesToScrollAuto = Math.floor(
      frameWidth / (slideWidth + cellSpacing)
    );
    if (currentSlide + slidesToScrollAuto > slideCount - 1) {
      return (buttonDisabled = true);
    }
  }

  return buttonDisabled;
};

export const NextButton = (props) => {
  const handleClick = (event) => {
    event.preventDefault();
    props.nextSlide();
  };

  const {
    cellAlign,
    cellSpacing,
    currentSlide,
    defaultControlsConfig,
    frameWidth,
    left,
    slideCount,
    slidesToShow,
    slideWidth,
    top,
    vertical,
    wrapAround,
    slidesToScroll
  } = props;

  const {
    nextButtonClassName,
    nextButtonStyle = {},
    nextButtonText
  } = defaultControlsConfig;

  const disabled = nextButtonDisabled({
    cellAlign,
    cellSpacing,
    currentSlide,
    frameWidth,
    positionValue: vertical ? top : left,
    slideCount,
    slidesToShow,
    slideWidth,
    wrapAround,
    slidesToScroll
  });

  return (
    <button
      className={nextButtonClassName}
      style={{
        ...defaultButtonStyles(disabled),
        ...nextButtonStyle
      }}
      disabled={disabled}
      onClick={handleClick}
      aria-label="next"
      type="button"
    >
      {nextButtonText || 'Next'}
    </button>
  );
};

export const getDotIndexes = (
  slideCount,
  slidesToScrollInitial,
  slidesToScroll,
  slidesToShow,
  cellAlign,
  scrollMode,
  slideWidth
) => {
  const dotIndexes = [];
  console.log("slidesToscrollfor real",slidesToScroll,slidesToShow)
  let lastDotIndex = slideCount - slidesToShow;
  const slidesToShowIsDecimal = slidesToShow % 1 !== 0;

  switch (cellAlign) {
    case 'center':
    case 'right':
      lastDotIndex += slidesToShow - 1;
      break;
  }
  // the below condition includes the last index if slidesToShow is decimal
  if (cellAlign === 'left' && slidesToShowIsDecimal) {
    lastDotIndex += slidesToShow - 1;
  }

  if (lastDotIndex < 0) {
    return [0];
  }

  for (let i = 0; i <= lastDotIndex; i += slidesToScroll) {
    dotIndexes.push(i);
  }

  // the below condition includes the last index if slidesToShow is not decimal and cellAlign = left and mode = page
  if (cellAlign === 'left' && scrollMode === 'page' && !slidesToShowIsDecimal) {
    console.log(slideCount, slidesToShow);
    lastDotIndex = slideCount - (slideCount % slidesToShow || slidesToShow);
    console.log(lastDotIndex);
  }
  
  console.log("slidesToScrollAuto",slidesToScrollInitial)
  if (slidesToScrollInitial === 'auto' && slideWidth === 1) {
    // if ((slideCount / slidesToScroll) % 1 !== 0 &&
    //     frameWidth / slideWidth) {
    //   dotIndexes.push(lastDotIndex);
    //   return dotIndexes;
    // } else {
    return dotIndexes;
    // }
  }
  if (!dotIndexes.includes(lastDotIndex)) {
    dotIndexes.push(lastDotIndex);
  }

  return dotIndexes;
};

export const PagingDots = (props) => {
  const getListStyles = () => ({
    position: 'relative',
    top: -10,
    display: 'flex',
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  });

  const getButtonStyles = (active) => ({
    cursor: 'pointer',
    opacity: active ? 1 : 0.5,
    background: 'transparent',
    border: 'none',
    fill: 'black'
  });
  let slidesToScrollCalc;

  if (props.slidesToScroll === 'auto' || props.slideWidth !== 1) {
    slidesToScrollCalc = Math.floor(
      props.frameWidth / (props.slideWidth + props.cellSpacing)
    );
  } else {
    slidesToScrollCalc = props.slidesToScroll;
  }

  const indexes = getDotIndexes(
    props.slideCount,
    props.slidesToScroll,
    slidesToScrollCalc,
    props.slidesToShow,
    props.cellAlign,
    props.scrollMode,
    props.slideWidth
  );
  console.log('dotIndexes', indexes);
  const {
    pagingDotsContainerClassName,
    pagingDotsClassName,
    pagingDotsStyle = {}
  } = props.defaultControlsConfig;
  return (
    <ul className={pagingDotsContainerClassName} style={getListStyles()}>
      {indexes.map((index, i) => {
        let isActive = props.currentSlide === index;
        // the below condition checks and sets navigation dots active if the current slide falls in the current index range
        if (props.currentSlide < index && props.currentSlide > indexes[i - 1]) {
          isActive = true;
        }
        return (
          <li
            key={index}
            className={isActive ? 'paging-item active' : 'paging-item'}
          >
            <button
              className={pagingDotsClassName}
              type="button"
              style={{
                ...getButtonStyles(isActive),
                ...pagingDotsStyle
              }}
              onClick={props.goToSlide.bind(null, index)}
              aria-label={`slide ${index + 1} bullet`}
            >
              <svg className="paging-dot" width="6" height="6">
                <circle cx="3" cy="3" r="3" />
              </svg>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
