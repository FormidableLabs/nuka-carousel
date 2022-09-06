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
  cursor: disabled ? 'not-allowed' : 'pointer',
});

export const prevButtonDisabled = ({
  currentSlide,
  wrapAround,
  cellAlign,
  slidesToShow,
}: ControlProps) => {
  // inifite carousel
  if (wrapAround) {
    return false;
  }

  // disable if displaying the leftmost slide
  if (currentSlide === 0) {
    return true;
  }

  // remainder scroll mode
  if (cellAlign === Alignment.Right && currentSlide <= slidesToShow - 1) {
    return true;
  }

  return false;
};

export const PreviousButton = (props: ControlProps) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    props?.previousSlide();
  };

  const {
    prevButtonClassName,
    prevButtonStyle = {},
    prevButtonText,
  } = props.defaultControlsConfig || {};

  const disabled = prevButtonDisabled(props);

  return (
    <button
      className={prevButtonClassName}
      style={{
        ...defaultButtonStyles(disabled),
        ...prevButtonStyle,
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
  wrapAround,
  cellAlign,
}: ControlProps) => {
  // inifite carousel
  if (wrapAround) {
    return false;
  }

  // If we are at the last possible slide without wrap, disable
  if (currentSlide >= slideCount - 1) {
    return true;
  }

  // remainder scroll mode
  if (
    cellAlign === Alignment.Left &&
    currentSlide >= slideCount - slidesToShow
  ) {
    return true;
  }

  return false;
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
    nextButtonText,
  } = defaultControlsConfig;

  const disabled = nextButtonDisabled(props);

  return (
    <button
      className={nextButtonClassName}
      style={{
        ...defaultButtonStyles(disabled),
        ...nextButtonStyle,
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

  if (cellAlign === Alignment.Center) {
    for (let i = 0; i < slideCount - 1; i += scrollSlides) {
      dotIndexes.push(i);
    }

    if (slideCount > 0) {
      dotIndexes.push(slideCount - 1);
    }

    return dotIndexes;
  }

  if (cellAlign === Alignment.Left) {
    if (slidesToShow >= slideCount) {
      return [0];
    }

    const lastPossibleIndexWithoutWhitespace = slideCount - slidesToShow;

    for (let i = 0; i < lastPossibleIndexWithoutWhitespace; i += scrollSlides) {
      dotIndexes.push(i);
    }

    if (scrollMode === ScrollMode.remainder) {
      dotIndexes.push(lastPossibleIndexWithoutWhitespace);
    } else {
      dotIndexes.push(dotIndexes[dotIndexes.length - 1] + scrollSlides);
    }

    return dotIndexes;
  }

  if (cellAlign === Alignment.Right) {
    if (slidesToShow >= slideCount) {
      return [slideCount - 1];
    }

    const firstPossibleIndexWithoutWhitespace = slidesToShow - 1;

    if (scrollMode === ScrollMode.remainder) {
      for (
        let i = firstPossibleIndexWithoutWhitespace;
        i < slideCount - 1;
        i += scrollSlides
      ) {
        dotIndexes.push(i);
      }
      dotIndexes.push(slideCount - 1);
    } else {
      for (
        let i = slideCount - 1;
        i > firstPossibleIndexWithoutWhitespace;
        i -= scrollSlides
      ) {
        dotIndexes.push(i);
      }
      dotIndexes.push(dotIndexes[dotIndexes.length - 1] - scrollSlides);

      dotIndexes.reverse();
    }

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
    listStyleType: 'none',
  };

  const getButtonStyles = useCallback(
    (active: boolean) => ({
      cursor: 'pointer',
      opacity: active ? 1 : 0.5,
      background: 'transparent',
      border: 'none',
      fill: 'black',
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
    pagingDotsStyle = {},
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
                ...pagingDotsStyle,
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
                viewBox="0 0 6 6"
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
