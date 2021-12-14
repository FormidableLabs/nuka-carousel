import React, { ReactNode } from 'react';
import { renderSlide } from './slide';
import { getSliderListStyles } from './slider-list';

interface CarouselProps {
  children: ReactNode | ReactNode[];
  slidesToShow?: number;
}

const Carousel = (props: CarouselProps): React.ReactElement => {
  const slides = React.Children.map(props.children, (child, index) =>
    renderSlide(props.children, child, index)
  );

  return (
    <div
      className="slider-frame"
      style={{
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <div
        className="slider-list"
        style={getSliderListStyles(props.children, props.slidesToShow)}
      >
        {slides}
      </div>
    </div>
  );
};

export default Carousel;
