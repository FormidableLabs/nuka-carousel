import React from 'react';
import PropTypes from 'prop-types';

export default class FadeTransition extends React.Component {
  render() {
    const fadePosition =
      -(this.props.deltaX || this.props.deltaY) / this.props.slideWidth;

    return <h1>{fadePosition}</h1>;
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
