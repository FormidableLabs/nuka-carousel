import {
  Children,
  cloneElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

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

    // -- update page count and scroll offset based on scroll distance
    const { totalPages, scrollOffset } = useMeasurement({
      element: containerRef,
      scrollDistance,
    });

    // -- paging
    const { currentPage, virtualPage, goBack, goForward, goToPage } = usePaging(
      {
        totalPages,
        wrapMode,
      },
    );

    useEffect(() => {
      if (wrapMode === 'infinite' && containerRef.current && totalPages > 0) {
        const wrapper = containerRef.current.querySelector('#nuka-wrapper');
        const children = wrapper?.children;

        if (wrapper && children) {
          console.log('p', {
            totalPages,
            scrollOffset,
            currentPage,
            virtualPage,
            children: children?.length,
          });

          if (virtualPage <= 0) {
            setTimeout(() => {
              // append the "previous" slide to the beginning of the carousel
              const currentSlide = children[currentPage] as HTMLElement;
              const prevPage = (currentPage - 1 + totalPages) % totalPages;
              const prevSlide = children[prevPage] as HTMLElement;
              const newSlide = prevSlide.cloneNode(true) as HTMLElement;
              wrapper.prepend(newSlide);

              // adjust scroll offsets
              for (let i = 0; i < scrollOffset.length; i++) {
                scrollOffset[i] += currentSlide.offsetWidth;
              }
              scrollOffset.unshift(0);

              console.log('prepending prev slide', {
                prevPage,
                offsets: scrollOffset.join(','),
              });
            }, 2000);
          }

          if (children.length === virtualPage + 1) {
            // append the "next" slide to the end of the carousel
            const nextPage = (currentPage + 1) % totalPages;

            const nextSlide = children[nextPage] as HTMLElement;
            const newSlide = nextSlide.cloneNode(true) as HTMLElement;
            wrapper.appendChild(newSlide);

            // adjust scroll offsets
            scrollOffset.push(
              scrollOffset[virtualPage] + nextSlide.offsetWidth,
            );

            console.log('appending next slide', {
              nextPage,
              offsets: scrollOffset.join(','),
            });
          }
        }
      }
    }, [totalPages, currentPage, scrollOffset, virtualPage, wrapMode]);

    // // prestart and append slides for infinite mode
    // const virtualChildren = Children.map(
    //   children,
    //   (child, idx) => child && cloneElement(child as any, { key: idx }),
    // );
    // if (wrapMode === 'infinite' && virtualChildren.length > 0) {
    //   const firstSlide = children[0];
    //   const lastSlide = children[children.length - 1];
    //   virtualChildren.unshift(cloneElement(lastSlide as any, { key: -1 }));
    //   virtualChildren.push(
    //     cloneElement(firstSlide as any, { key: children.length }),
    //   );
    // }

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
        beforeSlide && beforeSlide();
        let offset = scrollOffset[currentPage];
        if (wrapMode === 'infinite') {
          if (virtualPage === 0) {
            offset = scrollOffset[1];
          } else if (virtualPage < 0) {
            offset = scrollOffset[0];
          } else {
            offset = scrollOffset[virtualPage];
          }
        }
        containerRef.current.scrollLeft = offset;
        afterSlide && setTimeout(() => afterSlide(), 0);
      }
    }, [
      currentPage,
      virtualPage,
      wrapMode,
      scrollOffset,
      beforeSlide,
      afterSlide,
    ]);

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
