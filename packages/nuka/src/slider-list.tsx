import React, { useMemo, ReactNode, useLayoutEffect, useState } from 'react';
import { getDotIndexes } from './default-controls';
import { useShareForwardedRef } from './hooks/use-share-forwarded-ref';
import { useTransition } from './hooks/use-transition';
import { Alignment, D3EasingFunctions, ScrollMode } from './types';

interface PercentOffsetForSlideProps
  extends Pick<
    SliderListProps,
    'slideCount' | 'currentSlide' | 'cellAlign' | 'wrapAround'
  > {
  initialValue: number;
  transition: number;
  currentPosition: number; // percent
}

const getPercentOffsetForSlide = ({
  slideCount,
  initialValue,
  currentSlide,
  cellAlign,
  currentPosition,
  transition,
  wrapAround,
}: PercentOffsetForSlideProps): number => {
  if (wrapAround) {
    const targetPosition = (100 / (3 * slideCount)) * currentSlide;
    const isWrappingAround =
      Math.abs(targetPosition + currentPosition).toFixed(2) ===
      (100 / 3).toFixed(2);
    const slideTransition =
      -currentPosition +
      (targetPosition + currentPosition) * (isWrappingAround ? 1 : transition);

    return initialValue - slideTransition;
  } else {
    const targetPosition = (100 / slideCount) * currentSlide;
    const slideTransition =
      -currentPosition + (targetPosition + currentPosition) * transition;
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
  children: ReactNode | ReactNode[];
  slideCount: number;
  currentSlide: number;
  slidesToShow: number;
  cellAlign: Alignment;
  wrapAround: boolean;
  speed: number;
  easing: D3EasingFunctions;
  draggedOffset: number;
  slidesToScroll: number;
  scrollMode: ScrollMode;
  disableEdgeSwiping: boolean;
  slideAnimation?: 'fade' | 'zoom';
}

export const SliderList = React.forwardRef<HTMLDivElement, SliderListProps>(
  (
    {
      children,
      slideCount,
      currentSlide,
      slidesToShow,
      easing,
      cellAlign,
      wrapAround,
      speed,
      draggedOffset,
      slidesToScroll,
      scrollMode,
      disableEdgeSwiping,
      slideAnimation,
    },
    forwardRef
  ) => {
    const ref = useShareForwardedRef(forwardRef);
    const [initialRect, setInitialRect] = useState<DOMRect>();
    const rect = ref.current?.getBoundingClientRect();

    const currentPosition = useMemo(() => {
      if (rect && initialRect) {
        return ((rect.x - initialRect.x) / rect.width) * 100;
      }
      return 0;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialRect, currentSlide, draggedOffset]);

    const transition = useTransition(speed, easing, [
      currentPosition,
      currentSlide,
    ]);

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
      disableEdgeSwiping,
      slideCount,
      slidesToScroll,
      scrollMode,
      slidesToShow,
      wrapAround,
      cellAlign,
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
    }, [wrapAround, slideCount, cellAlign, slidesToShow]);

    const positioning = useMemo(() => {
      const percentOffsetForSlideProps = {
        slideCount,
        initialValue,
        cellAlign,
        currentPosition,
        transition: slideAnimation === 'fade' ? 1 : transition,
        wrapAround,
      };

      const slideBasedOffset = getPercentOffsetForSlide({
        ...percentOffsetForSlideProps,
        currentSlide,
      });

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

    useLayoutEffect(() => {
      setTimeout(
        () => setInitialRect(ref.current?.getBoundingClientRect()),
        100
      );
    }, [ref]);

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
