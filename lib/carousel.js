'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTweenState = require('react-tween-state');

var _reactTweenState2 = _interopRequireDefault(_reactTweenState);

var _decorators = require('./decorators');

var _decorators2 = _interopRequireDefault(_decorators);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _exenv = require('exenv');

var _exenv2 = _interopRequireDefault(_exenv);

_react2['default'].initializeTouchEvents(true);

var addEvent = function addEvent(elem, type, eventHandle) {
  if (elem == null || typeof elem === 'undefined') {
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
  if (elem == null || typeof elem === 'undefined') {
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

var Carousel = _react2['default'].createClass({
  displayName: 'Carousel',

  mixins: [_reactTweenState2['default'].Mixin],

  propTypes: {
    cellAlign: _react2['default'].PropTypes.oneOf(['left', 'center', 'right']),
    cellSpacing: _react2['default'].PropTypes.number,
    data: _react2['default'].PropTypes.func,
    decorators: _react2['default'].PropTypes.array,
    dragging: _react2['default'].PropTypes.bool,
    easing: _react2['default'].PropTypes.string,
    edgeEasing: _react2['default'].PropTypes.string,
    framePadding: _react2['default'].PropTypes.string,
    initialSlideHeight: _react2['default'].PropTypes.number,
    initialSlideWidth: _react2['default'].PropTypes.number,
    slidesToShow: _react2['default'].PropTypes.number,
    slidesToScroll: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.oneOf(['auto'])]),
    slideWidth: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
    speed: _react2['default'].PropTypes.number,
    vertical: _react2['default'].PropTypes.bool,
    width: _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      cellAlign: 'left',
      cellSpacing: 0,
      data: function data() {},
      decorators: _decorators2['default'],
      dragging: true,
      easing: 'easeOutCirc',
      edgeEasing: 'easeOutElastic',
      framePadding: '0px',
      slidesToShow: 1,
      slidesToScroll: 1,
      slideWidth: 1,
      speed: 500,
      vertical: false,
      width: '100%'
    };
  },

  getInitialState: function getInitialState() {
    return {
      currentSlide: 0,
      dragging: false,
      frameWidth: 0,
      left: 0,
      top: 0,
      slideCount: 0,
      slideWidth: 0,
      slidesToScroll: this.props.slidesToScroll
    };
  },

  componentWillMount: function componentWillMount() {
    this.setInitialDimensions();
  },

  componentDidMount: function componentDidMount() {
    this.setDimensions();
    this.bindEvents();
    this.setExternalData();
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setDimensions();
  },

  componentWillUnmount: function componentWillUnmount() {
    this.unbindEvents();
  },

  render: function render() {
    var self = this;
    var children = _react2['default'].Children.count(this.props.children) > 1 ? this.formatChildren(this.props.children) : this.props.children;
    return _react2['default'].createElement(
      'div',
      { className: ['slider', this.props.className || ''].join(' '), ref: 'slider', style: (0, _objectAssign2['default'])(this.getSliderStyles(), this.props.style || {}) },
      _react2['default'].createElement(
        'div',
        _extends({ className: 'slider-frame',
          ref: 'frame',
          style: this.getFrameStyles()
        }, this.getTouchEvents(), this.getMouseEvents(), {
          onClick: this.handleClick }),
        _react2['default'].createElement(
          'ul',
          { className: 'slider-list', ref: 'list', style: this.getListStyles() },
          children
        )
      ),
      this.props.decorators ? this.props.decorators.map(function (Decorator, index) {
        return _react2['default'].createElement(
          'div',
          {
            style: (0, _objectAssign2['default'])(self.getDecoratorStyles(Decorator.position), Decorator.style || {}),
            className: 'slider-decorator-' + index,
            key: index },
          _react2['default'].createElement(Decorator.component, {
            currentSlide: self.state.currentSlide,
            slideCount: self.state.slideCount,
            frameWidth: self.state.frameWidth,
            slideWidth: self.state.slideWidth,
            slidesToScroll: self.state.slidesToScroll,
            cellSpacing: self.props.cellSpacing,
            slidesToShow: self.props.slidesToShow,
            nextSlide: self.nextSlide,
            previousSlide: self.previousSlide,
            goToSlide: self.goToSlide })
        );
      }) : null,
      _react2['default'].createElement('style', { type: 'text/css', dangerouslySetInnerHTML: { __html: self.getStyleTagStyles() } })
    );
  },

  // Touch Events

  touchObject: {},

  getTouchEvents: function getTouchEvents() {
    var self = this;

    return {
      onTouchStart: function onTouchStart(e) {
        self.touchObject = {
          startX: event.touches[0].pageX,
          startY: event.touches[0].pageY
        };
      },
      onTouchMove: function onTouchMove(e) {
        var direction = self.swipeDirection(self.touchObject.startX, e.touches[0].pageX, self.touchObject.startY, e.touches[0].pageY);

        if (direction !== 0) {
          e.preventDefault();
        }

        self.touchObject = {
          startX: self.touchObject.startX,
          startY: self.touchObject.startY,
          endX: e.touches[0].pageX,
          endY: e.touches[0].pageY,
          length: Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - self.touchObject.startX, 2))),
          direction: direction
        };

        self.setState({
          left: self.props.vertical ? 0 : (self.state.slideWidth * self.state.currentSlide + self.touchObject.length * self.touchObject.direction) * -1,
          top: self.props.vertical ? (self.state.slideWidth * self.state.currentSlide + self.touchObject.length * self.touchObject.direction) * -1 : 0
        });
      },
      onTouchEnd: function onTouchEnd(e) {
        self.handleSwipe(e);
      },
      onTouchCancel: function onTouchCancel(e) {
        self.handleSwipe(e);
      }
    };
  },

  clickSafe: true,

  getMouseEvents: function getMouseEvents() {
    var self = this;

    if (this.props.dragging === false) {
      return null;
    }

    return {
      onMouseDown: function onMouseDown(e) {
        self.touchObject = {
          startX: e.clientX,
          startY: e.clientY
        };

        self.setState({
          dragging: true
        });
      },
      onMouseMove: function onMouseMove(e) {
        if (!self.state.dragging) {
          return;
        }

        var direction = self.swipeDirection(self.touchObject.startX, e.clientX, self.touchObject.startY, e.clientY);

        if (direction !== 0) {
          e.preventDefault();
        }

        var length = self.props.vertical ? Math.round(Math.sqrt(Math.pow(e.clientY - self.touchObject.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.clientX - self.touchObject.startX, 2)));

        self.touchObject = {
          startX: self.touchObject.startX,
          startY: self.touchObject.startY,
          endX: e.clientX,
          endY: e.clientY,
          length: length,
          direction: direction
        };

        self.setState({
          left: self.props.vertical ? 0 : self.getTargetLeft(self.touchObject.length * self.touchObject.direction),
          top: self.props.vertical ? self.getTargetLeft(self.touchObject.length * self.touchObject.direction) : 0
        });
      },
      onMouseUp: function onMouseUp(e) {
        if (!self.state.dragging) {
          return;
        }

        self.handleSwipe(e);
      },
      onMouseLeave: function onMouseLeave(e) {
        if (!self.state.dragging) {
          return;
        }

        self.handleSwipe(e);
      }
    };
  },

  handleClick: function handleClick(e) {
    if (this.clickSafe === true) {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopPropagation();
    }
  },

  handleSwipe: function handleSwipe(e) {
    if (typeof this.touchObject.length !== 'undefined' && this.touchObject.length > 44) {
      this.clickSafe = true;
    } else {
      this.clickSafe = false;
    }

    if (this.touchObject.length > this.state.slideWidth / this.props.slidesToShow / 5) {
      if (this.touchObject.direction === 1) {
        if (this.state.currentSlide >= _react2['default'].Children.count(this.props.children) - this.state.slidesToScroll) {
          this.animateSlide(_reactTweenState2['default'].easingTypes[this.props.edgeEasing]);
        } else {
          this.nextSlide();
        }
      } else if (this.touchObject.direction === -1) {
        if (this.state.currentSlide <= 0) {
          this.animateSlide(_reactTweenState2['default'].easingTypes[this.props.edgeEasing]);
        } else {
          this.previousSlide();
        }
      }
    } else {
      this.goToSlide(this.state.currentSlide);
    }

    this.touchObject = {};

    this.setState({
      dragging: false
    });
  },

  swipeDirection: function swipeDirection(x1, x2, y1, y2) {

    var xDist, yDist, r, swipeAngle;

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
    if (this.props.vertical === true) {
      if (swipeAngle >= 35 && swipeAngle <= 135) {
        return 1;
      } else {
        return -1;
      }
    }
    return 0;
  },

  // Action Methods

  goToSlide: function goToSlide(index) {
    var self = this;
    if (index >= _react2['default'].Children.count(this.props.children) || index < 0) {
      return;
    }
    this.setState({
      currentSlide: index
    }, function () {
      self.animateSlide();
      self.setExternalData();
    });
  },

  nextSlide: function nextSlide() {
    var self = this;
    if (this.state.currentSlide + this.state.slidesToScroll >= _react2['default'].Children.count(this.props.children)) {
      return;
    }
    this.setState({
      currentSlide: this.state.currentSlide + this.state.slidesToScroll
    }, function () {
      self.animateSlide();
      self.setExternalData();
    });
  },

  previousSlide: function previousSlide() {
    var self = this;
    if (this.state.currentSlide - this.state.slidesToScroll < 0) {
      return;
    }
    this.setState({
      currentSlide: this.state.currentSlide - this.state.slidesToScroll
    }, function () {
      self.animateSlide();
      self.setExternalData();
    });
  },

  // Animation

  animateSlide: function animateSlide(easing, duration, endValue) {
    this.tweenState(this.props.vertical ? 'top' : 'left', {
      easing: easing || _reactTweenState2['default'].easingTypes[this.props.easing],
      duration: duration || this.props.speed,
      endValue: endValue || this.getTargetLeft()
    });
  },

  getTargetLeft: function getTargetLeft(touchOffset) {
    var offset;
    switch (this.props.cellAlign) {
      case 'left':
        {
          offset = 0;
          offset -= this.props.cellSpacing * this.state.currentSlide;
          break;
        }
      case 'center':
        {
          offset = (this.state.frameWidth - this.state.slideWidth) / 2;
          offset -= this.props.cellSpacing * this.state.currentSlide;
          break;
        }
      case 'right':
        {
          offset = this.state.frameWidth - this.state.slideWidth;
          offset -= this.props.cellSpacing * this.state.currentSlide;
          break;
        }
    }

    if (this.props.vertical) {
      offset = offset / 2;
    }

    offset -= touchOffset || 0;

    return (this.state.slideWidth * this.state.currentSlide - offset) * -1;
  },

  // Bootstrapping

  bindEvents: function bindEvents() {
    var self = this;
    if (_exenv2['default'].canUseDOM) {
      addEvent(window, 'resize', self.onResize);
      addEvent(document, 'readystatechange', self.onReadyStateChange);
    }
  },

  onResize: function onResize() {
    this.setDimensions();
  },

  onReadyStateChange: function onReadyStateChange(event) {
    this.setDimensions();
  },

  unbindEvents: function unbindEvents() {
    var self = this;
    if (_exenv2['default'].canUseDOM) {
      removeEvent(window, 'resize', self.onResize);
      removeEvent(document, 'readystatechange', self.onReadyStateChange);
    }
  },

  formatChildren: function formatChildren(children) {
    var self = this;
    return _react2['default'].Children.map(children, function (child, index) {
      return _react2['default'].createElement(
        'li',
        { className: 'slider-slide', style: self.getSlideStyles(), key: index },
        child
      );
    });
  },

  setInitialDimensions: function setInitialDimensions() {
    var self = this,
        slideWidth,
        frameHeight,
        slideHeight;

    slideWidth = this.props.vertical ? this.props.initialSlideHeight || 0 : this.props.initialSlideWidth || 0;
    slideHeight = this.props.initialSlideHeight ? this.props.initialSlideHeight * this.props.slidesToShow : 0;

    frameHeight = slideHeight + this.props.cellSpacing / 2 * (this.props.slidesToShow - 1);

    this.setState({
      frameWidth: this.props.vertical ? frameHeight : '100%',
      slideCount: _react2['default'].Children.count(this.props.children),
      slideWidth: slideWidth
    }, function () {
      self.setLeft();
      self.setExternalData();
    });
  },

  setDimensions: function setDimensions() {
    var self = this,
        slideWidth,
        slidesToScroll,
        firstSlide,
        frame,
        frameWidth,
        frameHeight,
        slideHeight;

    slidesToScroll = this.props.slidesToScroll;
    frame = _react2['default'].findDOMNode(this.refs.frame);
    firstSlide = frame.childNodes[0].childNodes[0];
    if (firstSlide) {
      firstSlide.style.height = 'auto';
      slideHeight = firstSlide.offsetHeight * this.props.slidesToShow;
    } else {
      slideHeight = 100;
    }

    if (typeof this.props.slideWidth !== 'number') {
      slideWidth = parseInt(this.props.slideWidth);
    } else {
      if (this.props.vertical) {
        slideWidth = slideHeight / this.props.slidesToShow * this.props.slideWidth;
      } else {
        slideWidth = frame.offsetWidth / this.props.slidesToShow * this.props.slideWidth;
      }
    }

    if (!this.props.vertical) {
      slideWidth -= this.props.cellSpacing * ((100 - 100 / this.props.slidesToShow) / 100);
    }

    frameHeight = slideHeight + this.props.cellSpacing / 2 * (this.props.slidesToShow - 1);
    frameWidth = this.props.vertical ? frameHeight : frame.offsetWidth;

    if (this.props.slidesToScroll === 'auto') {
      slidesToScroll = Math.floor(frameWidth / (slideWidth + this.props.cellSpacing));
    }

    this.setState({
      frameWidth: this.props.vertical ? frameHeight : frame.offsetWidth,
      slideCount: _react2['default'].Children.count(this.props.children),
      slideWidth: slideWidth,
      slidesToScroll: slidesToScroll,
      left: this.props.vertical ? 0 : this.getTargetLeft(),
      top: this.props.vertical ? this.getTargetLeft() : 0
    }, function () {
      self.setLeft();
    });
  },

  setLeft: function setLeft() {
    this.setState({
      left: this.props.vertical ? 0 : this.getTargetLeft(),
      top: this.props.vertical ? this.getTargetLeft() : 0
    });
  },

  // Data

  setExternalData: function setExternalData() {
    if (this.props.data) {
      this.props.data();
    }
  },

  // Styles

  getListStyles: function getListStyles() {
    var listWidth = this.state.slideWidth * _react2['default'].Children.count(this.props.children);
    var spacingOffset = this.props.cellSpacing * _react2['default'].Children.count(this.props.children);
    return {
      position: 'relative',
      display: 'block',
      top: this.getTweeningValue('top'),
      left: this.getTweeningValue('left'),
      margin: this.props.vertical ? this.props.cellSpacing / 2 * -1 + 'px 0px' : '0px ' + this.props.cellSpacing / 2 * -1 + 'px',
      padding: 0,
      height: this.props.vertical ? listWidth + spacingOffset : 'auto',
      width: this.props.vertical ? 'auto' : listWidth + spacingOffset,
      cursor: this.state.dragging === true ? 'pointer' : 'inherit',
      transform: 'translate3d(0, 0, 0)',
      WebkitTransform: 'translate3d(0, 0, 0)',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box'
    };
  },

  getFrameStyles: function getFrameStyles() {
    return {
      position: 'relative',
      display: 'block',
      overflow: 'hidden',
      height: this.props.vertical ? this.state.frameWidth || 'initial' : 'auto',
      margin: this.props.framePadding,
      padding: 0,
      transform: 'translate3d(0, 0, 0)',
      WebkitTransform: 'translate3d(0, 0, 0)',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box'
    };
  },

  getSlideStyles: function getSlideStyles() {
    return {
      display: this.props.vertical ? 'block' : 'inline-block',
      listStyleType: 'none',
      verticalAlign: 'top',
      width: this.props.vertical ? '100%' : this.state.slideWidth,
      height: 'auto',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      marginLeft: this.props.vertical ? 'auto' : this.props.cellSpacing / 2,
      marginRight: this.props.vertical ? 'auto' : this.props.cellSpacing / 2,
      marginTop: this.props.vertical ? this.props.cellSpacing / 2 : 'auto',
      marginBottom: this.props.vertical ? this.props.cellSpacing / 2 : 'auto'
    };
  },

  getSliderStyles: function getSliderStyles() {
    return {
      position: 'relative',
      display: 'block',
      width: this.props.width,
      height: 'auto',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      visibility: this.state.slideWidth ? 'visible' : 'hidden'
    };
  },

  getStyleTagStyles: function getStyleTagStyles() {
    return '.slider-slide > img {width: 100%; display: block;}';
  },

  getDecoratorStyles: function getDecoratorStyles(position) {
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
            WebkitTransform: 'translateX(-50%)'
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
            WebkitTransform: 'translateY(-50%)'
          };
        }
      case 'CenterCenter':
        {
          return {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            WebkitTransform: 'translate(-50%, -50%)'
          };
        }
      case 'CenterRight':
        {
          return {
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            WebkitTransform: 'translateY(-50%)'
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
            WebkitTransform: 'translateX(-50%)'
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
  }

});

Carousel.ControllerMixin = {
  getInitialState: function getInitialState() {
    return {
      carousels: {}
    };
  },
  setCarouselData: function setCarouselData(carousel) {
    var data = this.state.carousels;
    data[carousel] = this.refs[carousel];
    this.setState({
      carousels: data
    });
  }
};

exports['default'] = Carousel;
module.exports = exports['default'];