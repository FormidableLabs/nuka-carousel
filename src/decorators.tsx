'use strict';

import React from 'react';

export interface IDecoratorProps {
  currentSlide: number;
  slideCount: number;
  frameWidth: number | string;
  slideWidth: number | string;
  slidesToScroll: number;
  cellSpacing?: number;
  slidesToShow?: number;
  wrapAround?: boolean;
  nextSlide?: () => void;
  previousSlide: () => void;
  goToSlide?: (index: number) => void;
}

const DefaultDecorators = [
  {
    component: class extends React.Component<IDecoratorProps, any> {
      render() {
        return (
          <button
            style={this.getButtonStyles(this.props.currentSlide === 0 && !this.props.wrapAround)}
            onClick={this.handleClick}>PREV</button>
        )
      }
      handleClick = (e) => {
        e.preventDefault();
        this.props.previousSlide();
      }
      getButtonStyles(disabled) {
        return {
          border: 0,
          background: 'rgba(0,0,0,0.4)',
          color: 'white',
          padding: 10,
          outline: 0,
          opacity: disabled ? 0.3 : 1,
          cursor: 'pointer'
        }
      }
    },
    position: 'CenterLeft'
  },
  {
    component: class extends React.Component<IDecoratorProps, any> {
      render() {
        return (
          <button
            style={this.getButtonStyles(this.props.currentSlide + this.props.slidesToScroll >= this.props.slideCount && !this.props.wrapAround)}
            onClick={this.handleClick}>NEXT</button>
        )
      }
      handleClick = (e) => {
        e.preventDefault();
        if (this.props.nextSlide) {
          this.props.nextSlide();
        }
      }
      getButtonStyles(disabled) {
        return {
          border: 0,
          background: 'rgba(0,0,0,0.4)',
          color: 'white',
          padding: 10,
          outline: 0,
          opacity: disabled ? 0.3 : 1,
          cursor: 'pointer'
        }
      }
    },
    position: 'CenterRight'
  },
  {
    component: class extends React.Component<IDecoratorProps, any> {
      render() {
        var indexes = this.getIndexes(this.props.slideCount, this.props.slidesToScroll);
        return (
          <ul style={this.getListStyles()}>
            {
              indexes.map((index) => {
                return (
                  <li style={this.getListItemStyles()} key={index}>
                    <button
                      style={this.getButtonStyles(this.props.currentSlide === index)}
                      onClick={this.props.goToSlide && this.props.goToSlide.bind(null, index)}>
                      &bull;
                    </button>
                  </li>
                )
              })
            }
          </ul>
        )
      }
      getIndexes(count, inc) {
        var arr: Array<number> = [];
        for (var i = 0; i < count; i += inc) {
          arr.push(i);
        }
        return arr;
      }
      getListStyles() {
        return {
          position: 'relative',
          margin: 0,
          top: -10,
          padding: 0
        } as React.CSSProperties;
      }
      getListItemStyles() {
        return {
          listStyleType: 'none',
          display: 'inline-block'
        } as React.CSSProperties;
      }
      getButtonStyles(active) {
        return {
          border: 0,
          background: 'transparent',
          color: 'black',
          cursor: 'pointer',
          padding: 10,
          outline: 0,
          fontSize: 24,
          opacity: active ? 1 : 0.5
        }
      }
    },
    position: 'BottomCenter'
  }
];

export default DefaultDecorators;
