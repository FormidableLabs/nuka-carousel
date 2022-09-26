import React, { CSSProperties, useCallback } from 'react';
import { Alignment, ControlProps, ScrollMode } from './types';
import { getBoundedIndex } from './utils';

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
  cellAlign,
  currentSlide,
  slidesToShow,
  wrapAround,
}: Pick<
  ControlProps,
  'cellAlign' | 'currentSlide' | 'slidesToShow' | 'wrapAround'
>) => {
  // inifite carousel
  if (wrapAround) {
    return false;
  }

  // disable if displaying the leftmost slide
  if (currentSlide === 0) {
    return true;
  }

  // remainder scroll mode
  if (cellAlign === 'right' && currentSlide <= slidesToShow - 1) {
    return true;
  }

  return false;
};

export const PreviousButton = ({
  previousSlide,
  defaultControlsConfig: {
    prevButtonClassName,
    prevButtonStyle = {},
    prevButtonText,
    prevButtonOnClick,
  },
  onUserNavigation,
  previousDisabled: disabled,
}: ControlProps) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    prevButtonOnClick?.(event);
    if (event.defaultPrevented) return;

    onUserNavigation(event);

    event.preventDefault();
    previousSlide();
  };

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
  cellAlign,
  currentSlide,
  slideCount,
  slidesToShow,
  wrapAround,
}: Pick<
  ControlProps,
  'cellAlign' | 'currentSlide' | 'slideCount' | 'slidesToShow' | 'wrapAround'
>) => {
  // inifite carousel
  if (wrapAround) {
    return false;
  }

  // If we are at the last possible slide without wrap, disable
  if (currentSlide >= slideCount - 1) {
    return true;
  }

  // remainder scroll mode
  if (cellAlign === 'left' && currentSlide >= slideCount - slidesToShow) {
    return true;
  }

  return false;
};

export const NextButton = ({
  nextSlide,
  defaultControlsConfig: {
    nextButtonClassName,
    nextButtonStyle = {},
    nextButtonText,
    nextButtonOnClick,
  },
  nextDisabled: disabled,
  onUserNavigation,
}: ControlProps) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    nextButtonOnClick?.(event);
    if (event.defaultPrevented) return;

    onUserNavigation(event);

    event.preventDefault();
    nextSlide();
  };

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

  if (cellAlign === 'center') {
    for (let i = 0; i < slideCount - 1; i += scrollSlides) {
      dotIndexes.push(i);
    }

    if (slideCount > 0) {
      dotIndexes.push(slideCount - 1);
    }

    return dotIndexes;
  }

  if (cellAlign === 'left') {
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

  if (cellAlign === 'right') {
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

export const PagingDots = ({
  pagingDotsIndices,
  defaultControlsConfig: {
    pagingDotsContainerClassName,
    pagingDotsClassName,
    pagingDotsStyle = {},
    pagingDotsOnClick,
  },
  currentSlide,
  onUserNavigation,
  slideCount,
  goToSlide,
}: ControlProps) => {
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
  const currentSlideBounded = getBoundedIndex(currentSlide, slideCount);

  return (
    <ul className={pagingDotsContainerClassName} style={listStyles}>
      {pagingDotsIndices.map((slideIndex, i) => {
        const isActive =
          currentSlideBounded === slideIndex ||
          // sets navigation dots active if the current slide falls in the current index range
          (currentSlideBounded < slideIndex &&
            (i === 0 || currentSlideBounded > pagingDotsIndices[i - 1]));

        return (
          <li
            key={slideIndex}
            className={isActive ? 'paging-item active' : 'paging-item'}
          >
            <button
              className={pagingDotsClassName}
              type="button"
              style={{
                ...getButtonStyles(isActive),
                ...pagingDotsStyle,
              }}
              onClick={(event) => {
                pagingDotsOnClick?.(event);
                if (event.defaultPrevented) return;

                onUserNavigation(event);

                goToSlide(slideIndex);
              }}
              aria-label={`slide ${slideIndex + 1} bullet`}
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
