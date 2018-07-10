import React from 'react';
import PropTypes from 'prop-types';

export default class FadeTransition extends React.Component {
  constructor(props) {
    super(props);
    this.fadeFromSlide = props.currentSlide;
  }

  getSlideOpacity(slideAInfo, slideBInfo, inBetweenPosition) {
    const opacity = {};

    if (slideAInfo.key === slideBInfo.key) {
      opacity[slideAInfo.key] = 1;
    } else {
      const distance = slideAInfo.target - slideBInfo.target;
      opacity[slideAInfo.key] =
        (inBetweenPosition - slideBInfo.target) / distance;
      opacity[slideBInfo.key] =
        (slideAInfo.target - inBetweenPosition) / distance;
    }

    return opacity;
  }

  formatChildren(children, opacity) {
    return React.Children.map(children, (child, index) => {
      return (
        <li
          className="slider-slide"
          style={this.getSlideStyles(index, opacity)}
          key={index}
        >
          {child}
        </li>
      );
    });
  }

  getSlideStyles(index, data) {
    return data[index]
      ? {
          position: 'absolute',
          left: data[index].left,
          top: 0,
          opacity: data[index].opacity,
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

    if (parseInt(fade) === fade) {
      this.fadeFromSlide = fade;
    }

    const fadeFromInfo = {
      key: this.fadeFromSlide,
      target: this.fadeFromSlide
    };

    let targetFadeTo = this.props.currentSlide;
    if (this.fadeFromSlide > fade && this.fadeFromSlide === 0) {
      targetFadeTo = this.fadeFromSlide - this.props.slidesToShow;
    } else if (
      this.fadeFromSlide < fade &&
      this.fadeFromSlide + this.props.slidesToShow > this.props.slideCount - 1
    ) {
      targetFadeTo = this.fadeFromSlide + this.props.slidesToShow;
    }

    const fadeToInfo = {
      key: this.props.currentSlide,
      target: targetFadeTo
    };

    const opacity = this.getSlideOpacity(
      fadeFromInfo,
      fadeToInfo,
      fade,
      this.props.slidesToShow
    );

    const data = {};
    for (let i = 0; i < this.props.slidesToShow; i++) {
      data[fadeFromInfo.key + i] = {
        opacity: opacity[fadeFromInfo.key],
        left: this.props.slideWidth * i
      };

      data[fadeToInfo.key + i] = {
        opacity: opacity[fadeToInfo.key],
        left: this.props.slideWidth * i
      };
    }

    const children = this.formatChildren(this.props.children, data);

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
  wrapAround: PropTypes.bool,
  slidesToShow: PropTypes.number
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
  wrapAround: false,
  slidesToShow: 1
};
