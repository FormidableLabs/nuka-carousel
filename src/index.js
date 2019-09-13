import React from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';
import Animate from 'react-move/Animate';
import * as easing from 'd3-ease';
import { PagingDots, PreviousButton, NextButton } from './default-controls';
import Transitions from './all-transitions';
import AnnounceSlide, {
  defaultRenderAnnounceSlideMessage
} from './announce-slide';
import {
  addEvent,
  removeEvent,
  getPropsByTransitionMode,
  swipeDirection,
  shouldUpdate,
  calcSomeInitialState
} from './utilities/utilities';
import {
  getImgTagStyles,
  getDecoratorStyles,
  getSliderStyles,
  getFrameStyles,
  getTransitionProps
} from './utilities/style-utilities';
import {
  addAccessibility,
  getValidChildren,
  getSlideHeight
} from './utilities/bootstrapping-utilities';

export default class Carousel extends React.Component {
  constructor() {
    super(...arguments);

    this.displayName = 'Carousel';
    this.clickDisabled = false;
    this.isTransitioning = false;
    this.timers = [];
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
    this.childNodesMutationObs = null;

    this.state = {
      currentSlide: this.props.slideIndex,
      dragging: false,
      easing: this.props.disableAnimation ? '' : easing.easeCircleOut,
      hasInteraction: false, // to remove animation from the initial slide on the page load when non-default slideIndex is used
      isWrappingAround: false,
      left: 0,
      resetWrapAroundPosition: false,
      slideCount: getValidChildren(this.props.children).length,
      top: 0,
      wrapToIndex: null,
      readyStateChanged: 0,
      ...calcSomeInitialState(this.props)
    };

    this.autoplayIterator = this.autoplayIterator.bind(this);
    this.calcSlideHeightAndWidth = this.calcSlideHeightAndWidth.bind(this);
    this.getChildNodes = this.getChildNodes.bind(this);
    this.getMouseEvents = this.getMouseEvents.bind(this);
    this.getOffsetDeltas = this.getOffsetDeltas.bind(this);
    this.getTargetLeft = this.getTargetLeft.bind(this);
    this.getTouchEvents = this.getTouchEvents.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.onReadyStateChange = this.onReadyStateChange.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
    this.renderControls = this.renderControls.bind(this);
    this.resetAutoplay = this.resetAutoplay.bind(this);
    this.setDimensions = this.setDimensions.bind(this);
    this.setLeft = this.setLeft.bind(this);
    this.setSlideHeightAndWidth = this.setSlideHeightAndWidth.bind(this);
    this.startAutoplay = this.startAutoplay.bind(this);
    this.stopAutoplay = this.stopAutoplay.bind(this);
    this.establishChildNodesMutationObserver = this.establishChildNodesMutationObserver.bind(
      this
    );
  }

  componentDidMount() {
    // see https://github.com/facebook/react/issues/3417#issuecomment-121649937
    this.mounted = true;
    this.setLeft();
    this.setDimensions();
    this.bindEvents();
    this.establishChildNodesMutationObserver();
    if (this.props.autoplay) {
      this.startAutoplay();
    }
  }

  // @TODO Remove deprecated componentWillReceiveProps with getDerivedStateFromProps
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    const slideCount = getValidChildren(nextProps.children).length;
    const slideCountChanged = slideCount !== this.state.slideCount;
    this.setState(prevState => ({
      slideCount,
      currentSlide: slideCountChanged
        ? nextProps.slideIndex
        : prevState.currentSlide
    }));

    if (slideCount <= this.state.currentSlide) {
      this.goToSlide(Math.max(slideCount - 1, 0), nextProps);
    }

    const updateDimensions =
      slideCountChanged ||
      shouldUpdate(this.props, nextProps, [
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

  componentDidUpdate(prevProps, prevState) {
    const slideChanged = prevState.currentSlide !== this.state.currentSlide;
    const heightModeChanged = prevProps.heightMode !== this.props.heightMode;
    const axisChanged = prevProps.vertical !== this.props.vertical;
    if (axisChanged) {
      this.onResize();
    } else if (slideChanged || heightModeChanged) {
      const image = this.getCurrentChildNodeImg();
      if (image) {
        image.addEventListener('load', this.setSlideHeightAndWidth);
        image.removeEventListener('load', this.setSlideHeightAndWidth);
      } else {
        this.setSlideHeightAndWidth();
      }
    }

    const { slideHeight } = this.calcSlideHeightAndWidth();
    const heightMismatches = slideHeight !== prevState.slideHeight;
    // When using dynamic content in a slide, it is possible for the slide height to be inaccurate. Here, double check that the height is correct once the component has mounted and the `readyStateChange` event has fired.
    // See #521 and https://github.com/FormidableLabs/nuka-carousel/blob/fea63242a8b2fb69c65689efe615d0feb9b2d1ff/README.md#resizing-height-issue
    if (this.mounted && prevState.readyStateChanged > 0 && heightMismatches) {
      this.setDimensions();
    }
  }

  componentWillUnmount() {
    this.unbindEvents();
    this.disconnectChildNodesMutationObserver();
    this.stopAutoplay();
    // see https://github.com/facebook/react/issues/3417#issuecomment-121649937
    this.mounted = false;
    for (let i = 0; i < this.timers.length; i++) {
      clearTimeout(this.timers[i]);
    }
  }

  establishChildNodesMutationObserver() {
    const childNodes = this.getChildNodes();
    if (childNodes.length && 'MutationObserver' in window) {
      this.childNodesMutationObs = new MutationObserver(mutations => {
        mutations.forEach(() => {
          this.setSlideHeightAndWidth();
        });
      });

      const observeChildNodeMutation = node => {
        this.childNodesMutationObs.observe(node, {
          attributes: true,
          attributeFilter: ['style'],
          attributeOldValue: false,
          characterData: false,
          characterDataOldValue: false,
          childList: false,
          subtree: false
        });
      };

      const childNodesArray = Array.from(childNodes);

      for (const node of childNodesArray) {
        observeChildNodeMutation(node);
      }
    }
  }

  disconnectChildNodesMutationObserver() {
    if (this.childNodesMutationObs instanceof MutationObserver) {
      this.childNodesMutationObs.disconnect();
    }
  }

  getTouchEvents() {
    if (this.props.swiping === false) {
      return {
        onTouchStart: this.handleMouseOver,
        onTouchEnd: this.handleMouseOut
      };
    }

    return {
      onTouchStart: e => {
        this.touchObject = {
          startX: e.touches[0].pageX,
          startY: e.touches[0].pageY
        };
        this.handleMouseOver();

        this.setState({
          dragging: true
        });
      },
      onTouchMove: e => {
        const direction = swipeDirection(
          this.touchObject.startX,
          e.touches[0].pageX,
          this.touchObject.startY,
          e.touches[0].pageY,
          this.props.vertical
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

        if (length >= 10) {
          if (this.clickDisabled === false) this.props.onDragStart(e);
          this.clickDisabled = true;
        }

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
      return {
        onMouseOver: this.handleMouseOver,

        onMouseOut: this.handleMouseOut
      };
    }

    return {
      onMouseOver: this.handleMouseOver,

      onMouseOut: this.handleMouseOut,

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

        const direction = swipeDirection(
          this.touchObject.startX,
          e.clientX,
          this.touchObject.startY,
          e.clientY,
          this.props.vertical
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

        // prevents disabling click just because mouse moves a fraction of a pixel
        if (length >= 10) {
          if (this.clickDisabled === false) this.props.onDragStart(e);
          this.clickDisabled = true;
        }

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
        if (
          this.touchObject.length === 0 ||
          this.touchObject.length === undefined
        ) {
          this.setState({ dragging: false });
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

  handleSwipe() {
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

    // wait for `handleClick` event before resetting clickDisabled
    this.timers.push(
      setTimeout(() => {
        this.clickDisabled = false;
      }, 0)
    );
    this.touchObject = {};

    this.setState({
      dragging: false
    });
  }
  // eslint-disable-next-line complexity
  handleKeyPress(e) {
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
            this.setState({ pauseOnHover: false });
            this.pauseAutoplay();
            break;
          } else {
            this.setState({ pauseOnHover: true });
            this.unpauseAutoplay();
            break;
          }
      }
    }
  }

  autoplayIterator() {
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
    } else if (
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

  // Animation Method

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

  isEdgeSwiping() {
    const { slideCount, slideWidth, slideHeight, slidesToShow } = this.state;
    const { tx, ty } = this.getOffsetDeltas();
    if (this.props.vertical) {
      const rowHeight = slideHeight / slidesToShow;
      const slidesLeftToShow = slideCount - slidesToShow;
      const lastSlideLimit = rowHeight * slidesLeftToShow;

      // returns true if ty offset is outside first or last slide
      return ty > 0 || -ty > lastSlideLimit;
    }

    // returns true if tx offset is outside first or last slide
    return tx > 0 || -tx > slideWidth * (slideCount - 1);
  }

  // Action Methods

  goToSlide(index, props) {
    if (props === undefined) {
      props = this.props;
    }

    if (this.isTransitioning) {
      return;
    }

    this.setState({ hasInteraction: true, easing: easing[props.easing] });
    this.isTransitioning = true;
    const previousSlide = this.state.currentSlide;

    if (index >= this.state.slideCount || index < 0) {
      if (!props.wrapAround) {
        this.isTransitioning = false;
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
            wrapToIndex: this.state.slideCount
          }),
          () => {
            this.timers.push(
              setTimeout(() => {
                this.resetAutoplay();
                this.isTransitioning = false;
                if (index !== previousSlide) {
                  this.props.afterSlide(0);
                }
              }, props.speed)
            );
          }
        );
        return;
      } else {
        const endSlide =
          index < 0
            ? this.state.slideCount + index
            : this.state.slideCount - this.state.slidesToScroll;
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
          () => {
            this.timers.push(
              setTimeout(() => {
                this.resetAutoplay();
                this.isTransitioning = false;
                if (index !== previousSlide) {
                  this.props.afterSlide(this.state.slideCount - 1);
                }
              }, props.speed)
            );
          }
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
        this.timers.push(
          setTimeout(() => {
            this.resetAutoplay();
            this.isTransitioning = false;
            if (index !== previousSlide) {
              this.props.afterSlide(index);
            }
          }, props.speed)
        )
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

  // Bootstrapping

  bindEvents() {
    if (ExecutionEnvironment.canUseDOM) {
      addEvent(window, 'resize', this.onResize);
      addEvent(document, 'readystatechange', this.onReadyStateChange);
      addEvent(document, 'visibilitychange', this.onVisibilityChange);
      addEvent(document, 'keydown', this.handleKeyPress);
    }
  }

  onResize() {
    this.setDimensions(null, this.props.onResize);
  }

  onReadyStateChange() {
    // When using dynamic content in a slide, it is possible that `readystatechange` will fire before the component has finished mounting, which means `this.state.slideHeight` remains 0, instead of the correct height. Tracking this in state will trigger `componentDidUpdate` which can set the correct height.
    // See #521 and https://github.com/FormidableLabs/nuka-carousel/blob/fea63242a8b2fb69c65689efe615d0feb9b2d1ff/README.md#resizing-height-issue
    this.setState({
      readyStateChanged: this.state.readyStateChanged + 1
    });
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
      removeEvent(document, 'keydown', this.handleKeyPress);
    }
  }

  calcSlideHeightAndWidth(props) {
    // slide height
    props = props || this.props;
    const childNodes = this.getChildNodes();
    const slideHeight = getSlideHeight(props, this.state, childNodes);

    //slide width
    const { slidesToShow } = getPropsByTransitionMode(props, ['slidesToShow']);
    const frame = this.frame;
    let slideWidth;

    if (this.props.animation === 'zoom') {
      slideWidth = frame.offsetWidth - (frame.offsetWidth * 15) / 100;
    } else if (typeof props.slideWidth !== 'number') {
      slideWidth = parseInt(props.slideWidth);
    } else if (props.vertical) {
      slideWidth = (slideHeight / slidesToShow) * props.slideWidth;
    } else {
      slideWidth = (frame.offsetWidth / slidesToShow) * props.slideWidth;
    }

    if (!props.vertical) {
      slideWidth -= props.cellSpacing * ((100 - 100 / slidesToShow) / 100);
    }

    return { slideHeight, slideWidth };
  }

  setSlideHeightAndWidth() {
    this.setState(this.calcSlideHeightAndWidth());
  }

  setDimensions(props, stateCb = () => {}) {
    props = props || this.props;

    const { slidesToShow, cellAlign } = getPropsByTransitionMode(props, [
      'slidesToShow',
      'cellAlign'
    ]);

    const frame = this.frame;
    const { slideHeight, slideWidth } = this.calcSlideHeightAndWidth(props);

    const frameHeight = slideHeight + props.cellSpacing * (slidesToShow - 1);
    const frameWidth = props.vertical ? frameHeight : frame.offsetWidth;

    let { slidesToScroll } = getPropsByTransitionMode(props, [
      'slidesToScroll'
    ]);

    if (slidesToScroll === 'auto') {
      slidesToScroll = Math.floor(
        frameWidth / (slideWidth + props.cellSpacing)
      );
    }

    this.setState(
      {
        frameWidth,
        slideHeight,
        slidesToScroll,
        slidesToShow,
        slideWidth,
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

  getChildNodes() {
    return this.frame.childNodes[0].childNodes;
  }

  getCurrentChildNodeImg() {
    const childNodes = this.getChildNodes();
    const currentChildNode = childNodes[this.props.slideIndex];
    return currentChildNode
      ? currentChildNode.getElementsByTagName('img')[0]
      : null;
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

  renderControls() {
    if (this.props.withoutControls) {
      return this.controlsMap.map(() => null);
    } else {
      return this.controlsMap.map(({ funcName, key }) => {
        const func = this.props[funcName];
        const controlChildren =
          func &&
          typeof func === 'function' &&
          func({
            cellAlign: this.props.cellAlign,
            cellSpacing: this.props.cellSpacing,
            currentSlide: this.state.currentSlide,
            frameWidth: this.state.frameWidth,
            goToSlide: index => this.goToSlide(index),
            nextSlide: () => this.nextSlide(),
            previousSlide: () => this.previousSlide(),
            slideCount: this.state.slideCount,
            slidesToScroll: this.state.slidesToScroll,
            slidesToShow: this.state.slidesToShow,
            slideWidth: this.state.slideWidth,
            wrapAround: this.props.wrapAround
          });

        return (
          controlChildren && (
            <div
              className={`slider-control-${key.toLowerCase()}`}
              style={getDecoratorStyles(key)}
              key={key}
            >
              {controlChildren}
            </div>
          )
        );
      });
    }
  }
  render() {
    const { currentSlide, slideCount, frameWidth } = this.state;
    const {
      frameOverflow,
      vertical,
      framePadding,
      slidesToShow,
      renderAnnounceSlideMessage,
      disableAnimation
    } = this.props;
    const duration =
      this.state.dragging ||
      (!this.state.dragging &&
        this.state.resetWrapAroundPosition &&
        this.props.wrapAround) ||
      disableAnimation ||
      !this.state.hasInteraction
        ? 0
        : this.props.speed;

    const frameStyles = getFrameStyles(
      frameOverflow,
      vertical,
      framePadding,
      frameWidth
    );
    const touchEvents = this.getTouchEvents();
    const mouseEvents = this.getMouseEvents();
    const TransitionControl = Transitions[this.props.transitionMode];
    const validChildren = getValidChildren(this.props.children);

    return (
      <div
        className={['slider', this.props.className || ''].join(' ')}
        style={Object.assign(
          {},
          getSliderStyles(this.props.width, this.props.height),
          this.props.style
        )}
      >
        {!this.props.autoplay && (
          <AnnounceSlide
            message={renderAnnounceSlideMessage({ currentSlide, slideCount })}
          />
        )}
        <div
          className="slider-frame"
          ref={frame => (this.frame = frame)}
          style={frameStyles}
          {...touchEvents}
          {...mouseEvents}
          onClickCapture={this.handleClick}
        >
          <Animate
            show
            start={{ tx: 0, ty: 0 }}
            update={() => {
              const { tx, ty } = this.getOffsetDeltas();

              if (
                this.props.disableEdgeSwiping &&
                !this.props.wrapAround &&
                this.isEdgeSwiping()
              ) {
                return {};
              } else {
                return {
                  tx,
                  ty,
                  timing: {
                    duration,
                    ease: this.state.easing
                  },
                  events: {
                    end: () => {
                      const newLeft = this.props.vertical
                        ? 0
                        : this.getTargetLeft();
                      const newTop = this.props.vertical
                        ? this.getTargetLeft()
                        : 0;

                      if (
                        newLeft !== this.state.left ||
                        newTop !== this.state.top
                      ) {
                        this.setState(
                          {
                            left: newLeft,
                            top: newTop,
                            isWrappingAround: false,
                            resetWrapAroundPosition: true
                          },
                          () => {
                            this.setState({
                              resetWrapAroundPosition: false
                            });
                          }
                        );
                      }
                    }
                  }
                };
              }
            }}
            children={({ tx, ty }) => (
              <TransitionControl
                {...getTransitionProps(this.props, this.state)}
                deltaX={tx}
                deltaY={ty}
              >
                {addAccessibility(validChildren, slidesToShow, currentSlide)}
              </TransitionControl>
            )}
          />
        </div>

        {this.renderControls()}

        {this.props.autoGenerateStyleTag && (
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: getImgTagStyles() }}
          />
        )}
      </div>
    );
  }
}

Carousel.propTypes = {
  afterSlide: PropTypes.func,
  animation: PropTypes.oneOf(['zoom']),
  autoGenerateStyleTag: PropTypes.bool,
  autoplay: PropTypes.bool,
  autoplayInterval: PropTypes.number,
  autoplayReverse: PropTypes.bool,
  beforeSlide: PropTypes.func,
  cellAlign: PropTypes.oneOf(['left', 'center', 'right']),
  cellSpacing: PropTypes.number,
  enableKeyboardControls: PropTypes.bool,
  disableAnimation: PropTypes.bool,
  disableEdgeSwiping: PropTypes.bool,
  dragging: PropTypes.bool,
  easing: PropTypes.string,
  edgeEasing: PropTypes.string,
  frameOverflow: PropTypes.string,
  framePadding: PropTypes.string,
  height: PropTypes.string,
  heightMode: PropTypes.oneOf(['first', 'current', 'max']),
  initialSlideHeight: PropTypes.number,
  initialSlideWidth: PropTypes.number,
  onDragStart: PropTypes.func,
  onResize: PropTypes.func,
  pauseOnHover: PropTypes.bool,
  renderAnnounceSlideMessage: PropTypes.func,
  renderBottomCenterControls: PropTypes.func,
  renderBottomLeftControls: PropTypes.func,
  renderBottomRightControls: PropTypes.func,
  renderCenterCenterControls: PropTypes.func,
  renderCenterLeftControls: PropTypes.func,
  renderCenterRightControls: PropTypes.func,
  renderTopCenterControls: PropTypes.func,
  renderTopLeftControls: PropTypes.func,
  renderTopRightControls: PropTypes.func,
  slideIndex: PropTypes.number,
  slideOffset: PropTypes.number,
  slidesToScroll: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['auto'])
  ]),
  slidesToShow: PropTypes.number,
  slideWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  speed: PropTypes.number,
  swiping: PropTypes.bool,
  transitionMode: PropTypes.oneOf(['scroll', 'fade', 'scroll3d']),
  vertical: PropTypes.bool,
  width: PropTypes.string,
  withoutControls: PropTypes.bool,
  wrapAround: PropTypes.bool,
  opacityScale: PropTypes.number,
  slideListMargin: PropTypes.number
};

Carousel.defaultProps = {
  afterSlide() {},
  autoGenerateStyleTag: true,
  autoplay: false,
  autoplayInterval: 3000,
  autoplayReverse: false,
  beforeSlide() {},
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
  height: 'inherit',
  heightMode: 'max',
  onDragStart() {},
  onResize() {},
  pauseOnHover: true,
  renderAnnounceSlideMessage: defaultRenderAnnounceSlideMessage,
  renderBottomCenterControls: props => <PagingDots {...props} />,
  renderCenterLeftControls: props => <PreviousButton {...props} />,
  renderCenterRightControls: props => <NextButton {...props} />,
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

export { NextButton, PreviousButton, PagingDots };
