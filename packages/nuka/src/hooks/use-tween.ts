import { useEffect, useState, useRef } from 'react';
import { EasingFunction } from 'src/types';

/**
 * Provides an interpolated value, beginning at 0 and ending at 1, based on a
 * provided duration and animation timing function.
 */
export const useTween = (
  durationMs: number,
  easingFunction: EasingFunction,
  // navigationNum is an combination of numbers that are stable when the
  // animation should not be running or should continue running, but change when
  // the animation should start running. In practice, this is a combination of
  // the animation distance and slide index.
  navigationNum: number,
  shouldInterrupt: boolean
) => {
  const [normalizedTimeRaw, setNormalizedTime] = useState(1);
  const startTime = useRef(Date.now());
  const rAF = useRef<number | undefined>();
  const isFirstRender = useRef(true);
  const lastNavigationNum = useRef<number | null>(null);

  // Detect on the first render following navigation if the animation should
  // be running. If we wait for the useEffect, the first render will flash with
  // the slide in its destination position, before the animation triggers,
  // sending it back to the position of the first frame of the animation. This
  // approach is done in place of a useLayoutEffect, which has issues with SSR.
  const normalizedTime =
    lastNavigationNum.current === null ||
    lastNavigationNum.current === navigationNum ||
    shouldInterrupt
      ? normalizedTimeRaw
      : 0; // 0 here indicates the animation has begun

  useEffect(() => {
    lastNavigationNum.current = navigationNum;

    // Skip the first render as we don't want to trigger the animation right off
    // the bat
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (shouldInterrupt) {
      return;
    }

    startTime.current = Date.now();
    setNormalizedTime(0);

    const tick = () => {
      rAF.current = requestAnimationFrame(() => {
        const currentTime = Date.now();
        const normalizedTime = Math.min(
          1,
          (currentTime - startTime.current) / durationMs
        );
        setNormalizedTime(normalizedTime);

        if (normalizedTime < 1) {
          tick();
        } else {
          // Clean up so we can use this value to determine if the most recent
          // animation completed
          rAF.current = undefined;
        }
      });
    };
    tick();

    return () => {
      // If the most recent animation did not complete, cut it short and reset
      // the animation
      if (rAF.current !== undefined) {
        cancelAnimationFrame(rAF.current);
        setNormalizedTime(1);
      }
    };
  }, [navigationNum, durationMs, shouldInterrupt]);

  return {
    isAnimating: normalizedTime !== 1,
    value: easingFunction(normalizedTime),
  };
};
