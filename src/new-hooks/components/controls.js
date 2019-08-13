import React from 'react';
import PreviousButton from './prev-button';
import NextButton from './next-button';
import PagingDots from './paging-dots';

const Controls = ({ handlePrev, handleNext, handleGoToSlide, slideCount }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '10px'
    }}
  >
    <PreviousButton onClick={handlePrev} />
    <PagingDots slideCount={slideCount} handleGoToSlide={handleGoToSlide} />
    <NextButton onClick={handleNext} />
  </div>
);

export default Controls;
