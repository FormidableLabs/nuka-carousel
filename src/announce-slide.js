import React from 'react';

const AnnounceSlide = ({ message }) => {
  const styles = {
    position: 'absolute',
    left: '-10000px',
    top: 'auto',
    width: '1px',
    height: '1px',
    overflow: 'hidden'
  };
  return (
    <div aria-live="polite" aria-atomic="true" style={styles} tabIndex={-1}>
      {message}
    </div>
  );
};

export default AnnounceSlide;
