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

export type CarouselProps = {
  children: ReactNode;
  scrollDistance?: number | 'slide';
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
  ({ children, scrollDistance = 100 }: CarouselProps, ref) => {
    const [currentScrollIndex, setCurrentScrollIndex] = useState(0);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scroll(currentScrollIndex, 0);
      }
    }, [currentScrollIndex]);

    const handleScroll = useCallback(
      (distance: number | 'slide', direction: SlideDirection) => {
        let proposedScrollDistance = 0;
        const isMovingForward = direction === SlideDirection.Forward;

        if (typeof distance === 'number') {
          proposedScrollDistance = currentScrollIndex + distance;
        } else {
          const newSlideIndex = currentSlideIndex + (isMovingForward ? 1 : -1);

          const incrementSlideDistance =
            wrapperRef.current?.children[
              isMovingForward ? currentSlideIndex : newSlideIndex
            ]?.scrollWidth;

          setCurrentSlideIndex(newSlideIndex);
          proposedScrollDistance = incrementSlideDistance || 0;
        }

        proposedScrollDistance =
          proposedScrollDistance * (isMovingForward ? 1 : -1);

        setCurrentScrollIndex(currentScrollIndex + proposedScrollDistance);
      },
      [currentScrollIndex, currentSlideIndex, setCurrentSlideIndex, wrapperRef]
    );

    useImperativeHandle(ref, () => ({
      nextSlide() {
        handleScroll(scrollDistance, SlideDirection.Forward);
      },
      previousSlide() {
        handleScroll(scrollDistance, SlideDirection.Back);
      },
    }));

    return (
      <div className="overflow" ref={containerRef}>
        <span style={{ position: 'fixed', top: 0, left: 0 }}>
          {JSON.stringify({ currentScrollIndex, currentSlideIndex })}
        </span>
        <div className="wrapper" ref={wrapperRef}>
          {children}
        </div>
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';
