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
    const { top, left, currentSlide, slidesToShow } = this.props;
    const positionValue = this.props.vertical ? top : left;
    return React.Children.map(children, (child, index) => {
      const visible = this.getDistanceToCurrentSlide(index) <= slidesToShow / 2;
      const current = currentSlide === index;
      return (
        <li
          className={`slider-slide${visible ? ' slide-visible' : ''}${
            current ? ' slide-current' : ''
          }`}
          style={this.getSlideStyles(index, positionValue)}
          key={index}
        >
          {child}
        </li>
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
    return this.props.wrapAround
      ? Math.min(
          Math.min(
            this.getDistance(index, 0) +
              this.getDistance(this.props.currentSlide, this.props.slideCount),
            this.getDistance(index, this.props.slideCount) +
              this.getDistance(this.props.currentSlide, 0)
          ),
          this.getDistance(index, this.props.currentSlide)
        )
      : this.getDistance(index, this.props.currentSlide);
  }

  getRelativeDistanceToCurrentSlide(index) {
    if (this.props.wrapAround) {
      const distanceByLeftEge =
        this.getDistance(index, 0) +
        this.getDistance(this.props.currentSlide, this.props.slideCount);
      const distanceByRightEdge =
        this.getDistance(index, this.props.slideCount) +
        this.getDistance(this.props.currentSlide, 0);
      const absoluteDirectDistance = this.getDistance(
        index,
        this.props.currentSlide
      );

      const minimumDistance = Math.min(
        Math.min(distanceByLeftEge, distanceByRightEdge),
        absoluteDirectDistance
      );

      switch (minimumDistance) {
        case absoluteDirectDistance:
          return index - this.props.currentSlide;
        case distanceByLeftEge:
          return distanceByLeftEge;
        case distanceByRightEdge:
          return -distanceByRightEdge;
        default:
          return 0;
      }
    } else {
      return this.getDistance(index, this.props.currentSlide);
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
    const targetPosition = this.getSlideTargetPosition(index, positionValue);
    const transformScale = this.getTransformScale(index);
    return {
      zIndex: this.props.slideCount - this.getDistanceToCurrentSlide(index),
      boxSizing: 'border-box',
      display: this.props.vertical ? 'block' : 'inline-block',
      height: 'auto',
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
      transition:
        'left 0.4s ease-out, transform 0.4s ease-out, opacity 0.4s ease-out',
      verticalAlign: 'top',
      width: this.props.vertical ? '100%' : this.props.slideWidth,
      opacity: this.getOpacityScale(index)
    };
  }

  getListStyles() {
    const listWidth =
      this.props.slideWidth * React.Children.count(this.props.children);
    const spacingOffset =
      this.props.cellSpacing * React.Children.count(this.props.children);
    return {
      left: `calc(50% - (${this.props.slideWidth}px / 2))`,
      position: 'relative',
      margin: this.props.vertical
        ? `${(this.props.cellSpacing / 2) * -1}px 0px`
        : `${this.props.slideListMargin}px ${(this.props.cellSpacing / 2) *
            -1}px`,
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
    return (
      <ul className="slider-list" style={this.getListStyles()}>
        {children}
      </ul>
    );
  }
}

ScrollTransition3D.propTypes = {
  cellSpacing: PropTypes.number,
  currentSlide: PropTypes.number,
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
  slidesToShow: PropTypes.number,
  slideListMargin: PropTypes.number
};

ScrollTransition3D.defaultProps = {
  cellSpacing: 0,
  currentSlide: 0,
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
  slidesToShow: 3,
  slideListMargin: 10
};
