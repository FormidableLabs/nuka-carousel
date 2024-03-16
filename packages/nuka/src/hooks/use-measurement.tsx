import { useCallback, useEffect, useState } from 'react';

import { useDebounced } from 'src/hooks/use-debounced';
import { arraySeq, arraySum } from 'src/utils';

type MeasurementProps = {
  totalSlides: number;
  scrollDistance: number | 'slide' | 'screen';
  containerRef: React.RefObject<HTMLDivElement>;
  wrapperRef: React.RefObject<HTMLDivElement>;
};

export function useMeasurement({
  totalSlides,
  scrollDistance,
  containerRef,
  wrapperRef,
}: MeasurementProps) {
  const [totalPages, setTotalPages] = useState(totalSlides);
  const [scrollOffset, setScrollOffset] = useState(arraySeq(totalPages, 0));

  const measure = useCallback(() => {
    // execute before paint to ensure refs are set with the
    // correct dimensions for the calculation
    // note: this is similar to useLayout, but runs async
    requestAnimationFrame(() => {
      switch (scrollDistance) {
        case 'screen': {
          if (containerRef.current && wrapperRef.current) {
            const pageCount = Math.ceil(
              wrapperRef.current.scrollWidth / containerRef.current.offsetWidth
            );
            setTotalPages(pageCount);
            setScrollOffset(
              arraySeq(pageCount, containerRef.current.offsetWidth)
            );
          }
          break;
        }
        case 'slide': {
          if (wrapperRef.current) {
            // creates an array of slide widths in order to support
            // slides of varying widths as children
            const offsets = Array.from(wrapperRef.current.children).map(
              (child) => (child as HTMLElement).offsetWidth
            );

            setTotalPages(totalSlides);
            setScrollOffset(arraySum([0, ...offsets.slice(0, -1)]));
          }
          break;
        }
        default: {
          if (containerRef.current && typeof scrollDistance === 'number') {
            const carouselTotalWidth =
              containerRef.current.scrollWidth -
              containerRef.current.offsetWidth;

            const pageCount =
              Math.ceil(carouselTotalWidth / scrollDistance) + 1;

            setTotalPages(pageCount);
            setScrollOffset(arraySeq(pageCount, scrollDistance));
          }
        }
      }
    });
  }, [scrollDistance, totalSlides, containerRef, wrapperRef]);

  // debounce the measure function when resizing so
  // it doesnt fire on every pixel change
  const resizer = useDebounced(measure, 100);

  useEffect(() => {
    measure();

    window.addEventListener('resize', resizer as EventListener);
    return () => window.removeEventListener('resize', resizer as EventListener);
  }, [measure, resizer]);

  return { totalPages, scrollOffset };
}
