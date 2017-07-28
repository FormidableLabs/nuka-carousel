'use strict';

import React from 'react';

const DefaultDecorators = [
  {
    component: React.createClass({
      render() {
        var self = this;
        return (
          <button
            style={self.getButtonStyles(self.props.currentSlide === 0 && !self.props.wrapAround)}
            onClick={self.handleClick}>
            <span style={self.getSpanStyles()}></span>
          </button>
        )
      },
      handleClick(e) {
        e.preventDefault();
        this.props.previousSlide();
      },
      getButtonStyles() {
        return {
          fontSize: 0,
          left: '-45px',
          lineHeight: 0,
          position: 'absolute',
          top: '50%',
          display: 'block',
          width: '20px',
          height: '20px',
          marginTop: '-10px',
          padding: 0,
          cursor: 'pointer',
          color: 'transparent',
          border: 'none',
          outline: 0,
          background: 'transparent'
        }
      },
      getSpanStyles() {
        return {
          display: 'block',
          left: '-60px',
          height: '40px',
          width: '20px',
          backgroundImage: "url('../static/images/sliders/slider-prev.svg')",
          backgroundSize: '20px 40px'
        }
      }
    }),
    position: 'CenterLeft'
  },
  {
    component: React.createClass({
      render() {
        var self = this;
        return (
          <button
            style={self.getButtonStyles(self.props.currentSlide + self.props.slidesToScroll >= self.props.slideCount && !self.props.wrapAround)}
            onClick={self.handleClick}>
            <span style={self.getSpanStyles()}></span>
          </button>
        )
      },
      handleClick(e) {
        e.preventDefault();
        this.props.nextSlide();
      },
      getButtonStyles() {
        return {
          fontSize: 0,
          right: '-45px',
          lineHeight: 0,
          position: 'absolute',
          top: '50%',
          display: 'block',
          width: '20px',
          height: '20px',
          marginTop: '-10px',
          padding: 0,
          cursor: 'pointer',
          color: 'transparent',
          border: 'none',
          outline: 0,
          background: 'transparent'
        }
      },
      getSpanStyles() {
        return {
          display: 'block',
          left: '-60px',
          height: '40px',
          width: '20px',
          backgroundImage: "url('../static/images/sliders/slider-prev.svg')",
          backgroundSize: '20px 40px'
        }
      }
    }),
    position: 'CenterRight'
  },
  {
    component: React.createClass({
      render() {
        var self = this;
        var indexes = this.getIndexes(self.props.slideCount, self.props.slidesToScroll);
        return (
          <ul style={self.getListStyles()}>
            {
              indexes.map(function(index) {
                return (
                  <li style={self.getListItemStyles()} key={index}>
                    <button
                      style={self.getButtonStyles(self.props.currentSlide === index)}
                      onClick={self.props.goToSlide.bind(null, index)}>
                      &bull;
                    </button>
                  </li>
                )
              })
            }
          </ul>
        )
      },
      getIndexes(count, inc) {
        var arr = [];
        for (var i = 0; i < count; i += inc) {
          arr.push(i);
        }
        return arr;
      },
      getListStyles() {
        return {
          position: 'relative',
          margin: 0,
          top: -10,
          padding: 0
        }
      },
      getListItemStyles() {
        return {
          listStyleType: 'none',
          display: 'inline-block'
        }
      },
      getButtonStyles(active) {
        return {
          fontFamily: 'slick',
          border: 0,
          background: 'transparent',
          color: 'black',
          cursor: 'pointer',
          padding: 12,
          outline: 0,
          fontSize: 6,
          opacity: active ? 1 : 0.25
        }
      }
    }),
    position: 'BottomCenter'
  }
];

export default DefaultDecorators;
