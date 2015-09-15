'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var DefaultDecorators = [{
  component: _react2['default'].createClass({
    displayName: 'component',

    render: function render() {
      return _react2['default'].createElement(
        'button',
        {
          style: this.getButtonStyles(this.props.currentSlide === 0),
          onClick: this.props.previousSlide },
        'PREV'
      );
    },
    getButtonStyles: function getButtonStyles(disabled) {
      return {
        border: 0,
        background: 'rgba(0,0,0,0.4)',
        color: 'white',
        padding: 10,
        outline: 0,
        opacity: disabled ? 0.3 : 1,
        cursor: 'pointer'
      };
    }
  }),
  position: 'CenterLeft'
}, {
  component: _react2['default'].createClass({
    displayName: 'component',

    render: function render() {
      return _react2['default'].createElement(
        'button',
        {
          style: this.getButtonStyles(this.props.currentSlide + this.props.slidesToScroll >= this.props.slideCount),
          onClick: this.props.nextSlide },
        'NEXT'
      );
    },
    getButtonStyles: function getButtonStyles(disabled) {
      return {
        border: 0,
        background: 'rgba(0,0,0,0.4)',
        color: 'white',
        padding: 10,
        outline: 0,
        opacity: disabled ? 0.3 : 1,
        cursor: 'pointer'
      };
    }
  }),
  position: 'CenterRight'
}, {
  component: _react2['default'].createClass({
    displayName: 'component',

    render: function render() {
      var self = this;
      var indexes = this.getIndexes(self.props.slideCount, self.props.slidesToScroll);
      return _react2['default'].createElement(
        'ul',
        { style: self.getListStyles() },
        indexes.map(function (index) {
          return _react2['default'].createElement(
            'li',
            { style: self.getListItemStyles(), key: index },
            _react2['default'].createElement(
              'button',
              {
                style: self.getButtonStyles(self.props.currentSlide === index),
                onClick: self.props.goToSlide.bind(null, index) },
              '•'
            )
          );
        })
      );
    },
    getIndexes: function getIndexes(count, inc) {
      var arr = [];
      for (var i = 0; i < count; i += inc) {
        arr.push(i);
      }
      return arr;
    },
    getListStyles: function getListStyles() {
      return {
        position: 'relative',
        margin: 0,
        top: -10,
        padding: 0
      };
    },
    getListItemStyles: function getListItemStyles() {
      return {
        listStyleType: 'none',
        display: 'inline-block'
      };
    },
    getButtonStyles: function getButtonStyles(active) {
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
    }
  }),
  position: 'BottomCenter'
}];

exports['default'] = DefaultDecorators;
module.exports = exports['default'];