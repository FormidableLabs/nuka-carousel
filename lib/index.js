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
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _exenv = _interopRequireDefault(require("exenv"));

var _Animate = _interopRequireDefault(require("react-move/Animate"));

var easing = _interopRequireWildcard(require("d3-ease"));

var _defaultControls = require("./default-controls");

var _allTransitions = _interopRequireDefault(require("./all-transitions"));

var _announceSlide = _interopRequireWildcard(require("./announce-slide"));

var _utilities = require("./utilities/utilities");

var _styleUtilities = require("./utilities/style-utilities");

var _bootstrappingUtilities = require("./utilities/bootstrapping-utilities");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Carousel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Carousel, _React$Component);

  function Carousel() {
    var _this;

    _classCallCheck(this, Carousel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Carousel).apply(this, arguments));
    _this.displayName = 'Carousel';
    _this.clickDisabled = false;
    _this.isTransitioning = false;
    _this.timers = [];
    _this.touchObject = {};
    _this.controlsMap = [{
      funcName: 'renderTopLeftControls',
      key: 'TopLeft'
    }, {
      funcName: 'renderTopCenterControls',
      key: 'TopCenter'
    }, {
      funcName: 'renderTopRightControls',
      key: 'TopRight'
    }, {
      funcName: 'renderCenterLeftControls',
      key: 'CenterLeft'
    }, {
      funcName: 'renderCenterCenterControls',
      key: 'CenterCenter'
    }, {
      funcName: 'renderCenterRightControls',
      key: 'CenterRight'
    }, {
      funcName: 'renderBottomLeftControls',
      key: 'BottomLeft'
    }, {
      funcName: 'renderBottomCenterControls',
      key: 'BottomCenter'
    }, {
      funcName: 'renderBottomRightControls',
      key: 'BottomRight'
    }];
    _this.childNodesMutationObs = null;
    _this.state = _objectSpread({
      currentSlide: _this.props.slideIndex,
      dragging: false,
      easing: _this.props.disableAnimation ? '' : easing.easeCircleOut,
      hasInteraction: false,
      // to remove animation from the initial slide on the page load when non-default slideIndex is used
      isWrappingAround: false,
      left: 0,
      resetWrapAroundPosition: false,
      slideCount: (0, _bootstrappingUtilities.getValidChildren)(_this.props.children).length,
      top: 0,
      wrapToIndex: null,
      readyStateChanged: 0
    }, (0, _utilities.calcSomeInitialState)(_this.props));
    _this.autoplayIterator = _this.autoplayIterator.bind(_assertThisInitialized(_this));
    _this.calcSlideHeightAndWidth = _this.calcSlideHeightAndWidth.bind(_assertThisInitialized(_this));
    _this.getChildNodes = _this.getChildNodes.bind(_assertThisInitialized(_this));
    _this.getMouseEvents = _this.getMouseEvents.bind(_assertThisInitialized(_this));
    _this.getOffsetDeltas = _this.getOffsetDeltas.bind(_assertThisInitialized(_this));
    _this.getTargetLeft = _this.getTargetLeft.bind(_assertThisInitialized(_this));
    _this.getTouchEvents = _this.getTouchEvents.bind(_assertThisInitialized(_this));
    _this.goToSlide = _this.goToSlide.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleKeyPress = _this.handleKeyPress.bind(_assertThisInitialized(_this));
    _this.handleMouseOut = _this.handleMouseOut.bind(_assertThisInitialized(_this));
    _this.handleMouseOver = _this.handleMouseOver.bind(_assertThisInitialized(_this));
    _this.handleSwipe = _this.handleSwipe.bind(_assertThisInitialized(_this));
    _this.nextSlide = _this.nextSlide.bind(_assertThisInitialized(_this));
    _this.onReadyStateChange = _this.onReadyStateChange.bind(_assertThisInitialized(_this));
    _this.onResize = _this.onResize.bind(_assertThisInitialized(_this));
    _this.onVisibilityChange = _this.onVisibilityChange.bind(_assertThisInitialized(_this));
    _this.previousSlide = _this.previousSlide.bind(_assertThisInitialized(_this));
    _this.renderControls = _this.renderControls.bind(_assertThisInitialized(_this));
    _this.resetAutoplay = _this.resetAutoplay.bind(_assertThisInitialized(_this));
    _this.setDimensions = _this.setDimensions.bind(_assertThisInitialized(_this));
    _this.setLeft = _this.setLeft.bind(_assertThisInitialized(_this));
    _this.setSlideHeightAndWidth = _this.setSlideHeightAndWidth.bind(_assertThisInitialized(_this));
    _this.startAutoplay = _this.startAutoplay.bind(_assertThisInitialized(_this));
    _this.stopAutoplay = _this.stopAutoplay.bind(_assertThisInitialized(_this));
    _this.establishChildNodesMutationObserver = _this.establishChildNodesMutationObserver.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Carousel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // see https://github.com/facebook/react/issues/3417#issuecomment-121649937
      this.mounted = true;
      this.setLeft();
      this.setDimensions();
      this.bindEvents();
      this.establishChildNodesMutationObserver();

      if (this.props.autoplay) {
        this.startAutoplay();
      }
    } // @TODO Remove deprecated componentWillReceiveProps with getDerivedStateFromProps
    // eslint-disable-next-line react/no-deprecated, camelcase

  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var slideCount = (0, _bootstrappingUtilities.getValidChildren)(nextProps.children).length;
      var slideCountChanged = slideCount !== this.state.slideCount;
      this.setState(function (prevState) {
        return {
          slideCount: slideCount,
          currentSlide: slideCountChanged ? nextProps.slideIndex : prevState.currentSlide
        };
      });

      if (slideCount <= this.state.currentSlide) {
        this.goToSlide(Math.max(slideCount - 1, 0), nextProps);
      }

      var updateDimensions = slideCountChanged || (0, _utilities.shouldUpdate)(this.props, nextProps, ['cellSpacing', 'vertical', 'slideWidth', 'slideHeight', 'heightMode', 'slidesToScroll', 'slidesToShow', 'transitionMode', 'cellAlign']);

      if (updateDimensions) {
        this.setDimensions(nextProps);
      }

      if (this.props.slideIndex !== nextProps.slideIndex && nextProps.slideIndex !== this.state.currentSlide && !this.state.isWrappingAround) {
        this.goToSlide(nextProps.slideIndex, this.props);
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
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var slideChanged = prevState.currentSlide !== this.state.currentSlide;
      var heightModeChanged = prevProps.heightMode !== this.props.heightMode;
      var axisChanged = prevProps.vertical !== this.props.vertical;

      if (axisChanged) {
        this.onResize();
      } else if (slideChanged || heightModeChanged) {
        var image = this.getCurrentChildNodeImg();

        if (image) {
          image.addEventListener('load', this.setSlideHeightAndWidth);
          image.removeEventListener('load', this.setSlideHeightAndWidth);
        } else {
          this.setSlideHeightAndWidth();
        }
      }

      var _this$calcSlideHeight = this.calcSlideHeightAndWidth(),
          slideHeight = _this$calcSlideHeight.slideHeight;

      var heightMismatches = slideHeight !== prevState.slideHeight; // When using dynamic content in a slide, it is possible for the slide height to be inaccurate. Here, double check that the height is correct once the component has mounted and the `readyStateChange` event has fired.
      // See #521 and https://github.com/FormidableLabs/nuka-carousel/blob/fea63242a8b2fb69c65689efe615d0feb9b2d1ff/README.md#resizing-height-issue

      if (this.mounted && prevState.readyStateChanged > 0 && heightMismatches) {
        this.setDimensions();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindEvents();
      this.disconnectChildNodesMutationObserver();
      this.stopAutoplay(); // see https://github.com/facebook/react/issues/3417#issuecomment-121649937

      this.mounted = false;

      for (var i = 0; i < this.timers.length; i++) {
        clearTimeout(this.timers[i]);
      }
    }
  }, {
    key: "establishChildNodesMutationObserver",
    value: function establishChildNodesMutationObserver() {
      var _this2 = this;

      var childNodes = this.getChildNodes();

      if (childNodes.length && 'MutationObserver' in window) {
        this.childNodesMutationObs = new MutationObserver(function (mutations) {
          mutations.forEach(function () {
            _this2.setSlideHeightAndWidth();
          });
        });

        var observeChildNodeMutation = function observeChildNodeMutation(node) {
          _this2.childNodesMutationObs.observe(node, {
            attributes: true,
            attributeFilter: ['style'],
            attributeOldValue: false,
            characterData: false,
            characterDataOldValue: false,
            childList: false,
            subtree: false
          });
        };

        var childNodesArray = Array.from(childNodes);

        for (var _i = 0, _childNodesArray = childNodesArray; _i < _childNodesArray.length; _i++) {
          var node = _childNodesArray[_i];
          observeChildNodeMutation(node);
        }
      }
    }
  }, {
    key: "disconnectChildNodesMutationObserver",
    value: function disconnectChildNodesMutationObserver() {
      if (this.childNodesMutationObs instanceof MutationObserver) {
        this.childNodesMutationObs.disconnect();
      }
    }
  }, {
    key: "getTouchEvents",
    value: function getTouchEvents() {
      var _this3 = this;

      if (this.props.swiping === false) {
        return {
          onTouchStart: this.handleMouseOver,
          onTouchEnd: this.handleMouseOut
        };
      }

      return {
        onTouchStart: function onTouchStart(e) {
          _this3.touchObject = {
            startX: e.touches[0].pageX,
            startY: e.touches[0].pageY
          };

          _this3.handleMouseOver();

          _this3.setState({
            dragging: true
          });
        },
        onTouchMove: function onTouchMove(e) {
          var direction = (0, _utilities.swipeDirection)(_this3.touchObject.startX, e.touches[0].pageX, _this3.touchObject.startY, e.touches[0].pageY, _this3.props.vertical);

          if (direction !== 0) {
            e.preventDefault();
          }

          var length = _this3.props.vertical ? Math.round(Math.sqrt(Math.pow(e.touches[0].pageY - _this3.touchObject.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - _this3.touchObject.startX, 2)));

          if (length >= 10) {
            if (_this3.clickDisabled === false) _this3.props.onDragStart(e);
            _this3.clickDisabled = true;
          }

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
    }
  }, {
    key: "getMouseEvents",
    value: function getMouseEvents() {
      var _this4 = this;

      if (this.props.dragging === false) {
        return {
          onMouseOver: this.handleMouseOver,
          onMouseOut: this.handleMouseOut
        };
      }

      return {
        onMouseOver: this.handleMouseOver,
        onMouseOut: this.handleMouseOut,
        onMouseDown: function onMouseDown(e) {
          _this4.touchObject = {
            startX: e.clientX,
            startY: e.clientY
          };

          _this4.setState({
            dragging: true
          });
        },
        onMouseMove: function onMouseMove(e) {
          if (!_this4.state.dragging) {
            return;
          }

          var direction = (0, _utilities.swipeDirection)(_this4.touchObject.startX, e.clientX, _this4.touchObject.startY, e.clientY, _this4.props.vertical);

          if (direction !== 0) {
            e.preventDefault();
          }

          var length = _this4.props.vertical ? Math.round(Math.sqrt(Math.pow(e.clientY - _this4.touchObject.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.clientX - _this4.touchObject.startX, 2))); // prevents disabling click just because mouse moves a fraction of a pixel

          if (length >= 10) {
            if (_this4.clickDisabled === false) _this4.props.onDragStart(e);
            _this4.clickDisabled = true;
          }

          _this4.touchObject = {
            startX: _this4.touchObject.startX,
            startY: _this4.touchObject.startY,
            endX: e.clientX,
            endY: e.clientY,
            length: length,
            direction: direction
          };

          _this4.setState({
            left: _this4.props.vertical ? 0 : _this4.getTargetLeft(_this4.touchObject.length * _this4.touchObject.direction),
            top: _this4.props.vertical ? _this4.getTargetLeft(_this4.touchObject.length * _this4.touchObject.direction) : 0
          });
        },
        onMouseUp: function onMouseUp(e) {
          if (_this4.touchObject.length === 0 || _this4.touchObject.length === undefined) {
            _this4.setState({
              dragging: false
            });

            return;
          }

          _this4.handleSwipe(e);
        },
        onMouseLeave: function onMouseLeave(e) {
          if (!_this4.state.dragging) {
            return;
          }

          _this4.handleSwipe(e);
        }
      };
    }
  }, {
    key: "pauseAutoplay",
    value: function pauseAutoplay() {
      if (this.props.autoplay) {
        this.autoplayPaused = true;
        this.stopAutoplay();
      }
    }
  }, {
    key: "unpauseAutoplay",
    value: function unpauseAutoplay() {
      if (this.props.autoplay && this.autoplayPaused) {
        this.startAutoplay();
        this.autoplayPaused = null;
      }
    }
  }, {
    key: "handleMouseOver",
    value: function handleMouseOver() {
      if (this.props.pauseOnHover) {
        this.pauseAutoplay();
      }
    }
  }, {
    key: "handleMouseOut",
    value: function handleMouseOut() {
      if (this.autoplayPaused) {
        this.unpauseAutoplay();
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (this.clickDisabled === true) {
        if (event.metaKey || event.shiftKey || event.altKey || event.ctrlKey) {
          return;
        }

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
      var _this5 = this;

      var slidesToShow = this.state.slidesToShow;

      if (this.props.slidesToScroll === 'auto') {
        slidesToShow = this.state.slidesToScroll;
      }

      if (this.touchObject.length > this.state.slideWidth / slidesToShow / 5) {
        if (this.touchObject.direction === 1) {
          if (this.state.currentSlide >= this.state.slideCount - slidesToShow && !this.props.wrapAround) {
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
      } // wait for `handleClick` event before resetting clickDisabled


      this.timers.push(setTimeout(function () {
        _this5.clickDisabled = false;
      }, 0));
      this.touchObject = {};
      this.setState({
        dragging: false
      });
    } // eslint-disable-next-line complexity

  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(e) {
      if (this.props.enableKeyboardControls) {
        switch (e.keyCode) {
          case 39:
          case 68:
          case 38:
          case 87:
            this.nextSlide();
            break;

          case 37:
          case 65:
          case 40:
          case 83:
            this.previousSlide();
            break;

          case 81:
            this.goToSlide(0, this.props);
            break;

          case 69:
            this.goToSlide(this.state.slideCount - 1, this.props);
            break;

          case 32:
            if (this.state.pauseOnHover && this.props.autoplay) {
              this.setState({
                pauseOnHover: false
              });
              this.pauseAutoplay();
              break;
            } else {
              this.setState({
                pauseOnHover: true
              });
              this.unpauseAutoplay();
              break;
            }

        }
      }
    }
  }, {
    key: "autoplayIterator",
    value: function autoplayIterator() {
      if (this.props.wrapAround) {
        if (this.props.autoplayReverse) {
          this.previousSlide();
        } else {
          this.nextSlide();
        }

        return;
      }

      if (this.props.autoplayReverse) {
        if (this.state.currentSlide !== 0) {
          this.previousSlide();
        } else {
          this.stopAutoplay();
        }
      } else if (this.state.currentSlide !== this.state.slideCount - this.state.slidesToShow) {
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
    } // Animation Method

  }, {
    key: "getTargetLeft",
    value: function getTargetLeft(touchOffset, slide) {
      var offset;
      var target = slide || this.state.currentSlide;

      switch (this.state.cellAlign) {
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
    key: "isEdgeSwiping",
    value: function isEdgeSwiping() {
      var _this$state = this.state,
          slideCount = _this$state.slideCount,
          slideWidth = _this$state.slideWidth,
          slideHeight = _this$state.slideHeight,
          slidesToShow = _this$state.slidesToShow;

      var _this$getOffsetDeltas = this.getOffsetDeltas(),
          tx = _this$getOffsetDeltas.tx,
          ty = _this$getOffsetDeltas.ty;

      if (this.props.vertical) {
        var rowHeight = slideHeight / slidesToShow;
        var slidesLeftToShow = slideCount - slidesToShow;
        var lastSlideLimit = rowHeight * slidesLeftToShow; // returns true if ty offset is outside first or last slide

        return ty > 0 || -ty > lastSlideLimit;
      } // returns true if tx offset is outside first or last slide


      return tx > 0 || -tx > slideWidth * (slideCount - 1);
    } // Action Methods

  }, {
    key: "goToSlide",
    value: function goToSlide(index, props) {
      var _this6 = this;

      if (props === undefined) {
        props = this.props;
      }

      if (this.isTransitioning) {
        return;
      }

      this.setState({
        hasInteraction: true,
        easing: easing[props.easing]
      });
      this.isTransitioning = true;
      var previousSlide = this.state.currentSlide;

      if (index >= this.state.slideCount || index < 0) {
        if (!props.wrapAround) {
          this.isTransitioning = false;
          return;
        }

        if (index >= this.state.slideCount) {
          props.beforeSlide(this.state.currentSlide, 0);
          this.setState(function (prevState) {
            return {
              left: props.vertical ? 0 : _this6.getTargetLeft(_this6.state.slideWidth, prevState.currentSlide),
              top: props.vertical ? _this6.getTargetLeft(_this6.state.slideWidth, prevState.currentSlide) : 0,
              currentSlide: 0,
              isWrappingAround: true,
              wrapToIndex: index
            };
          }, function () {
            _this6.timers.push(setTimeout(function () {
              _this6.resetAutoplay();

              _this6.isTransitioning = false;

              if (index !== previousSlide) {
                _this6.props.afterSlide(0);
              }
            }, props.speed));
          });
          return;
        } else {
          var endSlide = this.state.slideCount - this.state.slidesToScroll;
          props.beforeSlide(this.state.currentSlide, endSlide);
          this.setState(function (prevState) {
            return {
              left: props.vertical ? 0 : _this6.getTargetLeft(0, prevState.currentSlide),
              top: props.vertical ? _this6.getTargetLeft(0, prevState.currentSlide) : 0,
              currentSlide: endSlide,
              isWrappingAround: true,
              wrapToIndex: index
            };
          }, function () {
            _this6.timers.push(setTimeout(function () {
              _this6.resetAutoplay();

              _this6.isTransitioning = false;

              if (index !== previousSlide) {
                _this6.props.afterSlide(_this6.state.slideCount - 1);
              }
            }, props.speed));
          });
          return;
        }
      }

      this.props.beforeSlide(this.state.currentSlide, index);
      this.setState({
        currentSlide: index
      }, function () {
        return _this6.timers.push(setTimeout(function () {
          _this6.resetAutoplay();

          _this6.isTransitioning = false;

          if (index !== previousSlide) {
            _this6.props.afterSlide(index);
          }
        }, props.speed));
      });
    }
  }, {
    key: "nextSlide",
    value: function nextSlide() {
      var childrenCount = this.state.slideCount;
      var slidesToShow = this.state.slidesToShow;

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
    } // Bootstrapping

  }, {
    key: "bindEvents",
    value: function bindEvents() {
      if (_exenv["default"].canUseDOM) {
        (0, _utilities.addEvent)(window, 'resize', this.onResize);
        (0, _utilities.addEvent)(document, 'readystatechange', this.onReadyStateChange);
        (0, _utilities.addEvent)(document, 'visibilitychange', this.onVisibilityChange);
        (0, _utilities.addEvent)(document, 'keydown', this.handleKeyPress);
      }
    }
  }, {
    key: "onResize",
    value: function onResize() {
      this.setDimensions(null, this.props.onResize);
    }
  }, {
    key: "onReadyStateChange",
    value: function onReadyStateChange() {
      // When using dynamic content in a slide, it is possible that `readystatechange` will fire before the component has finished mounting, which means `this.state.slideHeight` remains 0, instead of the correct height. Tracking this in state will trigger `componentDidUpdate` which can set the correct height.
      // See #521 and https://github.com/FormidableLabs/nuka-carousel/blob/fea63242a8b2fb69c65689efe615d0feb9b2d1ff/README.md#resizing-height-issue
      this.setState({
        readyStateChanged: this.state.readyStateChanged + 1
      });
      this.setDimensions();
    }
  }, {
    key: "onVisibilityChange",
    value: function onVisibilityChange() {
      if (document.hidden) {
        this.pauseAutoplay();
      } else {
        this.unpauseAutoplay();
      }
    }
  }, {
    key: "unbindEvents",
    value: function unbindEvents() {
      if (_exenv["default"].canUseDOM) {
        (0, _utilities.removeEvent)(window, 'resize', this.onResize);
        (0, _utilities.removeEvent)(document, 'readystatechange', this.onReadyStateChange);
        (0, _utilities.removeEvent)(document, 'visibilitychange', this.onVisibilityChange);
        (0, _utilities.removeEvent)(document, 'keydown', this.handleKeyPress);
      }
    }
  }, {
    key: "calcSlideHeightAndWidth",
    value: function calcSlideHeightAndWidth(props) {
      // slide height
      props = props || this.props;
      var childNodes = this.getChildNodes();
      var slideHeight = (0, _bootstrappingUtilities.getSlideHeight)(props, this.state, childNodes); //slide width

      var _getPropsByTransition = (0, _utilities.getPropsByTransitionMode)(props, ['slidesToShow']),
          slidesToShow = _getPropsByTransition.slidesToShow;

      var frame = this.frame;
      var slideWidth;

      if (this.props.animation === 'zoom') {
        slideWidth = frame.offsetWidth - frame.offsetWidth * 15 / 100;
      } else if (typeof props.slideWidth !== 'number') {
        slideWidth = parseInt(props.slideWidth);
      } else if (props.vertical) {
        slideWidth = slideHeight / slidesToShow * props.slideWidth;
      } else {
        slideWidth = frame.offsetWidth / slidesToShow * props.slideWidth;
      }

      if (!props.vertical) {
        slideWidth -= props.cellSpacing * ((100 - 100 / slidesToShow) / 100);
      }

      return {
        slideHeight: slideHeight,
        slideWidth: slideWidth
      };
    }
  }, {
    key: "setSlideHeightAndWidth",
    value: function setSlideHeightAndWidth() {
      this.setState(this.calcSlideHeightAndWidth());
    }
  }, {
    key: "setDimensions",
    value: function setDimensions(props) {
      var _this7 = this;

      var stateCb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      props = props || this.props;

      var _getPropsByTransition2 = (0, _utilities.getPropsByTransitionMode)(props, ['slidesToShow', 'cellAlign']),
          slidesToShow = _getPropsByTransition2.slidesToShow,
          cellAlign = _getPropsByTransition2.cellAlign;

      var frame = this.frame;

      var _this$calcSlideHeight2 = this.calcSlideHeightAndWidth(props),
          slideHeight = _this$calcSlideHeight2.slideHeight,
          slideWidth = _this$calcSlideHeight2.slideWidth;

      var frameHeight = slideHeight + props.cellSpacing * (slidesToShow - 1);
      var frameWidth = props.vertical ? frameHeight : frame.offsetWidth;

      var _getPropsByTransition3 = (0, _utilities.getPropsByTransitionMode)(props, ['slidesToScroll']),
          slidesToScroll = _getPropsByTransition3.slidesToScroll;

      if (slidesToScroll === 'auto') {
        slidesToScroll = Math.floor(frameWidth / (slideWidth + props.cellSpacing));
      }

      this.setState({
        frameWidth: frameWidth,
        slideHeight: slideHeight,
        slidesToScroll: slidesToScroll,
        slidesToShow: slidesToShow,
        slideWidth: slideWidth,
        cellAlign: cellAlign,
        left: props.vertical ? 0 : this.getTargetLeft(),
        top: props.vertical ? this.getTargetLeft() : 0
      }, function () {
        stateCb();

        _this7.setLeft();
      });
    }
  }, {
    key: "getChildNodes",
    value: function getChildNodes() {
      return this.frame.childNodes[0].childNodes;
    }
  }, {
    key: "getCurrentChildNodeImg",
    value: function getCurrentChildNodeImg() {
      var childNodes = this.getChildNodes();
      var currentChildNode = childNodes[this.props.slideIndex];
      return currentChildNode ? currentChildNode.getElementsByTagName('img')[0] : null;
    }
  }, {
    key: "setLeft",
    value: function setLeft() {
      var newLeft = this.props.vertical ? 0 : this.getTargetLeft();
      var newTop = this.props.vertical ? this.getTargetLeft() : 0;

      if (newLeft !== this.state.left || newTop !== this.state.top) {
        this.setState({
          left: newLeft,
          top: newTop
        });
      }
    }
  }, {
    key: "renderControls",
    value: function renderControls() {
      var _this8 = this;

      if (this.props.withoutControls) {
        return this.controlsMap.map(function () {
          return null;
        });
      } else {
        return this.controlsMap.map(function (_ref) {
          var funcName = _ref.funcName,
              key = _ref.key;
          var func = _this8.props[funcName];
          var controlChildren = func && typeof func === 'function' && func({
            cellAlign: _this8.props.cellAlign,
            cellSpacing: _this8.props.cellSpacing,
            currentSlide: _this8.state.currentSlide,
            frameWidth: _this8.state.frameWidth,
            goToSlide: function goToSlide(index) {
              return _this8.goToSlide(index);
            },
            nextSlide: function nextSlide() {
              return _this8.nextSlide();
            },
            previousSlide: function previousSlide() {
              return _this8.previousSlide();
            },
            slideCount: _this8.state.slideCount,
            slidesToScroll: _this8.state.slidesToScroll,
            slidesToShow: _this8.state.slidesToShow,
            slideWidth: _this8.state.slideWidth,
            wrapAround: _this8.props.wrapAround
          });
          return controlChildren && _react["default"].createElement("div", {
            className: "slider-control-".concat(key.toLowerCase()),
            style: (0, _styleUtilities.getDecoratorStyles)(key),
            key: key
          }, controlChildren);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      var _this$state2 = this.state,
          currentSlide = _this$state2.currentSlide,
          slideCount = _this$state2.slideCount,
          frameWidth = _this$state2.frameWidth;
      var _this$props = this.props,
          frameOverflow = _this$props.frameOverflow,
          vertical = _this$props.vertical,
          framePadding = _this$props.framePadding,
          slidesToShow = _this$props.slidesToShow,
          renderAnnounceSlideMessage = _this$props.renderAnnounceSlideMessage,
          disableAnimation = _this$props.disableAnimation;
      var duration = this.state.dragging || !this.state.dragging && this.state.resetWrapAroundPosition && this.props.wrapAround || disableAnimation || !this.state.hasInteraction ? 0 : this.props.speed;
      var frameStyles = (0, _styleUtilities.getFrameStyles)(frameOverflow, vertical, framePadding, frameWidth);
      var touchEvents = this.getTouchEvents();
      var mouseEvents = this.getMouseEvents();
      var TransitionControl = _allTransitions["default"][this.props.transitionMode];
      var validChildren = (0, _bootstrappingUtilities.getValidChildren)(this.props.children);
      return _react["default"].createElement("div", {
        className: ['slider', this.props.className || ''].join(' '),
        style: _extends({}, (0, _styleUtilities.getSliderStyles)(this.props.width, this.props.height), this.props.style)
      }, !this.props.autoplay && _react["default"].createElement(_announceSlide["default"], {
        message: renderAnnounceSlideMessage({
          currentSlide: currentSlide,
          slideCount: slideCount
        })
      }), _react["default"].createElement("div", _extends({
        className: "slider-frame",
        ref: function ref(frame) {
          return _this9.frame = frame;
        },
        style: frameStyles
      }, touchEvents, mouseEvents, {
        onClickCapture: this.handleClick
      }), _react["default"].createElement(_Animate["default"], {
        show: true,
        start: {
          tx: 0,
          ty: 0
        },
        update: function update() {
          var _this9$getOffsetDelta = _this9.getOffsetDeltas(),
              tx = _this9$getOffsetDelta.tx,
              ty = _this9$getOffsetDelta.ty;

          if (_this9.props.disableEdgeSwiping && !_this9.props.wrapAround && _this9.isEdgeSwiping()) {
            return {};
          } else {
            return {
              tx: tx,
              ty: ty,
              timing: {
                duration: duration,
                ease: _this9.state.easing
              },
              events: {
                end: function end() {
                  var newLeft = _this9.props.vertical ? 0 : _this9.getTargetLeft();
                  var newTop = _this9.props.vertical ? _this9.getTargetLeft() : 0;

                  if (newLeft !== _this9.state.left || newTop !== _this9.state.top) {
                    _this9.setState({
                      left: newLeft,
                      top: newTop,
                      isWrappingAround: false,
                      resetWrapAroundPosition: true
                    }, function () {
                      _this9.setState({
                        resetWrapAroundPosition: false
                      });
                    });
                  }
                }
              }
            };
          }
        },
        children: function children(_ref2) {
          var tx = _ref2.tx,
              ty = _ref2.ty;
          return _react["default"].createElement(TransitionControl, _extends({}, (0, _styleUtilities.getTransitionProps)(_this9.props, _this9.state), {
            deltaX: tx,
            deltaY: ty
          }), (0, _bootstrappingUtilities.addAccessibility)(validChildren, slidesToShow, currentSlide));
        }
      })), this.renderControls(), this.props.autoGenerateStyleTag && _react["default"].createElement("style", {
        type: "text/css",
        dangerouslySetInnerHTML: {
          __html: (0, _styleUtilities.getImgTagStyles)()
        }
      }));
    }
  }]);

  return Carousel;
}(_react["default"].Component);

exports["default"] = Carousel;
Carousel.propTypes = {
  afterSlide: _propTypes["default"].func,
  animation: _propTypes["default"].oneOf(['zoom']),
  autoGenerateStyleTag: _propTypes["default"].bool,
  autoplay: _propTypes["default"].bool,
  autoplayInterval: _propTypes["default"].number,
  autoplayReverse: _propTypes["default"].bool,
  beforeSlide: _propTypes["default"].func,
  cellAlign: _propTypes["default"].oneOf(['left', 'center', 'right']),
  cellSpacing: _propTypes["default"].number,
  enableKeyboardControls: _propTypes["default"].bool,
  disableAnimation: _propTypes["default"].bool,
  disableEdgeSwiping: _propTypes["default"].bool,
  dragging: _propTypes["default"].bool,
  easing: _propTypes["default"].string,
  edgeEasing: _propTypes["default"].string,
  frameOverflow: _propTypes["default"].string,
  framePadding: _propTypes["default"].string,
  height: _propTypes["default"].string,
  heightMode: _propTypes["default"].oneOf(['first', 'current', 'max']),
  initialSlideHeight: _propTypes["default"].number,
  initialSlideWidth: _propTypes["default"].number,
  onDragStart: _propTypes["default"].func,
  onResize: _propTypes["default"].func,
  pauseOnHover: _propTypes["default"].bool,
  renderAnnounceSlideMessage: _propTypes["default"].func,
  renderBottomCenterControls: _propTypes["default"].func,
  renderBottomLeftControls: _propTypes["default"].func,
  renderBottomRightControls: _propTypes["default"].func,
  renderCenterCenterControls: _propTypes["default"].func,
  renderCenterLeftControls: _propTypes["default"].func,
  renderCenterRightControls: _propTypes["default"].func,
  renderTopCenterControls: _propTypes["default"].func,
  renderTopLeftControls: _propTypes["default"].func,
  renderTopRightControls: _propTypes["default"].func,
  slideIndex: _propTypes["default"].number,
  slideOffset: _propTypes["default"].number,
  slidesToScroll: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].oneOf(['auto'])]),
  slidesToShow: _propTypes["default"].number,
  slideWidth: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  speed: _propTypes["default"].number,
  swiping: _propTypes["default"].bool,
  transitionMode: _propTypes["default"].oneOf(['scroll', 'fade', 'scroll3d']),
  vertical: _propTypes["default"].bool,
  width: _propTypes["default"].string,
  withoutControls: _propTypes["default"].bool,
  wrapAround: _propTypes["default"].bool,
  opacityScale: _propTypes["default"].number,
  slideListMargin: _propTypes["default"].number
};
Carousel.defaultProps = {
  afterSlide: function afterSlide() {},
  autoGenerateStyleTag: true,
  autoplay: false,
  autoplayInterval: 3000,
  autoplayReverse: false,
  beforeSlide: function beforeSlide() {},
  cellAlign: 'left',
  cellSpacing: 0,
  enableKeyboardControls: false,
  disableAnimation: false,
  disableEdgeSwiping: false,
  dragging: true,
  easing: 'easeCircleOut',
  edgeEasing: 'easeElasticOut',
  frameOverflow: 'hidden',
  framePadding: '0px',
  height: 'auto',
  heightMode: 'max',
  onDragStart: function onDragStart() {},
  onResize: function onResize() {},
  pauseOnHover: true,
  renderAnnounceSlideMessage: _announceSlide.defaultRenderAnnounceSlideMessage,
  renderBottomCenterControls: function renderBottomCenterControls(props) {
    return _react["default"].createElement(_defaultControls.PagingDots, props);
  },
  renderCenterLeftControls: function renderCenterLeftControls(props) {
    return _react["default"].createElement(_defaultControls.PreviousButton, props);
  },
  renderCenterRightControls: function renderCenterRightControls(props) {
    return _react["default"].createElement(_defaultControls.NextButton, props);
  },
  slideIndex: 0,
  slideOffset: 25,
  slidesToScroll: 1,
  slidesToShow: 1,
  slideWidth: 1,
  speed: 500,
  style: {},
  swiping: true,
  transitionMode: 'scroll',
  vertical: false,
  width: '100%',
  withoutControls: false,
  wrapAround: false,
  slideListMargin: 10
};