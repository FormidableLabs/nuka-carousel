import React from 'react';
import Carousel from './components/carousel';
import './demo.css';

const Demo = () => (
  <Carousel slideHeight="200px" slideWidth="500px">
    <img
      src="https://via.placeholder.com/500x200/f2f2f2/c0392b/&text=slide1"
      style={{ border: '2px solid red' }}
    />
    <img
      src="https://via.placeholder.com/500x200/f2f2f2/c0392b/&text=slide2"
      style={{ border: '2px solid red' }}
    />
    <img
      src="https://via.placeholder.com/500x200/f2f2f2/c0392b/&text=slide3"
      style={{ border: '2px solid red' }}
    />
    <img
      src="https://via.placeholder.com/500x200/f2f2f2/c0392b/&text=slide4"
      style={{ border: '2px solid red' }}
    />
    <img
      src="https://via.placeholder.com/500x200/f2f2f2/c0392b/&text=slide5"
      style={{ border: '2px solid red' }}
    />
    <img
      src="https://via.placeholder.com/500x200/f2f2f2/c0392b/&text=slide6"
      style={{ border: '2px solid red' }}
    />
  </Carousel>
);
export default Demo;
