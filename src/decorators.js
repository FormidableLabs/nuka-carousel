'use strict';

import React from 'react';

const DefaultDecorators = [
  {
    component: React.createClass({
      render() {
        return (
          <button
            style={this.getButtonStyles(this.props.currentSlide === 0 && !this.props.wrapAround)}
            onClick={this.handleClick}>PREV</button>
        )
      },
      handleClick(e) {
        e.preventDefault();
        this.props.previousSlide();
      },
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
    }),
    position: 'CenterLeft'
  },
  {
    component: React.createClass({
      render() {
        let cellOffsetPosition = this.props.slideCount - 1;

        if (this.props.scrollMode === 'remainder') {
          switch (this.props.cellAlign) {
          case 'center':
            cellOffsetPosition = this.props.slideCount - Math.ceil(this.props.slidesToShow / 2)
            break;
          case 'left':
            cellOffsetPosition = this.props.slideCount - this.props.slidesToShow;
          }
        }

        return (
          <button
            style={this.getButtonStyles(this.props.currentSlide === cellOffsetPosition && !this.props.wrapAround)}
            onClick={this.handleClick}>NEXT</button>
        )
      },
      handleClick(e) {
        e.preventDefault();
        this.props.nextSlide();
      },
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
        const arr = [];

        for (var i = 0; i < count; i += inc) {
          arr.push(i);
        }



        if (arr[arr.length - 1] < count - 1) {
          arr.push(count - 1);
        }

        if (this.props.scrollMode === 'remainder') {
          if (this.props.cellAlign === 'left') {
            const offset = this.props.slidesToShow;

            if (arr.indexOf(count - offset) > -1) {
              console.log('fdfd')
              arr.pop();
            } else {
              arr[arr.length - 1] = count - offset;
            }
          } else if (this.props.cellAlign === 'center') {
            const offset = Math.floor(this.props.slidesToShow / 2);
            
            if (arr[arr.length - 1] >= count - offset) {
              arr[arr.length - 1] = arr[arr.length - 1] - offset;
            }
          }
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
    }),
    position: 'BottomCenter'
  }
];

export default DefaultDecorators;
