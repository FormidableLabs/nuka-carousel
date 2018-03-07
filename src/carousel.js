'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import tweenState from 'react-tween-state';
import decorators from './decorators';
import assign from 'object-assign';
import ExecutionEnvironment from 'exenv';
import createReactClass from 'create-react-class';

const addEvent = function(elem, type, eventHandle) {
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

const removeEvent = function(elem, type, eventHandle) {
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

const Carousel = createReactClass({
  displayName: 'Carousel',

  mixins: [tweenState.Mixin],

  propTypes: {
    afterSlide: PropTypes.func,
    autoplay: PropTypes.bool,
    autoplayInterval: PropTypes.number,
    beforeSlide: PropTypes.func,
    cellAlign: PropTypes.oneOf(['left', 'center', 'right']),
    cellSpacing: PropTypes.number,
    data: PropTypes.func,
    decorators: PropTypes.arrayOf(
      PropTypes.shape({
        component: PropTypes.func,
        position: PropTypes.oneOf([
          'TopLeft',
          'TopCenter',
          'TopRight',
          'CenterLeft',
          'CenterCenter',
          'CenterRight',
          'BottomLeft',
          'BottomCenter',
          'BottomRight',
        ]),
        style: PropTypes.object,
      })
    ),
    dragging: PropTypes.bool,
    easing: PropTypes.string,
    edgeEasing: PropTypes.string,
    framePadding: PropTypes.string,
    frameOverflow: PropTypes.string,
    heightMode: PropTypes.oneOf(['first', 'max', 'current']),
    initialSlideHeight: PropTypes.number,
    initialSlideWidth: PropTypes.number,
    shouldRecalculateHeight: PropTypes.bool,
    slideIndex: PropTypes.number,
    slidesToShow: PropTypes.number,
    slidesToScroll: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['auto']),
    ]),
    slideWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    speed: PropTypes.number,
    swiping: PropTypes.bool,
    vertical: PropTypes.bool,
    width: PropTypes.string,
    wrapAround: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      afterSlide: function() { },
      autoplay: false,
      autoplayInterval: 3000,
      beforeSlide: function() { },
      cellAlign: 'left',
      cellSpacing: 0,
      data: function() { },
      decorators: decorators,
      dragging: true,
      easing: 'easeOutCirc',
      edgeEasing: 'easeOutElastic',
      framePadding: '0px',
      frameOverflow: 'hidden',
      heightMode: 'first',
      shouldRecalculateHeight: false,
      slideIndex: 0,
      slidesToScroll: 1,
      slidesToShow: 1,
      slideWidth: 1,
      speed: 500,
      swiping: true,
      vertical: false,
      width: '100%',
      wrapAround: false,
    };
  },

  getInitialState() {
    return {
      currentSlide: this.props.slideIndex,
      dragging: false,
      frameWidth: 0,
      left: 0,
      slideCount: 0,
      slidesToScroll: this.props.slidesToScroll,
      slideWidth: 0,
      top: 0,
    };
  },

  componentWillMount() {
    this.setInitialDimensions();
  },

  componentDidMount() {
    // see https://github.com/facebook/react/issues/3417#issuecomment-121649937
    this.mounted = true;
    this.setDimensions();
    this.bindEvents();
    this.setExternalData();
    if (this.props.autoplay) {
      this.startAutoplay();
    }
  },

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.shouldRecalculateHeight) {
      var height = this.state.slideHeight;
      var childNodes = this.refs.frame.childNodes[0].childNodes;
      if (nextProps.heightMode === 'max') {
        height = this.findMaxHeightSlide(childNodes);
      }
      if (nextProps.heightMode === 'current') {
        height = childNodes[this.state.currentSlide].offsetHeight;
      }
      if (nextProps.heightMode === 'first') {
        height = childNodes[0].offsetHeight;
      }
      if (this.state.slideHeight !== height) {
        this.setDimensions(nextProps);
      }
    }
  },


  componentWillReceiveProps(nextProps) {
    this.setState({
      slideCount: nextProps.children.length,
    });
    this.setDimensions(nextProps);
    if (
      this.props.slideIndex !== nextProps.slideIndex &&
      nextProps.slideIndex !== this.state.currentSlide
    ) {
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

  componentWillUnmount() {
    this.unbindEvents();
    this.stopAutoplay();
    // see https://github.com/facebook/react/issues/3417#issuecomment-121649937
    this.mounted = false;
  },

  render() {
    var self = this;
    var children =
      React.Children.count(this.props.children) > 1
        ? this.formatChildren(this.props.children)
        : this.props.children;
    return (
      <div
        className={['slider', this.props.className || ''].join(' ')}
        ref="slider"
        style={assign(this.getSliderStyles(), this.props.style || {})}
      >
        <div
          className="slider-frame"
          ref="frame"
          style={this.getFrameStyles()}
          {...this.getTouchEvents()}
          {...this.getMouseEvents()}
          onClick={this.handleClick}
        >
          <ul className="slider-list" ref="list" style={this.getListStyles()}>
            {children}
          </ul>
        </div>
        {this.props.decorators
          ? this.props.decorators.map(function(Decorator, index) {
            return (
              <div
                style={assign(
                  self.getDecoratorStyles(Decorator.position),
                  Decorator.style || {}
                )}
                className={'slider-decorator-' + index}
                key={index}
              >
                <Decorator.component
                  currentSlide={self.state.currentSlide}
                  slideCount={self.state.slideCount}
                  frameWidth={self.state.frameWidth}
                  slideWidth={self.state.slideWidth}
                  slidesToScroll={self.state.slidesToScroll}
                  cellSpacing={self.props.cellSpacing}
                  slidesToShow={self.props.slidesToShow}
                  wrapAround={self.props.wrapAround}
                  nextSlide={self.nextSlide}
                  previousSlide={self.previousSlide}
                  goToSlide={self.goToSlide}
                />
              </div>
            );
          })
          : null}
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: self.getStyleTagStyles() }}
        />
      </div>
    );
  },

  // Touch Events

  touchObject: {},

  getTouchEvents() {
    var self = this;

    if (self.props.swiping === false) {
      return null;
    }

    return {
      onTouchStart(e) {
        self.touchObject = {
          startX: e.touches[0].pageX,
          startY: e.touches[0].pageY,
        };
        self.handleMouseOver();
      },
      onTouchMove(e) {
        var direction = self.swipeDirection(
          self.touchObject.startX,
          e.touches[0].pageX,
          self.touchObject.startY,
          e.touches[0].pageY
        );

        if (direction !== 0) {
          e.preventDefault();
        }

        var length = self.props.vertical
          ? Math.round(
            Math.sqrt(
              Math.pow(e.touches[0].pageY - self.touchObject.startY, 2)
            )
          )
          : Math.round(
            Math.sqrt(
              Math.pow(e.touches[0].pageX - self.touchObject.startX, 2)
            )
          );

        self.touchObject = {
          startX: self.touchObject.startX,
          startY: self.touchObject.startY,
          endX: e.touches[0].pageX,
          endY: e.touches[0].pageY,
          length: length,
          direction: direction,
        };

        self.setState({
          left: self.props.vertical
            ? 0
            : self.getTargetLeft(
              self.touchObject.length * self.touchObject.direction
            ),
          top: self.props.vertical
            ? self.getTargetLeft(
              self.touchObject.length * self.touchObject.direction
            )
            : 0,
        });
      },
      onTouchEnd(e) {
        self.handleSwipe(e);
        self.handleMouseOut();
      },
      onTouchCancel(e) {
        self.handleSwipe(e);
      },
    };
  },

  clickSafe: true,

  getMouseEvents() {
    var self = this;

    if (this.props.dragging === false) {
      return null;
    }

    return {
      onMouseOver() {
        self.handleMouseOver();
      },
      onMouseOut() {
        self.handleMouseOut();
      },
      onMouseDown(e) {
        self.touchObject = {
          startX: e.clientX,
          startY: e.clientY,
        };

        self.setState({
          dragging: true,
        });
      },
      onMouseMove(e) {
        if (!self.state.dragging) {
          return;
        }

        var direction = self.swipeDirection(
          self.touchObject.startX,
          e.clientX,
          self.touchObject.startY,
          e.clientY
        );

        if (direction !== 0) {
          e.preventDefault();
        }

        var length = self.props.vertical
          ? Math.round(
            Math.sqrt(Math.pow(e.clientY - self.touchObject.startY, 2))
          )
          : Math.round(
            Math.sqrt(Math.pow(e.clientX - self.touchObject.startX, 2))
          );

        self.touchObject = {
          startX: self.touchObject.startX,
          startY: self.touchObject.startY,
          endX: e.clientX,
          endY: e.clientY,
          length: length,
          direction: direction,
        };

        self.setState({
          left: self.props.vertical
            ? 0
            : self.getTargetLeft(
              self.touchObject.length * self.touchObject.direction
            ),
          top: self.props.vertical
            ? self.getTargetLeft(
              self.touchObject.length * self.touchObject.direction
            )
            : 0,
        });
      },
      onMouseUp(e) {
        if (!self.state.dragging) {
          return;
        }

        self.handleSwipe(e);
      },
      onMouseLeave(e) {
        if (!self.state.dragging) {
          return;
        }

        self.handleSwipe(e);
      },
    };
  },

  handleMouseOver() {
    if (this.props.autoplay) {
      this.autoplayPaused = true;
      this.stopAutoplay();
    }
  },

  handleMouseOut() {
    if (this.props.autoplay && this.autoplayPaused) {
      this.startAutoplay();
      this.autoplayPaused = null;
    }
  },

  handleClick(e) {
    if (this.clickSafe === true) {
      e.preventDefault();
      e.stopPropagation();

      if (e.nativeEvent) {
        e.nativeEvent.stopPropagation();
      }
    }
  },

  handleSwipe(e) {
    if (
      typeof this.touchObject.length !== 'undefined' &&
      this.touchObject.length > 44
    ) {
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
        if (
          this.state.currentSlide >= React.Children.count(this.props.children) - slidesToShow && !this.props.wrapAround
        ) {
          this.animateSlide(tweenState.easingTypes[this.props.edgeEasing]);
        } else {
          this.nextSlide();
        }
      } else if (this.touchObject.direction === -1) {
        if (this.state.currentSlide <= 0 && !this.props.wrapAround) {
          this.animateSlide(tweenState.easingTypes[this.props.edgeEasing]);
        } else {
          this.previousSlide();
        }
      }
    } else {
      this.goToSlide(this.state.currentSlide);
    }

    this.touchObject = {};

    this.setState({
      dragging: false,
    });
  },

  swipeDirection(x1, x2, y1, y2) {
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

  autoplayIterator() {
    if (this.props.wrapAround) {
      return this.nextSlide();
    }
    if (
      this.state.currentSlide !==
      this.state.slideCount - this.state.slidesToShow
    ) {
      this.nextSlide();
    } else {
      this.stopAutoplay();
    }
  },

  startAutoplay() {
    this.autoplayID = setInterval(
      this.autoplayIterator,
      this.props.autoplayInterval
    );
  },

  resetAutoplay() {
    if (this.props.autoplay && !this.autoplayPaused) {
      this.stopAutoplay();
      this.startAutoplay();
    }
  },

  stopAutoplay() {
    this.autoplayID && clearInterval(this.autoplayID);
  },

  // Action Methods

  goToSlide(index) {
    var self = this;
    if (index >= React.Children.count(this.props.children) || index < 0) {
      if (!this.props.wrapAround) {
        return;
      }
      if (index >= React.Children.count(this.props.children)) {
        this.props.beforeSlide(this.state.currentSlide, 0);
        return this.setState(
          {
            currentSlide: 0,
          },
          function() {
            self.animateSlide(
              null,
              null,
              self.getTargetLeft(null, index),
              function() {
                self.animateSlide(null, 0.01);
                self.props.afterSlide(0);
                self.resetAutoplay();
                self.setExternalData();
              }
            );
          }
        );
      } else {
        var endSlide =
          React.Children.count(this.props.children) - this.state.slidesToScroll;
        this.props.beforeSlide(this.state.currentSlide, endSlide);
        return this.setState(
          {
            currentSlide: endSlide,
          },
          function() {
            self.animateSlide(
              null,
              null,
              self.getTargetLeft(null, index),
              function() {
                self.animateSlide(null, 0.01);
                self.props.afterSlide(endSlide);
                self.resetAutoplay();
                self.setExternalData();
              }
            );
          }
        );
      }
    }

    this.props.beforeSlide(this.state.currentSlide, index);

    if (index !== this.state.currentSlide) {
      this.props.afterSlide(index);
    }
    this.setState(
      {
        currentSlide: index,
      },
      function() {
        self.animateSlide();
        self.resetAutoplay();
        self.setExternalData();
        self.setDimensions(this.props);
      }
    );
  },

  nextSlide() {
    var childrenCount = React.Children.count(this.props.children);
    var slidesToShow = this.props.slidesToShow;
    if (this.props.slidesToScroll === 'auto') {
      slidesToShow = this.state.slidesToScroll;
    }
    if (
      this.state.currentSlide >= childrenCount - slidesToShow &&
      !this.props.wrapAround
    ) {
      return;
    }

    if (this.props.wrapAround) {
      this.goToSlide(this.state.currentSlide + this.state.slidesToScroll);
    } else {
      if (this.props.slideWidth !== 1) {
        return this.goToSlide(
          this.state.currentSlide + this.state.slidesToScroll
        );
      }
      this.goToSlide(
        Math.min(
          this.state.currentSlide + this.state.slidesToScroll,
          childrenCount - slidesToShow
        )
      );
    }
  },

  previousSlide() {
    if (this.state.currentSlide <= 0 && !this.props.wrapAround) {
      return;
    }

    if (this.props.wrapAround) {
      this.goToSlide(this.state.currentSlide - this.state.slidesToScroll);
    } else {
      this.goToSlide(
        Math.max(0, this.state.currentSlide - this.state.slidesToScroll)
      );
    }
  },

  // Animation

  animateSlide(easing, duration, endValue, callback) {
    this.tweenState(this.props.vertical ? 'top' : 'left', {
      easing: easing || tweenState.easingTypes[this.props.easing],
      duration: duration || this.props.speed,
      endValue: endValue || this.getTargetLeft(),
      onEnd: callback || null,
    });
  },

  getTargetLeft(touchOffset, slide) {
    var offset;
    var target = slide || this.state.currentSlide;
    switch (this.props.cellAlign) {
    case 'left': {
      offset = 0;
      offset -= this.props.cellSpacing * target;
      break;
    }
    case 'center': {
      offset = (this.state.frameWidth - this.state.slideWidth) / 2;
      offset -= this.props.cellSpacing * target;
      break;
    }
    case 'right': {
      offset = this.state.frameWidth - this.state.slideWidth;
      offset -= this.props.cellSpacing * target;
      break;
    }
    }

    var left = this.state.slideWidth * target;

    var lastSlide =
      this.state.currentSlide > 0 &&
      target + this.state.slidesToScroll >= this.state.slideCount;

    if (
      lastSlide &&
      this.props.slideWidth !== 1 &&
      !this.props.wrapAround &&
      this.props.slidesToScroll === 'auto'
    ) {
      left =
        this.state.slideWidth * this.state.slideCount - this.state.frameWidth;
      offset = 0;
      offset -= this.props.cellSpacing * (this.state.slideCount - 1);
    }

    offset -= touchOffset || 0;

    return (left - offset) * -1;
  },

  // Bootstrapping

  bindEvents() {
    var self = this;
    if (ExecutionEnvironment.canUseDOM) {
      addEvent(window, 'resize', self.onResize);
      addEvent(document, 'readystatechange', self.onReadyStateChange);
    }
  },

  onResize() {
    this.setDimensions();
  },

  onReadyStateChange() {
    this.setDimensions();
  },

  unbindEvents() {
    var self = this;
    if (ExecutionEnvironment.canUseDOM) {
      removeEvent(window, 'resize', self.onResize);
      removeEvent(document, 'readystatechange', self.onReadyStateChange);
    }
  },

  formatChildren(children) {
    var self = this;
    var positionValue = this.props.vertical
      ? this.getTweeningValue('top')
      : this.getTweeningValue('left');
    return React.Children.map(children, function(child, index) {
      return (
        <li
          className="slider-slide"
          style={self.getSlideStyles(index, positionValue)}
          key={index}
        >
          {child}
        </li>
      );
    });
  },

  setInitialDimensions() {
    var self = this,
      slideWidth,
      frameHeight,
      slideHeight;

    slideWidth = this.props.vertical
      ? this.props.initialSlideHeight || 0
      : this.props.initialSlideWidth || 0;
    slideHeight = this.props.initialSlideHeight
      ? this.props.initialSlideHeight * this.props.slidesToShow
      : 0;

    frameHeight =
      slideHeight + this.props.cellSpacing * (this.props.slidesToShow - 1);

    this.setState(
      {
        slideHeight: slideHeight,
        frameWidth: this.props.vertical ? frameHeight : '100%',
        slideCount: React.Children.count(this.props.children),
        slideWidth: slideWidth,
      },
      function() {
        self.setLeft();
        self.setExternalData();
      }
    );
  },

  findMaxHeightSlide(slides) {
    let maxHeight = 0;
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].offsetHeight > maxHeight) {
        maxHeight = slides[i].offsetHeight;
      }
    }
    return maxHeight;
  },

  setDimensions(props) {
    props = props || this.props;

    var self = this,
      slideWidth,
      slidesToScroll,
      firstSlide,
      frame,
      frameWidth,
      frameHeight,
      slideHeight,
      childNodes;

    slidesToScroll = props.slidesToScroll;
    frame = this.refs.frame;
    childNodes = frame.childNodes[0].childNodes;
    firstSlide = childNodes[0];
    if (firstSlide) {
      firstSlide.style.height = 'auto';
      slideHeight = this.props.vertical
        ? firstSlide.offsetHeight * props.slidesToShow
        : firstSlide.offsetHeight;
      if (props.heightMode === 'max') {
        slideHeight = this.findMaxHeightSlide(childNodes);
      }
    } else {
      slideHeight = 100;
    }

    if (props.heightMode === 'current') {
      slideHeight = childNodes[this.state.currentSlide].offsetHeight;
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
      slideWidth -=
        props.cellSpacing * ((100 - 100 / props.slidesToShow) / 100);
    }

    frameHeight = slideHeight + props.cellSpacing * (props.slidesToShow - 1);
    frameWidth = props.vertical ? frameHeight : frame.offsetWidth;

    if (props.slidesToScroll === 'auto') {
      slidesToScroll = Math.floor(
        frameWidth / (slideWidth + props.cellSpacing)
      );
    }

    this.setState(
      {
        slideHeight: slideHeight,
        frameWidth: frameWidth,
        slideWidth: slideWidth,
        slidesToScroll: slidesToScroll,
        left: props.vertical ? 0 : this.getTargetLeft(),
        top: props.vertical ? this.getTargetLeft() : 0,
      },
      function() {
        self.setLeft();
      }
    );
  },

  setLeft() {
    this.setState({
      left: this.props.vertical ? 0 : this.getTargetLeft(),
      top: this.props.vertical ? this.getTargetLeft() : 0,
    });
  },

  // Data

  setExternalData() {
    if (this.props.data) {
      this.props.data();
    }
  },

  // Styles

  getListStyles() {
    var listWidth =
      this.state.slideWidth * React.Children.count(this.props.children);
    var spacingOffset =
      this.props.cellSpacing * React.Children.count(this.props.children);
    var transform =
      'translate3d(' +
      this.getTweeningValue('left') +
      'px, ' +
      this.getTweeningValue('top') +
      'px, 0)';
    return {
      transform,
      WebkitTransform: transform,
      msTransform:
        'translate(' +
        this.getTweeningValue('left') +
        'px, ' +
        this.getTweeningValue('top') +
        'px)',
      position: 'relative',
      display: 'block',
      margin: this.props.vertical
        ? this.props.cellSpacing / 2 * -1 + 'px 0px'
        : '0px ' + this.props.cellSpacing / 2 * -1 + 'px',
      padding: 0,
      height: this.props.vertical
        ? listWidth + spacingOffset
        : this.state.slideHeight,
      width: this.props.vertical ? 'auto' : listWidth + spacingOffset,
      cursor: this.state.dragging === true ? 'pointer' : 'inherit',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
    };
  },

  getFrameStyles() {
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
      MozBoxSizing: 'border-box',
    };
  },

  getSlideStyles(index, positionValue) {
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
      marginBottom: this.props.vertical ? this.props.cellSpacing / 2 : 'auto',
    };
  },

  getSlideTargetPosition(index, positionValue) {
    var slidesToShow = this.state.frameWidth / this.state.slideWidth;
    var targetPosition =
      (this.state.slideWidth + this.props.cellSpacing) * index;
    var end =
      (this.state.slideWidth + this.props.cellSpacing) * slidesToShow * -1;

    if (this.props.wrapAround) {
      var slidesBefore = Math.ceil(positionValue / this.state.slideWidth);
      if (this.state.slideCount - slidesBefore <= index) {
        return (
          (this.state.slideWidth + this.props.cellSpacing) *
          (this.state.slideCount - index) *
          -1
        );
      }

      var slidesAfter = Math.ceil(
        (Math.abs(positionValue) - Math.abs(end)) / this.state.slideWidth
      );

      if (this.state.slideWidth !== 1) {
        slidesAfter = Math.ceil(
          (Math.abs(positionValue) - this.state.slideWidth) /
          this.state.slideWidth
        );
      }

      if (index <= slidesAfter - 1) {
        return (
          (this.state.slideWidth + this.props.cellSpacing) *
          (this.state.slideCount + index)
        );
      }
    }

    return targetPosition;
  },

  getSliderStyles() {
    return {
      position: 'relative',
      display: 'block',
      width: this.props.width,
      height: 'auto',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      visibility: this.state.slideWidth ? 'visible' : 'hidden',
    };
  },

  getStyleTagStyles() {
    return '.slider-slide > img {width: 100%; display: block;}';
  },

  getDecoratorStyles(position) {
    switch (position) {
    case 'TopLeft': {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
      };
    }
    case 'TopCenter': {
      return {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        WebkitTransform: 'translateX(-50%)',
        msTransform: 'translateX(-50%)',
      };
    }
    case 'TopRight': {
      return {
        position: 'absolute',
        top: 0,
        right: 0,
      };
    }
    case 'CenterLeft': {
      return {
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
        WebkitTransform: 'translateY(-50%)',
        msTransform: 'translateY(-50%)',
      };
    }
    case 'CenterCenter': {
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        WebkitTransform: 'translate(-50%, -50%)',
        msTransform: 'translate(-50%, -50%)',
      };
    }
    case 'CenterRight': {
      return {
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        WebkitTransform: 'translateY(-50%)',
        msTransform: 'translateY(-50%)',
      };
    }
    case 'BottomLeft': {
      return {
        position: 'absolute',
        bottom: 0,
        left: 0,
      };
    }
    case 'BottomCenter': {
      return {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        WebkitTransform: 'translateX(-50%)',
        msTransform: 'translateX(-50%)',
      };
    }
    case 'BottomRight': {
      return {
        position: 'absolute',
        bottom: 0,
        right: 0,
      };
    }
    default: {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
      };
    }
    }
  },
});

Carousel.ControllerMixin = {
  getInitialState() {
    return {
      carousels: {},
    };
  },
  setCarouselData(carousel) {
    var data = this.state.carousels;
    data[carousel] = this.refs[carousel];
    this.setState({
      carousels: data,
    });
  },
};

export default Carousel;
