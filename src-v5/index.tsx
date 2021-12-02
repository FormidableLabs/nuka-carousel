import React, { Component } from 'react';
import ExecutionEnvironment from 'exenv';
import Animate from 'react-move/Animate';
import * as easing from 'd3-ease';
import 'wicg-inert';
import { PagingDots, PreviousButton, NextButton } from './default-controls';
import Transitions from './all-transitions';
import AnnounceSlide, {
  defaultRenderAnnounceSlideMessage
} from './announce-slide';
import {
  addAccessibility,
  addEvent,
  removeEvent,
  getPropsByTransitionMode,
  swipeDirection,
  shouldUpdate,
  calcSomeInitialState
} from './utilities/utilities';
import {
  getAlignmentOffset,
  getImgTagStyles,
  getDecoratorStyles,
  getSliderStyles,
  getFrameStyles,
  getTransitionProps
} from './utilities/style-utilities';
import {
  getValidChildren,
  calculateSlideHeight
} from './utilities/bootstrapping-utilities';
import {
  Alignment,
  CarouselProps,
  CarouselState,
  ControlProps,
  HeightMode,
  KeyCodeConfig,
  Positions,
  RenderControlFunctionNames,
  ScrollMode,
  TransitionMode
} from './types';

export default class Carousel extends Component<CarouselProps, CarouselState> {
  displayName: string;

  static defaultProps = {
    afterSlide: () => {},
    autoGenerateStyleTag: true,
    autoplay: false,
    autoplayInterval: 3000,
    autoplayReverse: false,
    beforeSlide: () => {},
    cellAlign: Alignment.Left,
    cellSpacing: 0,
    defaultControlsConfig: {},
    disableAnimation: false,
    disableEdgeSwiping: false,
    dragging: true,
    easing: 'easeCircleOut',
    edgeEasing: 'easeElasticOut',
    enableKeyboardControls: false,
    frameOverflow: 'hidden',
    framePadding: '0px',
    getControlsContainerStyles: () => {},
    height: 'inherit',
    heightMode: HeightMode.Max,
    keyCodeConfig: {},
    onDragStart: () => {},
    onResize: () => {},
    pauseOnHover: true,
    renderAnnounceSlideMessage: defaultRenderAnnounceSlideMessage,
    renderBottomCenterControls: (props: ControlProps) => (
      <PagingDots {...props} />
    ),
    renderCenterLeftControls: (props: ControlProps) => (
      <PreviousButton {...props} />
    ),
    renderCenterRightControls: (props: ControlProps) => (
      <NextButton {...props} />
    ),
    scrollMode: ScrollMode.Remainder,
    slideIndex: 0,
    slideListMargin: 10,
    slideOffset: 25,
    slidesToScroll: 1,
    slidesToShow: 1,
    slideWidth: 1,
    speed: 500,
    style: {},
    swiping: true,
    transitionMode: TransitionMode.Scroll,
    vertical: false,
    width: '100%',
    withoutControls: false,
    wrapAround: false
  };

  constructor() {
    // TODO: Find a way of typing spreading args here
    // @ts-ignore
    super(...arguments);

    this.displayName = 'Carousel';
    this.clickDisabled = false;
    this.latestTransitioningIndex = null;
    this.timers = [];
    this.touchObject = {};
    this.controlsMap = [
      { funcName: 'renderTopLeftControls', key: Positions.TopLeft },
      { funcName: 'renderTopCenterControls', key: Positions.TopCenter },
      { funcName: 'renderTopRightControls', key: Positions.TopRight },
      { funcName: 'renderCenterLeftControls', key: Positions.CenterLeft },
      { funcName: 'renderCenterCenterControls', key: Positions.CenterCenter },
      { funcName: 'renderCenterRightControls', key: Positions.CenterRight },
      { funcName: 'renderBottomLeftControls', key: Positions.BottomLeft },
      { funcName: 'renderBottomCenterControls', key: Positions.BottomCenter },
      { funcName: 'renderBottomRightControls', key: Positions.BottomRight }
    ];
    this.keyCodeConfig = {
      nextSlide: [39, 68, 38, 87],
      previousSlide: [37, 65, 40, 83],
      firstSlide: [81],
      lastSlide: [69],
      pause: [32]
    };
    this.mounted = false;

    this.childNodesMutationObs = null;

    this.state = {
      currentSlide: this.props.slideIndex,
      dragging: false,
      easing: this.props.disableAnimation ? () => 0 : easing.easeCircleOut,
      hasInteraction: false, // to remove animation from the initial slide on the page load when non-default slideIndex is used
      isWrappingAround: false,
      left: 0,
      resetWrapAroundPosition: false,
      slideCount: getValidChildren(this.props.children).length,
      top: 0,
      wrapToIndex: null,
      hasFocus: false,
      ...calcSomeInitialState(this.props)
    };

    this.autoplayIterator = this.autoplayIterator.bind(this);
    this.calcSlideHeightAndWidth = this.calcSlideHeightAndWidth.bind(this);
    this.getChildNodes = this.getChildNodes.bind(this);
    this.getMouseEvents = this.getMouseEvents.bind(this);
    this.getOffsetDeltas = this.getOffsetDeltas.bind(this);
    this.getTargetLeft = this.getTargetLeft.bind(this);
    this.getTouchEvents = this.getTouchEvents.bind(this);
    this.blockEvent = this.blockEvent.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
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
    const keyCodeConfig = Object.assign(
      {},
      this.keyCodeConfig,
      this.props.keyCodeConfig
    );
    this.keyCodeMap = this.getKeyCodeMap(keyCodeConfig);
    this.getLockScrollEvents().lockTouchScroll();
    this.initializeCarouselHeight();
  }

  // eslint-disable-next-line complexity
  componentDidUpdate(prevProps: CarouselProps, prevState: CarouselState) {
    const slideChanged = prevState.currentSlide !== this.state.currentSlide;
    const heightModeChanged = prevProps.heightMode !== this.props.heightMode;
    const axisChanged = prevProps.vertical !== this.props.vertical;
    const childrenChanged = prevProps.children !== this.props.children;

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

    if (this.state.isWrappingAround) {
      this.isWrapped = true;
    }

    const prevSlideCount = getValidChildren(prevProps.children).length;
    const slideCount = getValidChildren(this.props.children).length;
    const slideCountChanged = prevSlideCount !== slideCount;

    if (slideCountChanged) {
      this.setState({
        slideCount,
        currentSlide: this.props.slideIndex
      });
    }

    const { slideHeight } = this.calcSlideHeightAndWidth();
    const heightMismatches = slideHeight !== prevState.slideHeight;

    if (this.mounted && heightMismatches) {
      this.setDimensions();
    } else {
      const updateDimensions =
        slideCountChanged ||
        shouldUpdate(prevProps, this.props, [
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
        this.setDimensions(this.props);
      }
    }
    if (childrenChanged) {
      this.initializeCarouselHeight();
    }

    if (slideCountChanged && slideCount <= this.state.currentSlide) {
      this.goToSlide(Math.max(slideCount - 1, 0), this.props);
    } else if (
      prevProps.slideIndex !== this.props.slideIndex &&
      this.props.slideIndex !== this.state.currentSlide &&
      !this.state.isWrappingAround
    ) {
      this.goToSlide(this.props.slideIndex, this.props);
    }

    if (prevProps.autoplay !== this.props.autoplay) {
      if (this.props.autoplay) {
        this.startAutoplay();
      } else {
        this.stopAutoplay();
      }
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
    this.getLockScrollEvents().unlockTouchScroll();
  }

  initializeCarouselHeight() {
    const initialDelay = 200;
    let timesChecked = 0;
    const initializeHeight = (delay: number) => {
      this.timers.push(
        setTimeout(() => {
          // If slideHeight is greater than zero and matches calculated slideHeight,
          // assume the app has been initialized.  If not,
          // keep trying to set dimensions until things work.
          const { slideHeight } = this.calcSlideHeightAndWidth();
          if (
            this.state.slideHeight > 0 &&
            this.state.slideHeight === slideHeight
          ) {
            return;
          }

          this.setDimensions();
          ++timesChecked;

          // Increase delay per attempt so the checks
          // slowly decrease if content is taking forever to load.
          //
          // If we've checked more than 10 times, it's probably never going
          // to load, so we stop checking. Otherwise, the page will freeze
          // after a long period:
          // See https://github.com/FormidableLabs/nuka-carousel/issues/798
          if (timesChecked < 10) {
            // Add exponential backoff to check more slowly
            initializeHeight(delay * 1.5);
          }
        }, delay)
      );
    };

    initializeHeight(initialDelay);
  }

  establishChildNodesMutationObserver() {
    const childNodes = this.getChildNodes();
    if (childNodes.length && 'MutationObserver' in window) {
      this.childNodesMutationObs = new MutationObserver(() => {
        this.setSlideHeightAndWidth();
      });

      const observeChildNodeMutation = (node) => {
        this.childNodesMutationObs.observe(node, {
          attributeFilter: ['style'],
          attributeOldValue: false,
          attributes: true,
          characterData: false,
          characterDataOldValue: false,
          childList: false,
          subtree: false
        });
      };

      const childNodesArray = Array.from(childNodes);

      for (const childNode of childNodesArray) {
        observeChildNodeMutation(childNode);
      }
    }
  }

  disconnectChildNodesMutationObserver() {
    if (this.childNodesMutationObs instanceof MutationObserver) {
      this.childNodesMutationObs.disconnect();
    }
  }

  blockEvent(e: TouchEvent) {
    if (
      this.state.dragging &&
      this.touchObject.startX !== undefined &&
      this.touchObject.startY !== undefined
    ) {
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
    }
  }

  getLockScrollEvents() {
    const lockTouchScroll = () => {
      document.addEventListener('touchmove', this.blockEvent, {
        passive: false
      });
    };

    const unlockTouchScroll = () => {
      document.removeEventListener('touchmove', this.blockEvent, {
        passive: false
      });
    };

    return {
      lockTouchScroll,
      unlockTouchScroll
    };
  }

  getTouchEvents() {
    if (this.props.swiping === false) {
      return {
        onTouchStart: this.handleMouseOver,
        onTouchEnd: this.handleMouseOut
      };
    }

    return {
      onTouchStart: (e: TouchEvent) => {
        // detect pinch zoom
        if (e.touches.length === 2) {
          this.handleMouseOver();
          return;
        }

        this.touchObject = {
          startX: e.touches[0].pageX,
          startY: e.touches[0].pageY
        };
        this.handleMouseOver();

        this.setState({
          dragging: true
        });
      },
      onTouchMove: (e: TouchEvent) => {
        if (e.touches.length === 2) {
          return;
        }

        const direction = swipeDirection(
          this.touchObject.startX,
          e.touches[0].pageX,
          this.touchObject.startY,
          e.touches[0].pageY,
          this.props.vertical
        );

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
      onTouchEnd: (e: TouchEvent) => {
        if (e.touches.length === 2) {
          this.handleMouseOut();
          return;
        }

        this.handleSwipe();
        this.handleMouseOut();
      },
      onTouchCancel: () => {
        this.handleSwipe();
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
      onMouseDown: (e) => {
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

      onMouseMove: (e: MouseEvent) => {
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

      onMouseUp: () => {
        if (
          this.touchObject.length === 0 ||
          this.touchObject.length === undefined
        ) {
          this.setState({ dragging: false });
          return;
        }

        this.handleSwipe();
      },

      onMouseLeave: () => {
        if (!this.state.dragging) {
          return;
        }

        this.handleSwipe();
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

  handleFocus() {
    this.setState({ hasFocus: true });
  }

  handleBlur() {
    this.setState({ hasFocus: false });
  }

  handleClick(event: React.MouseEvent) {
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

    const touchLength = this.touchObject.length || 0;
    // touchLength must be longer than 1/5 the slideWidth / slidesToShow
    // for swiping to be initiated
    if (touchLength > this.state.slideWidth / slidesToShow / 5) {
      if (this.touchObject.direction === 1) {
        if (
          this.state.currentSlide + 1 >= this.state.slideCount &&
          !this.props.wrapAround
        ) {
          // eslint-disable-next-line import/namespace
          this.setState({ easing: easing[this.props.edgeEasing] });
        } else {
          this.nextSlide();
        }
      } else if (this.touchObject.direction === -1) {
        if (this.state.currentSlide <= 0 && !this.props.wrapAround) {
          // eslint-disable-next-line import/namespace
          this.setState({ easing: easing[this.props.edgeEasing] });
        } else {
          this.previousSlide();
        }
      }
    } else if (touchLength > 0) {
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
  handleKeyPress(e: React.KeyboardEvent) {
    if (this.state.hasFocus && this.props.enableKeyboardControls) {
      const actionName = this.keyCodeMap[e.keyCode];
      switch (actionName) {
        case 'nextSlide':
          this.nextSlide();
          break;
        case 'previousSlide':
          this.previousSlide();
          break;
        case 'firstSlide':
          this.goToSlide(0, this.props);
          break;
        case 'lastSlide':
          this.goToSlide(this.state.slideCount - 1, this.props);
          break;
        case 'pause':
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

  getKeyCodeMap(keyCodeConfig: KeyCodeConfig) {
    const keyCodeMap = {};
    Object.keys(keyCodeConfig).forEach((actionName) => {
      keyCodeConfig[actionName].forEach(
        (keyCode) => (keyCodeMap[keyCode] = actionName)
      );
    });
    return keyCodeMap;
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

  getTargetLeft(touchOffset?: number | null, slide?: number): number {
    const target = slide || this.state.currentSlide;

    let offset = getAlignmentOffset(target, { ...this.props, ...this.state });
    let left = this.state.slideWidth * target;

    const lastSlide =
      this.state.currentSlide > 0 &&
      target + this.state.slidesToScroll >= this.state.slideCount;

    if (
      lastSlide &&
      !this.props.wrapAround &&
      this.props.scrollMode === 'remainder' &&
      this.state.frameWidth !== null
    ) {
      left =
        this.state.slideWidth * this.state.slideCount - this.state.frameWidth;
      offset = 0;
      offset -= this.props.cellSpacing * (this.state.slideCount - 1);
    }

    if (touchOffset && !isNaN(touchOffset)) {
      offset -= touchOffset;
    } else {
      offset -= 0;
    }

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
    const {
      currentSlide,
      slideCount,
      slideWidth,
      slideHeight,
      slidesToShow
    } = this.state;
    const { tx, ty } = this.getOffsetDeltas();
    const offset = getAlignmentOffset(currentSlide, {
      ...this.props,
      ...this.state
    });

    if (this.props.vertical) {
      const rowHeight = slideHeight / slidesToShow;
      const slidesLeftToShow = slideCount - slidesToShow;
      const lastSlideLimit = rowHeight * slidesLeftToShow;

      const offsetTy = ty[0] - offset;
      // returns true if ty offset is outside first or last slide
      return offsetTy > 0 || -offsetTy > lastSlideLimit;
    }

    const offsetTx = tx[0] - offset;
    // returns true if tx offset is outside first or last slide
    return offsetTx > 0 || -offsetTx > slideWidth * (slideCount - 1);
  }

  // Action Methods

  goToSlide(index: number, props?: CarouselProps): void {
    if (props === undefined) {
      props = this.props;
    }
    this.latestTransitioningIndex = index;

    // eslint-disable-next-line import/namespace
    this.setState({ hasInteraction: true, easing: easing[props.easing] });
    const previousSlide = this.state.currentSlide;

    if (index >= this.state.slideCount || index < 0) {
      if (!props.wrapAround) {
        return;
      }

      if (index >= this.state.slideCount) {
        props.beforeSlide(this.state.currentSlide, 0);
        this.setState(
          (prevState) => ({
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
                if (index === this.latestTransitioningIndex) {
                  this.resetAutoplay();
                  if (index !== previousSlide) {
                    this.props.afterSlide(0);
                  }
                }
              }, props.speed)
            );
          }
        );
        return;
      }
      const endSlide =
        index < 0
          ? this.state.slideCount + index
          : this.state.slideCount - this.state.slidesToScroll;
      props.beforeSlide(this.state.currentSlide, endSlide);
      this.setState(
        (prevState) => ({
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
              if (index === this.latestTransitioningIndex) {
                this.resetAutoplay();
                if (index !== previousSlide) {
                  this.props.afterSlide(this.state.slideCount - 1);
                }
              }
            }, props.speed)
          );
        }
      );
      return;
    }

    this.props.beforeSlide(this.state.currentSlide, index);

    this.setState(
      {
        currentSlide: index
      },
      () => {
        this.timers.push(
          setTimeout(() => {
            if (index === this.latestTransitioningIndex) {
              this.resetAutoplay();
              if (index !== previousSlide) {
                this.props.afterSlide(index);
              }
            }
          }, props.speed)
        );
      }
    );
  }

  nextSlide() {
    const { slidesToScroll, currentSlide, slideWidth, slideCount } = this.state;

    let targetSlideIndex = currentSlide + slidesToScroll;
    let slidesToShow = this.state.slidesToShow;

    if (this.props.slidesToScroll === 'auto') {
      const { length: swipeDistance } = this.touchObject;

      if (swipeDistance > 0) {
        targetSlideIndex =
          Math.round(swipeDistance / slideWidth) + currentSlide;
      } else {
        slidesToShow = slidesToScroll;
      }
    }

    if (
      currentSlide >= slideCount - slidesToShow &&
      !this.props.wrapAround &&
      this.props.cellAlign === 'left'
    ) {
      return;
    }

    if (this.props.wrapAround) {
      this.goToSlide(targetSlideIndex);
    } else {
      if (this.props.slideWidth !== 1) {
        this.goToSlide(targetSlideIndex);
        return;
      }

      const offset = targetSlideIndex;
      const leftAlignSlideIndex =
        this.props.scrollMode === 'page'
          ? offset
          : Math.min(offset, slideCount - Math.floor(slidesToShow));

      const nextSlideIndex =
        this.props.cellAlign !== 'left' ? offset : leftAlignSlideIndex;

      // If nextSlideIndex is larger than last index, then
      // just navigate to last index
      this.goToSlide(Math.min(nextSlideIndex, slideCount - 1));
    }
  }

  previousSlide() {
    const { slidesToScroll, slideWidth, currentSlide } = this.state;

    let targetSlideIndex = currentSlide - slidesToScroll;
    const { length: swipeDistance } = this.touchObject;

    if (this.props.slidesToScroll === 'auto' && swipeDistance > 0) {
      targetSlideIndex = currentSlide - Math.round(swipeDistance / slideWidth);
    }

    if (currentSlide <= 0 && !this.props.wrapAround) {
      return;
    }

    if (this.props.wrapAround) {
      this.goToSlide(targetSlideIndex);
    } else {
      this.goToSlide(Math.max(0, targetSlideIndex));
    }
  }

  // Bootstrapping

  bindEvents() {
    if (ExecutionEnvironment.canUseDOM) {
      addEvent(window, 'resize', this.onResize);
      addEvent(document, 'visibilitychange', this.onVisibilityChange);
      addEvent(document, 'keydown', this.handleKeyPress);
    }
  }

  onResize() {
    this.setDimensions(null, this.props.onResize);
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
      removeEvent(document, 'visibilitychange', this.onVisibilityChange);
      removeEvent(document, 'keydown', this.handleKeyPress);
    }
  }

  calcSlideHeightAndWidth(props?: CarouselProps) {
    // slide height
    props = props || this.props;
    const childNodes = this.getChildNodes();
    const slideHeight = calculateSlideHeight(props, this.state, childNodes);

    // slide width
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
    const { slideHeight, slideWidth } = this.calcSlideHeightAndWidth();

    if (
      slideHeight !== this.state.slideHeight ||
      slideWidth !== this.state.slideWidth ||
      this.isWrapped
    ) {
      this.isWrapped = false;
      this.setState({ slideHeight, slideWidth });
    }
  }

  // eslint-disable-next-line complexity
  setDimensions(props?: CarouselProps | null, stateCb = () => {}) {
    props = props || this.props;

    let {
      slidesToShow,
      // eslint-disable-next-line prefer-const
      cellAlign,
      // eslint-disable-next-line prefer-const
      scrollMode
    } = getPropsByTransitionMode(props, [
      'slidesToShow',
      'cellAlign',
      'scrollMode'
    ]);

    const frame = this.frame;
    const { slideHeight, slideWidth } = this.calcSlideHeightAndWidth(props);

    const frameHeight = slideHeight + props.cellSpacing * (slidesToShow - 1);
    const frameWidth = props.vertical ? frameHeight : frame.offsetWidth;

    let { slidesToScroll } = getPropsByTransitionMode(props, [
      'slidesToScroll'
    ]);

    if (slidesToScroll === 'auto' || scrollMode === 'page') {
      slidesToScroll = Math.floor(
        frameWidth / (slideWidth + props.cellSpacing)
      );
    }

    if (
      (props.slideWidth !== 1 || props.cellSpacing > 0) &&
      scrollMode === 'page' &&
      cellAlign === 'left'
    ) {
      slidesToShow = slidesToScroll;
    }
    this.setState(
      {
        frameWidth,
        slideHeight,
        slidesToScroll,
        slidesToShow,
        slideWidth,
        cellAlign
      },
      () => {
        stateCb();
      }
    );
  }

  getChildNodes() {
    return this.frame ? this.frame.children[0].children : [];
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
    }
    return this.controlsMap.map(({ funcName, key }) => {
      const func = this.props[funcName];
      const controlChildren =
        func &&
        typeof func === 'function' &&
        func({
          cellAlign: this.props.cellAlign,
          cellSpacing: this.props.cellSpacing,
          currentSlide: this.state.currentSlide,
          defaultControlsConfig: this.props.defaultControlsConfig,
          frameWidth: this.state.frameWidth,
          goToSlide: (index) => this.goToSlide(index),
          left: this.state.left,
          nextSlide: () => this.nextSlide(),
          previousSlide: () => this.previousSlide(),
          scrollMode: this.props.scrollMode,
          slideCount: this.state.slideCount,
          slidesToScroll: this.state.slidesToScroll,
          slidesToShow: this.state.slidesToShow,
          slideWidth: this.state.slideWidth,
          top: this.state.top,
          vertical: this.props.vertical,
          wrapAround: this.props.wrapAround
        });

      return (
        controlChildren && (
          <div
            key={key}
            className={[
              `slider-control-${key.toLowerCase()}`,
              this.props.defaultControlsConfig.containerClassName || ''
            ]
              .join(' ')
              .trim()}
            style={{
              ...getDecoratorStyles(key),
              ...this.props.getControlsContainerStyles(key)
            }}
          >
            {controlChildren}
          </div>
        )
      );
    });
  }

  autoplayID?: ReturnType<typeof setTimeout>;
  autoplayPaused?: boolean | null;
  childNodesMutationObs: MutationObserver | null;
  clickDisabled: boolean;
  controlsMap: { funcName: RenderControlFunctionNames; key: Positions }[];
  frame?: HTMLDivElement | null;
  isWrapped?: boolean;
  keyCodeConfig: KeyCodeConfig;
  keyCodeMap?: { [key: number]: keyof KeyCodeConfig };
  latestTransitioningIndex: number | null;
  mounted: boolean;
  timers: ReturnType<typeof setTimeout>[];
  touchObject: {
    startY?: number;
    startX?: number;
    endX?: number;
    endY?: number;
    length?: number;
    direction?: number;
  };

  render() {
    const { currentSlide, slideCount, frameWidth, hasInteraction } = this.state;
    const {
      disableAnimation,
      frameOverflow,
      framePadding,
      renderAnnounceSlideMessage,
      slidesToShow,
      vertical
    } = this.props;
    const duration =
      this.state.dragging ||
      (!this.state.dragging &&
        this.state.resetWrapAroundPosition &&
        this.props.wrapAround) ||
      disableAnimation ||
      !hasInteraction
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
    const {
      tx: [startTx],
      ty: [startTy]
    } = this.getOffsetDeltas();

    return (
      <section
        className={['slider', this.props.className || ''].join(' ').trim()}
        onFocus={this.handleFocus}
        aria-label="carousel-slider"
        role="region"
        onBlur={this.handleBlur}
        ref={this.props.innerRef}
        tabIndex={0}
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
          ref={(frame) => (this.frame = frame)}
          style={frameStyles}
          {...touchEvents}
          {...mouseEvents}
          onClickCapture={this.handleClick}
        >
          <Animate
            show
            start={{ tx: startTx, ty: startTy }}
            update={() => {
              const { tx, ty } = this.getOffsetDeltas();

              if (
                this.props.disableEdgeSwiping &&
                !this.props.wrapAround &&
                this.isEdgeSwiping()
              ) {
                return {};
              }
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
            }}
          >
            {({ tx, ty }) => (
              <TransitionControl
                {...getTransitionProps(this.props, this.state)}
                deltaX={tx}
                deltaY={ty}
              >
                {addAccessibility(validChildren, slidesToShow, currentSlide)}
              </TransitionControl>
            )}
          </Animate>
        </div>

        {this.renderControls()}

        {this.props.autoGenerateStyleTag && (
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: getImgTagStyles() }}
          />
        )}
      </section>
    );
  }
}

export { NextButton, PreviousButton, PagingDots };
