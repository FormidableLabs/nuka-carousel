import {
  Children,
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import './Carousel.css';
import { PageIndicators } from '../PageIndicators/PageIndicators';
import { useInterval } from 'src/hooks/use-interval';
import { usePaging } from 'src/hooks/use-paging';
import { useDebounced } from 'src/hooks/use-debounced';
import { useMeasurement } from 'src/hooks/use-measurement';
import { nint } from 'src/utils';

type ScrollDistanceType = number | 'slide' | 'screen';

export type CarouselCallbacks = {
  beforeSlide?: () => void;
  afterSlide?: () => void;
};

export type CarouselProps = CarouselCallbacks & {
  children: ReactNode;

  className?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  pageIndicatorProps?: {
    currentPageIndicatorClassName?: string;
    pageIndicatorClassName?: string;
    containerClassName?: string;
  };
  scrollDistance?: ScrollDistanceType;
  showPageIndicators?: boolean;
  wrapAround?: boolean;
};

export type SlideHandle = {
  goForward: () => void;
  goBack: () => void;
  goToIndex: (proposedIndex: number) => void;
};

export const Carousel = forwardRef<SlideHandle, CarouselProps>(
  (
    {
      children,
      className = '',
      autoplay = false,
      autoplayInterval = 3000,
      pageIndicatorProps,
      scrollDistance = 'slide',
      showPageIndicators = false,
      wrapAround = true,
      beforeSlide,
      afterSlide,
    }: CarouselProps,
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // -- update page count and scroll offset based on scroll distance
    const totalSlides = Children.count(children);
    const { totalPages, scrollOffset } = useMeasurement({
      totalSlides,
      scrollDistance,
      containerRef,
      wrapperRef,
    });

    // -- paging
    const { currentPage, goBack, goForward, goToPage } = usePaging(
      totalPages,
      wrapAround
    );

    // -- autoplay
    useInterval(goForward, autoplayInterval, autoplay);

    // -- scroll container when page index changes
    useEffect(() => {
      if (containerRef.current) {
        beforeSlide && beforeSlide();
        containerRef.current.scrollLeft = scrollOffset[currentPage];
        afterSlide && setTimeout(() => afterSlide(), 0);
      }
    }, [currentPage, scrollOffset, beforeSlide, afterSlide]);

    // -- forward events to ref
    useImperativeHandle(
      ref,
      () => ({ goForward, goBack, goToIndex: goToPage }),
      [goForward, goBack, goToPage]
    );

    // -- handle touch scroll events
    const onContainerScroll = useDebounced(() => {
      if (!containerRef.current) return;

      // find the closest page index based on the scroll position
      const scrollLeft = containerRef.current.scrollLeft;
      const closestPageIndex = nint(scrollOffset, scrollLeft);
      goToPage(closestPageIndex);
    }, 100);

    return (
      <div>
        <div
          className={`nuka-overflow ${className}`}
          ref={containerRef}
          onTouchMove={onContainerScroll}
          data-testid="overflow"
        >
          <div className="nuka-wrapper" ref={wrapperRef} data-testid="wrapper">
            {children}
          </div>
        </div>
        {showPageIndicators && (
          <PageIndicators
            totalIndicators={totalPages}
            currentPageIndex={currentPage}
            scrollToPage={goToPage}
            {...pageIndicatorProps}
          />
        )}
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';
