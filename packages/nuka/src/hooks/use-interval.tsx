import { useEffect, useRef } from 'react';

type CallbackFunction = (...args: never[]) => void;

export function useInterval(
  callback: CallbackFunction,
  delay: number,
  enabled = true
) {
  const _callback = useRef<CallbackFunction>();

  useEffect(() => {
    _callback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (enabled && delay !== null) {
      const id = setInterval(() => {
        if (_callback.current) _callback.current();
      }, delay);
      return () => clearInterval(id);
    }
  }, [delay, enabled]);
}
