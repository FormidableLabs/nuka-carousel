import { getTargetLeft } from './animation-utility';

export const getImgTagStyles = () => {
  return `.slider-slide > img { width: 100%; display: block;}
          .slider-slide > img:focus {margin: auto; width: 99.5%; outline-width: 11px}`;
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
    position: 'relative',
    display: 'block',
    width: propWidth,
    height: 'auto',
    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    visibility: stateSlideWidth ? 'inherit' : 'hidden'
  };
};

export const getFrameStyles = (
  propFrameOverFlow,
  propVertical,
  propFramePadding,
  stateFrameWidth
) => {
  return {
    position: 'relative',
    display: 'block',
    overflow: propFrameOverFlow,
    height: propVertical ? stateFrameWidth || 'initial' : 'auto',
    margin: propFramePadding,
    padding: 0,
    transform: 'translate3d(0, 0, 0)',
    WebkitTransform: 'translate3d(0, 0, 0)',
    msTransform: 'translate(0, 0)',
    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    touchAction: `pinch-zoom ${propVertical ? 'pan-x' : 'pan-y'}`
  };
};

export const getTransitionProps = (props, state) => {
  return {
    slideWidth: state.slideWidth,
    slideHeight: state.slideHeight,
    slideCount: state.slideCount,
    currentSlide: state.currentSlide,
    isWrappingAround: state.isWrappingAround,
    top: state.top,
    left: state.left,
    cellSpacing: props.cellSpacing,
    vertical: props.vertical,
    dragging: props.dragging,
    wrapAround: props.wrapAround,
    slidesToShow: state.slidesToShow
  };
};

export const getOffsetDeltas = (touchObject, props, state) => {
  const { vertical } = props;
  const { isWrappingAround, wrapToIndex } = state;
  const { length, direction } = touchObject;
  let offset = 0;

  if (isWrappingAround) {
    offset = getTargetLeft(0, wrapToIndex, props, state);
  } else {
    offset = getTargetLeft(length * direction, null, props, state);
  }

  return {
    tx: [vertical ? 0 : offset],
    ty: [vertical ? offset : 0]
  };
};
