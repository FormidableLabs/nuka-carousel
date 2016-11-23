'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _kwReactTweenState = require('kw-react-tween-state');

var _kwReactTweenState2 = _interopRequireDefault(_kwReactTweenState);

var _decorators = require('./decorators');

var _decorators2 = _interopRequireDefault(_decorators);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _exenv = require('exenv');

var _exenv2 = _interopRequireDefault(_exenv);

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

var Carousel = _react2['default'].createClass({
  displayName: 'Carousel',

  mixins: [_kwReactTweenState2['default'].Mixin],

  propTypes: {
    afterSlide: _react2['default'].PropTypes.func,
    autoplay: _react2['default'].PropTypes.bool,
    autoplayInterval: _react2['default'].PropTypes.number,
    beforeSlide: _react2['default'].PropTypes.func,
    cellAlign: _react2['default'].PropTypes.oneOf(['left', 'center', 'right']),
    cellSpacing: _react2['default'].PropTypes.number,
    data: _react2['default'].PropTypes.func,
    decorators: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
      component: _react2['default'].PropTypes.func,
      position: _react2['default'].PropTypes.oneOf(['TopLeft', 'TopCenter', 'TopRight', 'CenterLeft', 'CenterCenter', 'CenterRight', 'BottomLeft', 'BottomCenter', 'BottomRight']),
      style: _react2['default'].PropTypes.object
    })),
    dragging: _react2['default'].PropTypes.bool,
    easing: _react2['default'].PropTypes.string,
    edgeEasing: _react2['default'].PropTypes.string,
    framePadding: _react2['default'].PropTypes.string,
    frameOverflow: _react2['default'].PropTypes.string,
    heightMode: _react2['default'].PropTypes.oneOf(['max', 'adaptive']).isRequired,
    initialSlideHeight: _react2['default'].PropTypes.number,
    initialSlideWidth: _react2['default'].PropTypes.number,
    lazyLoad: _react2['default'].PropTypes.bool,
    scrollMode: _react2['default'].PropTypes.oneOf(['page', 'remainder']),
    slideIndex: _react2['default'].PropTypes.number,
    slidesToShow: _react2['default'].PropTypes.number,
    slidesToScroll: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.oneOf(['auto'])]),
    slideWidth: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
    speed: _react2['default'].PropTypes.number,
    vertical: _react2['default'].PropTypes.bool,
    width: _react2['default'].PropTypes.string,
    wrapAround: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      afterSlide: function afterSlide() {},
      autoplay: false,
      autoplayInterval: 3000,
      beforeSlide: function beforeSlide() {},
      cellAlign: 'left',
      cellSpacing: 0,
      data: function data() {},
      decorators: _decorators2['default'],
      dragging: true,
      easing: 'easeOutCirc',
      edgeEasing: 'easeOutElastic',
      framePadding: '0px',
      frameOverflow: 'hidden',
      heightMode: 'max',
      scrollMode: 'remainder',
      slideIndex: 0,
      slidesToScroll: 1,
      slidesToShow: 1,
      slideWidth: 1,
      speed: 500,
      vertical: false,
      width: '100%',
      wrapAround: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      currentSlide: this.props.slideIndex,
      dragging: false,
      frameWidth: 0,
      left: 0,
      slideCount: 0,
      slidesToScroll: this.props.slidesToScroll,
      slideWidth: 0,
      top: 0
    };
  },

  componentWillMount: function componentWillMount() {
    this.setInitialDimensions();
  },

  componentDidMount: function componentDidMount() {
    this.setDimensions();
    this.bindEvents();
    this.setExternalData();
    if (this.props.autoplay) {
      this.startAutoplay();
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
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
  },

  componentWillUnmount: function componentWillUnmount() {
    this.unbindEvents();
    this.stopAutoplay();
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
            cellSpacing: self.props.cellSpacing,
            cellAlign: self.props.cellAlign,
            currentSlide: self.state.currentSlide,
            frameWidth: self.state.frameWidth,
            goToSlide: self.goToSlide,
            nextSlide: self.nextSlide,
            previousSlide: self.previousSlide,
            scrollMode: self.props.scrollMode,
            slideCount: self.state.slideCount,
            slidesToScroll: self.state.slidesToScroll,
            slidesToShow: self.props.slidesToShow,
            slideWidth: self.state.slideWidth,
            wrapAround: self.props.wrapAround
          })
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
          startX: e.touches[0].pageX,
          startY: e.touches[0].pageY
        };
        self.handleMouseOver();
      },
      onTouchMove: function onTouchMove(e) {
        var direction = self.swipeDirection(self.touchObject.startX, e.touches[0].pageX, self.touchObject.startY, e.touches[0].pageY);

        if (direction !== 0) {
          e.preventDefault();
        }

        var length = self.props.vertical ? Math.round(Math.sqrt(Math.pow(e.touches[0].pageY - self.touchObject.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - self.touchObject.startX, 2)));

        self.touchObject = {
          startX: self.touchObject.startX,
          startY: self.touchObject.startY,
          endX: e.touches[0].pageX,
          endY: e.touches[0].pageY,
          length: length,
          direction: direction
        };

        self.setState({
          left: self.props.vertical ? 0 : self.getTargetLeft(self.touchObject.length * self.touchObject.direction),
          top: self.props.vertical ? self.getTargetLeft(self.touchObject.length * self.touchObject.direction) : 0
        });
      },
      onTouchEnd: function onTouchEnd(e) {
        self.handleSwipe(e);
        self.handleMouseOut();
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
      onMouseOver: function onMouseOver() {
        self.handleMouseOver();
      },
      onMouseOut: function onMouseOut() {
        self.handleMouseOut();
      },
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

  handleMouseOver: function handleMouseOver() {
    if (this.props.autoplay) {
      this.autoplayPaused = true;
      this.stopAutoplay();
    }
  },

  handleMouseOut: function handleMouseOut() {
    if (this.props.autoplay && this.autoplayPaused) {
      this.startAutoplay();
      this.autoplayPaused = null;
    }
  },

  handleClick: function handleClick(e) {
    if (this.clickSafe === true) {
      e.preventDefault();
      e.stopPropagation();

      if (e.nativeEvent) {
        e.nativeEvent.stopPropagation();
      }
    }
  },

  handleSwipe: function handleSwipe(e) {
    if (typeof this.touchObject.length !== 'undefined' && this.touchObject.length > 44) {
      this.clickSafe = true;
    } else {
      this.clickSafe = false;
    }

    var slidesToShow = this.props.slidesToShow;
    if (this.props.slidesToScroll === 'auto') {
      slidesToShow = this.state.slidesToScroll;
    }

    if (this.touchObject.length > this.state.slideWidth / slidesToShow / 5) {
      if (this.touchObject.direction === 1) {
        var lastPossibleIndex = undefined;
        var count = _react2['default'].Children.count(this.props.children);

        switch (this.props.cellAlign) {
          case 'left':
            lastPossibleIndex = count - this.props.slidesToShow;
            break;
          case 'center':
            lastPossibleIndex = count - Math.ceil(this.props.slidesToShow / 2) - (this.props.slidesToShow % 2 === 0 ? 1 : 0);
            break;
          case 'right':
            lastPossibleIndex = count - 1;
            break;
        }

        if (this.state.currentSlide >= (this.props.scrollMode === 'remainder' ? lastPossibleIndex : count - 1) && !this.props.wrapAround) {
          this.animateSlide(_kwReactTweenState2['default'].easingTypes[this.props.edgeEasing]);
        } else {
          this.nextSlide();
        }
      } else if (this.touchObject.direction === -1) {
        if (this.state.currentSlide <= 0 && !this.props.wrapAround) {
          this.animateSlide(_kwReactTweenState2['default'].easingTypes[this.props.edgeEasing]);
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

  autoplayIterator: function autoplayIterator() {
    if (this.props.wrapAround) {
      return this.nextSlide();
    }
    if (this.state.currentSlide !== this.state.slideCount - this.state.slidesToShow) {
      this.nextSlide();
    } else {
      this.stopAutoplay();
    }
  },

  startAutoplay: function startAutoplay() {
    this.autoplayID = setInterval(this.autoplayIterator, this.props.autoplayInterval);
  },

  resetAutoplay: function resetAutoplay() {
    if (this.props.autoplay && !this.autoplayPaused) {
      this.stopAutoplay();
      this.startAutoplay();
    }
  },

  stopAutoplay: function stopAutoplay() {
    this.autoplayID && clearInterval(this.autoplayID);
  },

  // Action Methods

  goToSlide: function goToSlide(index) {
    var self = this;
    if (index >= _react2['default'].Children.count(this.props.children) || index < 0) {
      if (!this.props.wrapAround) {
        return;
      };
      if (index >= _react2['default'].Children.count(this.props.children)) {
        this.props.beforeSlide(this.state.currentSlide, 0);
        return this.setState({
          currentSlide: 0
        }, function () {
          self.animateSlide(null, null, self.getTargetLeft(null, index), function () {
            self.animateSlide(null, 0.01);
            self.props.afterSlide(0);
            self.resetAutoplay();
            self.setExternalData();
          });
        });
      } else {
        var endSlide = _react2['default'].Children.count(this.props.children) - this.state.slidesToScroll;
        this.props.beforeSlide(this.state.currentSlide, endSlide);
        return this.setState({
          currentSlide: endSlide
        }, function () {
          self.animateSlide(null, null, self.getTargetLeft(null, index), function () {
            self.animateSlide(null, 0.01);
            self.props.afterSlide(endSlide);
            self.resetAutoplay();
            self.setExternalData();
          });
        });
      }
    }

    this.props.beforeSlide(this.state.currentSlide, index);

    this.setState({
      currentSlide: index
    }, function () {
      self.animateSlide();
      this.props.afterSlide(index);
      self.resetAutoplay();
      self.setExternalData();
    });
  },

  nextSlide: function nextSlide() {
    var childrenCount = _react2['default'].Children.count(this.props.children);
    var slidesToShow = this.props.slidesToShow;

    if (this.props.slidesToScroll === 'auto') {
      slidesToShow = this.state.slidesToScroll;
    }

    if (this.state.currentSlide > childrenCount && !this.props.wrapAround) {
      return;
    }

    if (this.props.wrapAround) {
      this.goToSlide(this.state.currentSlide + this.state.slidesToScroll);
    } else {
      if (this.props.slideWidth !== 1) {
        return this.goToSlide(this.state.currentSlide + this.state.slidesToScroll);
      }

      // If scrollMode = remainder, only scroll the amount of slides necessary without showing blank slides.
      if (this.props.scrollMode === 'remainder' && this.props.cellAlign !== 'right') {
        var _state = this.state;
        var currentSlide = _state.currentSlide;
        var slidesToScroll = _state.slidesToScroll;
        var cellAlign = this.props.cellAlign;

        var lastIndex = childrenCount - slidesToShow;

        if (cellAlign === 'center') {
          lastIndex = childrenCount - 1 - Math.floor(slidesToShow / 2);
        }
        return this.goToSlide(currentSlide + slidesToScroll >= lastIndex ? lastIndex : currentSlide + slidesToScroll);
      }

      this.goToSlide(Math.min(this.state.currentSlide + this.state.slidesToScroll, childrenCount - 1));
    }
  },

  previousSlide: function previousSlide() {
    if (this.state.currentSlide <= 0 && !this.props.wrapAround) {
      return;
    }

    if (this.props.wrapAround) {
      this.goToSlide(this.state.currentSlide - this.state.slidesToScroll);
    } else {
      var _state2 = this.state;
      var currentSlide = _state2.currentSlide;
      var slidesToScroll = _state2.slidesToScroll;

      var index = 0;

      while (index < currentSlide) {
        if (index + slidesToScroll >= currentSlide) {
          break;
        }

        index += slidesToScroll;
      }

      this.goToSlide(index);
    }
  },

  // Animation

  animateSlide: function animateSlide(easing, duration, endValue, callback) {
    this.tweenState(this.props.vertical ? 'top' : 'left', {
      easing: easing || _kwReactTweenState2['default'].easingTypes[this.props.easing],
      duration: duration || this.props.speed,
      endValue: endValue || this.getTargetLeft(),
      onEnd: callback || null
    });
  },

  getTargetLeft: function getTargetLeft(touchOffset, slide) {
    var offset;
    var target = slide || this.state.currentSlide;
    switch (this.props.cellAlign) {
      case 'left':
        {
          offset = 0;
          offset -= this.props.cellSpacing * target;
          break;
        }
      case 'center':
        {
          offset = (this.state.frameWidth - this.state.slideWidth) / 2;
          offset -= this.props.cellSpacing * target;
          break;
        }
      case 'right':
        {
          offset = this.state.frameWidth - this.state.slideWidth;
          offset -= this.props.cellSpacing * target;
          break;
        }
    }

    var left = this.state.slideWidth * target;

    var lastSlide = this.state.currentSlide > 0 && target + this.state.slidesToScroll >= this.state.slideCount;

    if (lastSlide && this.props.slideWidth !== 1 && !this.props.wrapAround && this.props.slidesToScroll === 'auto') {
      left = this.state.slideWidth * this.state.slideCount - this.state.frameWidth;
      offset = 0;
      offset -= this.props.cellSpacing * (this.state.slideCount - 1);
    }

    offset -= touchOffset || 0;

    return (left - offset) * -1;
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

  onReadyStateChange: function onReadyStateChange() {
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
    var positionValue = this.props.vertical ? this.getTweeningValue('top') : this.getTweeningValue('left');
    var start = Math.max(this.state.currentSlide - this.props.slidesToShow, 0);
    var end = Math.min(this.state.currentSlide + 2 * this.props.slidesToShow, this.state.slideCount);
    return _react2['default'].Children.map(children, function (child, index) {
      if (!self.props.lazyLoad || start <= index && index < end) {
        return _react2['default'].createElement(
          'li',
          { className: 'slider-slide', style: self.getSlideStyles(index, positionValue), key: index },
          child
        );
      }
    });
  },

  setInitialDimensions: function setInitialDimensions() {
    var self = this,
        slideWidth,
        frameHeight,
        slideHeight;

    slideWidth = this.props.vertical ? this.props.initialSlideHeight || 0 : this.props.initialSlideWidth || 0;
    slideHeight = this.props.initialSlideHeight ? this.props.initialSlideHeight * this.props.slidesToShow : 0;

    frameHeight = slideHeight + this.props.cellSpacing * (this.props.slidesToShow - 1);

    this.setState({
      slideHeight: slideHeight,
      frameWidth: this.props.vertical ? frameHeight : '100%',
      slideCount: _react2['default'].Children.count(this.props.children),
      slideWidth: slideWidth
    }, function () {
      self.setLeft();
      self.setExternalData();
    });
  },

  setDimensions: function setDimensions(props) {
    props = props || this.props;

    var self = this,
        slideWidth,
        slidesToScroll,
        frame,
        frameWidth,
        frameHeight,
        slideHeight,
        toScroll;

    slidesToScroll = props.slidesToScroll;
    frame = this.refs.frame;
    var slides = frame.childNodes[0].childNodes;

    if (this.props.vertical) {
      if (slides.length) {
        slides[0].style.height = 'auto';
        slideHeight = slides[0].offsetHeight * props.slidesToShow;
      } else {
        slideHeight = 100;
      }
    } else {
      slideHeight = props.heightMode === 'max' && this.state.slideHeight || props.initialSlideHeight || 0;
      for (var i = 0; i < slides.length; i++) {
        slideHeight = Math.max(slideHeight, slides[i].offsetHeight);
      }
    }

    if (typeof props.slideWidth !== 'number') {
      slideWidth = parseInt(props.slideWidth);
    } else {
      if (props.vertical) {
        slideWidth = slideHeight / props.slidesToShow * props.slideWidth;
      } else {
        slideWidth = frame.offsetWidth / props.slidesToShow * props.slideWidth;
      }
    }

    if (!props.vertical) {
      slideWidth -= props.cellSpacing * ((100 - 100 / props.slidesToShow) / 100);
    }

    frameHeight = slideHeight + props.cellSpacing * (props.slidesToShow - 1);
    frameWidth = props.vertical ? frameHeight : frame.offsetWidth;

    if (props.slidesToScroll === 'auto') {
      toScroll = frameWidth / (slideWidth + props.cellSpacing);
      slidesToScroll = props.slideWidth === 1 ? Math.ceil(toScroll) : Math.floor(toScroll);
    }

    this.setState({
      slideHeight: slideHeight,
      frameWidth: frameWidth,
      slideWidth: slideWidth,
      slidesToScroll: slidesToScroll,
      left: props.vertical ? 0 : this.getTargetLeft(),
      top: props.vertical ? this.getTargetLeft() : 0
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
    var transform = 'translate3d(' + this.getTweeningValue('left') + 'px, ' + this.getTweeningValue('top') + 'px, 0)';
    return {
      transform: transform,
      WebkitTransform: transform,
      msTransform: 'translate(' + this.getTweeningValue('left') + 'px, ' + this.getTweeningValue('top') + 'px)',
      position: 'relative',
      display: 'block',
      margin: this.props.vertical ? this.props.cellSpacing / 2 * -1 + 'px 0px' : '0px ' + this.props.cellSpacing / 2 * -1 + 'px',
      padding: 0,
      height: this.props.vertical ? listWidth + spacingOffset : this.state.slideHeight,
      width: this.props.vertical ? 'auto' : listWidth + spacingOffset,
      cursor: this.state.dragging === true ? 'pointer' : 'inherit',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box'
    };
  },

  getFrameStyles: function getFrameStyles() {
    return {
      position: 'relative',
      display: 'block',
      overflow: this.props.frameOverflow,
      height: this.props.vertical ? this.state.frameWidth || 'initial' : 'auto',
      margin: this.props.framePadding,
      padding: 0,
      transform: 'translate3d(0, 0, 0)',
      WebkitTransform: 'translate3d(0, 0, 0)',
      msTransform: 'translate(0, 0)',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box'
    };
  },

  getSlideStyles: function getSlideStyles(index, positionValue) {
    var targetPosition = this.getSlideTargetPosition(index, positionValue);
    return {
      position: 'absolute',
      left: this.props.vertical ? 0 : targetPosition,
      top: this.props.vertical ? targetPosition : 0,
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

  getSlideTargetPosition: function getSlideTargetPosition(index, positionValue) {
    var slidesToShow = this.state.frameWidth / this.state.slideWidth;
    var targetPosition = (this.state.slideWidth + this.props.cellSpacing) * index;
    var end = (this.state.slideWidth + this.props.cellSpacing) * slidesToShow * -1;

    if (this.props.wrapAround) {
      var slidesBefore = Math.ceil(positionValue / this.state.slideWidth);
      if (this.state.slideCount - slidesBefore <= index) {
        return (this.state.slideWidth + this.props.cellSpacing) * (this.state.slideCount - index) * -1;
      }

      var slidesAfter = Math.ceil((Math.abs(positionValue) - Math.abs(end)) / this.state.slideWidth);

      if (this.state.slideWidth !== 1) {
        slidesAfter = Math.ceil((Math.abs(positionValue) - this.state.slideWidth) / this.state.slideWidth);
      }

      if (index <= slidesAfter - 1) {
        return (this.state.slideWidth + this.props.cellSpacing) * (this.state.slideCount + index);
      }
    }

    return targetPosition;
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