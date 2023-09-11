import { MutableRefObject, useCallback, useRef, useState } from 'react';

/**
 * Like useState, but also returns a ref that's always instantly updated.
 *
 * This is useful in two cases:
 *
 * 1. You need to both force a re-render when a variable changes, and
 *    also avoid re-running side effects (for example, a network call), even
 *    before the state fully updates for the component.
 * 2. Multiple callbacks need to modify the same object or array before the
 *    state updates. For example, if one callback tries to append 4 to
 *    `[1, 2, 3]` and another tries to append 5, we may end up with only
 *    `[1, 2, 3, 5]` instead of `[1, 2, 3, 4, 5]`
 */
export const useStateWithRef = <S>(
  initialState: S
): [S, (newValue: S) => void, MutableRefObject<S>] => {
  const [value, setValue] = useState(initialState);
  // Need to explicitly type this out, or the overloads can confuse the
  // compiler to think that this might be a React Component ref
  const valueRef = useRef<S>(initialState) as MutableRefObject<S>;

  const setValueAndRef = useCallback((newValue: S) => {
    valueRef.current = newValue;
    setValue(newValue);
  }, []);

  return [value, setValueAndRef, valueRef];
};
