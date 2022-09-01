import { useEffect, useState, useRef } from 'react';
import { D3EasingFunctions } from 'src/types';
import * as d3Ease from 'victory-vendor/d3-ease';

/**
 * Provides an interpolated value from [0, 1] based on a provided duration
 * and d3-ease animation timing function name.
 */
export const useTween = (
  duration: number, // in milliseconds
  animationTimingFunction: D3EasingFunctions,
  deps?: React.DependencyList
): number => {
  const fps = 1000 / 60;
  const [normalizedTime, setNormalizedTime] = useState(0);
  const startTime = useRef(Date.now());
  const frameLoop = useRef<ReturnType<typeof setInterval>>();

  const clearFrameLoop = () => clearInterval(frameLoop?.current);

  const resetFrameLoop = () => {
    startTime.current = Date.now();
    setNormalizedTime(0);
  };

  const updateFrameLoop = () => {
    frameLoop.current = setInterval(() => {
      const currentTime = Date.now();
      const normalizedTime = Math.min(
        1,
        (currentTime - startTime.current) / duration
      );
      setNormalizedTime(normalizedTime);
      if (normalizedTime === 1) clearFrameLoop();
    }, fps);
  };

  useEffect(() => {
    resetFrameLoop();
    updateFrameLoop();
    return () => clearFrameLoop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return d3Ease[animationTimingFunction](normalizedTime);
};
