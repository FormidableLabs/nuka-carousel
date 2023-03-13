import React, {
  CSSProperties,
  ReactNode,
  useRef,
  useEffect,
  RefObject,
} from 'react';
import { useSlideIntersectionObserver } from './hooks/use-slide-intersection-observer';

const getSlideWidth = (count: number, wrapAround?: boolean): string =>
  `${wrapAround ? 100 / (3 * count) : 100 / count}%`;

const getSlideStyles = (
  count: number,
  isCurrentSlide: boolean,
  isVisibleSlide: boolean,
  wrapAround: boolean,
  cellSpacing: number,
  animation: 'zoom' | 'fade' | undefined,
  speed: number,
  zoomScale: number | undefined,
  adaptiveHeight: boolean,
  initializedAdaptiveHeight: boolean,
  slideWidth: CSSProperties['width']
): CSSProperties => {
  const width = slideWidth ?? getSlideWidth(count, wrapAround);
  // const width = getSlideWidth(count, wrapAround);
  const visibleSlideOpacity = isVisibleSlide ? 1 : 0;
  const animationSpeed = animation === 'fade' ? 200 : 500;

  let height = 'auto';
  if (adaptiveHeight) {
    if (initializedAdaptiveHeight) {
      // Once adaptiveHeight is initialized, the frame will size to the height
      // of all the visible slides
      height = '100%';
    } else if (isVisibleSlide) {
      // If the slide is visible but we're still measuring heights, have
      // visible slides just take up their natural height
      height = 'auto';
    } else {
      // If the slide is not visible and we're still measuring heights, the
      // slide should have height 0 so it doesn't contribute to the measured
      // height of the frame
      height = '0';
    }
  }

  return {
    width,
    height,
    padding: `0 ${cellSpacing ? cellSpacing / 2 : 0}px`,
    transition: animation ? `${speed || animationSpeed}ms ease 0s` : undefined,
    transform:
      animation === 'zoom'
        ? `scale(${isCurrentSlide && isVisibleSlide ? 1 : zoomScale || 0.85})`
        : undefined,
    opacity: animation === 'fade' ? visibleSlideOpacity : 1,
  };
};

const generateIndex = (
  index: number,
  count: number,
  typeOfSlide?: 'prev-cloned' | 'next-cloned'
): number => {
  if (typeOfSlide === 'prev-cloned') {
    return index - count;
  }

  if (typeOfSlide === 'next-cloned') {
    return index + count;
  }

  return index;
};

const Slide = ({
  count,
  children,
  index,
  isCurrentSlide,
  typeOfSlide,
  wrapAround,
  cellSpacing,
  slideWidth,
  animation,
  speed,
  zoomScale,
  onVisibleSlideHeightChange,
  adaptiveHeight,
  initializedAdaptiveHeight,
  updateIOEntry,
  id,
  carouselRef,
}: {
  count: number;
  id: string;
  children: ReactNode | ReactNode[];
  index: number;
  isCurrentSlide: boolean;
  typeOfSlide: 'prev-cloned' | 'next-cloned' | undefined;
  wrapAround: boolean;
  cellSpacing: number;
  animation: 'zoom' | 'fade' | undefined;
  speed: number;
  zoomScale: number | undefined;
  slideWidth?: CSSProperties['width'];
  updateIOEntry: (id: string, isFullyVisible: boolean) => void;
  carouselRef: RefObject<Element>;
  /**
   * Called with `height` when slide becomes visible and `null` when it becomes
   * hidden.
   */
  onVisibleSlideHeightChange: (index: number, height: number | null) => unknown;
  adaptiveHeight: boolean;
  initializedAdaptiveHeight: boolean;
}): JSX.Element => {
  const customIndex = wrapAround
    ? generateIndex(index, count, typeOfSlide)
    : index;

  const slideRef = useRef<HTMLDivElement>(null);

  const entry = useSlideIntersectionObserver(slideRef, carouselRef, (entry) => {
    updateIOEntry(id, entry?.intersectionRatio >= 0.95);
  });

  const isVisible = !!entry?.isIntersecting;
  const isFullyVisible = (entry?.intersectionRatio ?? 1) >= 0.95;

  const prevIsVisibleRef = useRef(false);
  useEffect(() => {
    const node = slideRef.current;
    if (node) {
      const slideHeight = node.getBoundingClientRect()?.height;

      const prevIsVisible = prevIsVisibleRef.current;
      if (isVisible && !prevIsVisible) {
        onVisibleSlideHeightChange(customIndex, slideHeight);
      } else if (!isVisible && prevIsVisible) {
        onVisibleSlideHeightChange(customIndex, null);
      }

      prevIsVisibleRef.current = isVisible;
    }
  }, [customIndex, isVisible, onVisibleSlideHeightChange]);

  const currentSlideClass =
    isCurrentSlide && isFullyVisible ? ' slide-current' : '';

  return (
    <div
      ref={slideRef}
      {...{ inert: isFullyVisible ? undefined : 'true' }}
      className={`slide${currentSlideClass}${
        typeOfSlide ? ` ${typeOfSlide}` : ''
      }${isFullyVisible ? ' slide-visible' : ''}`}
      style={getSlideStyles(
        count,
        isCurrentSlide,
        isFullyVisible,
        wrapAround,
        cellSpacing,
        animation,
        speed,
        zoomScale,
        adaptiveHeight,
        initializedAdaptiveHeight,
        slideWidth
      )}
    >
      {children}
    </div>
  );
};

export default Slide;
