import React from 'react';
import _ from 'lodash';

const PagingDots = ({ slideCount, handleGoToSlide }) => {
  return (
    <div>
      {_.fill(Array(slideCount), 1).map((i, index) => (
        <button
          key={`paging-dots-${index}`}
          className="paging-dot"
          style={{
            display: 'inline-block',
            borderRadius: '50%',
            width: '6px',
            height: '6px',
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '5px',
            margin: '5px'
          }}
          onClick={() => handleGoToSlide(index)}
        />
      ))}
    </div>
  );
};

export default PagingDots;
