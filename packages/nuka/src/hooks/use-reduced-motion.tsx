import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';
const getInitialState = () => !window.matchMedia(QUERY).matches;

export function useReducedMotion() {
  const [enabled, setEnabled] = useState(getInitialState);

  useEffect(() => {
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
