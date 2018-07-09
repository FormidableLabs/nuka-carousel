import React from 'react';
import PropTypes from 'prop-types';

export default class FadeTransition extends React.Component {
  getSlideIndex(position, count) {
    return position > 0 ? position % count : (count + position % count) % count;
  }

  getSlideOpacity(fade) {
    const active = {};
    const floor = Math.floor(fade);
    const ceil = Math.ceil(fade);
    const slideA = this.getSlideIndex(floor, this.props.slideCount);

    if (floor === ceil) {
      active[slideA] = 1;
    } else {
      const slideB = this.getSlideIndex(ceil, this.props.slideCount);
      active[slideA] = ceil - fade;
      active[slideB] = fade - floor;
    }

    return active;
  }

  formatChildren(children, fade) {
    const opacity = this.getSlideOpacity(fade);

    return React.Children.map(children, (child, index) => {
      return (
        <li
          className="slider-slide"
          style={this.getSlideStyles(index, fade, opacity)}
          key={index}
        >
          {child}
        </li>
      );
    });
  }

  getSlideStyles(index, fade, opacity) {
    return opacity[index]
      ? {
          position: 'absolute',
          left: 0,
          top: 0,
          opacity: opacity[index],
          display: 'block',
          listStyleType: 'none',
          verticalAlign: 'top',
          width: this.props.slideWidth,
          height: 'auto',
          minHeight: '100%',
          boxSizing: 'border-box',
          MozBoxSizing: 'border-box',
          marginLeft: this.props.cellSpacing / 2,
          marginRight: this.props.cellSpacing / 2,
          marginTop: 'auto',
          marginBottom: 'auto'
        }
      : {
          display: 'none'
        };
  }

  getContainerStyles() {
    const width = this.props.slideWidth * this.props.slidesToShow;

    return {
      display: 'block',
      margin: this.props.vertical
        ? `${this.props.cellSpacing / 2 * -1}px 0px`
        : `0px ${this.props.cellSpacing / 2 * -1}px`,
      padding: 0,
      height: this.props.slideHeight,
      width,
      cursor: this.props.dragging === true ? 'pointer' : 'inherit',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      touchAction: 'none'
    };
  }

  render() {
    const fade =
      -(this.props.deltaX || this.props.deltaY) / this.props.slideWidth;
    const children = this.formatChildren(this.props.children, fade);

    return (
      <ul className="slider-list" style={this.getContainerStyles()}>
        {children}
      </ul>
    );
  }
}

FadeTransition.propTypes = {
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

FadeTransition.defaultProps = {
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
