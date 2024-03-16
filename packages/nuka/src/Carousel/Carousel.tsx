import {
  Children,
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import './Carousel.css';
import { PageIndicators } from '../PageIndicators/PageIndicators';
import { useInterval } from 'src/hooks/use-interval';
import { usePaging } from 'src/hooks/use-paging';
import { useDebounced } from 'src/hooks/use-debounced';

type ScrollDistanceType = number | 'slide' | 'screen';

export type CarouselProps = {
  children: ReactNode;
  scrollDistance?: ScrollDistanceType;
  className?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  showPageIndicators?: boolean;
  pageIndicatorProps?: {
    currentPageIndicatorClassName?: string;
    pageIndicatorClassName?: string;
    containerClassName?: string;
  };
  beforeSlide?: () => void;
  afterSlide?: () => void;
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
      scrollDistance = 'slide',
      autoplay = false,
      autoplayInterval = 3000,
      showPageIndicators = false,
      pageIndicatorProps,
      beforeSlide,
      afterSlide,
    }: CarouselProps,
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const totalSlides = Children.count(children);
    const [totalPages, setTotalPages] = useState(totalSlides);
    const [scrollOffset, setScrollOffset] = useState(0);
    const { currentPage, goBack, goForward, goToPage } = usePaging(totalPages);

    // -- update page count and scroll offset based on scroll distance
    useEffect(() => {
      // execute before paint to ensure refs are set with the
      // correct dimensions for the calculation
      // note: this is similar to useLayout, but runs async
      requestAnimationFrame(() => {
        switch (scrollDistance) {
          case 'screen': {
            if (containerRef.current && wrapperRef.current) {
              setTotalPages(
                Math.ceil(
                  containerRef.current.scrollWidth /
                    containerRef.current.offsetWidth
                )
              );
              setScrollOffset(containerRef.current.offsetWidth);
            }
            break;
          }
          case 'slide': {
            if (wrapperRef.current) {
              setTotalPages(totalSlides);
              const firstChild = wrapperRef.current.firstChild as HTMLElement;
              setScrollOffset(firstChild.offsetWidth);
            }
            break;
          }
          default: {
            if (containerRef.current && typeof scrollDistance === 'number') {
              const carouselTotalWidth =
                containerRef.current.scrollWidth -
                containerRef.current.offsetWidth;

              setTotalPages(Math.ceil(carouselTotalWidth / scrollDistance) + 1);
              setScrollOffset(scrollDistance);
            }
          }
        }
      });
    }, [scrollDistance, totalSlides]);

    // -- autoplay
    useInterval(goForward, autoplayInterval, autoplay);

    // -- scroll container when page index changes
    useEffect(() => {
      if (containerRef.current) {
        beforeSlide && beforeSlide();
        containerRef.current.scrollLeft = currentPage * scrollOffset;
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
      const closestPageIndex = Math.round(scrollLeft / scrollOffset);
      goToPage(closestPageIndex);
    }, 100);

    return (
      <div>
        <div
          className="nuka-overflow"
          ref={containerRef}
          onTouchMove={onContainerScroll}
          data-testid="overflow"
        >
          <div
            className={`nuka-wrapper ${className}`}
            ref={wrapperRef}
            data-testid="wrapper"
          >
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
