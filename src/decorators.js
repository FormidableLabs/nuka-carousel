import React from 'react';
import createReactClass from 'create-react-class';

const DefaultDecorators = [
  {
    component: createReactClass({
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
        };
      },
      render() {
        return (
          <button
            style={this.getButtonStyles(
              this.props.currentSlide === 0 && !this.props.wrapAround
            )}
            onClick={this.handleClick}
          >
            PREV
          </button>
        );
      }
    }),
    position: 'CenterLeft'
  },
  {
    component: createReactClass({
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
        };
      },
      render() {
        return (
          <button
            style={this.getButtonStyles(
              this.props.currentSlide + this.props.slidesToScroll >=
                this.props.slideCount && !this.props.wrapAround
            )}
            onClick={this.handleClick}
          >
            NEXT
          </button>
        );
      }
    }),
    position: 'CenterRight'
  },
  {
    component: createReactClass({
      getIndexes(count, inc) {
        const arr = [];
        for (let i = 0; i < count; i += inc) {
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
        };
      },
      getListItemStyles() {
        return {
          listStyleType: 'none',
          display: 'inline-block'
        };
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
        };
      },
      render() {
        const indexes = this.getIndexes(
          this.props.slideCount,
          this.props.slidesToScroll
        );
        return (
          <ul style={self.getListStyles()}>
            {indexes.map(index => {
              return (
                <li style={self.getListItemStyles()} key={index}>
                  <button
                    style={self.getButtonStyles(
                      self.props.currentSlide === index
                    )}
                    onClick={self.props.goToSlide.bind(null, index)}
                  >
                    &bull;
                  </button>
                </li>
              );
            })}
          </ul>
        );
      }
    }),
    position: 'BottomCenter'
  }
];

export default DefaultDecorators;
