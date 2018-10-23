import React from 'react';
import PropTypes from 'prop-types';

export default class ScrollTransition extends React.Component {
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

  getSlideTargetPosition(index, positionValue) {
    let targetPosition =
      (this.props.slideWidth + this.props.cellSpacing) * index;
    const startSlide = Math.min(
      Math.abs(Math.floor(positionValue / this.props.slideWidth)),
      this.props.slideCount - 1
    );

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

    return targetPosition;
  }

  formatChildren(children) {
    const { top, left, currentSlide } = this.props;
    const positionValue = this.props.vertical ? top : left;
    return React.Children.map(children, (child, index) => {
      const visible = index >= currentSlide && index < currentSlide + 1;
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

  getSlideStyles(index, positionValue) {
    const targetPosition = this.getSlideTargetPosition(index, positionValue);
    return {
      position: 'absolute',
      left: this.props.vertical ? 0 : targetPosition,
      top: this.props.vertical ? targetPosition : 0,
      display: this.props.vertical ? 'block' : 'inline-block',
      listStyleType: 'none',
      verticalAlign: 'top',
      width: this.props.vertical ? '100%' : this.props.slideWidth,
      height: 'auto',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      marginLeft: this.props.vertical ? 'auto' : this.props.cellSpacing / 2,
      marginRight: this.props.vertical ? 'auto' : this.props.cellSpacing / 2,
      marginTop: this.props.vertical ? this.props.cellSpacing / 2 : 'auto',
      marginBottom: this.props.vertical ? this.props.cellSpacing / 2 : 'auto'
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
        ? `${this.props.cellSpacing / 2 * -1}px 0px`
        : `0px ${this.props.cellSpacing / 2 * -1}px`,
      padding: 0,
      height: this.props.vertical
        ? listWidth + spacingOffset
        : this.props.slideHeight,
      width: this.props.vertical ? 'auto' : listWidth + spacingOffset,
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

ScrollTransition.propTypes = {
  deltaX: PropTypes.number,
  deltaY: PropTypes.number,
  slideWidth: PropTypes.number,
  slideHeight: PropTypes.number,
  slideCount: PropTypes.number,
  currentSlide: PropTypes.number,
  isWrappingAround: PropTypes.bool,
  top: PropTypes.number,
  left: PropTypes.number,
  cellSpacing: PropTypes.number,
  vertical: PropTypes.bool,
  dragging: PropTypes.bool,
  wrapAround: PropTypes.bool
};

ScrollTransition.defaultProps = {
  deltaX: 0,
  deltaY: 0,
  slideWidth: 0,
  slideHeight: 0,
  slideCount: 0,
  currentSlide: 0,
  isWrappingAround: false,
  top: 0,
  left: 0,
  cellSpacing: 0,
  vertical: false,
  dragging: false,
  wrapAround: false
};
