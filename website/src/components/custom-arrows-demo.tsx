import React from 'react';

import { useCarousel } from 'nuka-carousel';

function cls(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function CustomArrows() {
  const { currentPage, totalPages, wrapAround, goBack, goForward } =
    useCarousel();

  const enablePrevNavButton = wrapAround || currentPage > 0;
  const enableNextNavButton = wrapAround || currentPage < totalPages - 1;

  const prevNavClassName = cls(
    'inline-block px-4 py-2 bg-pink-800 cursor-pointer invisible',
    enablePrevNavButton && '!visible',
  );

  const nextNavClassName = cls(
    'inline-block px-4 py-2 bg-pink-800 cursor-pointer invisible',
    enableNextNavButton && '!visible',
  );

  return (
    <div className="flex justify-between mt-4">
      <div className={prevNavClassName} onClick={goBack}>
        PREV
      </div>
      <div className={nextNavClassName} onClick={goForward}>
        NEXT
      </div>
    </div>
  );
}
