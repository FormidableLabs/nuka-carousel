import { useState } from 'react';

type UsePagingReturnType = {
  currentPage: number;
  goToPage: (idx: number) => void;
  goForward: () => void;
  goBack: () => void;
};

export function usePaging(
  totalSlides: number,
  wrapAround: boolean
): UsePagingReturnType {
  const [currentPage, setCurrentPage] = useState(0);

  const goToPage = (idx: number) => {
    if (idx < 0 || idx >= totalSlides) return;
    setCurrentPage(idx);
  };

  const goForward = () => {
    if (wrapAround) {
      setCurrentPage((prev) => (prev + 1) % totalSlides);
    } else {
      setCurrentPage((prev) => Math.min(prev + 1, totalSlides - 1));
    }
  };

  const goBack = () => {
    if (wrapAround) {
      setCurrentPage((prev) => (prev - 1 + totalSlides) % totalSlides);
    } else {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    }
  };

  return { currentPage, goToPage, goForward, goBack };
}
