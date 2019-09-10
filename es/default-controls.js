function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';

var defaultButtonStyles = function defaultButtonStyles(disabled) {
  return {
    border: 0,
    background: 'rgba(0,0,0,0.4)',
    color: 'white',
    padding: 10,
    opacity: disabled ? 0.3 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer'
  };
};

export var PreviousButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PreviousButton, _React$Component);

  function PreviousButton() {
    var _this;

    _classCallCheck(this, PreviousButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PreviousButton).apply(this, arguments));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PreviousButton, [{
    key: "handleClick",
    value: function handleClick(event) {
      event.preventDefault();
      this.props.previousSlide();
    }
  }, {
    key: "render",
    value: function render() {
      var disabled = this.props.currentSlide === 0 && !this.props.wrapAround || this.props.slideCount === 0;
      return React.createElement("button", {
        style: defaultButtonStyles(disabled),
        disabled: disabled,
        onClick: this.handleClick,
        "aria-label": "previous",
        type: "button"
      }, "PREV");
    }
  }]);

  return PreviousButton;
}(React.Component);
export var NextButton =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(NextButton, _React$Component2);

  function NextButton() {
    var _this2;

    _classCallCheck(this, NextButton);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(NextButton).apply(this, arguments));
    _this2.handleClick = _this2.handleClick.bind(_assertThisInitialized(_this2));
    _this2.nextButtonDisable = _this2.nextButtonDisabled.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(NextButton, [{
    key: "handleClick",
    value: function handleClick(event) {
      event.preventDefault();
      this.props.nextSlide();
    }
  }, {
    key: "nextButtonDisabled",
    value: function nextButtonDisabled(params) {
      var wrapAround = params.wrapAround,
          slidesToShow = params.slidesToShow,
          currentSlide = params.currentSlide,
          cellAlign = params.cellAlign,
          slideCount = params.slideCount;
      var buttonDisabled = false;

      if (!wrapAround) {
        var lastSlideIndex = slideCount - 1;
        var slidesShowing = slidesToShow;
        var lastSlideOffset = 0;

        switch (cellAlign) {
          case 'center':
            slidesShowing = (slidesToShow - 1) * 0.5;
            lastSlideOffset = Math.floor(slidesToShow * 0.5) - 1;
            break;

          case 'right':
            slidesShowing = 1;
            break;
        }

        if (slidesToShow > 1) {
          buttonDisabled = currentSlide + slidesShowing > lastSlideIndex + lastSlideOffset;
        } else {
          buttonDisabled = currentSlide + 1 > lastSlideIndex;
        }
      }

      return buttonDisabled;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          wrapAround = _this$props.wrapAround,
          slidesToShow = _this$props.slidesToShow,
          currentSlide = _this$props.currentSlide,
          cellAlign = _this$props.cellAlign,
          slideCount = _this$props.slideCount;
      var disabled = this.nextButtonDisabled({
        wrapAround: wrapAround,
        slidesToShow: slidesToShow,
        currentSlide: currentSlide,
        cellAlign: cellAlign,
        slideCount: slideCount
      });
      return React.createElement("button", {
        style: defaultButtonStyles(disabled),
        disabled: disabled,
        onClick: this.handleClick,
        "aria-label": "next",
        type: "button"
      }, "NEXT");
    }
  }]);

  return NextButton;
}(React.Component);
export var PagingDots =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(PagingDots, _React$Component3);

  function PagingDots() {
    _classCallCheck(this, PagingDots);

    return _possibleConstructorReturn(this, _getPrototypeOf(PagingDots).apply(this, arguments));
  }

  _createClass(PagingDots, [{
    key: "getDotIndexes",
    value: function getDotIndexes(slideCount, slidesToScroll, slidesToShow, cellAlign) {
      var dotIndexes = [];
      var lastDotIndex = slideCount - slidesToShow;

      switch (cellAlign) {
        case 'center':
        case 'right':
          lastDotIndex += slidesToShow - 1;
          break;
      }

      if (lastDotIndex < 0) {
        return [0];
      }

      for (var i = 0; i < lastDotIndex; i += slidesToScroll) {
        dotIndexes.push(i);
      }

      dotIndexes.push(lastDotIndex);
      return dotIndexes;
    }
  }, {
    key: "getListStyles",
    value: function getListStyles() {
      return {
        position: 'relative',
        margin: 0,
        top: -10,
        padding: 0
      };
    }
  }, {
    key: "getListItemStyles",
    value: function getListItemStyles() {
      return {
        listStyleType: 'none',
        display: 'inline-block'
      };
    }
  }, {
    key: "getButtonStyles",
    value: function getButtonStyles(active) {
      return {
        cursor: 'pointer',
        opacity: active ? 1 : 0.5,
        background: 'transparent',
        border: 'none'
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var indexes = this.getDotIndexes(this.props.slideCount, this.props.slidesToScroll, this.props.slidesToShow, this.props.cellAlign);
      return React.createElement("ul", {
        style: this.getListStyles()
      }, indexes.map(function (index) {
        return React.createElement("li", {
          style: _this3.getListItemStyles(),
          key: index,
          className: _this3.props.currentSlide === index ? 'paging-item active' : 'paging-item'
        }, React.createElement("button", {
          type: "button",
          style: _this3.getButtonStyles(_this3.props.currentSlide === index),
          onClick: _this3.props.goToSlide.bind(null, index),
          "aria-label": "slide ".concat(index + 1, " bullet")
        }, React.createElement("span", {
          className: "paging-dot",
          style: {
            display: 'inline-block',
            borderRadius: '50%',
            width: '6px',
            height: '6px',
            background: 'black'
          }
        })));
      }));
    }
  }]);

  return PagingDots;
}(React.Component);