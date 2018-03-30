"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "PagingDots", {
  enumerable: true,
  get: function get() {
    return _defaultControls.PagingDots;
  }
});
Object.defineProperty(exports, "PreviousButton", {
  enumerable: true,
  get: function get() {
    return _defaultControls.PreviousButton;
  }
});
Object.defineProperty(exports, "NextButton", {
  enumerable: true,
  get: function get() {
    return _defaultControls.NextButton;
  }
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _exenv = _interopRequireDefault(require("exenv"));

var _Animate = _interopRequireDefault(require("react-move/Animate"));

var easing = _interopRequireWildcard(require("d3-ease"));

var _defaultControls = require("./default-controls");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var addEvent = function addEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }

  if (elem.addEventListener) {
    elem.addEventListener(type, eventHandle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent("on".concat(type), eventHandle);
  } else {
    elem["on".concat(type)] = eventHandle;
  }
};

var removeEvent = function removeEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }

  if (elem.removeEventListener) {
    elem.removeEventListener(type, eventHandle, false);
  } else if (elem.detachEvent) {
    elem.detachEvent("on".concat(type), eventHandle);
  } else {
    elem["on".concat(type)] = null;
  }
};

var Carousel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Carousel, _React$Component);

  function Carousel() {
    var _this;

    _classCallCheck(this, Carousel);

    _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).apply(this, arguments));
    Object.defineProperty(_assertThisInitialized(_this), "shouldRenderSlide", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(index) {
        var _this$props = _this.props,
            Placeholder = _this$props.Placeholder,
            placeholderMode = _this$props.placeholderMode,
            preloadedChildrenLevel = _this$props.preloadedChildrenLevel,
            wrapAround = _this$props.wrapAround;

        if (!placeholderMode || !Placeholder) {
          return true;
        }

        var currentSlide = _this.state.currentSlide;
        var totalPreloadedSlides = 2 * preloadedChildrenLevel + 1;

        var totalSlides = _this.totalSlides();

        if (wrapAround) {
          if (totalPreloadedSlides >= totalSlides) {
            // should render all slides
            return true;
          }

          if (currentSlide + preloadedChildrenLevel > totalSlides - 1) {
            // if last index of preloaded children goes out of bounds, split the preloaded children set into 2 sets
            return index >= 0 && index <= currentSlide + preloadedChildrenLevel - totalSlides || index >= currentSlide - preloadedChildrenLevel && index <= totalSlides - 1;
          }

          if (currentSlide - preloadedChildrenLevel < 0) {
            // if first index of preloaded children goes out of bounds, split the preloaded children set into 2 sets
            return index >= 0 && index <= currentSlide + preloadedChildrenLevel || index >= currentSlide - preloadedChildrenLevel + totalSlides && index <= totalSlides - 1;
          }

          return index >= currentSlide - preloadedChildrenLevel && index <= currentSlide + preloadedChildrenLevel;
        } else {
          return index >= 0 && index <= totalSlides - 1 && index >= currentSlide - preloadedChildrenLevel && index <= currentSlide + preloadedChildrenLevel;
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "totalSlides", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return _this.props.children ? _this.props.children.length : 0;
      }
    });
    _this.displayName = 'Carousel';
    _this.clickSafe = true;
    _this.controlsMap = [{
      func: _this.props.renderTopLeftControls,
      key: 'TopLeft'
    }, {
      func: _this.props.renderTopCenterControls,
      key: 'TopCenter'
    }, {
      func: _this.props.renderTopRightControls,
      key: 'TopRight'
    }, {
      func: _this.props.renderCenterLeftControls,
      key: 'CenterLeft'
    }, {
      func: _this.props.renderCenterCenterControls,
      key: 'CenterCenter'
    }, {
      func: _this.props.renderCenterRightControls,
      key: 'CenterRight'
    }, {
      func: _this.props.renderBottomLeftControls,
      key: 'BottomLeft'
    }, {
      func: _this.props.renderBottomCenterControls,
      key: 'BottomCenter'
    }, {
      func: _this.props.renderBottomRightControls,
      key: 'BottomRight'
    }];
    _this.touchObject = {};
    _this.state = {
      currentSlide: _this.props.slideIndex,
      dragging: false,
      frameWidth: 0,
      left: 0,
      slideCount: 0,
      slidesToScroll: _this.props.slidesToScroll,
      slideWidth: 0,
      top: 0,
      easing: easing.easeCircleOut,
      isWrappingAround: false,
      wrapToIndex: null,
      resetWrapAroundPosition: false
    };
    _this.getTouchEvents = _this.getTouchEvents.bind(_assertThisInitialized(_this));
    _this.getMouseEvents = _this.getMouseEvents.bind(_assertThisInitialized(_this));
    _this.handleMouseOver = _this.handleMouseOver.bind(_assertThisInitialized(_this));
    _this.handleMouseOut = _this.handleMouseOut.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleSwipe = _this.handleSwipe.bind(_assertThisInitialized(_this));
    _this.swipeDirection = _this.swipeDirection.bind(_assertThisInitialized(_this));
    _this.autoplayIterator = _this.autoplayIterator.bind(_assertThisInitialized(_this));
    _this.startAutoplay = _this.startAutoplay.bind(_assertThisInitialized(_this));
    _this.stopAutoplay = _this.stopAutoplay.bind(_assertThisInitialized(_this));
    _this.resetAutoplay = _this.resetAutoplay.bind(_assertThisInitialized(_this));
    _this.goToSlide = _this.goToSlide.bind(_assertThisInitialized(_this));
    _this.nextSlide = _this.nextSlide.bind(_assertThisInitialized(_this));
    _this.previousSlide = _this.previousSlide.bind(_assertThisInitialized(_this));
    _this.getTargetLeft = _this.getTargetLeft.bind(_assertThisInitialized(_this));
    _this.onResize = _this.onResize.bind(_assertThisInitialized(_this));
    _this.onReadyStateChange = _this.onReadyStateChange.bind(_assertThisInitialized(_this));
    _this.setInitialDimensions = _this.setInitialDimensions.bind(_assertThisInitialized(_this));
    _this.setDimensions = _this.setDimensions.bind(_assertThisInitialized(_this));
    _this.setLeft = _this.setLeft.bind(_assertThisInitialized(_this));
    _this.getListStyles = _this.getListStyles.bind(_assertThisInitialized(_this));
    _this.getFrameStyles = _this.getFrameStyles.bind(_assertThisInitialized(_this));
    _this.getSlideStyles = _this.getSlideStyles.bind(_assertThisInitialized(_this));
    _this.getSlideTargetPosition = _this.getSlideTargetPosition.bind(_assertThisInitialized(_this));
    _this.getSliderStyles = _this.getSliderStyles.bind(_assertThisInitialized(_this));
    _this.getOffsetDeltas = _this.getOffsetDeltas.bind(_assertThisInitialized(_this));
    _this.formatChildren = _this.formatChildren.bind(_assertThisInitialized(_this));
    _this.getChildNodes = _this.getChildNodes.bind(_assertThisInitialized(_this));
    _this.getSlideHeight = _this.getSlideHeight.bind(_assertThisInitialized(_this));
    _this.findMaxHeightSlide = _this.findMaxHeightSlide.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Carousel, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setInitialDimensions();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // see https://github.com/facebook/react/issues/3417#issuecomment-121649937
      this.mounted = true;
      this.setDimensions();
      this.bindEvents();

      if (this.props.autoplay) {
        this.startAutoplay();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var slideCount = nextProps.children.length;
      this.setState({
        slideCount: slideCount
      });

      if (slideCount <= this.state.currentSlide) {
        this.goToSlide(Math.max(slideCount - 1, 0));
      }

      this.setDimensions(nextProps);

      if (this.props.slideIndex !== nextProps.slideIndex && nextProps.slideIndex !== this.state.currentSlide && !this.state.isWrappingAround) {
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
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindEvents();
      this.stopAutoplay(); // see https://github.com/facebook/react/issues/3417#issuecomment-121649937

      this.mounted = false;
    }
  }, {
    key: "getTouchEvents",
    value: function getTouchEvents() {
      var _this2 = this;

      if (this.props.swiping === false) {
        return null;
      }

      return {
        onTouchStart: function onTouchStart(e) {
          _this2.touchObject = {
            startX: e.touches[0].pageX,
            startY: e.touches[0].pageY
          };

          _this2.handleMouseOver();
        },
        onTouchMove: function onTouchMove(e) {
          var direction = _this2.swipeDirection(_this2.touchObject.startX, e.touches[0].pageX, _this2.touchObject.startY, e.touches[0].pageY);

          if (direction !== 0) {
            e.preventDefault();
          }

          var length = _this2.props.vertical ? Math.round(Math.sqrt(Math.pow(e.touches[0].pageY - _this2.touchObject.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - _this2.touchObject.startX, 2)));
          _this2.touchObject = {
            startX: _this2.touchObject.startX,
            startY: _this2.touchObject.startY,
            endX: e.touches[0].pageX,
            endY: e.touches[0].pageY,
            length: length,
            direction: direction
          };

          _this2.setState({
            left: _this2.props.vertical ? 0 : _this2.getTargetLeft(_this2.touchObject.length * _this2.touchObject.direction),
            top: _this2.props.vertical ? _this2.getTargetLeft(_this2.touchObject.length * _this2.touchObject.direction) : 0
          });
        },
        onTouchEnd: function onTouchEnd(e) {
          _this2.handleSwipe(e);

          _this2.handleMouseOut();
        },
        onTouchCancel: function onTouchCancel(e) {
          _this2.handleSwipe(e);
        }
      };
    }
  }, {
    key: "getMouseEvents",
    value: function getMouseEvents() {
      var _this3 = this;

      if (this.props.dragging === false) {
        return null;
      }

      return {
        onMouseOver: function onMouseOver() {
          return _this3.handleMouseOver();
        },
        onMouseOut: function onMouseOut() {
          return _this3.handleMouseOut();
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
    }
  }, {
    key: "handleMouseOver",
    value: function handleMouseOver() {
      if (this.props.autoplay) {
        this.autoplayPaused = true;
        this.stopAutoplay();
      }
    }
  }, {
    key: "handleMouseOut",
    value: function handleMouseOut() {
      if (this.props.autoplay && this.autoplayPaused) {
        this.startAutoplay();
        this.autoplayPaused = null;
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (this.clickSafe === true) {
        event.preventDefault();
        event.stopPropagation();

        if (event.nativeEvent) {
          event.nativeEvent.stopPropagation();
        }
      }
    }
  }, {
    key: "handleSwipe",
    value: function handleSwipe() {
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
          if (this.state.currentSlide >= this.totalSlides() - slidesToShow && !this.props.wrapAround) {
            this.setState({
              easing: easing[this.props.edgeEasing]
            });
          } else {
            this.nextSlide();
          }
        } else if (this.touchObject.direction === -1) {
          if (this.state.currentSlide <= 0 && !this.props.wrapAround) {
            this.setState({
              easing: easing[this.props.edgeEasing]
            });
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
    }
  }, {
    key: "swipeDirection",
    value: function swipeDirection(x1, x2, y1, y2) {
      var xDist = x1 - x2;
      var yDist = y1 - y2;
      var r = Math.atan2(yDist, xDist);
      var swipeAngle = Math.round(r * 180 / Math.PI);

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
    }
  }, {
    key: "autoplayIterator",
    value: function autoplayIterator() {
      if (this.props.wrapAround) {
        this.nextSlide();
        return;
      }

      if (this.state.currentSlide !== this.state.slideCount - this.state.slidesToShow) {
        this.nextSlide();
      } else {
        this.stopAutoplay();
      }
    }
  }, {
    key: "startAutoplay",
    value: function startAutoplay() {
      this.autoplayID = setInterval(this.autoplayIterator, this.props.autoplayInterval);
    }
  }, {
    key: "resetAutoplay",
    value: function resetAutoplay() {
      if (this.props.autoplay && !this.autoplayPaused) {
        this.stopAutoplay();
        this.startAutoplay();
      }
    }
  }, {
    key: "stopAutoplay",
    value: function stopAutoplay() {
      if (this.autoplayID) {
        clearInterval(this.autoplayID);
      }
    } // Action Methods

  }, {
    key: "goToSlide",
    value: function goToSlide(index) {
      var _this4 = this;

      this.setState({
        easing: easing[this.props.easing]
      });

      if (index >= this.totalSlides() || index < 0) {
        if (!this.props.wrapAround) {
          return;
        }

        if (index >= this.totalSlides()) {
          this.props.beforeSlide(this.state.currentSlide, 0);
          this.setState(function (prevState) {
            return {
              left: _this4.props.vertical ? 0 : _this4.getTargetLeft(_this4.state.slideWidth, prevState.currentSlide),
              top: _this4.props.vertical ? _this4.getTargetLeft(_this4.state.slideWidth, prevState.currentSlide) : 0,
              currentSlide: 0,
              isWrappingAround: true,
              wrapToIndex: index
            };
          }, function () {
            return setTimeout(function () {
              _this4.setState({
                isWrappingAround: false,
                resetWrapAroundPosition: true
              }, function () {
                _this4.setState({
                  resetWrapAroundPosition: false
                });

                _this4.props.afterSlide(0);

                _this4.resetAutoplay();
              });
            }, _this4.props.speed);
          });
          return;
        } else {
          var endSlide = this.totalSlides() - this.state.slidesToScroll;
          this.props.beforeSlide(this.state.currentSlide, endSlide);
          this.setState(function (prevState) {
            return {
              left: _this4.props.vertical ? 0 : _this4.getTargetLeft(-1, prevState.currentSlide),
              top: _this4.props.vertical ? _this4.getTargetLeft(-1, prevState.currentSlide) : 0,
              currentSlide: endSlide,
              isWrappingAround: true,
              wrapToIndex: index
            };
          }, function () {
            return setTimeout(function () {
              _this4.setState({
                isWrappingAround: false,
                resetWrapAroundPosition: true
              }, function () {
                _this4.setState({
                  resetWrapAroundPosition: false
                });

                _this4.props.afterSlide(endSlide);

                _this4.resetAutoplay();
              });
            }, _this4.props.speed);
          });
          return;
        }
      }

      this.props.beforeSlide(this.state.currentSlide, index);

      if (index !== this.state.currentSlide) {
        this.props.afterSlide(index);
      }

      this.setState({
        currentSlide: index
      }, function () {
        _this4.resetAutoplay();
      });
    }
  }, {
    key: "nextSlide",
    value: function nextSlide() {
      var childrenCount = this.totalSlides();
      var slidesToShow = this.props.slidesToShow;

      if (this.props.slidesToScroll === 'auto') {
        slidesToShow = this.state.slidesToScroll;
      }

      if (this.state.currentSlide >= childrenCount - slidesToShow && !this.props.wrapAround && this.props.cellAlign === 'left') {
        return;
      }

      if (this.props.wrapAround) {
        this.goToSlide(this.state.currentSlide + this.state.slidesToScroll);
      } else {
        if (this.props.slideWidth !== 1) {
          this.goToSlide(this.state.currentSlide + this.state.slidesToScroll);
          return;
        }

        var offset = this.state.currentSlide + this.state.slidesToScroll;
        var nextSlideIndex = this.props.cellAlign !== 'left' ? offset : Math.min(offset, childrenCount - slidesToShow);
        this.goToSlide(nextSlideIndex);
      }
    }
  }, {
    key: "previousSlide",
    value: function previousSlide() {
      if (this.state.currentSlide <= 0 && !this.props.wrapAround) {
        return;
      }

      if (this.props.wrapAround) {
        this.goToSlide(this.state.currentSlide - this.state.slidesToScroll);
      } else {
        this.goToSlide(Math.max(0, this.state.currentSlide - this.state.slidesToScroll));
      }
    } // Animation

  }, {
    key: "getTargetLeft",
    value: function getTargetLeft(touchOffset, slide) {
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
    } // Bootstrapping

  }, {
    key: "bindEvents",
    value: function bindEvents() {
      if (_exenv.default.canUseDOM) {
        addEvent(window, 'resize', this.onResize);
        addEvent(document, 'readystatechange', this.onReadyStateChange);
      }
    }
  }, {
    key: "onResize",
    value: function onResize() {
      this.setDimensions();
    }
  }, {
    key: "onReadyStateChange",
    value: function onReadyStateChange() {
      this.setDimensions();
    }
  }, {
    key: "unbindEvents",
    value: function unbindEvents() {
      if (_exenv.default.canUseDOM) {
        removeEvent(window, 'resize', this.onResize);
        removeEvent(document, 'readystatechange', this.onReadyStateChange);
      }
    }
  }, {
    key: "formatChildren",
    value: function formatChildren() {
      var _this5 = this;

      var _props = this.props,
          children = _props.children,
          vertical = _props.vertical,
          Slide = _props.Slide,
          Placeholder = _props.Placeholder;

      if (!children) {
        return null;
      }

      var positionValue = vertical ? this.state.top : this.state.left;
      return children.map(function (slide, index) {
        return _react.default.createElement("li", {
          className: "slider-slide",
          style: _this5.getSlideStyles(index, positionValue),
          key: index
        }, _this5.shouldRenderSlide(index) ? Slide && _react.default.createElement(Slide, slide) : _react.default.createElement(Placeholder, slide));
      });
    }
  }, {
    key: "setInitialDimensions",
    value: function setInitialDimensions() {
      var _this6 = this;

      var slideWidth = this.props.vertical ? this.props.initialSlideHeight || 0 : this.props.initialSlideWidth || 0;
      var slideHeight = this.props.initialSlideHeight ? this.props.initialSlideHeight * this.props.slidesToShow : 0;
      var frameHeight = slideHeight + this.props.cellSpacing * (this.props.slidesToShow - 1);
      this.setState({
        slideHeight: slideHeight,
        frameWidth: this.props.vertical ? frameHeight : '100%',
        slideCount: this.totalSlides(),
        slideWidth: slideWidth
      }, function () {
        _this6.setLeft();
      });
    }
  }, {
    key: "findMaxHeightSlide",
    value: function findMaxHeightSlide(slides) {
      var maxHeight = 0;

      for (var i = 0; i < slides.length; i++) {
        if (slides[i].offsetHeight > maxHeight) {
          maxHeight = slides[i].offsetHeight;
        }
      }

      return maxHeight;
    }
  }, {
    key: "getSlideHeight",
    value: function getSlideHeight(props) {
      var childNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var heightMode = props.heightMode,
          vertical = props.vertical;
      var firstSlide = childNodes[0];

      if (firstSlide && heightMode === 'first') {
        return vertical ? firstSlide.offsetHeight * props.slidesToShow : firstSlide.offsetHeight;
      }

      if (heightMode === 'max') {
        return this.findMaxHeightSlide(childNodes);
      }

      if (props.heightMode === 'current') {
        return childNodes[this.state.currentSlide].offsetHeight;
      }

      return 100;
    }
  }, {
    key: "setDimensions",
    value: function setDimensions(props) {
      var _this7 = this;

      props = props || this.props;
      var slideWidth;
      var slidesToScroll;
      var frame = this.frame;
      var childNodes = this.getChildNodes();
      var slideHeight = this.getSlideHeight(props, childNodes);
      slidesToScroll = props.slidesToScroll;

      if (typeof props.slideWidth !== 'number') {
        slideWidth = parseInt(props.slideWidth);
      } else if (props.vertical) {
        slideWidth = slideHeight / props.slidesToShow * props.slideWidth;
      } else {
        slideWidth = frame.offsetWidth / props.slidesToShow * props.slideWidth;
      }

      if (!props.vertical) {
        slideWidth -= props.cellSpacing * ((100 - 100 / props.slidesToShow) / 100);
      }

      var frameHeight = slideHeight + props.cellSpacing * (props.slidesToShow - 1);
      var frameWidth = props.vertical ? frameHeight : frame.offsetWidth;

      if (props.slidesToScroll === 'auto') {
        slidesToScroll = Math.floor(frameWidth / (slideWidth + props.cellSpacing));
      }

      this.setState({
        slideHeight: slideHeight,
        frameWidth: frameWidth,
        slideWidth: slideWidth,
        slidesToScroll: slidesToScroll,
        left: props.vertical ? 0 : this.getTargetLeft(),
        top: props.vertical ? this.getTargetLeft() : 0
      }, function () {
        _this7.setLeft();
      });
    }
  }, {
    key: "getChildNodes",
    value: function getChildNodes() {
      return this.frame.childNodes[0].childNodes;
    }
  }, {
    key: "setLeft",
    value: function setLeft() {
      this.setState({
        left: this.props.vertical ? 0 : this.getTargetLeft(),
        top: this.props.vertical ? this.getTargetLeft() : 0
      });
    } // Styles

  }, {
    key: "getListStyles",
    value: function getListStyles(styles) {
      var tx = styles.tx,
          ty = styles.ty;
      var listWidth = this.state.slideWidth * this.totalSlides();
      var spacingOffset = this.props.cellSpacing * this.totalSlides();
      var transform = "translate3d(".concat(tx, "px, ").concat(ty, "px, 0)");
      return {
        transform: transform,
        WebkitTransform: transform,
        msTransform: "translate(".concat(tx, "px, ").concat(ty, "px)"),
        position: 'relative',
        display: 'block',
        margin: this.props.vertical ? "".concat(this.props.cellSpacing / 2 * -1, "px 0px") : "0px ".concat(this.props.cellSpacing / 2 * -1, "px"),
        padding: 0,
        height: this.props.vertical ? listWidth + spacingOffset : this.state.slideHeight,
        width: this.props.vertical ? 'auto' : listWidth + spacingOffset,
        cursor: this.state.dragging === true ? 'pointer' : 'inherit',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box'
      };
    }
  }, {
    key: "getFrameStyles",
    value: function getFrameStyles() {
      return {
        position: 'relative',
        display: 'block',
        overflow: this.props.frameOverflow,
        height: this.props.vertical ? this.state.frameWidth || 'initial' : 'auto',
        padding: this.props.framePadding,
        margin: 0,
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        msTransform: 'translate(0, 0)',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box'
      };
    }
  }, {
    key: "getSlideStyles",
    value: function getSlideStyles(index, positionValue) {
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
    }
  }, {
    key: "getSlideTargetPosition",
    value: function getSlideTargetPosition(index, positionValue) {
      var fullSlideWidth = this.state.slideWidth + this.props.cellSpacing;
      var slidesToShow = this.state.frameWidth / this.state.slideWidth;
      var targetPosition = fullSlideWidth * index;
      var end = fullSlideWidth * slidesToShow * -1;

      if (this.props.wrapAround) {
        var slidesBefore = Math.ceil(positionValue / fullSlideWidth); // TODO check (original: slideWidth)

        if (this.state.slideCount - slidesBefore <= index) {
          return (this.state.slideWidth + this.props.cellSpacing) * (this.state.slideCount - index) * -1;
        }

        var slidesAfter = this.state.slideWidth !== 1 ? Math.ceil((Math.abs(positionValue) - fullSlideWidth) / fullSlideWidth) // TODO check (original: slideWidth, slideWidth)
        : Math.ceil((Math.abs(positionValue) - Math.abs(end)) / fullSlideWidth); // TODO check (original: slideWidth)

        if (index <= slidesAfter - 1) {
          return fullSlideWidth * (this.state.slideCount + index); // TODO check (original: slideWidth)
        }
      }

      return targetPosition;
    }
  }, {
    key: "getSliderStyles",
    value: function getSliderStyles() {
      return {
        position: 'relative',
        display: 'block',
        width: this.props.width,
        height: 'auto',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        visibility: this.state.slideWidth ? 'visible' : 'hidden'
      };
    }
  }, {
    key: "getStyleTagStyles",
    value: function getStyleTagStyles() {
      return '.slider-slide > img {width: 100%; display: block;}';
    }
  }, {
    key: "getDecoratorStyles",
    value: function getDecoratorStyles(position) {
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
  }, {
    key: "getOffsetDeltas",
    value: function getOffsetDeltas() {
      var offset = 0;

      if (this.state.isWrappingAround) {
        offset = this.getTargetLeft(null, this.state.wrapToIndex);
      } else {
        offset = this.getTargetLeft(this.touchObject.length * this.touchObject.direction);
      }

      return {
        tx: [this.props.vertical ? 0 : offset],
        ty: [this.props.vertical ? offset : 0]
      };
    }
  }, {
    key: "renderControls",
    value: function renderControls() {
      var _this8 = this;

      return this.controlsMap.map(function (_ref) {
        var func = _ref.func,
            key = _ref.key;
        return func && typeof func === 'function' && _react.default.createElement("div", {
          className: "slider-control-".concat(key.toLowerCase()),
          style: _this8.getDecoratorStyles(key),
          key: key
        }, func({
          currentSlide: _this8.state.currentSlide,
          slideCount: _this8.state.slideCount,
          frameWidth: _this8.state.frameWidth,
          slideWidth: _this8.state.slideWidth,
          slidesToScroll: _this8.state.slidesToScroll,
          cellSpacing: _this8.props.cellSpacing,
          slidesToShow: _this8.props.slidesToShow,
          wrapAround: _this8.props.wrapAround,
          nextSlide: function nextSlide() {
            return _this8.nextSlide();
          },
          previousSlide: function previousSlide() {
            return _this8.previousSlide();
          },
          goToSlide: function goToSlide(index) {
            return _this8.goToSlide(index);
          }
        }));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      var _children = this.formatChildren(this.props.children);

      var duration = this.state.dragging || this.state.resetWrapAroundPosition ? 0 : this.props.speed;
      return _react.default.createElement("div", {
        className: ['slider', this.props.className || ''].join(' '),
        style: _extends({}, this.getSliderStyles(), this.props.style)
      }, _react.default.createElement(_Animate.default, {
        show: true,
        start: {
          tx: 0,
          ty: 0
        },
        update: _extends({}, this.getOffsetDeltas(), {
          timing: {
            duration: duration,
            ease: this.state.easing
          }
        }),
        children: function children(_ref2) {
          var tx = _ref2.tx,
              ty = _ref2.ty;
          return _react.default.createElement("div", _extends({
            className: "slider-frame",
            ref: function ref(frame) {
              return _this9.frame = frame;
            },
            style: _this9.getFrameStyles()
          }, _this9.getTouchEvents(), _this9.getMouseEvents(), {
            onClick: _this9.handleClick
          }), _react.default.createElement("ul", {
            className: "slider-list",
            style: _this9.getListStyles({
              tx: tx,
              ty: ty
            })
          }, _children));
        }
      }), this.renderControls(), _react.default.createElement("style", {
        type: "text/css",
        dangerouslySetInnerHTML: {
          __html: this.getStyleTagStyles()
        }
      }));
    }
  }]);

  return Carousel;
}(_react.default.Component);

exports.default = Carousel;
Carousel.propTypes = {
  afterSlide: _propTypes.default.func,
  autoplay: _propTypes.default.bool,
  autoplayInterval: _propTypes.default.number,
  beforeSlide: _propTypes.default.func,
  cellAlign: _propTypes.default.oneOf(['left', 'center', 'right']),
  cellSpacing: _propTypes.default.number,
  dragging: _propTypes.default.bool,
  easing: _propTypes.default.string,
  edgeEasing: _propTypes.default.string,
  frameOverflow: _propTypes.default.string,
  framePadding: _propTypes.default.string,
  heightMode: _propTypes.default.oneOf(['first', 'current', 'max']),
  initialSlideHeight: _propTypes.default.number,
  initialSlideWidth: _propTypes.default.number,
  Placeholder: _propTypes.default.func,
  placeholderMode: _propTypes.default.bool,
  preloadedChildrenLevel: _propTypes.default.number,
  renderTopLeftControls: _propTypes.default.func,
  renderTopCenterControls: _propTypes.default.func,
  renderTopRightControls: _propTypes.default.func,
  renderCenterLeftControls: _propTypes.default.func,
  renderCenterCenterControls: _propTypes.default.func,
  renderCenterRightControls: _propTypes.default.func,
  renderBottomLeftControls: _propTypes.default.func,
  renderBottomCenterControls: _propTypes.default.func,
  renderBottomRightControls: _propTypes.default.func,
  Slide: _propTypes.default.func.isRequired,
  slideIndex: _propTypes.default.number,
  slidesToScroll: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.oneOf(['auto'])]),
  slidesToShow: _propTypes.default.number,
  slideWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  speed: _propTypes.default.number,
  swiping: _propTypes.default.bool,
  vertical: _propTypes.default.bool,
  width: _propTypes.default.string,
  wrapAround: _propTypes.default.bool
};
Carousel.defaultProps = {
  afterSlide: function afterSlide() {},
  autoplay: false,
  autoplayInterval: 3000,
  beforeSlide: function beforeSlide() {},
  cellAlign: 'left',
  cellSpacing: 0,
  dragging: true,
  easing: 'easeCircleOut',
  edgeEasing: 'easeElasticOut',
  framePadding: '0px',
  frameOverflow: 'hidden',
  heightMode: 'first',
  placeholderMode: false,
  preloadedChildrenLevel: 1,
  slideIndex: 0,
  slidesToScroll: 1,
  slidesToShow: 1,
  style: {},
  renderCenterLeftControls: function renderCenterLeftControls(props) {
    return _react.default.createElement(_defaultControls.PreviousButton, props);
  },
  renderCenterRightControls: function renderCenterRightControls(props) {
    return _react.default.createElement(_defaultControls.NextButton, props);
  },
  renderBottomCenterControls: function renderBottomCenterControls(props) {
    return _react.default.createElement(_defaultControls.PagingDots, props);
  },
  slideWidth: 1,
  speed: 500,
  swiping: true,
  vertical: false,
  width: '100%',
  wrapAround: false
};