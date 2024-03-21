import { RefObject, useEffect, useState } from 'react';

export function useResizeObserver(element: RefObject<HTMLElement>) {
  const [dimensions, setDimensions] = useState<DOMRect>();

  useEffect(() => {
    if (!element.current) return;

    const target = element.current;

    const observer = new ResizeObserver(() =>
      setDimensions(target.getBoundingClientRect()),
    );

    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [element]);

  return dimensions;
}
