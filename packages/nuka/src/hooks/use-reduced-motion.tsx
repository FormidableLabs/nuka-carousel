import { useEffect, useState } from 'react';

import { isBrowser } from '../utils';

const QUERY = '(prefers-reduced-motion: no-preference)';
const getInitialState = () =>
  isBrowser() ? !window.matchMedia(QUERY).matches : true;

export function useReducedMotion({ enabled }: { enabled: boolean }) {
  const [reduceMotion, setReducedMotion] = useState(getInitialState);

  useEffect(() => {
    if (!(isBrowser() && enabled)) return;

    const mediaQueryList = window.matchMedia(QUERY);

    const listener = (event: MediaQueryListEvent) => {
      setReducedMotion(!event.matches);
    };

    mediaQueryList.addEventListener('change', listener);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [enabled]);
  return reduceMotion;
}
