import React from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';
import Animate from 'react-move/Animate';
import * as easing from 'd3-ease';
import { PagingDots, PreviousButton, NextButton } from './default-controls';
import Transitions from './all-transitions';

const addEvent = function(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }
  if (elem.addEventListener) {
    elem.addEventListener(type, eventHandle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent(`on${type}`, eventHandle);
  } else {
    elem[`on${type}`] = eventHandle;
  }
};

const removeEvent = function(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }
  if (elem.removeEventListener) {
    elem.removeEventListener(type, eventHandle, false);
  } else if (elem.detachEvent) {
    elem.detachEvent(`on${type}`, eventHandle);
  } else {
    elem[`on${type}`] = null;
  }
};

export default class Carousel extends React.Component {
  constructor() {
    super(...arguments);

    this.displayName = 'Carousel';
    this.clickSafe = true;
    this.touchObject = {};
    this.controlsMap = [
      { funcName: 'renderTopLeftControls', key: 'TopLeft' },
      { funcName: 'renderTopCenterControls', key: 'TopCenter' },
      { funcName: 'renderTopRightControls', key: 'TopRight' },
      { funcName: 'renderCenterLeftControls', key: 'CenterLeft' },
      { funcName: 'renderCenterCenterControls', key: 'CenterCenter' },
      { funcName: 'renderCenterRightControls', key: 'CenterRight' },
      { funcName: 'renderBottomLeftControls', key: 'BottomLeft' },
      { funcName: 'renderBottomCenterControls', key: 'BottomCenter' },
      { funcName: 'renderBottomRightControls', key: 'BottomRight' }
    ];

    const {
      slidesToScroll,
      slidesToShow,
      cellAlign
    } = this.getPropsByTransitionMode(this.props, [
      'slidesToScroll',
      'slidesToShow',
      'cellAlign'
    ]);

    this.state = {
      currentSlide: this.props.slideIndex,
      dragging: false,
      frameWidth: 0,
      left: 0,
      slideCount: 0,
      slidesToScroll,
      slidesToShow,
      slideWidth: 0,
      top: 0,
      cellAlign,
      easing: easing.easeCircleOut,
      isWrappingAround: false,
      wrapToIndex: null,
      resetWrapAroundPosition: false
    };

    this.getTouchEvents = this.getTouchEvents.bind(this);
    this.getMouseEvents = this.getMouseEvents.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.swipeDirection = this.swipeDirection.bind(this);
    this.autoplayIterator = this.autoplayIterator.bind(this);
    this.startAutoplay = this.startAutoplay.bind(this);
    this.stopAutoplay = this.stopAutoplay.bind(this);
    this.resetAutoplay = this.resetAutoplay.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
    this.getTargetLeft = this.getTargetLeft.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onReadyStateChange = this.onReadyStateChange.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
    this.setInitialDimensions = this.setInitialDimensions.bind(this);
    this.setDimensions = this.setDimensions.bind(this);
    this.setLeft = this.setLeft.bind(this);
    this.getFrameStyles = this.getFrameStyles.bind(this);
    this.getSliderStyles = this.getSliderStyles.bind(this);
    this.getOffsetDeltas = this.getOffsetDeltas.bind(this);
    this.getChildNodes = this.getChildNodes.bind(this);
    this.getSlideHeight = this.getSlideHeight.bind(this);
    this.findMaxHeightSlide = this.findMaxHeightSlide.bind(this);
  }

  componentWillMount() {
    this.setInitialDimensions();
  }

  componentDidMount() {
    // see https://github.com/facebook/react/issues/3417#issuecomment-121649937
    this.mounted = true;
    this.setDimensions();
    this.bindEvents();
    if (this.props.autoplay) {
      this.startAutoplay();
    }
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextState.currentSlide !== this.state.currentSlide) {
      this.setDimensions();
    }
  }

  componentWillReceiveProps(nextProps) {
    const slideCount = this.getValidChildren(nextProps.children).length;
    const slideCountChanged = slideCount !== this.state.slideCount;
    this.setState({
      slideCount,
      currentSlide: slideCountChanged
        ? nextProps.slideIndex
        : this.state.currentSlide
    });

    if (slideCount <= this.state.currentSlide) {
      this.goToSlide(Math.max(slideCount - 1, 0), nextProps);
    }

    const updateDimensions =
      slideCountChanged ||
      ((curr, next, keys) => {
        let shouldUpdate = false;

        for (let i = 0; i < keys.length; i++) {
          if (curr[keys[i]] !== next[keys[i]]) {
            shouldUpdate = true;
            break;
          }
        }

        return shouldUpdate;
      })(this.props, nextProps, [
        'cellSpacing',
        'vertical',
        'slideWidth',
        'slideHeight',
        'heightMode',
        'slidesToScroll',
        'slidesToShow',
        'transitionMode',
        'cellAlign'
      ]);

    if (updateDimensions) {
      this.setDimensions(nextProps);
    }

    if (
      this.props.slideIndex !== nextProps.slideIndex &&
      nextProps.slideIndex !== this.state.currentSlide &&
      !this.state.isWrappingAround
    ) {
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

  componentWillUnmount() {
    this.unbindEvents();
    this.stopAutoplay();
    // see https://github.com/facebook/react/issues/3417#issuecomment-121649937
    this.mounted = false;
  }

  getPropsByTransitionMode(props, keys) {
    const updatedDefaults = {};
    if (props.transitionMode === 'fade') {
      keys.forEach(key => {
        switch (key) {
          case 'slidesToShow':
            updatedDefaults[key] = Math.max(parseInt(props.slidesToShow), 1);
            break;
          case 'slidesToScroll':
            updatedDefaults[key] = Math.max(parseInt(props.slidesToShow), 1);
            break;
          case 'cellAlign':
            updatedDefaults[key] = 'left';
            break;
          default:
            updatedDefaults[key] = props[key];
            break;
        }
      });
    } else {
      keys.forEach(key => {
        updatedDefaults[key] = props[key];
      });
    }

    return updatedDefaults;
  }

  getTouchEvents() {
    if (this.props.swiping === false) {
      return null;
    }

    return {
      onTouchStart: e => {
        this.touchObject = {
          startX: e.touches[0].pageX,
          startY: e.touches[0].pageY
        };
        this.handleMouseOver();
      },
      onTouchMove: e => {
        const direction = this.swipeDirection(
          this.touchObject.startX,
          e.touches[0].pageX,
          this.touchObject.startY,
          e.touches[0].pageY
        );

        if (direction !== 0) {
          e.preventDefault();
        }

        const length = this.props.vertical
          ? Math.round(
              Math.sqrt(
                Math.pow(e.touches[0].pageY - this.touchObject.startY, 2)
              )
            )
          : Math.round(
              Math.sqrt(
                Math.pow(e.touches[0].pageX - this.touchObject.startX, 2)
              )
            );

        this.touchObject = {
          startX: this.touchObject.startX,
          startY: this.touchObject.startY,
          endX: e.touches[0].pageX,
          endY: e.touches[0].pageY,
          length,
          direction
        };

        this.setState({
          left: this.props.vertical
            ? 0
            : this.getTargetLeft(
                this.touchObject.length * this.touchObject.direction
              ),
          top: this.props.vertical
            ? this.getTargetLeft(
                this.touchObject.length * this.touchObject.direction
              )
            : 0
        });
      },
      onTouchEnd: e => {
        this.handleSwipe(e);
        this.handleMouseOut();
      },
      onTouchCancel: e => {
        this.handleSwipe(e);
      }
    };
  }

  getMouseEvents() {
    if (this.props.dragging === false) {
      return null;
    }

    return {
      onMouseOver: () => this.handleMouseOver(),

      onMouseOut: () => this.handleMouseOut(),

      onMouseDown: e => {
        if (e.preventDefault) {
          e.preventDefault();
        }

        this.touchObject = {
          startX: e.clientX,
          startY: e.clientY
        };

        this.setState({
          dragging: true
        });
      },
      onMouseMove: e => {
        if (!this.state.dragging) {
          return;
        }

        const direction = this.swipeDirection(
          this.touchObject.startX,
          e.clientX,
          this.touchObject.startY,
          e.clientY
        );

        if (direction !== 0) {
          e.preventDefault();
        }

        const length = this.props.vertical
          ? Math.round(
              Math.sqrt(Math.pow(e.clientY - this.touchObject.startY, 2))
            )
          : Math.round(
              Math.sqrt(Math.pow(e.clientX - this.touchObject.startX, 2))
            );

        this.touchObject = {
          startX: this.touchObject.startX,
          startY: this.touchObject.startY,
          endX: e.clientX,
          endY: e.clientY,
          length,
          direction
        };

        this.setState({
          left: this.props.vertical
            ? 0
            : this.getTargetLeft(
                this.touchObject.length * this.touchObject.direction
              ),
          top: this.props.vertical
            ? this.getTargetLeft(
                this.touchObject.length * this.touchObject.direction
              )
            : 0
        });
      },
      onMouseUp: e => {
        if (!this.state.dragging) {
          return;
        }

        this.handleSwipe(e);
      },
      onMouseLeave: e => {
        if (!this.state.dragging) {
          return;
        }

        this.handleSwipe(e);
      }
    };
  }

  pauseAutoplay() {
    if (this.props.autoplay) {
      this.autoplayPaused = true;
      this.stopAutoplay();
    }
  }

  unpauseAutoplay() {
    if (this.props.autoplay && this.autoplayPaused) {
      this.startAutoplay();
      this.autoplayPaused = null;
    }
  }

  handleMouseOver() {
    if (this.props.pauseOnHover) {
      this.pauseAutoplay();
    }
  }

  handleMouseOut() {
    if (this.autoplayPaused) {
      this.unpauseAutoplay();
    }
  }

  handleClick(event) {
    if (this.clickSafe === true) {
      event.preventDefault();
      event.stopPropagation();

      if (event.nativeEvent) {
        event.nativeEvent.stopPropagation();
      }
    }
  }

  handleSwipe() {
    if (
      typeof this.touchObject.length !== 'undefined' &&
      this.touchObject.length > 44
    ) {
      this.clickSafe = true;
    } else {
      this.clickSafe = false;
    }

    let slidesToShow = this.state.slidesToShow;
    if (this.props.slidesToScroll === 'auto') {
      slidesToShow = this.state.slidesToScroll;
    }

    if (this.touchObject.length > this.state.slideWidth / slidesToShow / 5) {
      if (this.touchObject.direction === 1) {
        if (
          this.state.currentSlide >= this.state.slideCount - slidesToShow &&
          !this.props.wrapAround
        ) {
          this.setState({ easing: easing[this.props.edgeEasing] });
        } else {
          this.nextSlide();
        }
      } else if (this.touchObject.direction === -1) {
        if (this.state.currentSlide <= 0 && !this.props.wrapAround) {
          this.setState({ easing: easing[this.props.edgeEasing] });
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

  swipeDirection(x1, x2, y1, y2) {
    const xDist = x1 - x2;
    const yDist = y1 - y2;
    const r = Math.atan2(yDist, xDist);
    let swipeAngle = Math.round(r * 180 / Math.PI);

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

  autoplayIterator() {
    if (this.props.wrapAround) {
      this.nextSlide();
      return;
    }
    if (
      this.state.currentSlide !==
      this.state.slideCount - this.state.slidesToShow
    ) {
      this.nextSlide();
    } else {
      this.stopAutoplay();
    }
  }

  startAutoplay() {
    this.autoplayID = setInterval(
      this.autoplayIterator,
      this.props.autoplayInterval
    );
  }

  resetAutoplay() {
    if (this.props.autoplay && !this.autoplayPaused) {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }

  stopAutoplay() {
    if (this.autoplayID) {
      clearInterval(this.autoplayID);
    }
  }

  // Action Methods

  goToSlide(index, props) {
    if (props === undefined) {
      props = this.props;
    }

    this.setState({ easing: easing[props.easing] });

    if (index >= this.state.slideCount || index < 0) {
      if (!props.wrapAround) {
        return;
      }
      if (index >= this.state.slideCount) {
        props.beforeSlide(this.state.currentSlide, 0);
        this.setState(
          prevState => ({
            left: props.vertical
              ? 0
              : this.getTargetLeft(
                  this.state.slideWidth,
                  prevState.currentSlide
                ),
            top: props.vertical
              ? this.getTargetLeft(
                  this.state.slideWidth,
                  prevState.currentSlide
                )
              : 0,
            currentSlide: 0,
            isWrappingAround: true,
            wrapToIndex: index
          }),
          () =>
            setTimeout(() => {
              this.setState(
                { isWrappingAround: false, resetWrapAroundPosition: true },
                () => {
                  this.setState({ resetWrapAroundPosition: false });
                  props.afterSlide(0);
                  this.resetAutoplay();
                }
              );
            }, props.speed)
        );
        return;
      } else {
        const endSlide = this.state.slideCount - this.state.slidesToScroll;
        props.beforeSlide(this.state.currentSlide, endSlide);
        this.setState(
          prevState => ({
            left: props.vertical
              ? 0
              : this.getTargetLeft(0, prevState.currentSlide),
            top: props.vertical
              ? this.getTargetLeft(0, prevState.currentSlide)
              : 0,
            currentSlide: endSlide,
            isWrappingAround: true,
            wrapToIndex: index
          }),
          () =>
            setTimeout(() => {
              this.setState(
                { isWrappingAround: false, resetWrapAroundPosition: true },
                () => {
                  this.setState({ resetWrapAroundPosition: false });
                  props.afterSlide(endSlide);
                  this.resetAutoplay();
                }
              );
            }, props.speed)
        );
        return;
      }
    }

    this.props.beforeSlide(this.state.currentSlide, index);

    this.setState(
      {
        currentSlide: index
      },
      () =>
        setTimeout(() => {
          this.resetAutoplay();
          if (index !== this.state.currentSlide) {
            this.props.afterSlide(index);
          }
        }, props.speed)
    );
  }

  nextSlide() {
    const childrenCount = this.state.slideCount;
    let slidesToShow = this.state.slidesToShow;

    if (this.props.slidesToScroll === 'auto') {
      slidesToShow = this.state.slidesToScroll;
    }

    if (
      this.state.currentSlide >= childrenCount - slidesToShow &&
      !this.props.wrapAround &&
      this.props.cellAlign === 'left'
    ) {
      return;
    }

    if (this.props.wrapAround) {
      this.goToSlide(this.state.currentSlide + this.state.slidesToScroll);
    } else {
      if (this.props.slideWidth !== 1) {
        this.goToSlide(this.state.currentSlide + this.state.slidesToScroll);
        return;
      }
      const offset = this.state.currentSlide + this.state.slidesToScroll;
      const nextSlideIndex =
        this.props.cellAlign !== 'left'
          ? offset
          : Math.min(offset, childrenCount - slidesToShow);
      this.goToSlide(nextSlideIndex);
    }
  }

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
  }

  // Animation

  getTargetLeft(touchOffset, slide) {
    let offset;
    const target = slide || this.state.currentSlide;
    switch (this.state.cellAlign) {
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

    let left = this.state.slideWidth * target;

    const lastSlide =
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
  }

  // Bootstrapping

  bindEvents() {
    if (ExecutionEnvironment.canUseDOM) {
      addEvent(window, 'resize', this.onResize);
      addEvent(document, 'readystatechange', this.onReadyStateChange);
      addEvent(document, 'visibilitychange', this.onVisibilityChange);
    }
  }

  onResize() {
    this.setDimensions(null, this.props.onResize);
  }

  onReadyStateChange() {
    this.setDimensions();
  }

  onVisibilityChange() {
    if (document.hidden) {
      this.pauseAutoplay();
    } else {
      this.unpauseAutoplay();
    }
  }

  unbindEvents() {
    if (ExecutionEnvironment.canUseDOM) {
      removeEvent(window, 'resize', this.onResize);
      removeEvent(document, 'readystatechange', this.onReadyStateChange);
      removeEvent(document, 'visibilitychange', this.onVisibilityChange);
    }
  }

  setInitialDimensions() {
    const slideWidth = this.props.vertical
      ? this.props.initialSlideHeight || 0
      : this.props.initialSlideWidth || 0;
    const slideHeight = this.props.vertical
      ? (this.props.initialSlideHeight || 0) * this.state.slidesToShow
      : this.props.initialSlideHeight || 0;

    const frameHeight =
      slideHeight + this.props.cellSpacing * (this.state.slidesToShow - 1);

    this.setState(
      {
        slideHeight,
        frameWidth: this.props.vertical ? frameHeight : '100%',
        slideCount: this.getValidChildren(this.props.children).length,
        slideWidth
      },
      () => {
        this.setLeft();
      }
    );
  }

  findMaxHeightSlide(slides) {
    let maxHeight = 0;
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].offsetHeight > maxHeight) {
        maxHeight = slides[i].offsetHeight;
      }
    }
    return maxHeight;
  }

  getSlideHeight(props, childNodes = []) {
    const { heightMode, vertical } = props;
    const firstSlide = childNodes[0];
    if (firstSlide && heightMode === 'first') {
      return vertical
        ? firstSlide.offsetHeight * this.state.slidesToShow
        : firstSlide.offsetHeight;
    }
    if (heightMode === 'max') {
      return this.findMaxHeightSlide(childNodes);
    }
    if (props.heightMode === 'current') {
      return childNodes[this.state.currentSlide].offsetHeight;
    }

    return 100;
  }

  setDimensions(props, stateCb = () => {}) {
    props = props || this.props;

    const { slidesToShow, cellAlign } = this.getPropsByTransitionMode(props, [
      'slidesToShow',
      'cellAlign'
    ]);

    const frame = this.frame;
    const childNodes = this.getChildNodes();
    const slideHeight = this.getSlideHeight(props, childNodes);

    let slideWidth;

    if (typeof props.slideWidth !== 'number') {
      slideWidth = parseInt(props.slideWidth);
    } else if (props.vertical) {
      slideWidth = slideHeight / slidesToShow * props.slideWidth;
    } else {
      slideWidth = frame.offsetWidth / slidesToShow * props.slideWidth;
    }

    if (!props.vertical) {
      slideWidth -= props.cellSpacing * ((100 - 100 / slidesToShow) / 100);
    }

    const frameHeight = slideHeight + props.cellSpacing * (slidesToShow - 1);
    const frameWidth = props.vertical ? frameHeight : frame.offsetWidth;

    let { slidesToScroll } = this.getPropsByTransitionMode(props, [
      'slidesToScroll'
    ]);

    if (slidesToScroll === 'auto') {
      slidesToScroll = Math.floor(
        frameWidth / (slideWidth + props.cellSpacing)
      );
    }

    this.setState(
      {
        slideHeight,
        frameWidth,
        slideWidth,
        slidesToScroll,
        slidesToShow,
        cellAlign,
        left: props.vertical ? 0 : this.getTargetLeft(),
        top: props.vertical ? this.getTargetLeft() : 0
      },
      () => {
        stateCb();
        this.setLeft();
      }
    );
  }

  getValidChildren(children) {
    // .toArray automatically removes invalid React children
    return React.Children.toArray(children);
  }

  getChildNodes() {
    return this.frame.childNodes[0].childNodes;
  }

  setLeft() {
    const newLeft = this.props.vertical ? 0 : this.getTargetLeft();
    const newTop = this.props.vertical ? this.getTargetLeft() : 0;

    if (newLeft !== this.state.left || newTop !== this.state.top) {
      this.setState({
        left: newLeft,
        top: newTop
      });
    }
  }

  // Styles
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
      touchAction: `pinch-zoom ${this.props.vertical ? 'pan-x' : 'pan-y'}`
    };
  }

  getSliderStyles() {
    return {
      position: 'relative',
      display: 'block',
      width: this.props.width,
      height: 'auto',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      visibility: this.state.slideWidth ? 'inherit' : 'hidden'
    };
  }

  getStyleTagStyles() {
    return '.slider-slide > img {width: 100%; display: block;}';
  }

  getDecoratorStyles(position) {
    switch (position) {
      case 'TopLeft': {
        return {
          position: 'absolute',
          top: 0,
          left: 0
        };
      }
      case 'TopCenter': {
        return {
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          WebkitTransform: 'translateX(-50%)',
          msTransform: 'translateX(-50%)'
        };
      }
      case 'TopRight': {
        return {
          position: 'absolute',
          top: 0,
          right: 0
        };
      }
      case 'CenterLeft': {
        return {
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          WebkitTransform: 'translateY(-50%)',
          msTransform: 'translateY(-50%)'
        };
      }
      case 'CenterCenter': {
        return {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          WebkitTransform: 'translate(-50%, -50%)',
          msTransform: 'translate(-50%, -50%)'
        };
      }
      case 'CenterRight': {
        return {
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          WebkitTransform: 'translateY(-50%)',
          msTransform: 'translateY(-50%)'
        };
      }
      case 'BottomLeft': {
        return {
          position: 'absolute',
          bottom: 0,
          left: 0
        };
      }
      case 'BottomCenter': {
        return {
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          WebkitTransform: 'translateX(-50%)',
          msTransform: 'translateX(-50%)'
        };
      }
      case 'BottomRight': {
        return {
          position: 'absolute',
          bottom: 0,
          right: 0
        };
      }
      default: {
        return {
          position: 'absolute',
          top: 0,
          left: 0
        };
      }
    }
  }

  getOffsetDeltas() {
    let offset = 0;

    if (this.state.isWrappingAround) {
      offset = this.getTargetLeft(null, this.state.wrapToIndex);
    } else {
      offset = this.getTargetLeft(
        this.touchObject.length * this.touchObject.direction
      );
    }

    return {
      tx: [this.props.vertical ? 0 : offset],
      ty: [this.props.vertical ? offset : 0]
    };
  }

  getTransitionProps() {
    return {
      slideWidth: this.state.slideWidth,
      slideHeight: this.state.slideHeight,
      slideCount: this.state.slideCount,
      currentSlide: this.state.currentSlide,
      isWrappingAround: this.state.isWrappingAround,
      top: this.state.top,
      left: this.state.left,
      cellSpacing: this.props.cellSpacing,
      vertical: this.props.vertical,
      dragging: this.props.dragging,
      wrapAround: this.props.wrapAround,
      slidesToShow: this.state.slidesToShow
    };
  }

  renderControls() {
    return this.controlsMap.map(({ funcName, key }) => {
      const func = this.props[funcName];
      return (
        func &&
        typeof func === 'function' && (
          <div
            className={`slider-control-${key.toLowerCase()}`}
            style={this.getDecoratorStyles(key)}
            key={key}
          >
            {func({
              currentSlide: this.state.currentSlide,
              slideCount: this.state.slideCount,
              frameWidth: this.state.frameWidth,
              slideWidth: this.state.slideWidth,
              slidesToScroll: this.state.slidesToScroll,
              cellSpacing: this.props.cellSpacing,
              slidesToShow: this.state.slidesToShow,
              wrapAround: this.props.wrapAround,
              nextSlide: () => this.nextSlide(),
              previousSlide: () => this.previousSlide(),
              goToSlide: index => this.goToSlide(index)
            })}
          </div>
        )
      );
    });
  }

  render() {
    const duration =
      this.state.dragging || this.state.resetWrapAroundPosition
        ? 0
        : this.props.speed;

    const frameStyles = this.getFrameStyles();
    const touchEvents = this.getTouchEvents();
    const mouseEvents = this.getMouseEvents();
    const TransitionControl = Transitions[this.props.transitionMode];
    const validChildren = this.getValidChildren(this.props.children);

    return (
      <div
        className={['slider', this.props.className || ''].join(' ')}
        style={Object.assign({}, this.getSliderStyles(), this.props.style)}
      >
        <Animate
          show
          start={{ tx: 0, ty: 0 }}
          update={Object.assign({}, this.getOffsetDeltas(), {
            timing: {
              duration,
              ease: this.state.easing
            },
            events: { end: this.setLeft }
          })}
          children={({ tx, ty }) => (
            <div
              className="slider-frame"
              ref={frame => (this.frame = frame)}
              style={frameStyles}
              {...touchEvents}
              {...mouseEvents}
              onClickCapture={this.handleClick}
            >
              <TransitionControl
                {...this.getTransitionProps()}
                deltaX={tx}
                deltaY={ty}
              >
                {validChildren}
              </TransitionControl>
            </div>
          )}
        />

        {this.renderControls()}

        {this.props.autoGenerateStyleTag && (
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: this.getStyleTagStyles() }}
          />
        )}
      </div>
    );
  }
}

Carousel.propTypes = {
  afterSlide: PropTypes.func,
  autoplay: PropTypes.bool,
  autoplayInterval: PropTypes.number,
  autoGenerateStyleTag: PropTypes.bool,
  beforeSlide: PropTypes.func,
  cellAlign: PropTypes.oneOf(['left', 'center', 'right']),
  cellSpacing: PropTypes.number,
  dragging: PropTypes.bool,
  easing: PropTypes.string,
  edgeEasing: PropTypes.string,
  frameOverflow: PropTypes.string,
  framePadding: PropTypes.string,
  heightMode: PropTypes.oneOf(['first', 'current', 'max']),
  transitionMode: PropTypes.oneOf(['scroll', 'fade']),
  initialSlideHeight: PropTypes.number,
  initialSlideWidth: PropTypes.number,
  onResize: PropTypes.func,
  pauseOnHover: PropTypes.bool,
  renderTopLeftControls: PropTypes.func,
  renderTopCenterControls: PropTypes.func,
  renderTopRightControls: PropTypes.func,
  renderCenterLeftControls: PropTypes.func,
  renderCenterCenterControls: PropTypes.func,
  renderCenterRightControls: PropTypes.func,
  renderBottomLeftControls: PropTypes.func,
  renderBottomCenterControls: PropTypes.func,
  renderBottomRightControls: PropTypes.func,
  slideIndex: PropTypes.number,
  slidesToScroll: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['auto'])
  ]),
  slidesToShow: PropTypes.number,
  slideWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  speed: PropTypes.number,
  swiping: PropTypes.bool,
  vertical: PropTypes.bool,
  width: PropTypes.string,
  wrapAround: PropTypes.bool
};

Carousel.defaultProps = {
  afterSlide() {},
  autoplay: false,
  autoplayInterval: 3000,
  autoGenerateStyleTag: true,
  beforeSlide() {},
  cellAlign: 'left',
  cellSpacing: 0,
  dragging: true,
  easing: 'easeCircleOut',
  edgeEasing: 'easeElasticOut',
  framePadding: '0px',
  frameOverflow: 'hidden',
  heightMode: 'max',
  transitionMode: 'scroll',
  onResize() {},
  slideIndex: 0,
  slidesToScroll: 1,
  slidesToShow: 1,
  style: {},
  pauseOnHover: true,
  renderCenterLeftControls: props => <PreviousButton {...props} />,
  renderCenterRightControls: props => <NextButton {...props} />,
  renderBottomCenterControls: props => <PagingDots {...props} />,
  slideWidth: 1,
  speed: 500,
  swiping: true,
  vertical: false,
  width: '100%',
  wrapAround: false
};

export { NextButton, PreviousButton, PagingDots };
