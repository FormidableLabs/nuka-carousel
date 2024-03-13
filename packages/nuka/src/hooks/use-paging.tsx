import { useState } from 'react';

type UsePagingReturnType = {
  currentPage: number;
  goToPage: (idx: number) => void;
  goForward: () => void;
  goBack: () => void;
};

type PagingProps = {
  totalPages: number;
  wrapAround: boolean;
};

export function usePaging({
  totalPages,
  wrapAround,
}: PagingProps): UsePagingReturnType {
  const [currentPage, setCurrentPage] = useState(0);

  const goToPage = (idx: number) => {
    if (idx < 0 || idx >= totalPages) return;
    setCurrentPage(idx);
  };

  const goForward = () => {
    if (wrapAround) {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    } else {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
    }
  };

  const goBack = () => {
    if (wrapAround) {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    } else {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    }
  };

  return { currentPage, goToPage, goForward, goBack };
}
