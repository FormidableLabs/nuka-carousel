import { useCallback, useEffect, useState } from 'react';

import { arraySeq, arraySum } from '../utils';
import { useDebounced } from './use-debounced';

type MeasurementProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  scrollDistance: number | 'slide' | 'screen';
};

export function useMeasurement({
  containerRef,
  scrollDistance,
}: MeasurementProps) {
  const [totalPages, setTotalPages] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(arraySeq(totalPages, 0));

  const measure = useCallback(() => {
    // execute before paint to ensure refs are set with the
    // correct dimensions for the calculation
    // note: this is similar to useLayout, but runs async
    requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;

      // determine the width of the content that is not visible (overflow)
      const remainder = container.scrollWidth - container.offsetWidth;

      switch (scrollDistance) {
        case 'screen': {
          const pageCount = Math.ceil(
            container.scrollWidth / container.offsetWidth
          );
          setTotalPages(pageCount);
          setScrollOffset(arraySeq(pageCount, container.offsetWidth));
          break;
        }
        case 'slide': {
          // creates an array of slide widths in order to support
          // slides of varying widths as children
          const children =
            container.querySelector('#nuka-wrapper')?.children || [];
          const offsets = Array.from(children).map(
            (child) => (child as HTMLElement).offsetWidth
          );

          const scrollOffsets = arraySum([0, ...offsets.slice(0, -1)]);

          // find the index of the scroll offset that is greater than
          // the remainder of the full width and window width
          const pageCount =
            scrollOffsets.findIndex((offset) => offset >= remainder) + 1;

          setTotalPages(pageCount);
          setScrollOffset(scrollOffsets);
          break;
        }
        default: {
          if (typeof scrollDistance === 'number') {
            // find the number of pages required to scroll the all slides
            // to the end of the container
            const pageCount = Math.ceil(remainder / scrollDistance) + 1;

            setTotalPages(pageCount);
            setScrollOffset(arraySeq(pageCount, scrollDistance));
          }
        }
      }
    });
  }, [scrollDistance, containerRef]);

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
