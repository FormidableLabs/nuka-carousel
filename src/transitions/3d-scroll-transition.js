import React from 'react';
import PropTypes from 'prop-types';
import { getSlideHeight } from '../utilities/style-utilities';
import { handleSelfFocus } from '../utilities/utilities';

const MIN_ZOOM_SCALE = 0;
const MAX_ZOOM_SCALE = 1;

export default class ScrollTransition3D extends React.Component {
  constructor(props) {
    super(props);
    this.getListStyles = this.getListStyles.bind(this);
  }

  /* eslint-disable complexity */
  getSlideTargetPosition(index) {
    let targetPosition = 0;
    let offset = 0;
    if (index !== this.props.currentSlide) {
      const relativeDistanceToCurrentSlide = this.getRelativeDistanceToCurrentSlide(
        index
      );
      targetPosition =
        (this.props.slideWidth + this.props.cellSpacing) *
          relativeDistanceToCurrentSlide -
        this.getZoomOffsetFor(relativeDistanceToCurrentSlide);

      offset = 0;

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
    }
    return targetPosition + offset;
  }

  /* eslint-enable complexity */
  formatChildren(children) {
    const { top, left, currentSlide, slidesToShow, vertical } = this.props;
    const positionValue = vertical ? top : left;

    return React.Children.map(children, (child, index) => {
      const visible = this.getDistanceToCurrentSlide(index) <= slidesToShow / 2;
      const current = currentSlide === index;
      return (
        <div
          className={`slider-slide${visible ? ' slide-visible' : ''}${
            current ? ' slide-current' : ''
          }`}
          style={this.getSlideStyles(index, positionValue)}
          key={index}
          aria-label={`slide ${index + 1} of ${children.length}`}
          role="group"
          onClick={handleSelfFocus}
          tabIndex={-1}
        >
          {child}
        </div>
      );
    });
  }

  getZoomOffsetFor(relativeDistanceToCurrent) {
    if (relativeDistanceToCurrent === 0) {
      return 0;
    }
    const marginGeneratedByZoom =
      (1 - this.props.zoomScale ** Math.abs(relativeDistanceToCurrent)) *
      this.props.slideWidth;
    const direction = relativeDistanceToCurrent < 0 ? -1 : 1;
    const result =
      marginGeneratedByZoom * direction +
      this.getZoomOffsetFor(
        relativeDistanceToCurrent < 0
          ? relativeDistanceToCurrent + 1
          : relativeDistanceToCurrent - 1
      );
    return result;
  }

  getDistance(index, referenceIndex) {
    return Math.abs(index - referenceIndex);
  }

  getDistanceToCurrentSlide(index) {
    const { wrapAround, currentSlide, slideCount } = this.props;
    return wrapAround
      ? Math.min(
          Math.min(
            this.getDistance(index, 0) +
              this.getDistance(currentSlide, slideCount),
            this.getDistance(index, slideCount) +
              this.getDistance(currentSlide, 0)
          ),
          this.getDistance(index, currentSlide)
        )
      : this.getDistance(index, currentSlide);
  }

  getRelativeDistanceToCurrentSlide(index) {
    const { wrapAround, currentSlide, slideCount } = this.props;
    if (wrapAround) {
      const distanceByLeftEge =
        this.getDistance(index, 0) + this.getDistance(currentSlide, slideCount);
      const distanceByRightEdge =
        this.getDistance(index, slideCount) + this.getDistance(currentSlide, 0);
      const absoluteDirectDistance = this.getDistance(index, currentSlide);

      const minimumDistance = Math.min(
        Math.min(distanceByLeftEge, distanceByRightEdge),
        absoluteDirectDistance
      );

      switch (minimumDistance) {
        case absoluteDirectDistance:
          return index - currentSlide;
        case distanceByLeftEge:
          return distanceByLeftEge;
        case distanceByRightEdge:
          return -distanceByRightEdge;
        default:
          return 0;
      }
    } else {
      return index - currentSlide;
    }
  }

  getTransformScale(index) {
    return this.props.currentSlide !== index
      ? Math.max(
          Math.min(
            this.props.zoomScale ** this.getDistanceToCurrentSlide(index),
            MAX_ZOOM_SCALE
          ),
          MIN_ZOOM_SCALE
        )
      : 1.0;
  }

  getOpacityScale(index) {
    return this.props.currentSlide !== index
      ? Math.max(
          Math.min(
            this.props.opacityScale ** this.getDistanceToCurrentSlide(index),
            MAX_ZOOM_SCALE
          ),
          MIN_ZOOM_SCALE
        )
      : 1.0;
  }

  getSlideStyles(index, positionValue) {
    const { vertical, slideCount, cellSpacing, slideWidth } = this.props;
    const targetPosition = this.getSlideTargetPosition(index, positionValue);
    const transformScale = this.getTransformScale(index);

    return {
      boxSizing: 'border-box',
      display: vertical ? 'block' : 'inline-block',
      height: getSlideHeight(this.props),
      left: vertical ? 0 : targetPosition,
      listStyleType: 'none',
      marginBottom: vertical ? cellSpacing / 2 : 'auto',
      marginLeft: vertical ? 'auto' : cellSpacing / 2,
      marginRight: vertical ? 'auto' : cellSpacing / 2,
      marginTop: vertical ? cellSpacing / 2 : 'auto',
      MozBoxSizing: 'border-box',
      opacity: this.getOpacityScale(index),
      position: 'absolute',
      top: vertical ? targetPosition : 0,
      transform: `scale(${transformScale})`,
      transition:
        'left 0.4s ease-out, transform 0.4s ease-out, opacity 0.4s ease-out',
      verticalAlign: 'top',
      width: vertical ? '100%' : slideWidth,
      zIndex: slideCount - this.getDistanceToCurrentSlide(index)
    };
  }

  getListStyles() {
    const listWidth =
      this.props.slideWidth * React.Children.count(this.props.children);
    const spacingOffset =
      this.props.cellSpacing * React.Children.count(this.props.children);
    return {
      boxSizing: 'border-box',
      cursor: this.props.dragging === true ? 'pointer' : 'inherit',
      height: this.props.vertical
        ? listWidth + spacingOffset
        : this.props.slideHeight,
      left: `calc(50% - (${this.props.slideWidth}px / 2))`,
      margin: this.props.vertical
        ? `${(this.props.cellSpacing / 2) * -1}px 0px`
        : `${this.props.slideListMargin}px ${
            (this.props.cellSpacing / 2) * -1
          }px`,
      MozBoxSizing: 'border-box',
      padding: 0,
      position: 'relative',
      touchAction: `pinch-zoom ${this.props.vertical ? 'pan-x' : 'pan-y'}`,
      width: this.props.vertical ? 'auto' : '100%'
    };
  }

  render() {
    const children = this.formatChildren(this.props.children);
    return (
      <div className="slider-list" style={this.getListStyles()}>
        {children}
      </div>
    );
  }
}

ScrollTransition3D.propTypes = {
  cellSpacing: PropTypes.number,
  currentSlide: PropTypes.number,
  dragging: PropTypes.bool,
  heightMode: PropTypes.oneOf(['first', 'current', 'max']),
  isWrappingAround: PropTypes.bool,
  left: PropTypes.number,
  opacityScale: PropTypes.number,
  slideCount: PropTypes.number,
  slideHeight: PropTypes.number,
  slideListMargin: PropTypes.number,
  slideOffset: PropTypes.number,
  slidesToShow: PropTypes.number,
  slideWidth: PropTypes.number,
  top: PropTypes.number,
  vertical: PropTypes.bool,
  wrapAround: PropTypes.bool,
  zoomScale: PropTypes.number
};

ScrollTransition3D.defaultProps = {
  cellSpacing: 0,
  currentSlide: 0,
  dragging: false,
  heightMode: 'max',
  isWrappingAround: false,
  left: 0,
  opacityScale: 0.65,
  slideCount: 0,
  slideHeight: 0,
  slideListMargin: 0,
  slidesToShow: 3,
  slideWidth: 0,
  top: 0,
  vertical: false,
  wrapAround: true,
  zoomScale: 0.75
};
