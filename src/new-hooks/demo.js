import React from 'react';
import Carousel from './components/carousel';
import './demo.css';

const slides = [1, 2, 3, 4, 5].map(i => (
  <div
    key={i}
    style={{
      boxSizing: 'border-box',
      height: '200px',
      width: '500px'
    }}
  >
    <img
      key={i}
      src={`https://via.placeholder.com/500x200/f2f2f2/c0392b/&text=slide${i}`}
    />
  </div>
));

const Demo = () => (
  <Carousel slideHeight="200px" slideWidth="500px">
    {slides}
  </Carousel>
);
export default Demo;
