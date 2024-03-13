import {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import { useInterval } from '../hooks/use-interval';
import { usePaging } from '../hooks/use-paging';
import { useDebounced } from '../hooks/use-debounced';
import { useMeasurement } from '../hooks/use-measurement';
import { cls, nint } from '../utils';
import { NavButtons } from './NavButtons';
import { PageIndicators } from './PageIndicators';

import './Carousel.css';
import useHover from 'src/hooks/use-hover';
import useKeyboard from 'src/hooks/use-keyboard';
import { useReducedMotion } from 'src/hooks/use-reduced-motion';

type ShowArrowsOption = boolean | 'always' | 'hover';
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
  keyboard?: boolean;
  scrollDistance?: ScrollDistanceType;
  showArrows?: ShowArrowsOption;
  showDots?: boolean;
  swiping?: boolean;
  title?: string;
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
      keyboard = true,
      scrollDistance = 'slide',
      showArrows = false,
      showDots = false,
      swiping = true,
      title,
      wrapAround = false,
      beforeSlide,
      afterSlide,
    }: CarouselProps,
    ref
  ) => {
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // -- update page count and scroll offset based on scroll distance
    const { totalPages, scrollOffset } = useMeasurement({
      scrollDistance,
      containerRef,
    });

    // -- paging
    const { currentPage, goBack, goForward, goToPage } = usePaging({
      totalPages,
      wrapAround,
    });

    // -- autoplay
    const isHovered = useHover(containerRef);
    const prefersReducedMotion = useReducedMotion();
    const autoplayEnabled = autoplay && !(isHovered || prefersReducedMotion);
    useInterval(goForward, autoplayInterval, autoplayEnabled);

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
      const closestPageIndex = scrollOffset.indexOf(
        nint(scrollOffset, scrollLeft)
      );
      goToPage(closestPageIndex);
    }, 100);

    // -- button nav
    const enablePrevNavButton = wrapAround || currentPage > 0;
    const enableNextNavButton = wrapAround || currentPage < totalPages - 1;

    // -- keyboard nav
    useKeyboard({
      element: carouselRef,
      enabled: keyboard,
      goForward,
      goBack,
    });

    const containerClassName = cls(
      'nuka-container',
      showArrows === 'hover' && 'nuka-container-auto-hide',
      className
    );

    return (
      <>
        <div
          className={containerClassName}
          aria-labelledby="nuka-carousel-heading"
          tabIndex={keyboard ? 0 : undefined}
          ref={carouselRef}
        >
          {title && (
            <h3 id="nuka-carousel-heading" className="nuka-hidden">
              {title}
            </h3>
          )}
          <div className="nuka-slide-container">
            <div
              className="nuka-overflow"
              ref={containerRef}
              onTouchMove={onContainerScroll}
              id="nuka-overflow"
              data-testid="nuka-overflow"
              style={{ touchAction: swiping ? 'pan-x' : 'none' }}
            >
              <div
                className="nuka-wrapper"
                id="nuka-wrapper"
                data-testid="nuka-wrapper"
              >
                {children}
              </div>
            </div>
            {showArrows && (
              <NavButtons
                enablePrevNavButton={enablePrevNavButton}
                enableNextNavButton={enableNextNavButton}
                goBack={goBack}
                goForward={goForward}
              />
            )}
          </div>
        </div>
        {showDots && (
          <PageIndicators
            totalIndicators={totalPages}
            currentPageIndex={currentPage}
            scrollToPage={goToPage}
            {...pageIndicatorProps}
          />
        )}
      </>
    );
  }
);

Carousel.displayName = 'Carousel';
