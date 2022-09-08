import { useLayoutEffect, useState, useRef } from 'react';
import { D3EasingFunctions } from 'src/types';
import * as d3Ease from 'd3-ease';

/**
 * Provides an interpolated value from [0, 1] based on a provided duration
 * and d3-ease animation timing function name.
 */
export const useTween = (
  duration: number, // in milliseconds
  animationTimingFunction: D3EasingFunctions,
  currentSlide: number,
  shouldInterrupt: boolean
) => {
  const [normalizedTime, setNormalizedTime] = useState(0);
  const startTime = useRef(Date.now());
  const rAF = useRef<number | undefined>();
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (shouldInterrupt) {
      return;
    }

    startTime.current = Date.now();
    setNormalizedTime(0.0000001);

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
        }
      });
    };
    tick();

    return () => {
      if (rAF.current !== undefined) {
        cancelAnimationFrame(rAF.current);
      }
    };
  }, [currentSlide, duration, shouldInterrupt]);

  return {
    isAnimating: normalizedTime !== 0 && normalizedTime !== 1,
    value: d3Ease[animationTimingFunction](normalizedTime),
  };
};
