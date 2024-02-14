import {
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import './Carousel.css';
import { PageIndicators } from '../PageIndicators/PageIndicators';

type scrollDistanceType = number | 'slide' | 'screen';

export type CarouselProps = {
  children: ReactNode;
  scrollDistance?: scrollDistanceType;
  wrapperClassName?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  showPageIndicators?: boolean;
  pageIndicatorProps?: {
    currentPageIndicatorClassName?: string;
    pageIndicatorClassName?: string;
    containerClassName?: string;
  };
};

export type SlideHandle = {
  nextSlide: () => void;
  previousSlide: () => void;
};

enum SlideDirection {
  Back = 'back',
  Forward = 'forward',
}

export const Carousel = forwardRef<SlideHandle, CarouselProps>(
  (
    {
      children,
      scrollDistance = 100,
      wrapperClassName,
      autoplay = false,
      autoplayInterval = 3000,
      showPageIndicators = false,
      pageIndicatorProps,
    }: CarouselProps,
    ref
  ) => {
    const [currentScrollIndex, setCurrentScrollIndex] = useState(0);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [currentManualScrollIndex, setCurrentManualScrollIndex] = useState(0);
    const [pageStartIndices, setPageStartIndices] = useState<number[]>([]);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scroll(currentScrollIndex, 0);
      }
    }, [currentScrollIndex]);

    useEffect(() => {
      const handleDebounce = setTimeout(() => {
        setCurrentScrollIndex(currentManualScrollIndex);

        const closestPassedSlide = pageStartIndices.reduce(
          (prev, current, index) =>
            current - currentManualScrollIndex < 0 ? index + 1 : prev,
          0
        );
        setCurrentSlideIndex(closestPassedSlide);
      }, 100);

      return () => {
        clearTimeout(handleDebounce);
      };
    }, [currentManualScrollIndex, pageStartIndices]);

    const handleScrollAction = useCallback(
      (slideDirection: SlideDirection) => {
        const proposedSlideIndex =
          currentSlideIndex +
          (slideDirection === SlideDirection.Forward ? 1 : -1);
        const totalSlides = pageStartIndices.length - 1;
        setCurrentScrollIndex(
          pageStartIndices[
            proposedSlideIndex < 0
              ? totalSlides + proposedSlideIndex
              : proposedSlideIndex % totalSlides
          ]
        );
        setCurrentSlideIndex(proposedSlideIndex);
      },
      [pageStartIndices, currentSlideIndex]
    );

    useEffect(() => {
      if (autoplay) {
        setTimeout(() => {
          handleScrollAction(SlideDirection.Forward);
        }, autoplayInterval);
      }
      return () => clearTimeout(autoplayInterval);
    }, [autoplay, autoplayInterval, handleScrollAction, scrollDistance]);

    useEffect(() => {
      if (wrapperRef.current && containerRef.current) {
        const wrapperCurrent = wrapperRef.current;
        const containerRefOffsetLeft = containerRef.current.offsetLeft;

        if (scrollDistance === 'slide') {
          setPageStartIndices(
            Array.from(wrapperCurrent.children).map(
              (child) =>
                (child as HTMLElement).offsetLeft - containerRefOffsetLeft
            )
          );
        } else {
          const lastChild = wrapperCurrent.lastChild as HTMLElement;
          const carouselTotalWidth =
            lastChild.offsetLeft +
            lastChild.offsetWidth -
            wrapperCurrent.offsetLeft;

          if (typeof scrollDistance === 'number') {
            setPageStartIndices(
              Array.from(
                {
                  length: carouselTotalWidth / scrollDistance,
                },
                (_, index) => wrapperCurrent.offsetLeft + index * scrollDistance
              )
            );
          } else {
            const arrayLength = Math.ceil(
              carouselTotalWidth / wrapperCurrent.offsetWidth
            );
            setPageStartIndices(
              Array.from(
                {
                  length: arrayLength,
                },
                (_, index) => {
                  if (index === arrayLength - 1) {
                    return carouselTotalWidth - wrapperCurrent.offsetWidth;
                  }
                  return wrapperCurrent.offsetWidth * index;
                }
              )
            );
          }
        }
      }
    }, [scrollDistance, wrapperRef, containerRef]);

    const getCurrentPageIndex = useCallback(() => {
      if (containerRef.current) {
        const containerScrollDistance = containerRef.current.scrollLeft;

        return containerScrollDistance === 0
          ? 0
          : pageStartIndices.findLastIndex(
              (pageStartIndex) => containerScrollDistance >= pageStartIndex
            );
      }
      return 0;
    }, [containerRef, pageStartIndices]);

    const getTotalNumberOfPages = useCallback(() => {
      return pageStartIndices.length;
    }, [pageStartIndices]);

    useImperativeHandle(
      ref,
      () => ({
        nextSlide() {
          handleScrollAction(SlideDirection.Forward);
        },
        previousSlide() {
          handleScrollAction(SlideDirection.Back);
        },
      }),
      [handleScrollAction]
    );

    return (
      <div
        className="overflow"
        ref={containerRef}
        onScroll={(event) => {
          setCurrentManualScrollIndex((event.target as HTMLElement).scrollLeft);
        }}
      >
        <div className={'wrapper ' + wrapperClassName} ref={wrapperRef}>
          {children}
        </div>
        {showPageIndicators && (
          <PageIndicators
            totalIndicators={getTotalNumberOfPages()}
            currentPageIndex={getCurrentPageIndex()}
            scrollToPage={(index: number) =>
              setCurrentScrollIndex(pageStartIndices[index])
            }
            {...pageIndicatorProps}
          />
        )}
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';
