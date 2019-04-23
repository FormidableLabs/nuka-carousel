import React from 'react';
import PreviousButton from './prev-button';
import NextButton from './next-button';

const Controls = ({ handlePrev, handleNext }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px'
      }}
    >
      <PreviousButton onClick={handlePrev} />
      <NextButton onClick={handleNext} />
    </div>
  );
};

export default Controls;
