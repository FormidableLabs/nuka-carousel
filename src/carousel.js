'use strict';

import React from 'react';
import tweenState from 'react-tween-state';
import decorators from './decorators';
import assign from 'object-assign';

React.initializeTouchEvents(true);

const Carousel = React.createClass({
  displayName: 'Carousel',

  mixins: [tweenState.Mixin],

  propTypes: {
    cellAlign: React.PropTypes.oneOf(['left', 'center', 'right']),
    cellSpacing: React.PropTypes.number,
    data: React.PropTypes.func,
    decorators: React.PropTypes.array,
    dragging: React.PropTypes.bool,
    easing: React.PropTypes.string,
    edgeEasing: React.PropTypes.string,
    padding: React.PropTypes.string,
    slidesToShow: React.PropTypes.number,
    slidesToScroll: React.PropTypes.number,
    slideWidth: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    speed: React.PropTypes.number,
    width: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      cellAlign: 'left',
      cellSpacing: 0,
      data: function() {},
      decorators: decorators,
      dragging: true,
      easing: 'easeOutCirc',
      edgeEasing: 'easeOutElastic',
      framePadding: "0px",
      slidesToShow: 1,
      slidesToScroll: 1,
      slideWidth: 1,
      speed: 500,
      width: "100%"
    }
  },

  getInitialState() {
    return {
      currentSlide: 0,
      dragging: false,
      frameWidth: 0,
      left: 0,
      slideCount: 0,
      slideWidth: 0
    }
  },

  componentDidMount() {
    this.setDimensions();
    this.bindEvents();
  },

  render() {
    var self = this;
    var children = this.formatChildren(this.props.children);
    return (
      <div className='slider' ref="slider" style={assign(this.getSliderStyles(), this.props.style || {})}>
        <div className="slider-frame"
          ref="frame"
          style={this.getFrameStyles()}
          {...this.getTouchEvents()}
          {...this.getMouseEvents()}>
          <ul className="slider-list" ref="list" style={this.getListStyles()}>
            {children}
          </ul>
        </div>
        {this.props.decorators ?
          this.props.decorators.map(function(Decorator, index) {
            return (
              <div
                style={assign(self.getDecoratorStyles(Decorator.position), Decorator.style || {})}
                className={'slider-decorator-' + index}
                key={index}>
                <Decorator.component
                  currentSlide={self.state.currentSlide}
                  slideCount={self.state.slideCount}
                  slidesToShow={self.props.slidesToShow}
                  slidesToScroll={self.props.slidesToScroll}
                  nextSlide={self.nextSlide}
                  previousSlide={self.previousSlide}
                  goToSlide={self.goToSlide} />
              </div>
            )
          })
        : null}
        <style type="text/css" dangerouslySetInnerHTML={{__html: self.getStyleTagStyles()}}/>
      </div>
    )
  },

  // Touch Events

  touchObject: {},

  getTouchEvents() {
    var self = this;

    return {
      onTouchStart() {
        self.touchObject = {
          startX: event.touches[0].pageX,
          startY: event.touches[0].pageY
        }
      },
      onTouchMove() {
        var direction = self.swipeDirection(
          self.touchObject.startX,
          event.touches[0].pageX,
          self.touchObject.startY,
          event.touches[0].pageY
        );

        if (direction !== 0) {
          event.preventDefault();
        }

        self.touchObject = {
          startX: self.touchObject.startX,
          startY: self.touchObject.startY,
          endX: event.touches[0].pageX,
          endY: event.touches[0].pageY,
          length: Math.round(Math.sqrt(Math.pow(event.touches[0].pageX - self.touchObject.startX, 2))),
          direction: direction
        }

        self.setState({
          left: (self.state.slideWidth * self.state.currentSlide + (self.touchObject.length * self.touchObject.direction)) * -1
        });
      },
      onTouchEnd() {
        self.handleSwipe();
      },
      onTouchCancel() {
        self.handleSwipe();
      }
    }
  },

  getMouseEvents() {
    var self = this;

    if (this.props.dragging === false) {
      return null;
    }

    return {
      onMouseDown() {
        self.touchObject = {
            startX: event.clientX,
            startY: event.clientY
        };

        self.setState({
          dragging: true
        });
      },
      onMouseMove() {
        if (!self.state.dragging) {
          return;
        }

        var direction = self.swipeDirection(
          self.touchObject.startX,
          event.clientX,
          self.touchObject.startY,
          event.clientY
        );

        if (direction !== 0) {
          event.preventDefault();
        }

        self.touchObject = {
          startX: self.touchObject.startX,
          startY: self.touchObject.startY,
          endX: event.clientX,
          endY: event.clientY,
          length: Math.round(Math.sqrt(Math.pow(event.clientX - self.touchObject.startX, 2))),
          direction: direction
        };

        self.setState({
          left: self.getTargetLeft(self.touchObject.length * self.touchObject.direction)
        });
      },
      onMouseUp() {
        if (!self.state.dragging) {
          return;
        }

        self.handleSwipe();
      },
      onMouseLeave() {
        if (!self.state.dragging) {
          return;
        }

        self.handleSwipe();
      }
    }
  },

  handleSwipe() {
    if (this.touchObject.length > (this.state.slideWidth / this.props.slidesToShow) / 5) {
      if (this.touchObject.direction === 1) {
        if (this.state.currentSlide >= this.props.children.length - this.props.slidesToScroll) {
          this.animateSlide(tweenState.easingTypes[this.props.edgeEasing]);
        } else {
          this.nextSlide();
        }
      } else if (this.touchObject.direction === -1) {
        if (this.state.currentSlide <= 0) {
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
      dragging: false
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
    if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
      return 1;
    }
    if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
      return 1;
    }
    if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
      return -1;
    }
    return 0;

  },

  // Action Methods

  goToSlide(index) {
    var self = this;
    if (index >= this.props.children.length || index < 0) {
      return;
    }
    this.setState({
      currentSlide: index
    }, function() {
      self.animateSlide();
      self.setExternalData();
    });
  },

  nextSlide() {
    var self = this;
    if ((this.state.currentSlide + this.props.slidesToScroll) >= this.props.children.length) {
      return;
    }
    this.setState({
      currentSlide: this.state.currentSlide + this.props.slidesToScroll
    }, function() {
      self.animateSlide();
      self.setExternalData();
    });
  },

  previousSlide() {
    var self = this;
    if ((this.state.currentSlide - this.props.slidesToScroll) < 0) {
      return;
    }
    this.setState({
      currentSlide: this.state.currentSlide - this.props.slidesToScroll
    }, function() {
      self.animateSlide();
      self.setExternalData();
    });
  },

  // Animation

  animateSlide(easing, duration, endValue) {
    this.tweenState('left', {
      easing: easing || tweenState.easingTypes[this.props.easing],
      duration: duration || this.props.speed,
      endValue: endValue || this.getTargetLeft()
    });
  },

  getTargetLeft(touchOffset) {
    var offset;
    switch (this.props.cellAlign) {
      case 'left': {
        offset = 0;
        offset -= this.props.cellSpacing * (this.state.currentSlide);
        break;
      }
      case 'center': {
        offset = (this.state.frameWidth - this.state.slideWidth) / 2;
        offset -= this.props.cellSpacing * (this.state.currentSlide);
        break;
      }
      case 'right': {
        offset = this.state.frameWidth - this.state.slideWidth;
        offset -= this.props.cellSpacing * (this.state.currentSlide);
        break;
      }
    }

    offset -= touchOffset || 0;

    return ((this.state.slideWidth * this.state.currentSlide) - offset) * -1;
  },

  // Bootstrapping

  bindEvents() {
    var self = this;
    window.onresize = function() {
      self.setDimensions();
    }
  },

  formatChildren(children) {
    var self = this;
    return children.map(function(child, index) {
      return <li className="slider-slide" style={self.getSlideStyles()} key={index}>{child}</li>
    });
  },

  setDimensions() {
    var self = this, slideWidth, frame;
    frame = React.findDOMNode(this.refs.frame);
    if (typeof this.props.slideWidth !== 'number') {
      slideWidth = parseInt(this.props.slideWidth);
    } else {
      slideWidth = (frame.offsetWidth / this.props.slidesToShow) * this.props.slideWidth;
    }
    this.setState({
      frameWidth: frame.offsetWidth,
      slideCount: this.props.children.length,
      slideWidth: slideWidth
    }, function() {
      self.setLeft();
      self.setExternalData();
    });
  },

  setLeft() {
    this.setState({
      left: this.getTargetLeft()
    })
  },

  // Data

  setExternalData() {
    if (this.props.data) {
      this.props.data();
    }
  },

  // Styles

  getListStyles() {
    var listWidth = this.state.slideWidth * this.props.children.length;
    var spacingOffset = this.props.cellSpacing * this.props.children.length;
    return {
      position: 'relative',
      display: 'block',
      top: 0,
      left: this.getTweeningValue('left'),
      margin: "0px " + (this.props.cellSpacing / 2) * -1 + "px",
      padding: 0,
      width: listWidth + spacingOffset,
      cursor: this.state.dragging === true ? 'pointer' : 'inherit',
      transform: 'translate3d(0, 0, 0)',
      WebkitTransform: 'translate3d(0, 0, 0)',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box'
    }
  },

  getFrameStyles() {
    return {
      position: 'relative',
      display: 'block',
      overflow: 'hidden',
      margin: this.props.framePadding,
      padding: 0,
      transform: 'translate3d(0, 0, 0)',
      WebkitTransform: 'translate3d(0, 0, 0)',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box'
    }
  },

  getSlideStyles() {
    return {
      display: 'inline-block',
      listStyleType: 'none',
      verticalAlign: 'top',
      width: this.state.slideWidth,
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      marginLeft: this.props.cellSpacing / 2,
      marginRight: this.props.cellSpacing / 2
    }
  },

  getSliderStyles() {
    return {
      position: 'relative',
      display: 'block',
      width: this.props.width,
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box'
    }
  },

  getStyleTagStyles() {
    return '.slider-slide > img {width: 100%;}'
  },

  getDecoratorStyles(position) {
    switch (position) {
      case 'TopLeft': {
        return {
          position: 'absolute',
          top: 0,
          left: 0
        }
      }
      case 'TopCenter': {
        return {
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          WebkitTransform: 'translateX(-50%)'
        }
      }
      case 'TopRight': {
        return {
          position: 'absolute',
          top: 0,
          right: 0
        }
      }
      case 'CenterLeft': {
        return {
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          WebkitTransform: 'translateY(-50%)'
        }
      }
      case 'CenterCenter': {
        return {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          WebkitTransform: 'translate(-50%, -50%)'
        }
      }
      case 'CenterRight': {
        return {
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          WebkitTransform: 'translateY(-50%)'
        }
      }
      case 'BottomLeft': {
        return {
          position: 'absolute',
          bottom: 0,
          left: 0
        }
      }
      case 'BottomCenter': {
        return {
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          WebkitTransform: 'translateX(-50%)'
        }
      }
      case 'BottomRight': {
        return {
          position: 'absolute',
          bottom: 0,
          right: 0
        }
      }
      default: {
        return {
          position: 'absolute',
          top: 0,
          left: 0
        }
      }
    }
  }

});

Carousel.ControllerMixin = {
  getInitialState() {
    return {
      carousels: {}
    }
  },
  setCarouselData(carousel) {
    var data = this.state.carousels;
    data[carousel] = this.refs[carousel];
    this.setState({
      carousels: data
    });
  }
}

export default Carousel;
