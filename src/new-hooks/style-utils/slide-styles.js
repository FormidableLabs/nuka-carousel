export const getImgTagStyles = () => {
  // return `.slider-slide > img { width: 100%; display: block; }
  //         .slider-slide > img:focus { margin: auto; }`;

  return {
    width: '100%',
    display: 'block'
  };
};

export const getSliderStyles = (propWidth, stateSlideWidth) => {
  return {
    boxSizing: 'border-box',
    // display: 'block',
    display: 'flex',
    height: 'inherit',
    MozBoxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
    visibility: stateSlideWidth ? 'inherit' : 'hidden',
    width: propWidth || '100%'
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
    margin: propFramePadding || '0px',
    MozBoxSizing: 'border-box',
    msTransform: 'translate(0, 0)',
    overflow: propFrameOverFlow || 'hidden',
    padding: 0,
    position: 'relative',
    touchAction: `pinch-zoom ${propVertical ? 'pan-x' : 'pan-y'}`,
    transform: 'translate3d(0, 0, 0)',
    WebkitTransform: 'translate3d(0, 0, 0)'
  };
};
