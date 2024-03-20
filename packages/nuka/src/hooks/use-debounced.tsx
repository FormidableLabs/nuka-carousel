import { useCallback, useRef } from 'react';

type CallbackFunction = (...args: never[]) => void;

export function useDebounced(callback: CallbackFunction, delay: number) {
  const timerRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: never[]) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}
