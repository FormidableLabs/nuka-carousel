import React from 'react'
import { connect, easingTypes } from 'react-tween-state'
import PropTypes from 'prop-types'
import assign from 'object-assign'
import ExecutionEnvironment from 'exenv'

const addEvent = function (elem, type, eventHandle) {
  if (elem === null || typeof (elem) === 'undefined') {
    return
  }
  if (elem.addEventListener) {
    elem.addEventListener(type, eventHandle, false)
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + type, eventHandle)
  } else {
    elem['on' + type] = eventHandle
  }
}

const removeEvent = function (elem, type, eventHandle) {
  if (elem === null || typeof (elem) === 'undefined') {
    return
  }
  if (elem.removeEventListener) {
    elem.removeEventListener(type, eventHandle, false)
  } else if (elem.detachEvent) {
    elem.detachEvent('on' + type, eventHandle)
  } else {
    elem['on' + type] = null
  }
}

class Carousel extends React.Component {
  constructor (props) {
    super(props)
    this.clickSafe = true
    this.state = {
      currentSlide: this.props.slideIndex || 0,
      dragging: false,
      frameWidth: 0,
      left: 0,
      slideCount: 0,
      slidesToScroll: this.props.slidesToScroll,
      slideWidth: 0,
      top: 0
    }
  }

  componentWillMount () {
    this.setInitialDimensions()
  }

  componentDidMount () {
    this.setDimensions()
    this.bindEvents()
    this.setExternalData()
    if (this.props.autoplay) {
      this.startAutoplay()
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      slideCount: nextProps.children.length
    })
    this.setDimensions(nextProps)
    if (this.props.slideIndex !== nextProps.slideIndex && nextProps.slideIndex !== this.state.currentSlide) {
      this.goToSlide(nextProps.slideIndex)
    }
    if (this.props.autoplay !== nextProps.autoplay) {
      if (nextProps.autoplay) {
        this.startAutoplay()
      } else {
        this.stopAutoplay()
      }
    }
  }

  componentWillUnmount () {
    this.unbindEvents()
    this.stopAutoplay()
  }

  render () {
    const children = this.formatChildren(this.props.children)
    return (
      <div className={['slider', this.props.className || ''].join(' ')} ref='slider' style={assign(this.getSliderStyles(), this.props.style || {})}>
        <div className='slider-frame' ref='frame' style={this.getFrameStyles()} {...this.getTouchEvents()} {...this.getMouseEvents()} onClick={this.handleClick}>
          <ul className='slider-list' ref='list' style={this.getListStyles()}>
            {children}
          </ul>
        </div>
        {this.props.decorators
          ? this.props.decorators.map((Decorator, index) => {
            return (
              <div
                style={assign(this.getDecoratorStyles(Decorator.position), Decorator.style || {})}
                className={'slider-decorator-' + index}
                key={index}>
                <Decorator.component
                  currentSlide={this.state.currentSlide}
                  slideCount={this.state.slideCount}
                  frameWidth={this.state.frameWidth}
                  slideWidth={this.state.slideWidth}
                  slidesToScroll={this.state.slidesToScroll}
                  cellSpacing={this.props.cellSpacing}
                  slidesToShow={this.props.slidesToShow}
                  wrapAround={this.props.wrapAround}
                  nextSlide={this.nextSlide}
                  previousSlide={this.previousSlide}
                  goToSlide={this.goToSlide} />
              </div>
            )
          })
          : null}
        <style type='text/css' dangerouslySetInnerHTML={{__html: this.getStyleTagStyles()}} />
      </div>
    )
  }

  getTouchEvents = () => {
    if (this.props.swiping === false) {
      return null
    }

    return {
      onTouchStart: (e) => {
        this.touchObject = {
          startX: e.touches[0].pageX,
          startY: e.touches[0].pageY
        }
        this.handleMouseOver()
      },
      onTouchMove: (e) => {
        const direction = this.swipeDirection(
          this.touchObject.startX,
          e.touches[0].pageX,
          this.touchObject.startY,
          e.touches[0].pageY
        )

        if (direction !== 0) {
          e.preventDefault()
        }

        const length = this.props.vertical ? Math.round(Math.sqrt(Math.pow(e.touches[0].pageY - this.touchObject.startY, 2)))
          : Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - this.touchObject.startX, 2)))

        this.touchObject = {
          startX: this.touchObject.startX,
          startY: this.touchObject.startY,
          endX: e.touches[0].pageX,
          endY: e.touches[0].pageY,
          length: length,
          direction: direction
        }

        this.setState({
          left: this.props.vertical ? 0 : this.getTargetLeft(this.touchObject.length * this.touchObject.direction),
          top: this.props.vertical ? this.getTargetLeft(this.touchObject.length * this.touchObject.direction) : 0
        })
      },
      onTouchEnd: (e) => {
        this.handleSwipe(e)
        this.handleMouseOut()
      },
      onTouchCancel: (e) => {
        this.handleSwipe(e)
      }
    }
  }

  getMouseEvents = () => {
    if (this.props.dragging === false) {
      return null
    }

    return {
      onMouseOver: () => {
        this.handleMouseOver()
      },
      onMouseOut: () => {
        this.handleMouseOut()
      },
      onMouseDown: (e) => {
        this.touchObject = {
          startX: e.clientX,
          startY: e.clientY
        }

        this.setState({
          dragging: true
        })
      },
      onMouseMove: (e) => {
        if (!this.state.dragging) {
          return
        }

        const direction = this.swipeDirection(
          this.touchObject.startX,
          e.clientX,
          this.touchObject.startY,
          e.clientY
        )

        if (direction !== 0) {
          e.preventDefault()
        }

        const length = this.props.vertical ? Math.round(Math.sqrt(Math.pow(e.clientY - this.touchObject.startY, 2)))
          : Math.round(Math.sqrt(Math.pow(e.clientX - this.touchObject.startX, 2)))

        this.touchObject = {
          startX: this.touchObject.startX,
          startY: this.touchObject.startY,
          endX: e.clientX,
          endY: e.clientY,
          length: length,
          direction: direction
        }

        this.setState({
          left: this.props.vertical ? 0 : this.getTargetLeft(this.touchObject.length * this.touchObject.direction),
          top: this.props.vertical ? this.getTargetLeft(this.touchObject.length * this.touchObject.direction) : 0
        })
      },
      onMouseUp: (e) => {
        if (!this.state.dragging) {
          return
        }

        this.handleSwipe(e)
      },
      onMouseLeave: (e) => {
        if (!this.state.dragging) {
          return
        }

        this.handleSwipe(e)
      }
    }
  }

  handleMouseOver = () => {
    if (this.props.autoplay) {
      this.autoplayPaused = true
      this.stopAutoplay()
    }
  }

  handleMouseOut = () => {
    if (this.props.autoplay && this.autoplayPaused) {
      this.startAutoplay()
      this.autoplayPaused = null
    }
  }

  handleClick = (e) => {
    if (this.clickSafe === true) {
      e.preventDefault()
      e.stopPropagation()

      if (e.nativeEvent) {
        e.nativeEvent.stopPropagation()
      }
    }
  }

  handleSwipe = (e) => {
    if (typeof (this.touchObject.length) !== 'undefined' && this.touchObject.length > 44) {
      this.clickSafe = true
    } else {
      this.clickSafe = false
    }

    let slidesToShow = this.props.slidesToShow
    if (this.props.slidesToScroll === 'auto') {
      slidesToShow = this.state.slidesToScroll
    }

    if (this.touchObject.length > (this.state.slideWidth / slidesToShow) / 5) {
      if (this.touchObject.direction === 1) {
        if (
          this.state.currentSlide >= React.Children.count(this.props.children) - slidesToShow &&
          !this.props.wrapAround
        ) {
          this.animateSlide(easingTypes[this.props.edgeEasing])
        } else {
          this.nextSlide()
        }
      } else if (this.touchObject.direction === -1) {
        if (this.state.currentSlide <= 0 && !this.props.wrapAround) {
          this.animateSlide(easingTypes[this.props.edgeEasing])
        } else {
          this.previousSlide()
        }
      }
    } else {
      this.goToSlide(this.state.currentSlide)
    }

    this.touchObject = {}

    this.setState({
      dragging: false
    })
  }

  swipeDirection = (x1, x2, y1, y2) => {
    let xDist, yDist, r, swipeAngle

    xDist = x1 - x2
    yDist = y1 - y2
    r = Math.atan2(yDist, xDist)

    swipeAngle = Math.round(r * 180 / Math.PI)
    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle)
    }
    if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
      return 1
    }
    if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
      return 1
    }
    if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
      return -1
    }
    if (this.props.vertical === true) {
      if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
        return 1
      } else {
        return -1
      }
    }
    return 0
  }

  autoplayIterator = () => {
    if (this.props.wrapAround) {
      return this.nextSlide.apply(this)
    }
    if (this.state.currentSlide !== this.state.slideCount - this.state.slidesToShow) {
      this.nextSlide.apply(this)
    } else {
      this.stopAutoplay.apply(this)
    }
  }

  startAutoplay = () => {
    this.autoplayID = setInterval(this.autoplayIterator.bind(this), this.props.autoplayInterval)
  }

  resetAutoplay = () => {
    if (this.props.autoplay && !this.autoplayPaused) {
      this.stopAutoplay.apply(this)
      this.startAutoplay.apply(this)
    }
  }

  stopAutoplay = () => {
    this.autoplayID && clearInterval(this.autoplayID)
  }

  // Action Methods

  goToSlide = (index) => {
    if ((index >= React.Children.count(this.props.children) || index < 0)) {
      if (!this.props.wrapAround) { return }
      if (index >= React.Children.count(this.props.children)) {
        this.props.beforeSlide(this.state.currentSlide, 0)
        return this.setState({
          currentSlide: 0
        }, () => {
          this.animateSlide(null, null, this.getTargetLeft(null, index), () => {
            this.animateSlide(null, 0.01)
            this.props.afterSlide(0)
            this.resetAutoplay()
            this.setExternalData()
          })
        })
      } else {
        const endSlide = React.Children.count(this.props.children) - this.state.slidesToScroll
        this.props.beforeSlide(this.state.currentSlide, endSlide)
        return this.setState({
          currentSlide: endSlide
        }, () => {
          this.animateSlide(null, null, this.getTargetLeft(null, index), () => {
            this.animateSlide(null, 0.01)
            this.props.afterSlide(endSlide)
            this.resetAutoplay()
            this.setExternalData()
          })
        })
      }
    }

    this.props.beforeSlide(this.state.currentSlide, index)
    this.setState({
      currentSlide: index
    }, () => {
      this.animateSlide()
      this.props.afterSlide(index)
      this.resetAutoplay()
      this.setExternalData()
    })
  }

  nextSlide = () => {
    const childrenCount = React.Children.count(this.props.children)
    let slidesToShow = this.props.slidesToShow
    if (this.props.slidesToScroll === 'auto') {
      slidesToShow = this.state.slidesToScroll
    }
    if (this.state.currentSlide >= childrenCount - slidesToShow && !this.props.wrapAround) {
      return
    }

    if (this.props.wrapAround) {
      this.goToSlide(this.state.currentSlide + this.state.slidesToScroll)
    } else {
      if (this.props.slideWidth !== 1) {
        return this.goToSlide(this.state.currentSlide + this.state.slidesToScroll)
      }
      this.goToSlide(
        Math.min(this.state.currentSlide + this.state.slidesToScroll, childrenCount - slidesToShow)
      )
    }
  }

  previousSlide = () => {
    if (this.state.currentSlide <= 0 && !this.props.wrapAround) {
      return
    }

    if (this.props.wrapAround) {
      this.goToSlide(this.state.currentSlide - this.state.slidesToScroll)
    } else {
      this.goToSlide(Math.max(0, this.state.currentSlide - this.state.slidesToScroll))
    }
  }

  // Animation

  animateSlide = (easing, duration, endValue, callback) => {
    this.tweenState(this.props.vertical ? 'top' : 'left', {
      easing: easing || easingTypes[this.props.easing],
      duration: duration || this.props.speed,
      endValue: endValue || this.getTargetLeft(),
      onEnd: callback || null
    })
  }

  getTargetLeft = (touchOffset, slide) => {
    let offset
    const target = slide || this.state.currentSlide
    switch (this.props.cellAlign) {
      case 'left': {
        offset = 0
        offset -= this.props.cellSpacing * (target)
        break
      }
      case 'center': {
        offset = (this.state.frameWidth - this.state.slideWidth) / 2
        offset -= this.props.cellSpacing * (target)
        break
      }
      case 'right': {
        offset = this.state.frameWidth - this.state.slideWidth
        offset -= this.props.cellSpacing * (target)
        break
      }
    }

    let left = this.state.slideWidth * target

    const lastSlide = this.state.currentSlide > 0 && target + this.state.slidesToScroll >= this.state.slideCount

    if (lastSlide && this.props.slideWidth !== 1 && !this.props.wrapAround && this.props.slidesToScroll === 'auto') {
      left = (this.state.slideWidth * this.state.slideCount) - this.state.frameWidth
      offset = 0
      offset -= this.props.cellSpacing * (this.state.slideCount - 1)
    }

    offset -= touchOffset || 0

    return (left - offset) * -1
  }

  // Bootstrapping

  bindEvents = () => {
    if (ExecutionEnvironment.canUseDOM) {
      addEvent(window, 'resize', this.onResize)
      addEvent(document, 'readystatechange', this.onReadyStateChange)
    }
  }

  componentDidUpdate () {
    this.updateDimensions()
  }

  onResize = () => {
    this.setDimensions()
  }

  onReadyStateChange = () => {
    this.setDimensions()
  }

  unbindEvents = () => {
    if (ExecutionEnvironment.canUseDOM) {
      removeEvent(window, 'resize', this.onResize)
      removeEvent(document, 'readystatechange', this.onReadyStateChange)
    }
  }

  formatChildren = (children) => {
    const positionValue = this.props.vertical ? this.getTweeningValue('top') : this.getTweeningValue('left')
    return React.Children.map(children, (child, index) => {
      return <li className='slider-slide' style={this.getSlideStyles(index, positionValue)} key={index}>{child}</li>
    })
  }

  setInitialDimensions = () => {
    let slideWidth, frameHeight, slideHeight

    slideWidth = this.props.vertical ? (this.props.initialSlideHeight || 0) : (this.props.initialSlideWidth || 0)
    slideHeight = this.props.initialSlideHeight ? this.props.initialSlideHeight * this.props.slidesToShow : 0

    frameHeight = slideHeight + (this.props.cellSpacing * (this.props.slidesToShow - 1))
    const newDimensions = {
      slideHeight: slideHeight,
      frameWidth: this.props.vertical ? frameHeight : '100%',
      slideCount: React.Children.count(this.props.children),
      slideWidth: slideWidth
    }

    this.setState(newDimensions, () => {
      this.setLeft()
      this.setExternalData()
    })
  }

  _slideHeight = (slide, props) => {
    return !slide
      ? 100
      : props.vertical
        ? slide.offsetHeight * props.slidesToShow
        : slide.offsetHeight
  }

  _withSlideOptions = (slideWidth, props) => {
    return slideWidth - props.cellSpacing * ((100 - (100 / props.slidesToShow)) / 100)
  }

  _slideWidth = (frame, props, slideHeight) => {
    if (props.vertical) return (slideHeight / props.slidesToShow) * props.slideWidth
    return typeof props.slideWidth !== 'number'
      ? this._withSlideOptions(parseInt(props.slideWidth), props)
      : this._withSlideOptions(frame.offsetWidth / props.slidesToShow * props.slideWidth, props)
  }

  _frameWidth = (frame, slideHeight, props) => {
    const frameHeight = slideHeight + (props.cellSpacing * (props.slidesToShow - 1))
    return props.vertical ? frameHeight : frame.offsetWidth
  }

  _dimensionsChanged = (newDimensions) => {
    return newDimensions.slideHeight !== this.state.slideHeight ||
      newDimensions.frameWidth !== this.state.frameWidth ||
      newDimensions.slideWidth !== this.state.slideWidth
  }

  updateDimensions = () => {
    const frame = this.refs.frame
    const firstSlide = frame.childNodes[0].childNodes[0]

    const slideHeight = this._slideHeight(firstSlide, this.props)
    const slideWidth = this._slideWidth(frame, this.props, slideHeight)
    const frameWidth = this._frameWidth(frame, slideHeight, this.props)

    const newDimensions = {
      slideHeight,
      frameWidth,
      slideWidth
    }

    if (this._dimensionsChanged(newDimensions)) {
      this.setState(newDimensions)
    }
  }

  setDimensions = (targetProps) => {
    const props = targetProps || this.props
    const frame = this.refs.frame
    const firstSlide = frame.childNodes[0].childNodes[0]
    if (firstSlide) firstSlide.style.height = 'auto'

    const slideHeight = this._slideHeight(firstSlide, props)
    const slideWidth = this._slideWidth(frame, props, slideHeight)
    const frameWidth = this._frameWidth(frame, slideHeight, props)

    const left = props.vertical ? 0 : this.getTargetLeft()
    const top = props.vertical ? this.getTargetLeft() : 0
    const slidesToScroll = props.slidesToScroll === 'auto'
      ? Math.floor(frameWidth / (slideWidth + props.cellSpacing))
      : props.slidesToScroll

    const stateUpdate = {
      slideHeight,
      frameWidth,
      slideWidth,
      slidesToScroll,
      left,
      top
    }

    this.setState(stateUpdate, () => {
      this.setLeft()
    })
  }

  setLeft = () => {
    this.setState({
      left: this.props.vertical ? 0 : this.getTargetLeft(),
      top: this.props.vertical ? this.getTargetLeft() : 0
    })
  }

  // Data

  setExternalData = () => {
    if (this.props.data) {
      this.props.data()
    }
  }

  // Styles

  getListStyles = () => {
    const listWidth = this.state.slideWidth * React.Children.count(this.props.children)
    const spacingOffset = this.props.cellSpacing * React.Children.count(this.props.children)
    const transform = 'translate3d(' +
      this.getTweeningValue('left') + 'px, ' +
      this.getTweeningValue('top') + 'px, 0)'
    return {
      transform,
      WebkitTransform: transform,
      msTransform: 'translate(' +
      this.getTweeningValue('left') + 'px, ' +
      this.getTweeningValue('top') + 'px)',
      position: 'relative',
      display: 'block',
      margin: this.props.vertical ? (this.props.cellSpacing / 2) * -1 + 'px 0px'
        : '0px ' + (this.props.cellSpacing / 2) * -1 + 'px',
      padding: 0,
      height: this.props.vertical ? listWidth + spacingOffset : this.state.slideHeight,
      width: this.props.vertical ? 'auto' : listWidth + spacingOffset,
      cursor: this.state.dragging === true ? 'pointer' : 'inherit',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box'
    }
  }

  getFrameStyles = () => {
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
    }
  }

  getSlideStyles = (index, positionValue) => {
    const targetPosition = this.getSlideTargetPosition(index, positionValue)
    return {
      position: 'absolute',
      left: this.props.vertical ? 0 : targetPosition,
      top: this.props.vertical ? targetPosition : 0,
      display: 'block',
      listStyleType: 'none',
      verticalAlign: 'top',
      width: this.props.vertical ? '100%' : this.state.slideWidth,
      height: '400px',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      marginLeft: this.props.vertical ? 'auto' : this.props.cellSpacing / 2,
      marginRight: this.props.vertical ? 'auto' : this.props.cellSpacing / 2,
      marginTop: this.props.vertical ? this.props.cellSpacing / 2 : 'auto',
      marginBottom: this.props.vertical ? this.props.cellSpacing / 2 : 'auto'
    }
  }

  getSlideTargetPosition = (index, positionValue) => {
    const slidesToShow = (this.state.frameWidth / this.state.slideWidth)
    const targetPosition = (this.state.slideWidth + this.props.cellSpacing) * index
    const end = ((this.state.slideWidth + this.props.cellSpacing) * slidesToShow) * -1

    if (this.props.wrapAround) {
      const slidesBefore = Math.ceil(positionValue / (this.state.slideWidth))
      if (this.state.slideCount - slidesBefore <= index) {
        return (this.state.slideWidth + this.props.cellSpacing) *
          (this.state.slideCount - index) * -1
      }

      let slidesAfter = Math.ceil((Math.abs(positionValue) - Math.abs(end)) / this.state.slideWidth)

      if (this.state.slideWidth !== 1) {
        slidesAfter = Math.ceil((Math.abs(positionValue) - (this.state.slideWidth)) / this.state.slideWidth)
      }

      if (index <= slidesAfter - 1) {
        return (this.state.slideWidth + this.props.cellSpacing) * (this.state.slideCount + index)
      }
    }

    return targetPosition
  }

  getSliderStyles = () => {
    return {
      position: 'relative',
      display: 'block',
      width: this.props.width,
      height: 'auto',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      visibility: this.state.slideWidth ? 'visible' : 'hidden'
    }
  }

  getStyleTagStyles = () => {
    return '.slider-slide > img {width: 100% display: block}'
  }

  getDecoratorStyles = (position) => {
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
          WebkitTransform: 'translateX(-50%)',
          msTransform: 'translateX(-50%)'
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
          WebkitTransform: 'translateY(-50%)',
          msTransform: 'translateY(-50%)'
        }
      }
      case 'CenterCenter': {
        return {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          WebkitTransform: 'translate(-50%, -50%)',
          msTransform: 'translate(-50%, -50%)'
        }
      }
      case 'CenterRight': {
        return {
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          WebkitTransform: 'translateY(-50%)',
          msTransform: 'translateY(-50%)'
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
          WebkitTransform: 'translateX(-50%)',
          msTransform: 'translateX(-50%)'
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
}

Carousel.propTypes = {
  afterSlide: PropTypes.func,
  autoplay: PropTypes.bool,
  autoplayInterval: PropTypes.number,
  beforeSlide: PropTypes.func,
  cellAlign: PropTypes.oneOf(['left', 'center', 'right']),
  cellSpacing: PropTypes.number,
  children: PropTypes.any,
  className: PropTypes.string,
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
        'BottomRight'
      ]),
      style: PropTypes.object
    })
  ),
  dragging: PropTypes.bool,
  easing: PropTypes.string,
  edgeEasing: PropTypes.string,
  framePadding: PropTypes.string,
  frameOverflow: PropTypes.string,
  initialSlideHeight: PropTypes.number,
  initialSlideWidth: PropTypes.number,
  slideIndex: PropTypes.number,
  slidesToShow: PropTypes.number,
  slidesToScroll: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['auto'])
  ]),
  slideWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  speed: PropTypes.number,
  style: PropTypes.any,
  swiping: PropTypes.bool,
  vertical: PropTypes.bool,
  width: PropTypes.string,
  wrapAround: PropTypes.bool
}

Carousel.defaultProps = {
  afterSlide: () => { },
  autoplay: false,
  autoplayInterval: 3000,
  beforeSlide: () => { },
  cellAlign: 'left',
  cellSpacing: 0,
  data: () => {},
  decorators: [],
  dragging: true,
  easing: 'easeOutCirc',
  edgeEasing: 'easeOutElastic',
  framePadding: '0px',
  frameOverflow: 'hidden',
  slideIndex: 0,
  slidesToScroll: 1,
  slidesToShow: 1,
  slideWidth: 1,
  speed: 500,
  swiping: true,
  vertical: false,
  width: '100%',
  wrapAround: false
}

export default connect(Carousel)
