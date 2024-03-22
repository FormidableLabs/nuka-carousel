import { useState } from 'react';

import { CarouselProps } from '../types';

type UsePagingReturnType = {
  currentPage: number;
  goToPage: (idx: number) => void;
  goForward: () => void;
  goBack: () => void;
};

type PagingProps = {
  totalPages: number;
  wrapMode: CarouselProps['wrapMode'];
};

export function usePaging({
  totalPages,
  wrapMode,
}: PagingProps): UsePagingReturnType {
  const [currentPage, setCurrentPage] = useState(0);

  const goToPage = (idx: number) => {
    if (idx < 0 || idx >= totalPages) return;
    setCurrentPage(idx);
  };

  const goForward = () => {
    if (wrapMode === 'wrap') {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    } else {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
    }
  };

  const goBack = () => {
    if (wrapMode === 'wrap') {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    } else {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    }
  };

  return { currentPage, goToPage, goForward, goBack };
}
