import React from 'react';
import {
  getSliderStyles,
  getFrameStyles,
  getImgTagStyles
} from '../style-utils/slide-styles';

const Slide = ({ child }) => {
  return (
    <div className="slider-slide">
      {React.cloneElement(child, { style: getImgTagStyles() })}
    </div>
  );
};

export const slides = children => {
  return children.map((child, index) => (
    <Slide
      child={child}
      key={`${child.key}-${index}`}
      frameStyles={getFrameStyles()}
    />
  ));
};

const Slider = props => {
  const children = slides(props.children);

  return (
    <div className="slider" style={getSliderStyles(props.width, '50px')}>
      {children[props.slideIndex]}
    </div>
  );
};

export default Slider;
