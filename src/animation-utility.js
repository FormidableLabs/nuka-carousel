export const getTargetLeft = (touchOffset, slide, props, state) => {
  let offset;
  const target = slide || state.currentSlide;
  switch (state.cellAlign) {
    case 'left': {
      offset = 0;
      offset -= props.cellSpacing * target;
      break;
    }
    case 'center': {
      offset = (state.frameWidth - state.slideWidth) / 2;
      offset -= props.cellSpacing * target;
      break;
    }
    case 'right': {
      offset = state.frameWidth - state.slideWidth;
      offset -= props.cellSpacing * target;
      break;
    }
  }

  let left = state.slideWidth * target;

  const lastSlide =
    state.currentSlide > 0 && target + state.slidesToScroll >= state.slideCount;

  if (
    lastSlide &&
    props.slideWidth !== 1 &&
    !props.wrapAround &&
    props.slidesToScroll === 'auto'
  ) {
    left = state.slideWidth * state.slideCount - state.frameWidth;
    offset = 0;
    offset -= props.cellSpacing * (state.slideCount - 1);
  }

  offset -= touchOffset || 0;

  return (left - offset) * -1;
};
