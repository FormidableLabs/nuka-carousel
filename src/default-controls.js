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
    const disabled =
      (this.props.currentSlide === 0 && !this.props.wrapAround) ||
      this.props.slideCount === 0;
    return (
      <button
        style={defaultButtonStyles(disabled)}
        disabled={disabled}
        onClick={this.handleClick}
        aria-label="previous"
        type="button"
      >
        Prev
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
      wrapAround,
      cellAlign,
      cellSpacing,
      currentSlide,
      frameWidth,
      slideCount,
      slidesToShow,
      slideWidth,
      positionValue
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
      top,
      left,
      wrapAround,
      slidesToShow,
      cellAlign,
      cellSpacing,
      currentSlide,
      frameWidth,
      slideCount,
      slideWidth,
      vertical
    } = this.props;

    const disabled = this.nextButtonDisabled({
      wrapAround,
      slidesToShow,
      cellAlign,
      cellSpacing,
      currentSlide,
      frameWidth,
      slideCount,
      slideWidth,
      positionValue: vertical ? top : left
    });

    return (
      <button
        style={defaultButtonStyles(disabled)}
        disabled={disabled}
        onClick={this.handleClick}
        aria-label="next"
        type="button"
      >
        Next
      </button>
    );
  }
}

export class PagingDots extends React.Component {
  getDotIndexes(slideCount, slidesToScroll, slidesToShow, cellAlign) {
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
      border: 'none'
    };
  }

  render() {
    const indexes = this.getDotIndexes(
      this.props.slideCount,
      this.props.slidesToScroll,
      this.props.slidesToShow,
      this.props.cellAlign
    );
    return (
      <ul style={this.getListStyles()}>
        {indexes.map(index => {
          return (
            <li
              key={index}
              className={
                this.props.currentSlide === index
                  ? 'paging-item active'
                  : 'paging-item'
              }
            >
              <button
                type="button"
                style={this.getButtonStyles(this.props.currentSlide === index)}
                onClick={this.props.goToSlide.bind(null, index)}
                aria-label={`slide ${index + 1} bullet`}
              >
                <svg className="paging-dot" width="6" height="6">
                  <circle
                    cx="3"
                    cy="3"
                    r="3"
                    style={{
                      fill: 'black'
                    }}
                  />
                </svg>
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
