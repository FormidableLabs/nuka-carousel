import { SlideHeight } from '../types';
import { useCallback, useMemo } from 'react';
import { useStateWithRef } from './use-state-with-ref';

/**
 * Adjust the frame height based on the visible slides' height if
 * `adaptiveHeight` is enabled. Otherwise, just returns `auto`.
 */
export const useFrameHeight = ({
  adaptiveHeight
}: {
  adaptiveHeight: boolean;
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
} => {
  const [visibleHeights, setVisibleHeights, visibleHeightsRef] =
    useStateWithRef<SlideHeight[]>([]);

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
    },
    [setVisibleHeights, visibleHeightsRef]
  );

  const frameHeight = useMemo(() => {
    if (adaptiveHeight) {
      const maxHeight = visibleHeights.reduce((acc, value) => {
        if (acc >= value.height) {
          return acc;
        }
        return value.height;
      }, 0);
      return `${maxHeight}px`;
    } else {
      return 'auto';
    }
  }, [adaptiveHeight, visibleHeights]);

  return { handleVisibleSlideHeightChange, frameHeight };
};
