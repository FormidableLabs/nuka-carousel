'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTweenState = require('react-tween-state');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _exenv = require('exenv');

var _exenv2 = _interopRequireDefault(_exenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var addEvent = function addEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }
  if (elem.addEventListener) {
    elem.addEventListener(type, eventHandle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + type, eventHandle);
  } else {
    elem['on' + type] = eventHandle;
  }
};

var removeEvent = function removeEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }
  if (elem.removeEventListener) {
    elem.removeEventListener(type, eventHandle, false);
  } else if (elem.detachEvent) {
    elem.detachEvent('on' + type, eventHandle);
  } else {
    elem['on' + type] = null;
  }
};

var Carousel = function (_React$Component) {
  _inherits(Carousel, _React$Component);

  function Carousel(props) {
    _classCallCheck(this, Carousel);

    var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

    _initialiseProps.call(_this);

    _this.clickSafe = true;
    _this.state = {
      currentSlide: _this.props.slideIndex || 0,
      dragging: false,
      frameWidth: 0,
      left: 0,
      slideCount: 0,
      slidesToScroll: _this.props.slidesToScroll,
      slideWidth: 0,
      top: 0
    };
    return _this;
  }

  _createClass(Carousel, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setInitialDimensions();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setDimensions();
      this.bindEvents();
      this.setExternalData();
      if (this.props.autoplay) {
        this.startAutoplay();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        slideCount: nextProps.children.length
      });
      this.setDimensions(nextProps);
      if (this.props.slideIndex !== nextProps.slideIndex && nextProps.slideIndex !== this.state.currentSlide) {
        this.goToSlide(nextProps.slideIndex);
      }
      if (this.props.autoplay !== nextProps.autoplay) {
        if (nextProps.autoplay) {
          this.startAutoplay();
        } else {
          this.stopAutoplay();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unbindEvents();
      this.stopAutoplay();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var children = this.formatChildren(this.props.children);
      return _react2.default.createElement(
        'div',
        { className: ['slider', this.props.className || ''].join(' '), ref: 'slider', style: (0, _objectAssign2.default)(this.getSliderStyles(), this.props.style || {}) },
        _react2.default.createElement(
          'div',
          _extends({ className: 'slider-frame', ref: 'frame', style: this.getFrameStyles() }, this.getTouchEvents(), this.getMouseEvents(), { onClick: this.handleClick }),
          _react2.default.createElement(
            'ul',
            { className: 'slider-list', ref: 'list', style: this.getListStyles() },
            children
          )
        ),
        this.props.decorators ? this.props.decorators.map(function (Decorator, index) {
          return _react2.default.createElement(
            'div',
            {
              style: (0, _objectAssign2.default)(_this2.getDecoratorStyles(Decorator.position), Decorator.style || {}),
              className: 'slider-decorator-' + index,
              key: index },
            _react2.default.createElement(Decorator.component, {
              currentSlide: _this2.state.currentSlide,
              slideCount: _this2.state.slideCount,
              frameWidth: _this2.state.frameWidth,
              slideWidth: _this2.state.slideWidth,
              slidesToScroll: _this2.state.slidesToScroll,
              cellSpacing: _this2.props.cellSpacing,
              slidesToShow: _this2.props.slidesToShow,
              wrapAround: _this2.props.wrapAround,
              nextSlide: _this2.nextSlide,
              previousSlide: _this2.previousSlide,
              goToSlide: _this2.goToSlide })
          );
        }) : null,
        _react2.default.createElement('style', { type: 'text/css', dangerouslySetInnerHTML: { __html: this.getStyleTagStyles() } })
      );
    }

    // Action Methods

    // Animation

    // Bootstrapping

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateDimensions();
    }

    // Data

    // Styles

  }]);

  return Carousel;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.getTouchEvents = function () {
    if (_this3.props.swiping === false) {
      return null;
    }

    return {
      onTouchStart: function onTouchStart(e) {
        _this3.touchObject = {
          startX: e.touches[0].pageX,
          startY: e.touches[0].pageY
        };
        _this3.handleMouseOver();
      },
      onTouchMove: function onTouchMove(e) {
        var direction = _this3.swipeDirection(_this3.touchObject.startX, e.touches[0].pageX, _this3.touchObject.startY, e.touches[0].pageY);

        if (direction !== 0) {
          e.preventDefault();
        }

        var length = _this3.props.vertical ? Math.round(Math.sqrt(Math.pow(e.touches[0].pageY - _this3.touchObject.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - _this3.touchObject.startX, 2)));

        _this3.touchObject = {
          startX: _this3.touchObject.startX,
          startY: _this3.touchObject.startY,
          endX: e.touches[0].pageX,
          endY: e.touches[0].pageY,
          length: length,
          direction: direction
        };

        _this3.setState({
          left: _this3.props.vertical ? 0 : _this3.getTargetLeft(_this3.touchObject.length * _this3.touchObject.direction),
          top: _this3.props.vertical ? _this3.getTargetLeft(_this3.touchObject.length * _this3.touchObject.direction) : 0
        });
      },
      onTouchEnd: function onTouchEnd(e) {
        _this3.handleSwipe(e);
        _this3.handleMouseOut();
      },
      onTouchCancel: function onTouchCancel(e) {
        _this3.handleSwipe(e);
      }
    };
  };

  this.getMouseEvents = function () {
    if (_this3.props.dragging === false) {
      return null;
    }

    return {
      onMouseOver: function onMouseOver() {
        _this3.handleMouseOver();
      },
      onMouseOut: function onMouseOut() {
        _this3.handleMouseOut();
      },
      onMouseDown: function onMouseDown(e) {
        _this3.touchObject = {
          startX: e.clientX,
          startY: e.clientY
        };

        _this3.setState({
          dragging: true
        });
      },
      onMouseMove: function onMouseMove(e) {
        if (!_this3.state.dragging) {
          return;
        }

        var direction = _this3.swipeDirection(_this3.touchObject.startX, e.clientX, _this3.touchObject.startY, e.clientY);

        if (direction !== 0) {
          e.preventDefault();
        }

        var length = _this3.props.vertical ? Math.round(Math.sqrt(Math.pow(e.clientY - _this3.touchObject.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.clientX - _this3.touchObject.startX, 2)));

        _this3.touchObject = {
          startX: _this3.touchObject.startX,
          startY: _this3.touchObject.startY,
          endX: e.clientX,
          endY: e.clientY,
          length: length,
          direction: direction
        };

        _this3.setState({
          left: _this3.props.vertical ? 0 : _this3.getTargetLeft(_this3.touchObject.length * _this3.touchObject.direction),
          top: _this3.props.vertical ? _this3.getTargetLeft(_this3.touchObject.length * _this3.touchObject.direction) : 0
        });
      },
      onMouseUp: function onMouseUp(e) {
        if (!_this3.state.dragging) {
          return;
        }

        _this3.handleSwipe(e);
      },
      onMouseLeave: function onMouseLeave(e) {
        if (!_this3.state.dragging) {
          return;
        }

        _this3.handleSwipe(e);
      }
    };
  };

  this.handleMouseOver = function () {
    if (_this3.props.autoplay) {
      _this3.autoplayPaused = true;
      _this3.stopAutoplay();
    }
  };

  this.handleMouseOut = function () {
    if (_this3.props.autoplay && _this3.autoplayPaused) {
      _this3.startAutoplay();
      _this3.autoplayPaused = null;
    }
  };

  this.handleClick = function (e) {
    if (_this3.clickSafe === true) {
      e.preventDefault();
      e.stopPropagation();

      if (e.nativeEvent) {
        e.nativeEvent.stopPropagation();
      }
    }
  };

  this.handleSwipe = function (e) {
    if (typeof _this3.touchObject.length !== 'undefined' && _this3.touchObject.length > 44) {
      _this3.clickSafe = true;
    } else {
      _this3.clickSafe = false;
    }

    var slidesToShow = _this3.props.slidesToShow;
    if (_this3.props.slidesToScroll === 'auto') {
      slidesToShow = _this3.state.slidesToScroll;
    }

    if (_this3.touchObject.length > _this3.state.slideWidth / slidesToShow / 5) {
      if (_this3.touchObject.direction === 1) {
        if (_this3.state.currentSlide >= _react2.default.Children.count(_this3.props.children) - slidesToShow && !_this3.props.wrapAround) {
          _this3.animateSlide(_reactTweenState.easingTypes[_this3.props.edgeEasing]);
        } else {
          _this3.nextSlide();
        }
      } else if (_this3.touchObject.direction === -1) {
        if (_this3.state.currentSlide <= 0 && !_this3.props.wrapAround) {
          _this3.animateSlide(_reactTweenState.easingTypes[_this3.props.edgeEasing]);
        } else {
          _this3.previousSlide();
        }
      }
    } else {
      _this3.goToSlide(_this3.state.currentSlide);
    }

    _this3.touchObject = {};

    _this3.setState({
      dragging: false
    });
  };

  this.swipeDirection = function (x1, x2, y1, y2) {
    var xDist = void 0,
        yDist = void 0,
        r = void 0,
        swipeAngle = void 0;

    xDist = x1 - x2;
    yDist = y1 - y2;
    r = Math.atan2(yDist, xDist);

    swipeAngle = Math.round(r * 180 / Math.PI);
    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }
    if (swipeAngle <= 45 && swipeAngle >= 0) {
      return 1;
    }
    if (swipeAngle <= 360 && swipeAngle >= 315) {
      return 1;
    }
    if (swipeAngle >= 135 && swipeAngle <= 225) {
      return -1;
    }
    if (_this3.props.vertical === true) {
      if (swipeAngle >= 35 && swipeAngle <= 135) {
        return 1;
      } else {
        return -1;
      }
    }
    return 0;
  };

  this.autoplayIterator = function () {
    if (_this3.props.wrapAround) {
      return _this3.nextSlide.apply(_this3);
    }
    if (_this3.state.currentSlide !== _this3.state.slideCount - _this3.state.slidesToShow) {
      _this3.nextSlide.apply(_this3);
    } else {
      _this3.stopAutoplay.apply(_this3);
    }
  };

  this.startAutoplay = function () {
    _this3.autoplayID = setInterval(_this3.autoplayIterator.bind(_this3), _this3.props.autoplayInterval);
  };

  this.resetAutoplay = function () {
    if (_this3.props.autoplay && !_this3.autoplayPaused) {
      _this3.stopAutoplay.apply(_this3);
      _this3.startAutoplay.apply(_this3);
    }
  };

  this.stopAutoplay = function () {
    _this3.autoplayID && clearInterval(_this3.autoplayID);
  };

  this.goToSlide = function (index) {
    if (index >= _react2.default.Children.count(_this3.props.children) || index < 0) {
      if (!_this3.props.wrapAround) {
        return;
      }
      if (index >= _react2.default.Children.count(_this3.props.children)) {
        _this3.props.beforeSlide(_this3.state.currentSlide, 0);
        return _this3.setState({
          currentSlide: 0
        }, function () {
          _this3.animateSlide(null, null, _this3.getTargetLeft(null, index), function () {
            _this3.animateSlide(null, 0.01);
            _this3.props.afterSlide(0);
            _this3.resetAutoplay();
            _this3.setExternalData();
          });
        });
      } else {
        var endSlide = _react2.default.Children.count(_this3.props.children) - _this3.state.slidesToScroll;
        _this3.props.beforeSlide(_this3.state.currentSlide, endSlide);
        return _this3.setState({
          currentSlide: endSlide
        }, function () {
          _this3.animateSlide(null, null, _this3.getTargetLeft(null, index), function () {
            _this3.animateSlide(null, 0.01);
            _this3.props.afterSlide(endSlide);
            _this3.resetAutoplay();
            _this3.setExternalData();
          });
        });
      }
    }

    _this3.props.beforeSlide(_this3.state.currentSlide, index);
    _this3.setState({
      currentSlide: index
    }, function () {
      _this3.animateSlide();
      _this3.props.afterSlide(index);
      _this3.resetAutoplay();
      _this3.setExternalData();
    });
  };

  this.nextSlide = function () {
    var childrenCount = _react2.default.Children.count(_this3.props.children);
    var slidesToShow = _this3.props.slidesToShow;
    if (_this3.props.slidesToScroll === 'auto') {
      slidesToShow = _this3.state.slidesToScroll;
    }
    if (_this3.state.currentSlide >= childrenCount - slidesToShow && !_this3.props.wrapAround) {
      return;
    }

    if (_this3.props.wrapAround) {
      _this3.goToSlide(_this3.state.currentSlide + _this3.state.slidesToScroll);
    } else {
      if (_this3.props.slideWidth !== 1) {
        return _this3.goToSlide(_this3.state.currentSlide + _this3.state.slidesToScroll);
      }
      _this3.goToSlide(Math.min(_this3.state.currentSlide + _this3.state.slidesToScroll, childrenCount - slidesToShow));
    }
  };

  this.previousSlide = function () {
    if (_this3.state.currentSlide <= 0 && !_this3.props.wrapAround) {
      return;
    }

    if (_this3.props.wrapAround) {
      _this3.goToSlide(_this3.state.currentSlide - _this3.state.slidesToScroll);
    } else {
      _this3.goToSlide(Math.max(0, _this3.state.currentSlide - _this3.state.slidesToScroll));
    }
  };

  this.animateSlide = function (easing, duration, endValue, callback) {
    _this3.tweenState(_this3.props.vertical ? 'top' : 'left', {
      easing: easing || _reactTweenState.easingTypes[_this3.props.easing],
      duration: duration || _this3.props.speed,
      endValue: endValue || _this3.getTargetLeft(),
      onEnd: callback || null
    });
  };

  this.getTargetLeft = function (touchOffset, slide) {
    var offset = void 0;
    var target = slide || _this3.state.currentSlide;
    switch (_this3.props.cellAlign) {
      case 'left':
        {
          offset = 0;
          offset -= _this3.props.cellSpacing * target;
          break;
        }
      case 'center':
        {
          offset = (_this3.state.frameWidth - _this3.state.slideWidth) / 2;
          offset -= _this3.props.cellSpacing * target;
          break;
        }
      case 'right':
        {
          offset = _this3.state.frameWidth - _this3.state.slideWidth;
          offset -= _this3.props.cellSpacing * target;
          break;
        }
    }

    var left = _this3.state.slideWidth * target;

    var lastSlide = _this3.state.currentSlide > 0 && target + _this3.state.slidesToScroll >= _this3.state.slideCount;

    if (lastSlide && _this3.props.slideWidth !== 1 && !_this3.props.wrapAround && _this3.props.slidesToScroll === 'auto') {
      left = _this3.state.slideWidth * _this3.state.slideCount - _this3.state.frameWidth;
      offset = 0;
      offset -= _this3.props.cellSpacing * (_this3.state.slideCount - 1);
    }

    offset -= touchOffset || 0;

    return (left - offset) * -1;
  };

  this.bindEvents = function () {
    if (_exenv2.default.canUseDOM) {
      addEvent(window, 'resize', _this3.onResize);
      addEvent(document, 'readystatechange', _this3.onReadyStateChange);
    }
  };

  this.onResize = function () {
    _this3.setDimensions();
  };

  this.onReadyStateChange = function () {
    _this3.setDimensions();
  };

  this.unbindEvents = function () {
    if (_exenv2.default.canUseDOM) {
      removeEvent(window, 'resize', _this3.onResize);
      removeEvent(document, 'readystatechange', _this3.onReadyStateChange);
    }
  };

  this.formatChildren = function (children) {
    var positionValue = _this3.props.vertical ? _this3.getTweeningValue('top') : _this3.getTweeningValue('left');
    return _react2.default.Children.map(children, function (child, index) {
      return _react2.default.createElement(
        'li',
        { className: 'slider-slide', style: _this3.getSlideStyles(index, positionValue), key: index },
        child
      );
    });
  };

  this.setInitialDimensions = function () {
    var slideWidth = void 0,
        frameHeight = void 0,
        slideHeight = void 0;

    slideWidth = _this3.props.vertical ? _this3.props.initialSlideHeight || 0 : _this3.props.initialSlideWidth || 0;
    slideHeight = _this3.props.initialSlideHeight ? _this3.props.initialSlideHeight * _this3.props.slidesToShow : 0;

    frameHeight = slideHeight + _this3.props.cellSpacing * (_this3.props.slidesToShow - 1);
    var newDimensions = {
      slideHeight: slideHeight,
      frameWidth: _this3.props.vertical ? frameHeight : '100%',
      slideCount: _react2.default.Children.count(_this3.props.children),
      slideWidth: slideWidth
    };

    _this3.setState(newDimensions, function () {
      _this3.setLeft();
      _this3.setExternalData();
    });
  };

  this._slideHeight = function (slide, props) {
    return !slide ? 100 : props.vertical ? slide.offsetHeight * props.slidesToShow : slide.offsetHeight;
  };

  this._withSlideOptions = function (slideWidth, props) {
    return slideWidth - props.cellSpacing * ((100 - 100 / props.slidesToShow) / 100);
  };

  this._slideWidth = function (frame, props, slideHeight) {
    if (props.vertical) return slideHeight / props.slidesToShow * props.slideWidth;
    return typeof props.slideWidth !== 'number' ? _this3._withSlideOptions(parseInt(props.slideWidth), props) : _this3._withSlideOptions(frame.offsetWidth / props.slidesToShow * props.slideWidth, props);
  };

  this._frameWidth = function (frame, slideHeight, props) {
    var frameHeight = slideHeight + props.cellSpacing * (props.slidesToShow - 1);
    return props.vertical ? frameHeight : frame.offsetWidth;
  };

  this._dimensionsChanged = function (newDimensions) {
    return newDimensions.slideHeight !== _this3.state.slideHeight || newDimensions.frameWidth !== _this3.state.frameWidth || newDimensions.slideWidth !== _this3.state.slideWidth;
  };

  this.updateDimensions = function () {
    var frame = _this3.refs.frame;
    var firstSlide = frame.childNodes[0].childNodes[0];

    var slideHeight = _this3._slideHeight(firstSlide, _this3.props);
    var slideWidth = _this3._slideWidth(frame, _this3.props, slideHeight);
    var frameWidth = _this3._frameWidth(frame, slideHeight, _this3.props);

    var newDimensions = {
      slideHeight: slideHeight,
      frameWidth: frameWidth,
      slideWidth: slideWidth
    };

    if (_this3._dimensionsChanged(newDimensions)) {
      _this3.setState(newDimensions);
    }
  };

  this.setDimensions = function (targetProps) {
    var props = targetProps || _this3.props;
    var frame = _this3.refs.frame;
    var firstSlide = frame.childNodes[0].childNodes[0];
    if (firstSlide) firstSlide.style.height = 'auto';

    var slideHeight = _this3._slideHeight(firstSlide, props);
    var slideWidth = _this3._slideWidth(frame, props, slideHeight);
    var frameWidth = _this3._frameWidth(frame, slideHeight, props);

    var left = props.vertical ? 0 : _this3.getTargetLeft();
    var top = props.vertical ? _this3.getTargetLeft() : 0;
    var slidesToScroll = props.slidesToScroll === 'auto' ? Math.floor(frameWidth / (slideWidth + props.cellSpacing)) : props.slidesToScroll;

    var stateUpdate = {
      slideHeight: slideHeight,
      frameWidth: frameWidth,
      slideWidth: slideWidth,
      slidesToScroll: slidesToScroll,
      left: left,
      top: top
    };

    _this3.setState(stateUpdate, function () {
      _this3.setLeft();
    });
  };

  this.setLeft = function () {
    _this3.setState({
      left: _this3.props.vertical ? 0 : _this3.getTargetLeft(),
      top: _this3.props.vertical ? _this3.getTargetLeft() : 0
    });
  };

  this.setExternalData = function () {
    if (_this3.props.data) {
      _this3.props.data();
    }
  };

  this.getListStyles = function () {
    var listWidth = _this3.state.slideWidth * _react2.default.Children.count(_this3.props.children);
    var spacingOffset = _this3.props.cellSpacing * _react2.default.Children.count(_this3.props.children);
    var transform = 'translate3d(' + _this3.getTweeningValue('left') + 'px, ' + _this3.getTweeningValue('top') + 'px, 0)';
    return {
      transform: transform,
      WebkitTransform: transform,
      msTransform: 'translate(' + _this3.getTweeningValue('left') + 'px, ' + _this3.getTweeningValue('top') + 'px)',
      position: 'relative',
      display: 'block',
      margin: _this3.props.vertical ? _this3.props.cellSpacing / 2 * -1 + 'px 0px' : '0px ' + _this3.props.cellSpacing / 2 * -1 + 'px',
      padding: 0,
      height: _this3.props.vertical ? listWidth + spacingOffset : _this3.state.slideHeight,
      width: _this3.props.vertical ? 'auto' : listWidth + spacingOffset,
      cursor: _this3.state.dragging === true ? 'pointer' : 'inherit',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box'
    };
  };

  this.getFrameStyles = function () {
    return {
      position: 'relative',
      display: 'block',
      overflow: _this3.props.frameOverflow,
      height: _this3.props.vertical ? _this3.state.frameWidth || 'initial' : 'auto',
      margin: _this3.props.framePadding,
      padding: 0,
      transform: 'translate3d(0, 0, 0)',
      WebkitTransform: 'translate3d(0, 0, 0)',
      msTransform: 'translate(0, 0)',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box'
    };
  };

  this.getSlideStyles = function (index, positionValue) {
    var targetPosition = _this3.getSlideTargetPosition(index, positionValue);
    return {
      position: 'absolute',
      left: _this3.props.vertical ? 0 : targetPosition,
      top: _this3.props.vertical ? targetPosition : 0,
      display: 'block',
      listStyleType: 'none',
      verticalAlign: 'top',
      width: _this3.props.vertical ? '100%' : _this3.state.slideWidth,
      height: '400px',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      marginLeft: _this3.props.vertical ? 'auto' : _this3.props.cellSpacing / 2,
      marginRight: _this3.props.vertical ? 'auto' : _this3.props.cellSpacing / 2,
      marginTop: _this3.props.vertical ? _this3.props.cellSpacing / 2 : 'auto',
      marginBottom: _this3.props.vertical ? _this3.props.cellSpacing / 2 : 'auto'
    };
  };

  this.getSlideTargetPosition = function (index, positionValue) {
    var _props = _this3.props,
        wrapAround = _props.wrapAround,
        cellSpacing = _props.cellSpacing;
    var _state = _this3.state,
        slideWidth = _state.slideWidth,
        slideCount = _state.slideCount,
        frameWidth = _state.frameWidth;


    var fullSlideWidth = slideWidth + cellSpacing;
    var slidesToShow = frameWidth / fullSlideWidth;
    var targetPosition = fullSlideWidth * index;

    if (wrapAround) {
      var slidesBefore = Math.ceil(positionValue / fullSlideWidth);
      if (slideCount - slidesBefore <= index) {
        return fullSlideWidth * (slideCount - index) * -1;
      }

      var end = fullSlideWidth * slidesToShow * -1;
      var slidesAfter = slideWidth !== 1 ? Math.ceil((Math.abs(positionValue) - fullSlideWidth) / fullSlideWidth) : Math.ceil((Math.abs(positionValue) - Math.abs(end)) / fullSlideWidth);

      if (index <= slidesAfter - 1) {
        return fullSlideWidth * (slideCount + index);
      }
    }

    return targetPosition;
  };

  this.getSliderStyles = function () {
    return {
      position: 'relative',
      display: 'block',
      width: _this3.props.width,
      height: 'auto',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      visibility: _this3.state.slideWidth ? 'visible' : 'hidden'
    };
  };

  this.getStyleTagStyles = function () {
    return '.slider-slide > img {width: 100% display: block}';
  };

  this.getDecoratorStyles = function (position) {
    switch (position) {
      case 'TopLeft':
        {
          return {
            position: 'absolute',
            top: 0,
            left: 0
          };
        }
      case 'TopCenter':
        {
          return {
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            WebkitTransform: 'translateX(-50%)',
            msTransform: 'translateX(-50%)'
          };
        }
      case 'TopRight':
        {
          return {
            position: 'absolute',
            top: 0,
            right: 0
          };
        }
      case 'CenterLeft':
        {
          return {
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            WebkitTransform: 'translateY(-50%)',
            msTransform: 'translateY(-50%)'
          };
        }
      case 'CenterCenter':
        {
          return {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            WebkitTransform: 'translate(-50%, -50%)',
            msTransform: 'translate(-50%, -50%)'
          };
        }
      case 'CenterRight':
        {
          return {
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            WebkitTransform: 'translateY(-50%)',
            msTransform: 'translateY(-50%)'
          };
        }
      case 'BottomLeft':
        {
          return {
            position: 'absolute',
            bottom: 0,
            left: 0
          };
        }
      case 'BottomCenter':
        {
          return {
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            WebkitTransform: 'translateX(-50%)',
            msTransform: 'translateX(-50%)'
          };
        }
      case 'BottomRight':
        {
          return {
            position: 'absolute',
            bottom: 0,
            right: 0
          };
        }
      default:
        {
          return {
            position: 'absolute',
            top: 0,
            left: 0
          };
        }
    }
  };
};

Carousel.propTypes = {
  afterSlide: _propTypes2.default.func,
  autoplay: _propTypes2.default.bool,
  autoplayInterval: _propTypes2.default.number,
  beforeSlide: _propTypes2.default.func,
  cellAlign: _propTypes2.default.oneOf(['left', 'center', 'right']),
  cellSpacing: _propTypes2.default.number,
  children: _propTypes2.default.any,
  className: _propTypes2.default.string,
  data: _propTypes2.default.func,
  decorators: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    component: _propTypes2.default.func,
    position: _propTypes2.default.oneOf(['TopLeft', 'TopCenter', 'TopRight', 'CenterLeft', 'CenterCenter', 'CenterRight', 'BottomLeft', 'BottomCenter', 'BottomRight']),
    style: _propTypes2.default.object
  })),
  dragging: _propTypes2.default.bool,
  easing: _propTypes2.default.string,
  edgeEasing: _propTypes2.default.string,
  framePadding: _propTypes2.default.string,
  frameOverflow: _propTypes2.default.string,
  initialSlideHeight: _propTypes2.default.number,
  initialSlideWidth: _propTypes2.default.number,
  slideIndex: _propTypes2.default.number,
  slidesToShow: _propTypes2.default.number,
  slidesToScroll: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.oneOf(['auto'])]),
  slideWidth: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  speed: _propTypes2.default.number,
  style: _propTypes2.default.any,
  swiping: _propTypes2.default.bool,
  vertical: _propTypes2.default.bool,
  width: _propTypes2.default.string,
  wrapAround: _propTypes2.default.bool
};

Carousel.defaultProps = {
  afterSlide: function afterSlide() {},
  autoplay: false,
  autoplayInterval: 3000,
  beforeSlide: function beforeSlide() {},
  cellAlign: 'left',
  cellSpacing: 0,
  data: function data() {},
  decorators: [],
  dragging: true,
  easing: 'easeOutCirc',
  edgeEasing: 'easeOutElastic',
  framePadding: '0px',
  frameOverflow: 'hidden',
  slideIndex: 0,
  slidesToScroll: 1,
  slidesToShow: 1,
  slideWidth: 1,
  speed: 500,
  swiping: true,
  vertical: false,
  width: '100%',
  wrapAround: false
};

exports.default = (0, _reactTweenState.connect)(Carousel);