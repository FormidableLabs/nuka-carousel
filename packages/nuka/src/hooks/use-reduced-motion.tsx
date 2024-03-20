import { useEffect, useState } from 'react';

import { isBrowser } from '../utils';

const QUERY = '(prefers-reduced-motion: no-preference)';
const getInitialState = () =>
  isBrowser() ? !window.matchMedia(QUERY).matches : true;

export function useReducedMotion() {
  const [enabled, setEnabled] = useState(getInitialState);

  useEffect(() => {
    if (!isBrowser()) return;

    const mediaQueryList = window.matchMedia(QUERY);

    const listener = (event: MediaQueryListEvent) => {
      setEnabled(!event.matches);
    };

    mediaQueryList.addEventListener('change', listener);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);
  return enabled;
}
