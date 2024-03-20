import React, { useContext } from 'react';

import { CarouselProps } from '../types';

type CarouselContextType = CarouselProps & {
  currentPage: number;
  scrollOffset: number[];
  totalPages: number;
  goToPage: (idx: number) => void;
  goForward: () => void;
  goBack: () => void;
};

const CarouselContext = React.createContext<CarouselContextType>(
  {} as unknown as CarouselContextType,
);
export const CarouselProvider = CarouselContext.Provider;

export const useCarousel = () => {
  const context = useContext(CarouselContext);
  return context;
};
