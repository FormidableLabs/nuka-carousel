import { SlideHeight } from '../types';
import { useCallback, useMemo, useState } from 'react';
import { useStateWithRef } from './use-state-with-ref';

/**
 * The frame height is normally, just `auto` (i.e., it expands to fit the
 * items), but in adaptiveHeight mode, it's the height of the tallest visible
 * item.
 *
 * In adaptiveHeight mode, we also switch between two states to ensure that
 * slides don't render with zero height when server-side-rendering:
 *
 * - Uninitialized: the frame height is `auto` and we just use the height
 *   of the tallest visible item.
 * - Initialized: the frame height has the height of the tallest visible item
 *   and all visible items have height `100%`.
 */
export const useFrameHeight = ({
  adaptiveHeight,
  slidesToShow,
  numSlides
}: {
  adaptiveHeight: boolean;
  slidesToShow: number;
  numSlides: number;
}): {
  /**
   * Callback that can be passed to Slides to allow them to update the
   * `visibleHeights` variable.
   */
  handleVisibleSlideHeightChange: (
    slideIndex: number,
    height: number | null
  ) => unknown;

  /** CSS height of the frame container */
  frameHeight: string;

  /**
   * Whether we'd measured the initial slide heights and are ready for the
   * frame to control the children's height, rather than the other way around.
   */
  initializedAdaptiveHeight: boolean;
} => {
  const [visibleHeights, setVisibleHeights, visibleHeightsRef] =
    useStateWithRef<SlideHeight[]>([]);

  // Whether we've received heights of all initial visible heights
  const [initializedAdaptiveHeight, setInitializedAdaptiveHeight] =
    useState(false);

  const handleVisibleSlideHeightChange = useCallback(
    (slideIndex: number, height: number | null) => {
      // Use the ref's value since it's always the latest value
      const latestVisibleHeights = visibleHeightsRef.current;
      let newVisibleHeights: SlideHeight[];
      if (height === null) {
        newVisibleHeights = latestVisibleHeights.filter(
          (slideHeight) => slideHeight.slideIndex !== slideIndex
        );
      } else {
        newVisibleHeights = [...latestVisibleHeights, { slideIndex, height }];
      }
      setVisibleHeights(newVisibleHeights);

      if (
        newVisibleHeights.length >= Math.min(numSlides, Math.ceil(slidesToShow))
      ) {
        setInitializedAdaptiveHeight(true);
      }
    },
    [numSlides, setVisibleHeights, slidesToShow, visibleHeightsRef]
  );

  const frameHeight = useMemo(() => {
    if (adaptiveHeight) {
      // We want server-side-rendering to render the carousel with non-zero
      // height. to achieve this, we first set the height to `auto` until
      // we've received the heights of the visible slides. Then, we switch to
      // a mode where the frame controls the height.
      if (!initializedAdaptiveHeight) {
        return 'auto';
      }

      const maxHeight = Math.max(
        0,
        ...visibleHeights.map((height) => height.height)
      );
      return `${maxHeight}px`;
    } else {
      return 'auto';
    }
  }, [adaptiveHeight, initializedAdaptiveHeight, visibleHeights]);

  return {
    handleVisibleSlideHeightChange,
    frameHeight,
    initializedAdaptiveHeight
  };
};
