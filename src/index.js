import React from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';
import Animate from 'react-move/Animate';
import * as easing from 'd3-ease';
import { PagingDots, PreviousButton, NextButton } from './default-controls';

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

const controlsMap = [
  { funcName: 'renderCustomLeftControls', key: 'CustomLeft' },
  { funcName: 'renderCustomRightControls', key: 'CustomRight' },
  { funcName: 'renderCustomBottomControls', key: 'CustomBottom' },
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

export default class Carousel extends React.Component {
  constructor() {
    super(...arguments);

    this.displayName = 'Carousel';
    this.clickSafe = true;
    this.touchObject = {};
    this.state = {
      currentSlide: this.props.slideIndex,
      dragging: false,
      frameWidth: 0,
      left: 0,
      slideCount: 0,
      slidesToScroll: this.props.slidesToScroll,
      slideWidth: 0,
      top: 0,
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
    this.setInitialDimensions = this.setInitialDimensions.bind(this);
    this.setDimensions = this.setDimensions.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.dimensionsChanged = this.dimensionsChanged.bind(this);
    this.setLeft = this.setLeft.bind(this);
    this.getListStyles = this.getListStyles.bind(this);
    this.getFrameStyles = this.getFrameStyles.bind(this);
    this.getSlideStyles = this.getSlideStyles.bind(this);
    this.getSlideTargetPosition = this.getSlideTargetPosition.bind(this);
    this.getSliderStyles = this.getSliderStyles.bind(this);
    this.getOffsetDeltas = this.getOffsetDeltas.bind(this);
    this.formatChildren = this.formatChildren.bind(this);
    this.getChildNodes = this.getChildNodes.bind(this);
    this.getSlideHeight = this.getSlideHeight.bind(this);
    this.getSlideWidth = this.getSlideWidth.bind(this);
    this.getFrameWidth = this.getFrameWidth.bind(this);
    this.findMaxHeightSlide = this.findMaxHeightSlide.bind(this);
    this.shouldRenderSlide = this.shouldRenderSlide.bind(this);
    this.renderControls = this.renderControls.bind(this);
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

  componentWillReceiveProps(nextProps) {
    const slideCount = nextProps.children.length;
    this.setState({ slideCount });
    if (slideCount <= this.state.currentSlide) {
      this.goToSlide(Math.max(slideCount - 1, 0));
    }
    this.setDimensions(nextProps);
    if (
      this.props.slideIndex !== nextProps.slideIndex &&
      nextProps.slideIndex !== this.state.currentSlide &&
      !this.state.isWrappingAround
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
  }

  // TODO check why is this needed
  componentDidUpdate() {
    this.updateDimensions()
  }

  componentWillUnmount() {
    this.unbindEvents();
    this.stopAutoplay();
    // see https://github.com/facebook/react/issues/3417#issuecomment-121649937
    this.mounted = false;
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

  handleMouseOver() {
    if (this.props.autoplay) {
      this.autoplayPaused = true;
      this.stopAutoplay();
    }
  }

  handleMouseOut() {
    if (this.props.autoplay && this.autoplayPaused) {
      this.startAutoplay();
      this.autoplayPaused = null;
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

    let slidesToShow = this.props.slidesToShow;
    if (this.props.slidesToScroll === 'auto') {
      slidesToShow = this.state.slidesToScroll;
    }

    if (this.touchObject.length > this.state.slideWidth / slidesToShow / 5) {
      if (this.touchObject.direction === 1) {
        if (
          this.state.currentSlide >= this.totalSlides() - slidesToShow &&
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

  goToSlide(index) {
    this.setState({ easing: easing[this.props.easing] });

    if ((index >= this.totalSlides() || index < 0)) {
      if (!this.props.wrapAround) {
        return;
      }
      if (index >= this.totalSlides()) {
        this.props.beforeSlide(this.state.currentSlide, 0);
        this.setState(
          prevState => ({
            left: this.props.vertical
              ? 0
              : this.getTargetLeft(
                  this.state.slideWidth,
                  prevState.currentSlide
                ),
            top: this.props.vertical
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
                  this.props.afterSlide(0);
                  this.resetAutoplay();
                }
              );
            }, this.props.speed)
        );
        return;
      } else {
        const endSlide =
          this.totalSlides() - this.state.slidesToScroll;
        this.props.beforeSlide(this.state.currentSlide, endSlide);
        this.setState(
          prevState => ({
            left: this.props.vertical
              ? 0
              : this.getTargetLeft(-1, prevState.currentSlide),
            top: this.props.vertical
              ? this.getTargetLeft(-1, prevState.currentSlide)
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
                  this.props.afterSlide(endSlide);
                  this.resetAutoplay();
                }
              );
            }, this.props.speed)
        );
        return;
      }
    }

    this.props.beforeSlide(this.state.currentSlide, index);

    if (index !== this.state.currentSlide) {
      this.props.afterSlide(index);
    }
    this.setState(
      {
      currentSlide: index
      },
      () => {
      this.resetAutoplay();
      }
    );
  }

  nextSlide() {
    const childrenCount = this.totalSlides();
    let slidesToShow = this.props.slidesToShow;
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
    switch (this.props.cellAlign) {
      case 'left':{
        offset = 0;
        offset -= this.props.cellSpacing * target;
        break;
      }
      case 'center':{
        offset = (this.state.frameWidth - this.state.slideWidth) / 2;
        offset -= this.props.cellSpacing * target;
        break;
      }
      case 'right':{
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
    }
  }

  onResize() {
    this.setDimensions();
  }

  onReadyStateChange() {
    this.setDimensions();
  }

  unbindEvents() {
    if (ExecutionEnvironment.canUseDOM) {
      removeEvent(window, 'resize', this.onResize);
      removeEvent(document, 'readystatechange', this.onReadyStateChange);
    }
  }

  shouldRenderSlide(index) {
    const { Placeholder, placeholderMode, preloadedChildrenLevel, wrapAround } = this.props

    if (!placeholderMode || !Placeholder) {
      return true
    }

    const currentSlide = this.state.currentSlide
    const totalPreloadedSlides = 2 * preloadedChildrenLevel + 1
    const totalSlides = this.totalSlides()

    if (wrapAround) {
      if (totalPreloadedSlides >= totalSlides) {
        // should render all slides
        return true
      }

      if (currentSlide + preloadedChildrenLevel > totalSlides - 1) {
        // if last index of preloaded children goes out of bounds, split the preloaded children set into 2 sets
        return (index >= 0 && index <= (currentSlide + preloadedChildrenLevel - totalSlides)) ||
          (index >= (currentSlide - preloadedChildrenLevel) && index <= totalSlides - 1)
      }

      if (currentSlide - preloadedChildrenLevel < 0) {
        // if first index of preloaded children goes out of bounds, split the preloaded children set into 2 sets
        return (index >= 0 && index <= currentSlide + preloadedChildrenLevel) ||
          (index >= (currentSlide - preloadedChildrenLevel + totalSlides) && index <= totalSlides - 1)
      }

      return (index >= currentSlide - preloadedChildrenLevel) &&
        (index <= currentSlide + preloadedChildrenLevel)
    } else {
      return index >= 0 &&
        index <= totalSlides - 1 &&
        index >= currentSlide - preloadedChildrenLevel &&
        index <= currentSlide + preloadedChildrenLevel
    }
  }

  formatChildren() {
    const { children, vertical, Slide, Placeholder } = this.props
    if (!children) {
      return null
    }

    const positionValue = vertical
      ? this.state.top
      : this.state.left;
    return children.map((slide, index) => {
      return (
        <li
          className="slider-slide"
          style={this.getSlideStyles(index, positionValue)}
          key={index}
        >
          {
            this.shouldRenderSlide(index)
              ? Slide && <Slide {...slide} />
              : <Placeholder {...slide} />
          }
        </li>
      );
    });
  }

  totalSlides = () => this.props.children ? this.props.children.length : 0

  setInitialDimensions() {
    const slideWidth = this.props.vertical
      ? this.props.initialSlideHeight || 0
      : this.props.initialSlideWidth || 0;
    const slideHeight = this.props.initialSlideHeight
      ? this.props.initialSlideHeight * this.props.slidesToShow
      : 0;

    const frameHeight =
      slideHeight + this.props.cellSpacing * (this.props.slidesToShow - 1);

    this.setState(
      {
        slideHeight,
        frameWidth: this.props.vertical ? frameHeight : '100%',
        slideCount: this.totalSlides(),
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
        ? firstSlide.offsetHeight * props.slidesToShow
        : firstSlide.offsetHeight;
    }
    if (heightMode === 'max') {
      return this.findMaxHeightSlide(childNodes);
    }
    if (heightMode === 'current') {
      return childNodes[this.state.currentSlide].offsetHeight;
    }

    return 100;
  }

  getSlideWidth(props, frame, slideHeight) {
    let slideWidth;

    if (typeof props.slideWidth !== 'number') {
      slideWidth = parseInt(props.slideWidth);
    } else if (props.vertical) {
      slideWidth = slideHeight / props.slidesToShow * props.slideWidth;
    } else {
      slideWidth = frame.offsetWidth / props.slidesToShow * props.slideWidth;
    }

    if (!props.vertical) {
      slideWidth -=
        props.cellSpacing * ((100 - 100 / props.slidesToShow) / 100);
    }

    return slideWidth;
  }

  getFrameWidth(props, frame, slideHeight) {
    const frameHeight =
      slideHeight + props.cellSpacing * (props.slidesToShow - 1);
    return props.vertical ? frameHeight : frame.offsetWidth;
  }

  setDimensions(props) {
    props = props || this.props;

    const frame = this.frame;
    const childNodes = this.getChildNodes();

    const slideHeight = this.getSlideHeight(props, childNodes);
    const slideWidth = this.getSlideWidth(props, frame, slideHeight);
    const frameWidth = this.getFrameWidth(props, frame, slideHeight);

    const slidesToScroll = props.slidesToScroll === 'auto'
      ? Math.floor(frameWidth / (slideWidth + props.cellSpacing))
      : props.slidesToScroll

    this.setState(
      {
        slideHeight,
        frameWidth,
        slideWidth,
        slidesToScroll,
        left: props.vertical ? 0 : this.getTargetLeft(),
        top: props.vertical ? this.getTargetLeft() : 0
      },
      () => {
        this.setLeft();
      }
    );
  }

  dimensionsChanged(newDimensions) {
    return newDimensions.slideHeight !== this.state.slideHeight ||
      newDimensions.frameWidth !== this.state.frameWidth ||
      newDimensions.slideWidth !== this.state.slideWidth
  }

  updateDimensions() {
    const frame = this.frame;
    const childNodes = this.getChildNodes();

    const slideHeight = this.getSlideHeight(this.props, childNodes);
    const slideWidth = this.getSlideWidth(this.props, frame, slideHeight);
    const frameWidth = this.getFrameWidth(this.props, frame, slideHeight);

    const newDimensions = {
      slideHeight,
      frameWidth,
      slideWidth
    };

    if (this.dimensionsChanged(newDimensions)) {
      this.setState(newDimensions);
    }
  }

  getChildNodes() {
    return this.frame.childNodes[0].childNodes;
  }

  setLeft() {
    this.setState({
      left: this.props.vertical ? 0 : this.getTargetLeft(),
      top: this.props.vertical ? this.getTargetLeft() : 0
    });
  }

  // Styles

  getListStyles(styles) {
    const { tx, ty } = styles;
    const listWidth = this.state.slideWidth * this.totalSlides();
    const spacingOffset = this.props.cellSpacing * this.totalSlides();
    const transform = `translate3d(${tx}px, ${ty}px, 0)`;
    return {
      transform,
      WebkitTransform: transform,
      msTransform: `translate(${tx}px, ${ty}px)`,
      position: 'relative',
      display: 'block',
      margin: this.props.vertical
        ? `${this.props.cellSpacing / 2 * -1}px 0px`
        : `0px ${this.props.cellSpacing / 2 * -1}px`,
      padding: 0,
      height: this.props.vertical
        ? listWidth + spacingOffset
        : this.state.slideHeight,
      width: this.props.vertical ? 'auto' : listWidth + spacingOffset,
      cursor: this.state.dragging === true ? 'pointer' : 'inherit',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box'
    };
  }

  getFrameStyles() {
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

  getSlideStyles(index, positionValue) {
    const targetPosition = this.getSlideTargetPosition(index, positionValue);
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

  getSlideTargetPosition(index, positionValue) {
    const fullSlideWidth = this.state.slideWidth + this.props.cellSpacing;
    const slidesToShow = this.state.frameWidth / this.state.slideWidth;
    const targetPosition = fullSlideWidth * index;
    const end = fullSlideWidth * slidesToShow * -1;

    if (
      this.props.wrapAround &&
      (this.state.isWrappingAround || this.state.dragging)
    ) {
      const slidesBefore = Math.ceil(positionValue / fullSlideWidth);
      if (this.state.slideCount - slidesBefore <= index) {
        return fullSlideWidth * (this.state.slideCount - index) * -1;
      }

      let slidesAfter = Math.ceil(
        (Math.abs(positionValue) - Math.abs(end)) / fullSlideWidth
      );

      if (this.state.slideWidth !== 1) {
        slidesAfter = Math.ceil(
          (Math.abs(positionValue) - fullSlideWidth) / fullSlideWidth
        );
      }

      if (index <= slidesAfter - 1) {
        return fullSlideWidth * (this.state.slideCount + index);
      }

      return targetPosition;
    }

    if (this.props.wrapAround && this.state.slideCount > 1) {
      if (index === 0) {
        if (this.state.currentSlide === this.state.slideCount - 1) { // last slide is active
          return (fullSlideWidth * (this.state.slideCount + index));
        }
      }

      if (index === this.state.slideCount - 1) {
        if (this.state.currentSlide === 0) { // first slide is active
          return fullSlideWidth * (this.state.slideCount - index) * -1;
        }
      }
    }

    return targetPosition;
  }

  getSliderStyles() {
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
      case 'CustomLeft':
      case 'CustomRight':
      case 'CustomBottom': {
        return null
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

  renderControls() {
    return controlsMap.map(
      ({ funcName, key }) => {
        const func = this.props[funcName]
        return func && typeof func === 'function' && (
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
              slidesToShow: this.props.slidesToShow,
              wrapAround: this.props.wrapAround,
              nextSlide: () => this.nextSlide(),
              previousSlide: () => this.previousSlide(),
              goToSlide: index => this.goToSlide(index)
            })}
          </div>
        )
      }
    );
  }

  render() {
    const children = this.formatChildren(this.props.children)
    const duration =
      this.state.dragging || this.state.resetWrapAroundPosition
        ? 0
        : this.props.speed;

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
            }
          })}
          children={({ tx, ty }) => (
            <div
              className="slider-frame"
              ref={frame => (this.frame = frame)}
              style={this.getFrameStyles()}
              {...this.getTouchEvents()}
              {...this.getMouseEvents()}
              onClick={this.handleClick}
            >
              <ul
                className="slider-list"
                style={this.getListStyles({ tx, ty })}
              >
                {children}
              </ul>
            </div>
          )}
        />

        {this.renderControls()}

        <style
          type="text/css"
          dangerouslySetInnerHTML={{__html: this.getStyleTagStyles()}}
        />
      </div>
    );
  }
}

Carousel.propTypes = {
  afterSlide: PropTypes.func,
  autoplay: PropTypes.bool,
  autoplayInterval: PropTypes.number,
  beforeSlide: PropTypes.func,
  cellAlign: PropTypes.oneOf(['left', 'center', 'right']),
  cellSpacing: PropTypes.number,
  dragging: PropTypes.bool,
  easing: PropTypes.string,
  edgeEasing: PropTypes.string,
  frameOverflow: PropTypes.string,
  framePadding: PropTypes.string,
  heightMode: PropTypes.oneOf(['first', 'current', 'max']),
  initialSlideHeight: PropTypes.number,
  initialSlideWidth: PropTypes.number,
  Placeholder: PropTypes.func,
  placeholderMode: PropTypes.bool,
  preloadedChildrenLevel: PropTypes.number,
  renderCustomLeftControls: PropTypes.func,
  renderCustomRightControls: PropTypes.func,
  renderCustomBottomControls: PropTypes.func,
  renderCustomBottomControls: PropTypes.func,
  renderTopLeftControls: PropTypes.func,
  renderTopCenterControls: PropTypes.func,
  renderTopRightControls: PropTypes.func,
  renderCenterLeftControls: PropTypes.func,
  renderCenterCenterControls: PropTypes.func,
  renderCenterRightControls: PropTypes.func,
  renderBottomLeftControls: PropTypes.func,
  renderBottomCenterControls: PropTypes.func,
  renderBottomRightControls: PropTypes.func,
  Slide: PropTypes.func.isRequired,
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
  beforeSlide() {},
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
