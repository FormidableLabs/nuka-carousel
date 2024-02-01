import { ReactNode } from 'react';
import './Carousel.css';

type CarouselProps = {
  children: ReactNode;
};

export const Carousel = ({ children }: CarouselProps) => {
  return (
    <div className="overflow">
      <div className="wrapper">{children}</div>
    </div>
  );
};
