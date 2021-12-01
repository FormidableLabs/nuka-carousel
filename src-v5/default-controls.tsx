/* eslint-disable complexity */
import React, { CSSProperties } from 'react';
import { getAlignmentOffset } from './utilities/style-utilities';
import { Alignment, ControlProps } from './types';

const defaultButtonStyles = (disabled: boolean): CSSProperties => ({
  border: 0,
  background: 'rgba(0,0,0,0.4)',
  color: 'white',
  padding: 10,
  textTransform: 'uppercase',
  opacity: disabled ? 0.3 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer'
});

export const PreviousButton = (props: ControlProps) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
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
  scrollMode,
  slidesToScroll
}: ControlProps) => {
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
  // return true if its last slide or slideCount =0
  const lastSlide =
    currentSlide > 0 && currentSlide + slidesToScroll >= slideCount;
  if (
    (lastSlide && !wrapAround && scrollMode === 'remainder') ||
    slideCount === 0
  ) {
    return (buttonDisabled = true);
  }
  return buttonDisabled;
};

export const NextButton = (props: ControlProps) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
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
    scrollMode,
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
    scrollMode,
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
  slideCount: number,
  slidesToScroll: number,
  slidesToShow: number,
  cellAlign: Alignment
) => {
  const dotIndexes = [];
  let lastDotIndex = slideCount - slidesToShow;
  const slidesToShowIsDecimal = slidesToShow % 1 !== 0;

  switch (cellAlign) {
    case Alignment.Center:
    case Alignment.Right:
      lastDotIndex += slidesToShow - 1;
      break;
  }
  // the below condition includes the last index if slidesToShow is decimal
  if (cellAlign === Alignment.Left && slidesToShowIsDecimal) {
    lastDotIndex += slidesToShow - 1;
  }

  if (lastDotIndex < 0) {
    return [0];
  }

  const scrollSlides = slidesToScroll === 0 ? 1 : slidesToScroll;

  for (let i = 0; i < lastDotIndex; i += scrollSlides) {
    dotIndexes.push(i);
  }

  // the below condition includes the last index if slidesToShow is not decimal and cellAlign = left
  if (cellAlign === 'left' && !slidesToShowIsDecimal) {
    lastDotIndex = slideCount - (slideCount % slidesToShow || slidesToShow);
  }
  if (!dotIndexes.includes(lastDotIndex)) {
    dotIndexes.push(lastDotIndex);
  }
  return dotIndexes;
};

export const PagingDots = (props: ControlProps) => {
  const listStyles: CSSProperties = {
    position: 'relative',
    top: -10,
    display: 'flex',
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  };

  const getButtonStyles = (active: boolean) => ({
    cursor: 'pointer',
    opacity: active ? 1 : 0.5,
    background: 'transparent',
    border: 'none',
    fill: 'black'
  });

  const indexes = getDotIndexes(
    props.slideCount,
    props.slidesToScroll,
    props.slidesToShow,
    props.cellAlign
  );
  const {
    pagingDotsContainerClassName,
    pagingDotsClassName,
    pagingDotsStyle = {}
  } = props.defaultControlsConfig;
  return (
    <ul className={pagingDotsContainerClassName} style={listStyles}>
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
              aria-selected={isActive}
            >
              <svg
                className="paging-dot"
                width="6"
                height="6"
                aria-hidden="true"
                focusable="false"
              >
                <circle cx="3" cy="3" r="3" />
              </svg>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
