export const getImgTagStyles = () => {
  return `.slider-slide > img { width: 100%; display: block; }
          .slider-slide > img:focus { margin: auto; }`;
};

export const getDecoratorStyles = position => {
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
};

export const getSliderStyles = (propWidth, stateSlideWidth) => {
  return {
    boxSizing: 'border-box',
    display: 'block',
    height: 'auto',
    MozBoxSizing: 'border-box',
    position: 'relative',
    visibility: stateSlideWidth ? 'inherit' : 'hidden',
    width: propWidth
  };
};

export const getFrameStyles = (
  propFrameOverFlow,
  propVertical,
  propFramePadding,
  stateFrameWidth
) => {
  return {
    boxSizing: 'border-box',
    display: 'block',
    height: propVertical ? stateFrameWidth || 'initial' : '100%',
    margin: propFramePadding,
    MozBoxSizing: 'border-box',
    msTransform: 'translate(0, 0)',
    overflow: propFrameOverFlow,
    padding: 0,
    position: 'relative',
    touchAction: `pinch-zoom ${propVertical ? 'pan-x' : 'pan-y'}`,
    transform: 'translate3d(0, 0, 0)',
    WebkitTransform: 'translate3d(0, 0, 0)'
  };
};

export const getTransitionProps = (props, state) => {
  return {
    animation: props.animation,
    cellSpacing: props.cellSpacing,
    currentSlide: state.currentSlide,
    dragging: props.dragging,
    isWrappingAround: state.isWrappingAround,
    left: state.left,
    slideCount: state.slideCount,
    slideHeight: state.slideHeight,
    slideOffset: props.slideOffset,
    slidesToShow: state.slidesToShow,
    slideWidth: state.slideWidth,
    top: state.top,
    vertical: props.vertical,
    wrapAround: props.wrapAround,
    zoomScale: props.zoomScale,
    opacityScale: props.opacityScale,
    slideListMargin: props.slideListMargin
  };
};
