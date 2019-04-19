import React, { useState } from 'react';

const Slide = ({ child }) => {
  return (
    <div
      style={{
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {child}
    </div>
  );
};

const Slides = props => {
  const children = props.children.map((child, index) => (
    <Slide child={child} key={`${child.key}-${index}`} />
  ));

  return (
    <div
      style={{
        height: '300px',
        overflow: 'hidden'
      }}
    >
      {children[props.slideIndex]}
    </div>
  );
};

export default Slides;
