import { useState } from 'react';

import { CarouselProps } from '../types';

type UsePagingReturnType = {
  /**
   * The current page index, within the bounds of totalPages.
   */
  currentPage: number;
  /**
   * The current page index, which may be outside the bounds of totalPages in infinite mode.
   */
  virtualPage: number;
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
  const [index, setIndex] = useState(0);

  const goToPage = (idx: number) => {
    if (wrapMode !== 'infinite') {
      if (idx < 0 || idx >= totalPages) return;
    }
    setIndex(idx);
  };

  const goForward = () => {
    if (wrapMode === 'wrap') {
      setIndex((prev) => (prev + 1) % totalPages);
    } else if (wrapMode === 'infinite') {
      setIndex((prev) => prev + 1);
    } else {
      setIndex((prev) => Math.min(prev + 1, totalPages - 1));
    }
  };

  const goBack = () => {
    if (wrapMode === 'wrap') {
      setIndex((prev) => (prev - 1 + totalPages) % totalPages);
    } else if (wrapMode === 'infinite') {
      setIndex((prev) => prev - 1);
    } else {
      setIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return {
    currentPage: totalPages > 0 ? index % totalPages : index,
    virtualPage: index,
    goToPage,
    goForward,
    goBack,
  };
}
