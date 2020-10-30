import React from 'react';

export const getImgTagStyles = () => {
  return `.slider-slide > img { width: 100%; display: block; }
          .slider-slide > img:focus { margin: auto; }`;
};

export const getSlideHeight = (props) => {
  const childCount = React.Children.count(props.children);
  const listWidth = props.slideWidth * childCount;
  const spacingOffset = props.cellSpacing * childCount;

  const calculatedHeight = props.vertical
    ? listWidth + spacingOffset
    : props.slideHeight;

  return calculatedHeight > 0 && props.heightMode !== 'current'
    ? calculatedHeight
    : 'auto';
};

export const getAlignmentOffset = (slideIndex, config) => {
  let offset = 0;

  switch (config.cellAlign) {
    case 'left': {
      offset = 0;
      offset -= config.cellSpacing * slideIndex;
      break;
    }
    case 'center': {
      offset = (config.frameWidth - config.slideWidth) / 2;
      offset -= config.cellSpacing * slideIndex;
      break;
    }
    case 'right': {
      offset = config.frameWidth - config.slideWidth;
      offset -= config.cellSpacing * slideIndex;
      break;
    }
  }

  return offset;
};

export const getDecoratorStyles = (position) => {
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

export const getSliderStyles = (propWidth, propHeight) => {
  return {
    boxSizing: 'border-box',
    display: 'block',
    height: propHeight,
    MozBoxSizing: 'border-box',
    position: 'relative',
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
    cellAlign: props.cellAlign,
    cellSpacing: props.cellSpacing,
    currentSlide: state.currentSlide,
    dragging: props.dragging,
    frameWidth: parseInt(state.frameWidth),
    heightMode: props.heightMode,
    isWrappingAround: state.isWrappingAround,
    left: state.left,
    opacityScale: props.opacityScale,
    slideCount: state.slideCount,
    slideHeight: state.slideHeight,
    slideListMargin: props.slideListMargin,
    slideOffset: props.slideOffset,
    slidesToScroll:
      props.scrollMode === 'page' ? state.slidesToShow : props.slidesToScroll,
    slidesToShow: state.slidesToShow,
    slideWidth: state.slideWidth,
    top: state.top,
    vertical: props.vertical,
    wrapAround: props.wrapAround,
    zoomScale: props.zoomScale
  };
};
