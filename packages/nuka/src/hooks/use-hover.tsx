import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export default function useHover<T extends HTMLElement>(element: RefObject<T>) {
  const [hovered, setHovered] = useState(false);

  const target = element?.current;

  useEffect(() => {
    if (!(target && target.addEventListener)) return;

    const onMouseOver = () => setHovered(true);
    const onMouseOut = () => setHovered(false);

    target.addEventListener('mouseover', onMouseOver);
    target.addEventListener('mouseout', onMouseOut);

    return () => {
      target.removeEventListener('mouseover', onMouseOver);
      target.removeEventListener('mouseout', onMouseOut);
    };
  }, [target]);

  return hovered;
}
