import React, { Component, CSSProperties } from 'react';
import { getSlideHeight } from '../utilities/style-utilities';
import { handleSelfFocus, getSlideClassName } from '../utilities/utilities';
import { TransitionProps, HeightMode } from '../types';

type OpacityAndLeftMap = { [key: string]: CSSProperties };

export default class FadeTransition extends Component<TransitionProps> {
  static defaultProps: Partial<TransitionProps> = {
    cellSpacing: 0,
    currentSlide: 0,
    deltaX: 0,
    deltaY: 0,
    dragging: false,
    heightMode: HeightMode.Max,
    isWrappingAround: false,
    left: 0,
    slideCount: 0,
    slideHeight: 0,
    slidesToShow: 1,
    slideWidth: 0,
    top: 0,
    vertical: false,
    wrapAround: false
  };

  constructor(props: TransitionProps) {
    super(props);
    this.fadeFromSlide = props.currentSlide;
  }

  fadeFromSlide: number;

  formatChildren(
    children: TransitionProps['children'],
    opacityAndLeftMap: OpacityAndLeftMap
  ) {
    const { currentSlide, slidesToShow } = this.props;
    return React.Children.map(children, (child, index) => (
      <div
        className={`slider-slide${getSlideClassName(
          index,
          currentSlide,
          slidesToShow
        )}`}
        style={this.getSlideStyles(index, opacityAndLeftMap)}
        key={index}
        aria-label={`slide ${index + 1} of ${children.length}`}
        role="group"
        onClick={handleSelfFocus}
        tabIndex={-1}
      >
        {child}
      </div>
    ));
  }

  getSlideOpacityAndLeftMap(
    fadeFrom: number,
    fadeTo: number,
    fade: number
  ): OpacityAndLeftMap {
    // Figure out which position to fade to
    let fadeToPosition = fadeTo;
    if (fadeFrom > fade && fadeFrom === 0) {
      fadeToPosition = fadeFrom - this.props.slidesToShow;
    } else if (
      fadeFrom < fade &&
      fadeFrom + this.props.slidesToShow > this.props.slideCount - 1
    ) {
      fadeToPosition = fadeFrom + this.props.slidesToShow;
    }

    // Calculate opacity for active slides
    const opacity: { [key: string]: number } = {};
    if (fadeFrom === fadeTo) {
      opacity[fadeFrom] = 1;
    } else {
      const distance = fadeFrom - fadeToPosition;
      opacity[fadeFrom] = (fade - fadeToPosition) / distance;
      opacity[fadeTo] = (fadeFrom - fade) / distance;
    }

    // Calculate left for slides and merge in opacity
    const map: OpacityAndLeftMap = {};
    for (let i = 0; i < this.props.slidesToShow; i++) {
      map[fadeFrom + i] = {
        opacity: opacity[fadeFrom],
        left: this.props.slideWidth * i
      };

      map[fadeTo + i] = {
        opacity: opacity[fadeTo],
        left: this.props.slideWidth * i
      };
    }

    return map;
  }

  getSlideStyles(index: number, data: OpacityAndLeftMap): CSSProperties {
    return {
      boxSizing: 'border-box',
      display: 'block',
      height: getSlideHeight(this.props),
      left: data[index] ? data[index].left : 0,
      listStyleType: 'none',
      marginBottom: 'auto',
      marginLeft: this.props.cellSpacing / 2,
      marginRight: this.props.cellSpacing / 2,
      marginTop: 'auto',
      MozBoxSizing: 'border-box',
      opacity: data[index] ? data[index].opacity : 0,
      position: 'absolute',
      top: 0,
      verticalAlign: 'top',
      visibility: data[index] ? 'inherit' : 'hidden',
      width: this.props.slideWidth
    };
  }

  getContainerStyles(): CSSProperties {
    const width = this.props.slideWidth * this.props.slidesToShow;
    return {
      boxSizing: 'border-box',
      cursor: this.props.dragging === true ? 'pointer' : 'inherit',
      display: 'block',
      height: this.props.slideHeight,
      margin: this.props.vertical
        ? `${(this.props.cellSpacing / 2) * -1}px 0px`
        : `0px ${(this.props.cellSpacing / 2) * -1}px`,
      MozBoxSizing: 'border-box',
      padding: 0,
      touchAction: `pinch-zoom ${this.props.vertical ? 'pan-x' : 'pan-y'}`,
      width
    };
  }

  render() {
    const fade =
      (-(this.props.deltaX || this.props.deltaY) / this.props.slideWidth) %
      this.props.slideCount;
    if (Math.trunc(fade) === fade) {
      this.fadeFromSlide = fade;
    }

    const opacityAndLeftMap = this.getSlideOpacityAndLeftMap(
      this.fadeFromSlide,
      this.props.currentSlide,
      fade
    );

    const children = this.formatChildren(
      this.props.children,
      opacityAndLeftMap
    );

    return (
      <div className="slider-list" style={this.getContainerStyles()}>
        {children}
      </div>
    );
  }
}
