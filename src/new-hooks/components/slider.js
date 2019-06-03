import React from 'react';
import { getSliderStyles } from '../style-utils/slide-styles';

const Slider = props => {
  console.log(props);
  return (
    <div className="slider" style={getSliderStyles(props.width, '50px')}>
      {props.slides}
    </div>
  );
};

export default Slider;
