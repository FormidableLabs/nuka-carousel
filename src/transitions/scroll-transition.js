import React from 'react';
import PropTypes from 'prop-types';
import {
  getSlideHeight,
  getAlignmentOffset
} from '../utilities/style-utilities';
import {
  getSlideDirection,
  handleSelfFocus,
  getSlideClassName,
  isFullyVisible
} from '../utilities/utilities';

const MIN_ZOOM_SCALE = 0;
const MAX_ZOOM_SCALE = 1;

export default class ScrollTransition extends React.Component {
  constructor(props) {
    super(props);
    this.getListStyles = this.getListStyles.bind(this);
  }

  /* eslint-disable complexity */
  getSlideTargetPosition(currentSlideIndex, positionValue, cellAlign) {
    let offset = 0;
    // Below lines help to display peeking slides when number of slides is less than 3.
    let peekSlide = true;
    switch (cellAlign) {
      case 'left':
        peekSlide = this.props.children.length > 2 ? true : false;
        break;
      case 'center':
        peekSlide =
          this.props.children.length > 2 ||
          this.props.currentSlide !== currentSlideIndex - 1
            ? true
            : false;
        break;
    }

    if (
      this.props.animation === 'zoom' &&
      peekSlide &&
      (this.props.currentSlide === currentSlideIndex + 1 ||
        (this.props.currentSlide === 0 &&
          currentSlideIndex === this.props.children.length - 1))
    ) {
      offset = this.props.slideOffset;
    } else if (
      this.props.animation === 'zoom' &&
      (this.props.currentSlide === currentSlideIndex - 1 ||
        (this.props.currentSlide === this.props.children.length - 1 &&
          currentSlideIndex === 0))
    ) {
      offset = -this.props.slideOffset;
    }

    let targetPosition =
      (this.props.slideWidth + this.props.cellSpacing) * currentSlideIndex;

    const alignmentOffset = getAlignmentOffset(currentSlideIndex, this.props);
    const relativePosition = positionValue - alignmentOffset;
    const startSlideIndex = Math.min(
      Math.abs(Math.floor(relativePosition / this.props.slideWidth)),
      this.props.slideCount - 1
    );

    if (this.props.wrapAround && currentSlideIndex !== startSlideIndex) {
      const slidesOutOfView = Math.max(
        this.props.slideCount -
          Math.ceil(this.props.frameWidth / this.props.slideWidth), // Total slides in view
        0
      );

      let slidesOutOfViewBefore = Math.floor(slidesOutOfView / 2);
      let slidesOutOfViewAfter = slidesOutOfView - slidesOutOfViewBefore;

      const direction = getSlideDirection(
        startSlideIndex,
        this.props.currentSlide,
        this.props.isWrappingAround
      );

      if (direction < 0) {
        const temp = slidesOutOfViewBefore;
        slidesOutOfViewBefore = slidesOutOfViewAfter;
        slidesOutOfViewAfter = temp;
      }

      const slidesInViewBefore = Math.ceil(
        alignmentOffset / this.props.slideWidth
      );
      const slidesBefore = slidesInViewBefore + slidesOutOfViewBefore;

      const slidesInViewAfter =
        Math.ceil(
          (this.props.frameWidth - alignmentOffset) / this.props.slideWidth
        ) - 1;
      const slidesAfter = slidesInViewAfter + slidesOutOfViewAfter;

      const distanceFromStart = Math.abs(startSlideIndex - currentSlideIndex);
      if (currentSlideIndex < startSlideIndex) {
        if (distanceFromStart > slidesBefore) {
          targetPosition =
            (this.props.slideWidth + this.props.cellSpacing) *
            (this.props.slideCount + currentSlideIndex);
        }
      } else if (distanceFromStart > slidesAfter) {
        targetPosition =
          (this.props.slideWidth + this.props.cellSpacing) *
          (this.props.slideCount - currentSlideIndex) *
          -1;
      }
    }
    return targetPosition + offset || 0;
  }

  /* eslint-enable complexity */
  formatChildren(children) {
    const {
      top,
      left,
      currentSlide,
      slidesToShow,
      vertical,
      cellAlign
    } = this.props;
    const positionValue = vertical ? top : left;

    return React.Children.map(children, (child, index) => {
      const isVisible = isFullyVisible(index, this.props);
      const inert = isVisible ? {} : { inert: 'true' };
      return (
        <li
          className={`slider-slide${getSlideClassName(
            index,
            currentSlide,
            slidesToShow
          )}`}
          style={this.getSlideStyles(index, positionValue, cellAlign)}
          key={index}
          onClick={handleSelfFocus}
          tabIndex={-1}
          {...inert}
        >
          {child}
        </li>
      );
    });
  }

  getSlideStyles(index, positionValue, cellAlign) {
    const targetPosition = this.getSlideTargetPosition(
      index,
      positionValue,
      cellAlign
    );
    const transformScale =
      this.props.animation === 'zoom' && this.props.currentSlide !== index
        ? Math.max(
            Math.min(this.props.zoomScale, MAX_ZOOM_SCALE),
            MIN_ZOOM_SCALE
          )
        : 1.0;

    return {
      boxSizing: 'border-box',
      display: this.props.vertical ? 'block' : 'inline-block',
      height: getSlideHeight(this.props),
      left: this.props.vertical ? 0 : targetPosition,
      listStyleType: 'none',
      marginBottom: this.props.vertical ? this.props.cellSpacing / 2 : 'auto',
      marginLeft: this.props.vertical ? 'auto' : this.props.cellSpacing / 2,
      marginRight: this.props.vertical ? 'auto' : this.props.cellSpacing / 2,
      marginTop: this.props.vertical ? this.props.cellSpacing / 2 : 'auto',
      MozBoxSizing: 'border-box',
      position: 'absolute',
      top: this.props.vertical ? targetPosition : 0,
      transform: `scale(${transformScale})`,
      transition: 'transform .4s linear',
      verticalAlign: 'top',
      width: this.props.vertical ? '100%' : this.props.slideWidth
    };
  }

  getListStyles(styles) {
    const { deltaX, deltaY } = styles;

    const listWidth =
      this.props.slideWidth * React.Children.count(this.props.children);
    const spacingOffset =
      this.props.cellSpacing * React.Children.count(this.props.children);
    const transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
    const transition =
      this.props.heightMode === 'current' && this.props.hasInteraction
        ? 'height 0.2s ease-out'
        : '0s';
    return {
      boxSizing: 'border-box',
      cursor: this.props.dragging === true ? 'pointer' : 'inherit',
      display: 'block',
      height: this.props.vertical
        ? listWidth + spacingOffset
        : this.props.slideHeight,
      margin: this.props.vertical
        ? `${(this.props.cellSpacing / 2) * -1}px 0px`
        : `0px ${(this.props.cellSpacing / 2) * -1}px`,
      padding: 0,
      position: 'relative',
      MozBoxSizing: 'border-box',
      msTransform: `translate(${deltaX}px, ${deltaY}px)`,
      touchAction: `pinch-zoom ${this.props.vertical ? 'pan-x' : 'pan-y'}`,
      transform,
      WebkitTransform: transform,
      width: 'auto',
      transition
    };
  }

  render() {
    const children = this.formatChildren(this.props.children);
    const deltaX = this.props.deltaX;
    const deltaY = this.props.deltaY;

    return (
      <ul
        className="slider-list"
        style={this.getListStyles({ deltaX, deltaY })}
      >
        {children}
      </ul>
    );
  }
}

ScrollTransition.propTypes = {
  animation: PropTypes.oneOf(['zoom']),
  cellAlign: PropTypes.string,
  cellSpacing: PropTypes.number,
  currentSlide: PropTypes.number,
  deltaX: PropTypes.number,
  deltaY: PropTypes.number,
  dragging: PropTypes.bool,
  frameWidth: PropTypes.number,
  hasInteraction: PropTypes.bool,
  heightMode: PropTypes.oneOf(['first', 'current', 'max']),
  isWrappingAround: PropTypes.bool,
  left: PropTypes.number,
  slideCount: PropTypes.number,
  slideHeight: PropTypes.number,
  slideOffset: PropTypes.number,
  slidesToScroll: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  slideWidth: PropTypes.number,
  top: PropTypes.number,
  vertical: PropTypes.bool,
  wrapAround: PropTypes.bool,
  zoomScale: PropTypes.number
};

ScrollTransition.defaultProps = {
  cellAlign: 'left',
  cellSpacing: 0,
  currentSlide: 0,
  deltaX: 0,
  deltaY: 0,
  dragging: false,
  frameWidth: 0,
  heightMode: 'max',
  isWrappingAround: false,
  left: 0,
  slideCount: 0,
  slideHeight: 0,
  slidesToScroll: 1,
  slideWidth: 0,
  top: 0,
  vertical: false,
  wrapAround: false,
  zoomScale: 0.85
};
