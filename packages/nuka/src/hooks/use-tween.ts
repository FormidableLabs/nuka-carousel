import { useEffect, useState, useRef } from 'react';
import { D3EasingFunctions } from 'src/types';
import * as d3Ease from 'victory-vendor/d3-ease';

/**
 * Provides an interpolated value, beginning at 0 and ending at 1, based on a
 * provided duration and d3-ease animation timing function name.
 */
export const useTween = (
  duration: number, // in milliseconds
  animationTimingFunction: D3EasingFunctions,
  currentSlide: number,
  shouldInterrupt: boolean
) => {
  const [normalizedTimeRaw, setNormalizedTime] = useState(1);
  const startTime = useRef(Date.now());
  const rAF = useRef<number | undefined>();
  const isFirstRender = useRef(true);
  const lastSlide = useRef<number | null>(null);

  // Detect on the first render following a slide change if the animation should
  // be running. If we wait for the useEffect, the first render will flash with
  // the slide in its destination position, before the animation triggers,
  // sending it back to the position of the first frame of the animation. This
  // approach is done in place of a useLayoutEffect, which has issues with SSR.
  const normalizedTime =
    lastSlide.current === null ||
    lastSlide.current === currentSlide ||
    shouldInterrupt
      ? normalizedTimeRaw
      : 0; // 0 here indicates the animation has begun

  useEffect(() => {
    lastSlide.current = currentSlide;

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
          (currentTime - startTime.current) / duration
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
  }, [currentSlide, duration, shouldInterrupt]);

  return {
    isAnimating: normalizedTime !== 1,
    value: d3Ease[animationTimingFunction](normalizedTime),
  };
};
