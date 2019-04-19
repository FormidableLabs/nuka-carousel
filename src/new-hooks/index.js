import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Slides from './components/slides';
import { Demo } from './demo';
import PreviousButton from './components/prev-button';
import NextButton from './components/next-button';

const Carousel = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderLength = Demo.length;
  return (
    <div>
      <Slides slideIndex={slideIndex}>{Demo}</Slides>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px'
        }}
      >
        <PreviousButton
          onClick={() =>
            setSlideIndex((slideIndex - 1 + sliderLength) % sliderLength)
          }
        />
        <NextButton
          onClick={() => setSlideIndex((slideIndex + 1) % sliderLength)}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<Carousel />, document.getElementById('content'));
