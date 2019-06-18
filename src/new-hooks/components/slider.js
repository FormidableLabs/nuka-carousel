import React from 'react';

const Slider = props => {
  console.log('slider props', props);
  return (
    <div
      className="slider"
      style={{
        display: 'flex',
        width: `${props.slideWidth}`,
        height: `${props.slideHeight}`
      }}
    >
      {props.prev}
      {props.current}
      {props.next}
    </div>
  );
};

export default Slider;
