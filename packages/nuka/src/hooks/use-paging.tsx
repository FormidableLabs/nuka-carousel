import { useState } from 'react';

type UsePagingReturnType = {
  currentPage: number;
  goToPage: (idx: number) => void;
  goForward: () => void;
  goBack: () => void;
};

export function usePaging(totalSlides: number): UsePagingReturnType {
  const [currentPage, setCurrentPage] = useState(0);

  const goToPage = (idx: number) => {
    if (idx < 0 || idx >= totalSlides) return;
    setCurrentPage(idx);
  };

  const goForward = () => {
    setCurrentPage((prev) => (prev + 1) % totalSlides);
  };

  const goBack = () => {
    setCurrentPage((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return { currentPage, goToPage, goForward, goBack };
}
