import React from 'react';

import { useCarousel } from 'nuka-carousel';

export const CustomDots = () => {
  const { totalPages, currentPage, goToPage } = useCarousel();

  const className = (index: number) => {
    let value =
      'w-3 h-3 p-0 rounded-full bg-gray-200 border-none cursor-pointer hover:bg-green-200';
    if (currentPage === index) {
      value += ' bg-green-500 hover:bg-green-500';
    }
    return value;
  };

  return (
    <div className="flex items-center py-4 gap-1">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => goToPage(index)}
          className={className(index)}
        />
      ))}
    </div>
  );
};
