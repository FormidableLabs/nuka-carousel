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
  wrapAround
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
    wrapAround
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
    wrapAround
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
  slidesToScroll,
  slidesToShow,
  cellAlign,
  scrollMode
) => {
  const dotIndexes = [];
  let lastDotIndex = slideCount - slidesToShow;

  switch (cellAlign) {
    case 'center':
    case 'right':
      lastDotIndex += slidesToShow - 1;
      break;
  }
  if(cellAlign == 'left' && slidesToShow % 1 !== 0 ){
    lastDotIndex += slidesToShow - 1;
  }

  if (lastDotIndex < 0) {
    return [0];
  }

  for (let i = 0; i < lastDotIndex; i += slidesToScroll) {
    dotIndexes.push(i);
  }

  if (cellAlign === 'left' && scrollMode === 'page' && slidesToShow % 1 == 0) {
    lastDotIndex = slideCount - (slideCount % slidesToShow || slidesToShow)
  }

  dotIndexes.push(lastDotIndex);
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

  const indexes = getDotIndexes(
    props.slideCount,
    props.slidesToScroll,
    props.slidesToShow,
    props.cellAlign,
    props.scrollMode
  );
  const {
    pagingDotsContainerClassName,
    pagingDotsClassName,
    pagingDotsStyle = {}
  } = props.defaultControlsConfig;
  return (
    <ul className={pagingDotsContainerClassName} style={getListStyles()}>
      {indexes.map((index , i) => {
        let isActive = props.currentSlide === index
        if(props.currentSlide < index && props.currentSlide > indexes[i-1]){
          isActive = true
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
