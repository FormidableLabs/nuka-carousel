import React from 'react';
import { getFrameStyles, getImgTagStyles } from '../style-utils/slide-styles';

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
