import { useEffect, useRef } from 'react';

/**
 * Allows a React.ForwardRefExoticComponent to reference the forwarded ref
 */
export const useShareForwardedRef = <T>(
  forwardedRef: React.ForwardedRef<T>
) => {
  const innerRef = useRef<T>(null);

  useEffect(() => {
    if (!forwardedRef) return;
    if (typeof forwardedRef === 'function') {
      forwardedRef(innerRef.current);
      return;
    } else {
      forwardedRef.current = innerRef.current;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return innerRef;
};
