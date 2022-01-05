// TODO: Needs refactoring
/* eslint-disable complexity */
import React, { CSSProperties } from 'react';
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

export const prevButtonDisabled = ({
  currentSlide,
  slideCount,
  slidesToShow,
  wrapAround
}: ControlProps) => {
  // inifite carousel with visible slides that are less than all slides
  if (wrapAround && slidesToShow < slideCount) {
    return false;
  }

  // inifite carousel with visible slide equal or less than all slides
  if (wrapAround) {
    return true;
  }

  // if the first slide is not visible return false (button is not disabled)
  if (currentSlide !== 0) {
    return false;
  }

  return true;
};

export const PreviousButton = (props: ControlProps) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    props?.previousSlide();
  };

  const { prevButtonClassName, prevButtonStyle = {}, prevButtonText } =
    props.defaultControlsConfig || {};

  const disabled = prevButtonDisabled(props);

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
  currentSlide,
  slideCount,
  slidesToShow,
  wrapAround
}: ControlProps) => {
  // inifite carousel with visible slides that are less than all slides
  if (wrapAround && slidesToShow < slideCount) {
    return false;
  }

  // inifite carousel with visible slide equal or less than all slides
  if (wrapAround) {
    return true;
  }

  // if the last slide is not visible return false (button is not disabled)
  if (currentSlide + slidesToShow < slideCount) {
    return false;
  }

  return true;
};

export const NextButton = (props: ControlProps) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    props.nextSlide();
  };

  const { defaultControlsConfig } = props;

  const {
    nextButtonClassName,
    nextButtonStyle = {},
    nextButtonText
  } = defaultControlsConfig;

  const disabled = nextButtonDisabled(props);

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
