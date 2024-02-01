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

type ScrollDistanceType = number | 'slide' | 'screen';

export type CarouselProps = {
  children: ReactNode;
  scrollDistance?: ScrollDistanceType;
  wrapperClassName?: string;
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

enum SlideDirection {
  Back = 'back',
  Forward = 'forward',
}

const findLastIndex = (
  array: number[],
  findFunction: (index: number) => boolean
) => {
  const arrayCopy = [...array];
  return array.length - 1 - arrayCopy.reverse().findIndex(findFunction);
};

export const Carousel = forwardRef<SlideHandle, CarouselProps>(
  (
    {
      children,
      scrollDistance = 'slide',
      wrapperClassName,
      autoplay = false,
      autoplayInterval = 3000,
      showPageIndicators = false,
      pageIndicatorProps,
      beforeSlide,
      afterSlide,
    }: CarouselProps,
    ref
  ) => {
    const [currentScrollIndex, setCurrentScrollIndex] = useState(0);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [currentManualScrollIndex, setCurrentManualScrollIndex] = useState(0);
    const [pageStartIndices, setPageStartIndices] = useState<number[]>([]);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const isFirstRender = useRef(true);

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
      } else if (containerRef.current) {
        beforeSlide && beforeSlide();
        containerRef.current.scroll(currentScrollIndex, 0);
        afterSlide && setTimeout(() => afterSlide(), 0);
      }
    }, [currentScrollIndex, beforeSlide, afterSlide]);

    useEffect(() => {
      const handleDebounce = setTimeout(() => {
        const roundedManualScrollIndex = Math.round(currentManualScrollIndex);
        const closestPassedSlide = pageStartIndices.reduce(
          (prev, current, index) =>
            current - roundedManualScrollIndex < 0 ? index + 1 : prev,
          0
        );
        setCurrentSlideIndex(closestPassedSlide);
      }, 100);

      return () => {
        clearTimeout(handleDebounce);
      };
    }, [currentManualScrollIndex, pageStartIndices]);

    const handleScrollAction = useCallback(
      ({
        slideDirection,
        proposedIndex,
      }: {
        slideDirection?: SlideDirection;
        proposedIndex?: number;
      }) => {
        const totalSlides = pageStartIndices.length;

        const passedProposedIndex =
          proposedIndex && Math.min(Math.max(0, proposedIndex), totalSlides);

        const proposedSlideIndex =
          typeof passedProposedIndex === 'number'
            ? passedProposedIndex
            : currentSlideIndex +
              (slideDirection === SlideDirection.Forward ? 1 : -1);

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
        const autoplayTimeout = setTimeout(() => {
          handleScrollAction({ slideDirection: SlideDirection.Forward });
        }, autoplayInterval);
        return () => clearTimeout(autoplayTimeout);
      }
    }, [autoplay, autoplayInterval, handleScrollAction, scrollDistance]);

    useEffect(() => {
      const updateIndices = () => {
        if (wrapperRef.current && containerRef.current) {
          const wrapperCurrent = wrapperRef.current;
          const containerRefOffsetLeft = containerRef.current.offsetLeft;

          const lastChild = wrapperCurrent.lastChild as HTMLElement;
          const carouselTotalWidth =
            lastChild.offsetLeft +
            lastChild.offsetWidth -
            wrapperCurrent.offsetLeft;

          let proposedPageStartIndices = [];

          if (scrollDistance === 'slide') {
            proposedPageStartIndices = Array.from(wrapperCurrent.children).map(
              (child) =>
                (child as HTMLElement).offsetLeft - containerRefOffsetLeft
            );
          } else {
            if (typeof scrollDistance === 'number') {
              proposedPageStartIndices = Array.from(
                {
                  length: carouselTotalWidth / scrollDistance,
                },
                (_, index) => index * scrollDistance
              );
            } else {
              const arrayLength = Math.ceil(
                carouselTotalWidth / wrapperCurrent.offsetWidth
              );
              proposedPageStartIndices = Array.from(
                {
                  length: arrayLength,
                },
                (_, index) => {
                  if (index === arrayLength - 1) {
                    return carouselTotalWidth - wrapperCurrent.offsetWidth;
                  }
                  return wrapperCurrent.offsetWidth * index;
                }
              );
            }
          }

          const lastIndexInView =
            findLastIndex(
              proposedPageStartIndices,
              (index) => index < carouselTotalWidth - wrapperCurrent.offsetWidth
            ) + 2;

          setPageStartIndices(
            proposedPageStartIndices.slice(0, lastIndexInView)
          );
        }
      };

      window.addEventListener('resize', updateIndices);
      updateIndices();

      return () => window.removeEventListener('resize', updateIndices);
    }, [scrollDistance, wrapperRef, containerRef]);

    const getCurrentPageIndex = useCallback(() => {
      if (containerRef.current) {
        const containerScrollDistance = containerRef.current.scrollLeft;

        return containerScrollDistance === 0
          ? 0
          : findLastIndex(
              pageStartIndices,
              (index) => Math.round(containerScrollDistance) >= index
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
        goForward() {
          handleScrollAction({ slideDirection: SlideDirection.Forward });
        },
        goBack() {
          handleScrollAction({ slideDirection: SlideDirection.Back });
        },
        goToIndex(proposedIndex: number) {
          handleScrollAction({ proposedIndex });
        },
      }),
      [handleScrollAction]
    );

    return (
      <div>
        <div
          className="overflow"
          ref={containerRef}
          onScroll={(event) => {
            setCurrentManualScrollIndex(
              (event.target as HTMLElement).scrollLeft
            );
          }}
          data-testId="overflow"
        >
          <div
            className={'wrapper ' + wrapperClassName}
            ref={wrapperRef}
            data-testId="wrapper"
          >
            {children}
          </div>
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
