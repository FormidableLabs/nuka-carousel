import { useEffect, useState, useRef } from 'react';
import { D3EasingFunctions } from 'src/types';
import * as d3 from 'd3-ease';

export const useTransition = (
  duration: number, // in milliseconds
  animationTimingFunction: D3EasingFunctions,
  deps?: React.DependencyList
): number => {
  const fps = 1000 / 60;
  const [normalizedTime, setNormalizedTime] = useState(0);
  const startTime = useRef(Date.now());
  const frameLoop = useRef<NodeJS.Timer | null>(null);

  const clearFrameLoop = () => {
    if (frameLoop.current) clearInterval(frameLoop.current);
  };

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

  return d3[animationTimingFunction](normalizedTime);
};
