import { useEffect } from 'react';
import type { RefObject } from 'react';

export default function useKeyboard<T extends HTMLElement>({
  element,
  enabled,
  goForward,
  goBack,
}: {
  element: RefObject<T>;
  enabled: boolean;
  goForward: () => void;
  goBack: () => void;
}) {
  const target = element?.current;

  useEffect(() => {
    if (target && enabled) {
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          goBack();
        } else if (e.key === 'ArrowRight') {
          goForward();
        }
      };
      target.addEventListener('keydown', onKeyDown);
      return () => target.removeEventListener('keydown', onKeyDown);
    }
  }, [enabled, goBack, goForward, target]);
}
