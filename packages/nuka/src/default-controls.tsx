/* eslint-disable complexity */
import React, { CSSProperties, useCallback } from 'react';
import { Alignment, ControlProps, ScrollMode } from './types';

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
  wrapAround
}: ControlProps) => {
  // inifite carousel
  if (wrapAround) {
    return false;
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

  const {
    prevButtonClassName,
    prevButtonStyle = {},
    prevButtonText
  } = props.defaultControlsConfig || {};

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
  slidesToScroll,
  wrapAround,
  scrollMode
}: ControlProps) => {
  // inifite carousel
  if (wrapAround) {
    return false;
  }

  // remainder scroll mode
  if (
    scrollMode === ScrollMode.remainder &&
    currentSlide >= slideCount - slidesToShow
  ) {
    return true;
  }

  // if the last slide is not visible return false (button is not disabled)
  if (currentSlide < slideCount - slidesToScroll) {
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

/**
 * Calculate the indices that each dot will jump to when clicked
 */
export const getDotIndexes = (
  slideCount: number,
  slidesToScroll: number,
  scrollMode: ScrollMode,
  slidesToShow: number,
  wrapAround: boolean,
  cellAlign: Alignment
) => {
  const dotIndexes: number[] = [];
  const scrollSlides = slidesToScroll <= 0 ? 1 : slidesToScroll;

  if (wrapAround) {
    for (let i = 0; i < slideCount; i += scrollSlides) {
      dotIndexes.push(i);
    }

    return dotIndexes;
  }

  if (scrollMode === ScrollMode.page || cellAlign === Alignment.Center) {
    for (let i = 0; i < slideCount; i += scrollSlides) {
      dotIndexes.push(i);
    }

    // Make sure the final slides are given dots when center- or right-aligned,
    // or they may not be able to be brought into view
    if (
      (cellAlign === Alignment.Center || cellAlign === Alignment.Right) &&
      dotIndexes.length > 0 &&
      dotIndexes[dotIndexes.length - 1] !== slideCount - 1
    ) {
      dotIndexes.push(slideCount - 1);
    }

    return dotIndexes;
  }

  if (cellAlign === Alignment.Left) {
    const lastPossibleIndexWithoutWhitespace = slideCount - slidesToShow;
    for (let i = 0; i < lastPossibleIndexWithoutWhitespace; i += scrollSlides) {
      dotIndexes.push(i);
    }
    dotIndexes.push(lastPossibleIndexWithoutWhitespace);

    return dotIndexes;
  }

  if (cellAlign === Alignment.Right) {
    const firstPossibleIndexWithoutWhitespace = Math.min(
      slidesToShow - 1,
      slideCount - 1
    );

    for (
      let i = firstPossibleIndexWithoutWhitespace;
      i < slideCount - 1;
      i += scrollSlides
    ) {
      dotIndexes.push(i);
    }
    dotIndexes.push(slideCount - 1);

    return dotIndexes;
  }

  // We should never reach this, because the if statements above cover all
  // possible values of cellAlign
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

  const getButtonStyles = useCallback(
    (active: boolean) => ({
      cursor: 'pointer',
      opacity: active ? 1 : 0.5,
      background: 'transparent',
      border: 'none',
      fill: 'black'
    }),
    []
  );

  const indexes = getDotIndexes(
    props.slideCount,
    props.slidesToScroll,
    props.scrollMode,
    props.slidesToShow,
    props.wrapAround,
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
        let isActive =
          props.currentSlide === index ||
          props.currentSlide - props.slideCount === index ||
          props.currentSlide + props.slideCount === index;

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
