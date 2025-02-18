import { useEffect, useState } from 'react';

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
  initialPage?: number;
};

export function usePaging({
  totalPages,
  wrapMode,
  initialPage,
}: PagingProps): UsePagingReturnType {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (initialPage) {
      setCurrentPage(Math.max(0, Math.min(initialPage, totalPages)));
    }
  }, [initialPage, totalPages]);

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
