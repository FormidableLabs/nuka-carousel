import React from 'react';
import PropTypes from 'prop-types';

const MIN_ZOOM_SCALE = 0;
const MAX_ZOOM_SCALE = 1;

export default class ScrollTransition3D extends React.Component {
  constructor(props) {
    super(props);

    this.getListStyles = this.getListStyles.bind(this);
  }

  getSlideDirection(start, end, isWrapping) {
    let direction = 0;
    if (start === end) return direction;

    if (isWrapping) {
      direction = start < end ? -1 : 1;
    } else {
      direction = start < end ? 1 : -1;
    }

    return direction;
  }

  /* eslint-disable complexity */
  getSlideTargetPosition(index, positionValue) {
    let targetPosition =
      (this.props.slideWidth + this.props.cellSpacing) * index;
    const startSlide = Math.min(
      Math.abs(Math.floor(positionValue / this.props.slideWidth)),
      this.props.slideCount - 1
    );

    let offset = 0;

    if (
      this.props.animation === 'zoom' &&
      (this.props.currentSlide === index + 1 ||
        (this.props.currentSlide === 0 &&
          index === this.props.children.length - 1))
    ) {
      offset = this.props.slideOffset;
    } else if (
      this.props.animation === 'zoom' &&
      (this.props.currentSlide === index - 1 ||
        (this.props.currentSlide === this.props.children.length - 1 &&
          index === 0))
    ) {
      offset = -this.props.slideOffset;
    }

    if (this.props.wrapAround && index !== startSlide) {
      const direction = this.getSlideDirection(
        startSlide,
        this.props.currentSlide,
        this.props.isWrappingAround
      );
      let slidesBefore = Math.floor((this.props.slideCount - 1) / 2);
      let slidesAfter = this.props.slideCount - slidesBefore - 1;

      if (direction < 0) {
        const temp = slidesBefore;
        slidesBefore = slidesAfter;
        slidesAfter = temp;
      }

      const distanceFromStart = Math.abs(startSlide - index);
      if (index < startSlide) {
        if (distanceFromStart > slidesBefore) {
          targetPosition =
            (this.props.slideWidth + this.props.cellSpacing) *
            (this.props.slideCount + index);
        }
      } else if (distanceFromStart > slidesAfter) {
        targetPosition =
          (this.props.slideWidth + this.props.cellSpacing) *
          (this.props.slideCount - index) *
          -1;
      }
    }

    return targetPosition + offset;
  }
  /* eslint-enable complexity */

  formatChildren(children) {
    const { top, left, currentSlide, slidesToShow } = this.props;
    const positionValue = this.props.vertical ? top : left;
    return React.Children.map(children, (child, index) => {
      const visible = this.getDistanceToCurrentSlide(index) <= (slidesToShow / 2);
      return (
        <li
          className={`slider-slide${visible ? ' slide-visible' : ''}`}
          style={this.getSlideStyles(index, positionValue)}
          key={index}
        >
          {child}
        </li>
      );
    });
  }

  getDistance(index, referenceIndex) {
    return Math.abs(index - referenceIndex)
  }

  getDistanceToCurrentSlide(index) {
    return this.props.wrapAround ? (
      Math.min(Math.min(this.getDistance(index, 0) + this.getDistance(this.props.currentSlide, this.props.slideCount),
        this.getDistance(index, this.props.slideCount) + this.getDistance(this.props.currentSlide, 0)),
        this.getDistance(index, this.props.currentSlide))
    ) : (
      this.getDistance(index, this.props.currentSlide)
    )
  }

  getTransformScale(index) {
    return this.props.currentSlide !== index ? (
      Math.max(
        Math.min(this.props.zoomScale ** this.getDistanceToCurrentSlide(index), MAX_ZOOM_SCALE),
        MIN_ZOOM_SCALE
      )
    ) : (
      1.0
    )
  }

  getOpacityScale(index) {
    return this.props.currentSlide !== index ? (
      Math.max(
        Math.min(this.props.opacityScale ** this.getDistanceToCurrentSlide(index), MAX_ZOOM_SCALE),
        MIN_ZOOM_SCALE
      )
    ) : (
      1.0
    )
  }

  getSlideStyles(index, positionValue) {
    const targetPosition = this.getSlideTargetPosition(index, positionValue);
    const transformScale = this.getTransformScale(index)

    return {
      boxSizing: 'border-box',
      display: this.props.vertical ? 'block' : 'inline-block',
      height: 'auto',
      left: this.props.vertical ? 0 : targetPosition,
      listStyleType: 'none',
      marginBottom: this.props.vertical ? this.props.cellSpacing / (2 ** this.getDistanceToCurrentSlide(index)) : 'auto',
      marginLeft: this.props.vertical ? 'auto' : this.props.cellSpacing / (2 ** this.getDistanceToCurrentSlide(index)),
      marginRight: this.props.vertical ? 'auto' : this.props.cellSpacing / (2 ** this.getDistanceToCurrentSlide(index)),
      marginTop: this.props.vertical ? this.props.cellSpacing / (2 ** this.getDistanceToCurrentSlide(index)) : 'auto',
      MozBoxSizing: 'border-box',
      position: 'absolute',
      top: this.props.vertical ? targetPosition : 0,
      transform: `scale(${transformScale})`,
      transition: 'left 0.4s ease-out, transform 0.4s ease-out, opacity 0.4s ease-out',
      verticalAlign: 'top',
      width: this.props.vertical ? '100%' : this.props.slideWidth,
      opacity: this.getOpacityScale(index)
    };
  }

  getListStyles(styles) {
    const { deltaX, deltaY } = styles;
    const listWidth =
      this.props.slideWidth * React.Children.count(this.props.children);
    const spacingOffset =
      this.props.cellSpacing * React.Children.count(this.props.children);
    const transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
    return {
      transform,
      WebkitTransform: transform,
      msTransform: `translate(${deltaX}px, ${deltaY}px)`,
      position: 'relative',
      display: 'block',
      margin: this.props.vertical
        ? `${(this.props.cellSpacing / 2) * -1}px 0px`
        : `0px ${(this.props.cellSpacing / 2) * -1}px`,
      padding: 0,
      height: this.props.vertical
        ? listWidth + spacingOffset
        : this.props.slideHeight,
      width: this.props.vertical ? 'auto' : '100%',
      cursor: this.props.dragging === true ? 'pointer' : 'inherit',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      touchAction: `pinch-zoom ${this.props.vertical ? 'pan-x' : 'pan-y'}`
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

ScrollTransition3D.propTypes = {
  cellSpacing: PropTypes.number,
  currentSlide: PropTypes.number,
  deltaX: PropTypes.number,
  deltaY: PropTypes.number,
  dragging: PropTypes.bool,
  isWrappingAround: PropTypes.bool,
  left: PropTypes.number,
  slideCount: PropTypes.number,
  slideHeight: PropTypes.number,
  slideOffset: PropTypes.number,
  slideWidth: PropTypes.number,
  top: PropTypes.number,
  vertical: PropTypes.bool,
  wrapAround: PropTypes.bool,
  zoomScale: PropTypes.number,
  opacityScale: PropTypes.number,
};

ScrollTransition3D.defaultProps = {
  cellSpacing: 0,
  currentSlide: 0,
  deltaX: 0,
  deltaY: 0,
  dragging: false,
  isWrappingAround: false,
  left: 0,
  slideCount: 0,
  slideHeight: 0,
  slideWidth: 0,
  top: 0,
  vertical: false,
  wrapAround: true,
  zoomScale: 0.75,
  opacityScale: 0.65,
};
