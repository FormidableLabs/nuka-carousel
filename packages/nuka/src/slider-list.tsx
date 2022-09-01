import React, { useMemo, ReactNode } from 'react';
import { getDotIndexes } from './default-controls';
import { useShareForwardedRef } from './hooks/use-share-forwarded-ref';
import { useTween } from './hooks/use-tween';
import { Alignment, D3EasingFunctions, ScrollMode } from './types';

interface PercentOffsetForSlideProps
  extends Pick<
    SliderListProps,
    'cellAlign' | 'currentSlide' | 'slideCount' | 'wrapAround'
  > {
  currentPosition: number; // percent
  initialValue: number;
  transition: number;
}

const getPercentOffsetForSlide = ({
  cellAlign,
  currentPosition,
  currentSlide,
  initialValue,
  slideCount,
  transition,
  wrapAround,
}: PercentOffsetForSlideProps): number => {
  if (wrapAround) {
    const targetPosition = (100 / (3 * slideCount)) * currentSlide;
    const isWrappingAround =
      Math.abs(targetPosition + currentPosition).toFixed(2) ===
      (100 / 3).toFixed(2);
    const slideTransition =
      (targetPosition + currentPosition) * (isWrappingAround ? 1 : transition) -
      currentPosition;

    return initialValue - slideTransition;
  } else {
    const targetPosition = (100 / slideCount) * currentSlide;
    const slideTransition =
      (targetPosition + currentPosition) * transition - currentPosition;

    switch (cellAlign) {
      case Alignment.Left:
        return -(slideTransition + initialValue);
      case Alignment.Center:
      case Alignment.Right:
        return initialValue - slideTransition;
      default:
    }

    return initialValue;
  }
};

interface SliderListProps {
  cellAlign: Alignment;
  children: ReactNode | ReactNode[];
  currentSlide: number;
  disableEdgeSwiping: boolean;
  draggedOffset: number;
  easing: D3EasingFunctions;
  isAnimating: boolean;
  scrollMode: ScrollMode;
  slideAnimation?: 'fade' | 'zoom';
  slideCount: number;
  slidesToScroll: number;
  slidesToShow: number;
  speed: number;
  wrapAround: boolean;
}

export const SliderList = React.forwardRef<HTMLDivElement, SliderListProps>(
  (
    {
      cellAlign,
      children,
      currentSlide,
      disableEdgeSwiping,
      draggedOffset,
      easing,
      isAnimating,
      scrollMode,
      slideAnimation,
      slideCount,
      slidesToScroll,
      slidesToShow,
      speed,
      wrapAround,
    },
    forwardRef
  ) => {
    const ref = useShareForwardedRef(forwardRef);
    const rect = ref.current?.getBoundingClientRect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initialRect = useMemo(() => rect, [!!rect]);

    const currentPosition = useMemo(() => {
      if (rect && initialRect) {
        return ((rect.x - initialRect.x) / rect.width) * 100;
      }
      return 0;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSlide, draggedOffset, initialRect]);

    const transition = useTween(speed, easing, [currentPosition, currentSlide]);

    const width = useMemo(() => {
      const visibleSlides = slidesToShow;
      const percentage = (slideCount * 100) / visibleSlides;
      if (wrapAround) return `${3 * percentage}%`;
      return `${percentage}%`;
    }, [slideCount, slidesToShow, wrapAround]);

    // When disableEdgeSwiping=true, we recycle dot index generation to determine
    // the leftmost and rightmost indices used, to be used in calculating the
    // x-translation values we need to limit to.
    const clampIndices: number[] | null = useMemo(() => {
      if (disableEdgeSwiping && !wrapAround) {
        const dotIndexes = getDotIndexes(
          slideCount,
          slidesToScroll,
          scrollMode,
          slidesToShow,
          wrapAround,
          cellAlign
        );
        return [dotIndexes[0], dotIndexes[dotIndexes.length - 1]];
      }
      return null;
    }, [
      cellAlign,
      disableEdgeSwiping,
      scrollMode,
      slideCount,
      slidesToScroll,
      slidesToShow,
      wrapAround,
    ]);

    const initialValue = useMemo(() => {
      // When wrapAround is enabled, we show the slides 3 times
      const totalCount = wrapAround ? 3 * slideCount : slideCount;
      const slideSize = 100 / totalCount;
      let initialValue = wrapAround ? -slideCount * slideSize : 0;

      if (cellAlign === Alignment.Right && slidesToShow > 1) {
        const excessSlides = slidesToShow - 1;
        initialValue += slideSize * excessSlides;
      }

      if (cellAlign === Alignment.Center && slidesToShow > 1) {
        const excessSlides = slidesToShow - 1;
        // Half of excess is on left and half is on right when centered
        const excessLeftSlides = excessSlides / 2;
        initialValue += slideSize * excessLeftSlides;
      }

      return initialValue;
    }, [cellAlign, slideCount, slidesToShow, wrapAround]);

    const positioning = useMemo(() => {
      const percentOffsetForSlideProps = {
        cellAlign,
        currentPosition,
        initialValue,
        slideCount,
        transition: !isAnimating || slideAnimation === 'fade' ? 1 : transition,
        wrapAround,
      };

      const slideBasedOffset = getPercentOffsetForSlide({
        ...percentOffsetForSlideProps,
        currentSlide,
      });

      console.log(slideBasedOffset);

      // Special-case this. It's better to return undefined rather than a
      // transform of 0 pixels since transforms can cause flickering in chrome.
      if (draggedOffset === 0 && slideBasedOffset === 0) {
        return undefined;
      }

      let clampOffsets: number[] | null = null;
      if (clampIndices) {
        clampOffsets = clampIndices.map((index) =>
          getPercentOffsetForSlide({
            ...percentOffsetForSlideProps,
            currentSlide: index,
          })
        );
      }

      const clampedDraggedOffset = clampOffsets
        ? // Offsets are seemingly backwards because the rightmost slide creates
          // the most negative translate value
          `clamp(${clampOffsets[1]}%, ${draggedOffset}px, ${clampOffsets[0]}%)`
        : `${draggedOffset}px`;

      return `translate3d(${
        draggedOffset ? clampedDraggedOffset : `${slideBasedOffset}%`
      }, 0, 0)`;

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transition === 1 ? draggedOffset : transition]);

    return (
      <div
        ref={ref}
        className="slider-list"
        style={{
          width,
          textAlign: 'left',
          userSelect: 'auto',
          transform: positioning,
          display: 'flex',
        }}
      >
        {children}
      </div>
    );
  }
);

SliderList.displayName = 'SliderList';
