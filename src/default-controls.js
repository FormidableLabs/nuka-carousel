import React from 'react';
import { getAlignmentOffset } from './utilities/style-utilities';

const defaultButtonStyles = disabled => ({
  border: 0,
  background: 'rgba(0,0,0,0.4)',
  color: 'white',
  padding: 10,
  textTransform: 'uppercase',
  opacity: disabled && 0.3,
  cursor: disabled ? 'not-allowed' : 'pointer'
});

export class PreviousButton extends React.Component {
  constructor() {
    super(...arguments);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.previousSlide();
  }

  render() {
    const {
      prevButtonClassName,
      prevButtonStyle = {},
      prevButtonText
    } = this.props.defaultControlsConfig;

    const disabled =
      (this.props.currentSlide === 0 && !this.props.wrapAround) ||
      this.props.slideCount === 0;

    return (
      <button
        className={prevButtonClassName}
        style={{
          ...defaultButtonStyles(disabled),
          ...prevButtonStyle
        }}
        disabled={disabled}
        onClick={this.handleClick}
        aria-label="previous"
        type="button"
      >
        {prevButtonText || 'Prev'}
      </button>
    );
  }
}

export class NextButton extends React.Component {
  constructor() {
    super(...arguments);
    this.handleClick = this.handleClick.bind(this);
    this.nextButtonDisable = this.nextButtonDisabled.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.nextSlide();
  }

  nextButtonDisabled(params) {
    const {
      cellAlign,
      cellSpacing,
      currentSlide,
      frameWidth,
      positionValue,
      slideCount,
      slidesToShow,
      slideWidth,
      wrapAround
    } = params;

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
      const endPosition =
        -width * slideCount + width * slidesToShow - endOffset;

      buttonDisabled =
        relativePosition < endPosition ||
        Math.abs(relativePosition - endPosition) < 0.01;
    }

    return buttonDisabled;
  }

  render() {
    const {
      cellAlign,
      cellSpacing,
      currentSlide,
      frameWidth,
      left,
      slideCount,
      slidesToShow,
      slideWidth,
      top,
      vertical,
      wrapAround
    } = this.props;

    const {
      nextButtonClassName,
      nextButtonStyle = {},
      nextButtonText
    } = this.props.defaultControlsConfig;

    const disabled = this.nextButtonDisabled({
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
        onClick={this.handleClick}
        aria-label="next"
        type="button"
      >
        {nextButtonText || 'Next'}
      </button>
    );
  }
}

export class PagingDots extends React.Component {
  getDotIndexes(
    slideCount,
    slidesToScroll,
    slidesToShow,
    cellAlign,
    scrollMode
  ) {
    const dotIndexes = [];
    let lastDotIndex = slideCount - slidesToShow;

    switch (cellAlign) {
      case 'center':
      case 'right':
        lastDotIndex += slidesToShow - 1;
        break;
    }

    if (lastDotIndex < 0) {
      return [0];
    }

    for (let i = 0; i < lastDotIndex; i += slidesToScroll) {
      dotIndexes.push(i);
    }

    if (cellAlign === 'left' && scrollMode === 'page') {
      lastDotIndex = Math.floor(
        slideCount - (slideCount % slidesToShow || slidesToShow)
      );
    }

    dotIndexes.push(lastDotIndex);
    return dotIndexes;
  }

  getListStyles() {
    return {
      position: 'relative',
      top: -10,
      display: 'flex',
      margin: 0,
      padding: 0,
      listStyleType: 'none'
    };
  }

  getButtonStyles(active) {
    return {
      cursor: 'pointer',
      opacity: active ? 1 : 0.5,
      background: 'transparent',
      border: 'none',
      fill: 'black'
    };
  }

  render() {
    const indexes = this.getDotIndexes(
      this.props.slideCount,
      this.props.slidesToScroll,
      this.props.slidesToShow,
      this.props.cellAlign,
      this.props.scrollMode
    );

    const {
      pagingDotsContainerClassName,
      pagingDotsClassName,
      pagingDotsStyle = {}
    } = this.props.defaultControlsConfig;

    return (
      <ul className={pagingDotsContainerClassName} style={this.getListStyles()}>
        {indexes.map(index => {
          const isActive = this.props.currentSlide === index;

          return (
            <li
              key={index}
              className={isActive ? 'paging-item active' : 'paging-item'}
            >
              <button
                className={pagingDotsClassName}
                type="button"
                style={{
                  ...this.getButtonStyles(isActive),
                  ...pagingDotsStyle
                }}
                onClick={this.props.goToSlide.bind(null, index)}
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
  }
}
