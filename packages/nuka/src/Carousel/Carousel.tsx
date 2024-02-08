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

type scrollDistanceType = number | 'slide' | 'screen';

export type CarouselProps = {
  children: ReactNode;
  scrollDistance?: scrollDistanceType;
  wrapperClassName?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
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
    }: CarouselProps,
    ref
  ) => {
    const [currentScrollIndex, setCurrentScrollIndex] = useState(0);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [currentManualScrollIndex, setCurrentManualScrollIndex] = useState(0);
    const [slideStartIndices, setSlideStartIndices] = useState<number[]>([]);

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

        const closestPassedSlide = slideStartIndices.reduce(
          (prev, current, index) =>
            current - currentManualScrollIndex < 0 ? index + 1 : prev,
          0
        );
        setCurrentSlideIndex(closestPassedSlide);
      }, 100);

      return () => {
        clearTimeout(handleDebounce);
      };
    }, [currentManualScrollIndex, slideStartIndices]);

    useEffect(() => {
      if (wrapperRef.current?.children) {
        const wrapperChildren = Array.from(
          wrapperRef.current.children
        ) as HTMLDivElement[];
        const startIndices = wrapperChildren.reduce<number[]>(
          (prev, child, currentIndex) => [
            ...prev,
            currentIndex === 0
              ? child.offsetWidth
              : prev[currentIndex - 1] + child.offsetWidth,
          ],
          []
        );
        setSlideStartIndices(startIndices);
      }
    }, [wrapperRef]);

    const handleScrollAction = useCallback(
      (distance: scrollDistanceType, direction: SlideDirection) => {
        const movementDirectionMultiplier =
          direction === SlideDirection.Forward ? 1 : -1;
        if (typeof distance === 'number') {
          setCurrentScrollIndex(
            currentScrollIndex + distance * movementDirectionMultiplier
          );
        } else if (distance === 'screen') {
          if (wrapperRef.current) {
            setCurrentScrollIndex(
              currentScrollIndex +
                wrapperRef.current.offsetWidth * movementDirectionMultiplier
            );
          }
        } else {
          const proposedSlideIndex =
            currentSlideIndex + movementDirectionMultiplier;
          const proposedSlide =
            wrapperRef.current?.children[proposedSlideIndex];
          const containerRefOffset = containerRef.current?.offsetLeft;

          if (proposedSlide) {
            const proposedScrollIndex =
              (proposedSlide as HTMLElement).offsetLeft -
              (containerRefOffset || 0);
            setCurrentScrollIndex(proposedScrollIndex);
            setCurrentSlideIndex(proposedSlideIndex);
          }
        }
      },
      [
        currentScrollIndex,
        currentSlideIndex,
        setCurrentSlideIndex,
        wrapperRef,
        containerRef,
      ]
    );

    useEffect(() => {
      if (autoplay) {
        setTimeout(() => {
          handleScrollAction(scrollDistance, SlideDirection.Forward);
        }, autoplayInterval);
      }
      return () => clearTimeout(autoplayInterval);
    }, [autoplay, autoplayInterval, handleScrollAction, scrollDistance]);

    useImperativeHandle(ref, () => ({
      nextSlide() {
        handleScrollAction(scrollDistance, SlideDirection.Forward);
      },
      previousSlide() {
        handleScrollAction(scrollDistance, SlideDirection.Back);
      },
    }));

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
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';
