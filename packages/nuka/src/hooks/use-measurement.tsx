import { useEffect, useState } from 'react';

import { arraySeq, arraySum } from '../utils';
import { useResizeObserver } from './use-resize-observer';

type MeasurementProps = {
  element: React.RefObject<HTMLDivElement>;
  scrollDistance: number | 'slide' | 'screen';
};

export function useMeasurement({ element, scrollDistance }: MeasurementProps) {
  const [totalPages, setTotalPages] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(arraySeq(totalPages, 0));
  const dimensions = useResizeObserver(element);

  useEffect(() => {
    const container = element.current;
    if (!(container && dimensions)) return;

    // determine the width of the content that is not visible (overflow)
    // we ignore the bounding box width because its a float
    // and scrollWidth is an integer, so it creates an imperfect
    // calculation when the scrollWidth is a few pixels larger
    const scrollWidth = container.scrollWidth;
    const visibleWidth = container.offsetWidth;
    const remainder = scrollWidth - visibleWidth;

    if (visibleWidth === 0) return;

    switch (scrollDistance) {
      case 'screen': {
        const pageCount = Math.ceil(scrollWidth / visibleWidth);
        // For every page of the visibleWidth, we should scroll by the amount of the width
        const fullScrollOffsets = arraySeq(pageCount - 1, visibleWidth);
        // For the last page, we should only scroll by the leftover amount
        const leftoverLastPage = scrollWidth % visibleWidth;

        setTotalPages(pageCount);
        setScrollOffset([
          ...fullScrollOffsets,
          fullScrollOffsets[fullScrollOffsets.length - 1] + leftoverLastPage,
        ]);
        break;
      }
      case 'slide': {
        // creates an array of slide widths in order to support
        // slides of varying widths as children
        const children =
          container.querySelector('#nuka-wrapper')?.children || [];
        const offsets = Array.from(children).map(
          (child) => (child as HTMLElement).offsetWidth,
        );

        // shift the scroll offsets by one to account for the first slide
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
        if (typeof scrollDistance === 'number' && scrollDistance > 0) {
          // find the number of pages required to scroll all the slides
          // to the end of the container
          const pageCount = Math.ceil(remainder / scrollDistance) + 1;

          setTotalPages(pageCount);
          setScrollOffset(arraySeq(pageCount, scrollDistance));
        }
      }
    }
  }, [element, scrollDistance, dimensions]);

  return { totalPages, scrollOffset };
}
