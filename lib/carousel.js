'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _tweenState = require('react-tween-state');

var _tweenState2 = _interopRequireWildcard(_tweenState);

var _decorators = require('./decorators');

var _decorators2 = _interopRequireWildcard(_decorators);

'use strict';

_React2['default'].initializeTouchEvents(true);

var Carousel = _React2['default'].createClass({
  displayName: 'Carousel',

  mixins: [_tweenState2['default'].Mixin],

  propTypes: {
    data: _React2['default'].PropTypes.func,
    decorators: _React2['default'].PropTypes.array,
    dragging: _React2['default'].PropTypes.bool,
    easing: _React2['default'].PropTypes.string,
    edgeEasing: _React2['default'].PropTypes.string,
    slidesToShow: _React2['default'].PropTypes.number,
    slidesToScroll: _React2['default'].PropTypes.number,
    speed: _React2['default'].PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      data: function data() {},
      decorators: _decorators2['default'],
      dragging: true,
      easing: 'easeOutQuad',
      edgeEasing: 'easeOutElastic',
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500
    };
  },

  getInitialState: function getInitialState() {
    return {
      currentSlide: 0,
      dragging: false,
      frameWidth: 0,
      left: 0,
      slideCount: 0,
      slideWidth: 0,
      touchObject: null
    };
  },

  componentDidMount: function componentDidMount() {
    this.setDimensions();
    this.bindEvents();
  },

  render: function render() {
    var self = this;
    var children = this.formatChildren(this.props.children);
    return _React2['default'].createElement(
      'div',
      { className: 'slider', ref: 'slider', style: this.getSliderStyles() },
      _React2['default'].createElement(
        'div',
        _extends({ className: 'slider-frame',
          ref: 'frame',
          style: this.getFrameStyles()
        }, this.getTouchEvents(), this.getMouseEvents()),
        _React2['default'].createElement(
          'ul',
          { className: 'slider-list', ref: 'list', style: this.getListStyles() },
          children
        )
      ),
      this.props.decorators ? this.props.decorators.map(function (Decorator, index) {
        return _React2['default'].createElement(
          'div',
          { style: self.getDecoratorStyles(Decorator.position), key: index },
          _React2['default'].createElement(Decorator.component, {
            currentSlide: self.state.currentSlide,
            slideCount: self.state.slideCount,
            slidesToShow: self.props.slidesToShow,
            slidesToScroll: self.props.slidesToScroll,
            nextSlide: self.nextSlide,
            previousSlide: self.previousSlide,
            goToSlide: self.goToSlide })
        );
      }) : null,
      _React2['default'].createElement('style', { type: 'text/css', dangerouslySetInnerHTML: { __html: self.getStyleTagStyles() } })
    );
  },

  // Touch Events

  getTouchEvents: function getTouchEvents() {
    var self = this;

    return {
      onTouchStart: function onTouchStart() {
        self.setState({
          touchObject: {
            startX: event.touches[0].pageX,
            startY: event.touches[0].pageY
          }
        });
      },
      onTouchMove: function onTouchMove() {
        var direction = self.swipeDirection(self.state.touchObject.startX, event.touches[0].pageX, self.state.touchObject.startY, event.touches[0].pageY);

        if (direction !== 0) {
          event.preventDefault();
        }

        self.setState({
          touchObject: {
            startX: self.state.touchObject.startX,
            startY: self.state.touchObject.startY,
            endX: event.touches[0].pageX,
            endY: event.touches[0].pageY,
            length: Math.round(Math.sqrt(Math.pow(event.touches[0].pageX - self.state.touchObject.startX, 2))),
            direction: direction
          }
        }, function () {
          self.setDimensions();
        });
      },
      onTouchEnd: function onTouchEnd() {
        self.handleSwipe();
      },
      onTouchCancel: function onTouchCancel() {
        self.handleSwipe();
      }
    };
  },

  getMouseEvents: function getMouseEvents() {
    var self = this;

    if (this.props.dragging === false) {
      return null;
    }

    return {
      onMouseDown: function onMouseDown() {
        self.setState({
          touchObject: {
            startX: event.clientX,
            startY: event.clientY
          },
          dragging: true
        });
      },
      onMouseMove: function onMouseMove() {
        if (!self.state.dragging) {
          return;
        }

        var direction = self.swipeDirection(self.state.touchObject.startX, event.clientX, self.state.touchObject.startY, event.clientY);

        if (direction !== 0) {
          event.preventDefault();
        }

        self.setState({
          touchObject: {
            startX: self.state.touchObject.startX,
            startY: self.state.touchObject.startY,
            endX: event.clientX,
            endY: event.clientY,
            length: Math.round(Math.sqrt(Math.pow(event.clientX - self.state.touchObject.startX, 2))),
            direction: direction
          }
        }, function () {
          self.setDimensions();
        });
      },
      onMouseUp: function onMouseUp() {
        if (!self.state.dragging) {
          return;
        }

        self.handleSwipe();
      },
      onMouseLeave: function onMouseLeave() {
        if (!self.state.dragging) {
          return;
        }

        self.handleSwipe();
      }
    };
  },

  handleSwipe: function handleSwipe() {
    if (this.state.touchObject.length > this.state.slideWidth / this.props.slidesToShow / 5) {
      if (this.state.touchObject.direction === 1) {
        if (this.state.currentSlide >= this.props.children.length - this.props.slidesToShow) {
          this.animateSlide(_tweenState2['default'].easingTypes[this.props.edgeEasing]);
        } else {
          this.nextSlide();
        }
      } else if (this.state.touchObject.direction === -1) {
        if (this.state.currentSlide <= 0) {
          this.animateSlide(_tweenState2['default'].easingTypes[this.props.edgeEasing]);
        } else {
          this.previousSlide();
        }
      }
    } else {
      this.goToSlide(this.state.currentSlide);
    }

    this.setState({
      touchObject: null,
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
    return 0;
  },

  // Action Methods

  goToSlide: function goToSlide(index) {
    var self = this;
    if (index >= this.props.children.length || index < 0) {
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
    if (this.state.currentSlide + this.props.slidesToScroll >= this.props.children.length) {
      return;
    }
    this.setState({
      currentSlide: this.state.currentSlide + this.props.slidesToScroll
    }, function () {
      self.animateSlide();
      self.setExternalData();
    });
  },

  previousSlide: function previousSlide() {
    var self = this;
    if (this.state.currentSlide - this.props.slidesToScroll < 0) {
      return;
    }
    this.setState({
      currentSlide: this.state.currentSlide - this.props.slidesToScroll
    }, function () {
      self.animateSlide();
      self.setExternalData();
    });
  },

  // Animation

  animateSlide: function animateSlide(easing, duration, endValue) {
    this.tweenState('left', {
      easing: easing || _tweenState2['default'].easingTypes[this.props.easing],
      duration: duration || this.props.speed,
      endValue: endValue || this.getTargetLeft()
    });
  },

  getTargetLeft: function getTargetLeft() {
    return this.state.slideWidth * this.state.currentSlide * -1;
  },

  // Bootstrapping

  bindEvents: function bindEvents() {
    var self = this;
    window.onresize = function () {
      self.setDimensions();
    };
  },

  formatChildren: function formatChildren(children) {
    var self = this;
    return children.map(function (child, index) {
      return _React2['default'].createElement(
        'li',
        { className: 'slider-slide', style: self.getSlideStyles(), key: index },
        child
      );
    });
  },

  setDimensions: function setDimensions() {
    var self = this;
    var frame = _React2['default'].findDOMNode(this.refs.frame);
    var slideWidth = frame.offsetWidth / this.props.slidesToShow;
    var length = this.state.touchObject ? this.state.touchObject.length : 0;
    var direction = this.state.touchObject ? this.state.touchObject.direction : 0;
    this.setState({
      frameWidth: frame.offsetWidth,
      slideCount: this.props.children.length,
      slideWidth: slideWidth,
      left: (slideWidth * this.state.currentSlide + length * direction) * -1
    }, function () {
      self.setExternalData();
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
    return {
      position: 'relative',
      display: 'block',
      top: 0,
      left: this.getTweeningValue('left'),
      margin: 0,
      padding: 0,
      width: this.state.slideWidth * this.props.children.length,
      cursor: this.state.dragging === true ? 'pointer' : 'inherit'
    };
  },

  getFrameStyles: function getFrameStyles() {
    return {
      position: 'relative',
      display: 'block',
      overflow: 'hidden',
      margin: 0,
      padding: 0
    };
  },

  getSlideStyles: function getSlideStyles() {
    return {
      display: 'inline-block',
      listStyleType: 'none',
      verticalAlign: 'top',
      width: this.state.slideWidth
    };
  },

  getSliderStyles: function getSliderStyles() {
    return {
      position: 'relative',
      display: 'block'
    };
  },

  getStyleTagStyles: function getStyleTagStyles() {
    return '.slider-slide > img {width: 100%}';
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
            webkitTransform: 'translateX(-50%)'
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
            webkitTransform: 'translateY(-50%)'
          };
        }
      case 'CenterCenter':
        {
          return {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            webkitTransform: 'translate(-50%, -50%)'
          };
        }
      case 'CenterRight':
        {
          return {
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            webkitTransform: 'translateY(-50%)'
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
            webkitTransform: 'translateX(-50%)'
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