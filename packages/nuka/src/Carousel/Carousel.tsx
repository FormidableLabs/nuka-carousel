import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { useInterval } from '../hooks/use-interval';
import { usePaging } from '../hooks/use-paging';
import { useDebounced } from '../hooks/use-debounced';
import { useMeasurement } from '../hooks/use-measurement';
import { useHover } from '../hooks/use-hover';
import { useKeyboard } from '../hooks/use-keyboard';
import { useReducedMotion } from '../hooks/use-reduced-motion';
import { CarouselProvider } from '../hooks/use-carousel';
import { CarouselProps, SlideHandle } from '../types';
import { cls, nint } from '../utils';
import { NavButtons } from './NavButtons';
import { PageIndicators } from './PageIndicators';

import './Carousel.css';

const defaults = {
  arrows: <NavButtons />,
  autoplay: false,
  autoplayInterval: 3000,
  dots: <PageIndicators />,
  id: 'nuka-carousel',
  keyboard: true,
  scrollDistance: 'screen',
  showArrows: false,
  showDots: false,
  swiping: true,
  wrapMode: 'nowrap',
} satisfies Partial<CarouselProps>;

export const Carousel = forwardRef<SlideHandle, CarouselProps>(
  (props: CarouselProps, ref) => {
    const options = { ...defaults, ...props };

    const {
      afterSlide,
      arrows,
      autoplay,
      autoplayInterval,
      beforeSlide,
      children,
      className,
      dots,
      id,
      keyboard,
      scrollDistance,
      showArrows,
      showDots,
      swiping,
      title,
      wrapMode,
    } = options;

    const carouselRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const previousPageRef = useRef<number>(-1);

    // -- update page count and scroll offset based on scroll distance
    const { totalPages, scrollOffset } = useMeasurement({
      element: containerRef,
      scrollDistance,
    });

    // -- paging
    const { currentPage, goBack, goForward, goToPage } = usePaging({
      totalPages,
      wrapMode,
    });

    // -- handle touch scroll events
    const onContainerScroll = useDebounced(() => {
      if (!containerRef.current) return;

      // find the closest page index based on the scroll position
      const scrollLeft = containerRef.current.scrollLeft;
      const closestPageIndex = scrollOffset.indexOf(
        nint(scrollOffset, scrollLeft),
      );
      goToPage(closestPageIndex);
    }, 100);

    // -- keyboard nav
    useKeyboard({
      element: carouselRef,
      enabled: keyboard,
      goForward,
      goBack,
    });

    // -- forward events to ref
    useImperativeHandle(ref, () => ({ goForward, goBack, goToPage }), [
      goForward,
      goBack,
      goToPage,
    ]);

    // -- autoplay
    const isHovered = useHover({ element: containerRef, enabled: autoplay });
    const prefersReducedMotion = useReducedMotion({ enabled: autoplay });
    const autoplayEnabled = autoplay && !(isHovered || prefersReducedMotion);
    useInterval(goForward, autoplayInterval, autoplayEnabled);

    // -- scroll container when page index changes
    useEffect(() => {
      if (containerRef.current) {
        const currentSlideIndex = previousPageRef.current;
        const endSlideIndex = currentPage;
        beforeSlide && beforeSlide(currentSlideIndex, endSlideIndex);
        containerRef.current.scrollLeft = scrollOffset[currentPage];
        afterSlide && setTimeout(() => afterSlide(endSlideIndex), 0);
        previousPageRef.current = currentPage;
      }
    }, [currentPage, scrollOffset, beforeSlide, afterSlide]);

    const containerClassName = cls(
      'nuka-container',
      showArrows === 'hover' && 'nuka-container-auto-hide',
      className,
    );

    const providerValues = {
      ...options,
      totalPages,
      currentPage,
      scrollOffset,
      goBack,
      goForward,
      goToPage,
    };

    return (
      <CarouselProvider value={providerValues}>
        <div
          className={containerClassName}
          aria-labelledby="nuka-carousel-heading"
          tabIndex={keyboard ? 0 : undefined}
          ref={carouselRef}
          id={id}
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
            {showArrows && arrows}
          </div>
        </div>
        {showDots && dots}
      </CarouselProvider>
    );
  },
);

Carousel.displayName = 'Carousel';
