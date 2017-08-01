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
      var self = this;
      return _react2['default'].createElement(
        'button',
        {
          style: self.getButtonStyles(self.props.currentSlide === 0 && !self.props.wrapAround),
          onClick: self.handleClick },
        _react2['default'].createElement(
          'span',
          { style: self.getSpanStyles() }
        )
      );
    },
    handleClick: function handleClick(e) {
      e.preventDefault();
      this.props.previousSlide();
    },
    getButtonStyles: function getButtonStyles() {
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
      };
    },
    getSpanStyles: function getSpanStyles() {
      return {
        display: 'block',
        left: '-60px',
        height: '40px',
        width: '20px',
        backgroundImage: "url('../static/images/sliders/slider-prev.svg')",
        backgroundSize: '20px 40px'
      };
    }
  }),
  position: 'CenterLeft'
}, {
  component: _react2['default'].createClass({
    displayName: 'component',

    render: function render() {
      var self = this;
      return _react2['default'].createElement(
        'button',
        {
          style: self.getButtonStyles(self.props.currentSlide + self.props.slidesToScroll >= self.props.slideCount && !self.props.wrapAround),
          onClick: self.handleClick },
        _react2['default'].createElement(
          'span',
          { style: self.getSpanStyles() }
        )
      );
    },
    handleClick: function handleClick(e) {
      e.preventDefault();
      this.props.nextSlide();
    },
    getButtonStyles: function getButtonStyles() {
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
      };
    },
    getSpanStyles: function getSpanStyles() {
      return {
        display: 'block',
        left: '-60px',
        height: '40px',
        width: '20px',
        backgroundImage: "url('../static/images/sliders/slider-next.svg')",
        backgroundSize: '20px 40px'
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
        fontFamily: 'slick',
        border: 0,
        background: 'transparent',
        color: 'black',
        cursor: 'pointer',
        padding: 12,
        outline: 0,
        fontSize: 6,
        opacity: active ? 1 : 0.25
      };
    }
  }),
  position: 'BottomCenter'
}];

exports['default'] = DefaultDecorators;
module.exports = exports['default'];
