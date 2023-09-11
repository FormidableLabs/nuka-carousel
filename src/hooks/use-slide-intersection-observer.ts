import { RefObject, useEffect, useRef, useState } from 'react';

export const useSlideIntersectionObserver = (
  elementRef: RefObject<Element>,
  rootRef: RefObject<Element>,
  callback: (entry: IntersectionObserverEntry) => void
) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const node = elementRef?.current;
    const root = rootRef?.current;

    if (!window.IntersectionObserver || !node || !root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setEntry(entry);
          callbackRef.current(entry);
        });
      },
      {
        threshold: [0.05, 0.95],
        root,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, rootRef]);

  return entry;
};
