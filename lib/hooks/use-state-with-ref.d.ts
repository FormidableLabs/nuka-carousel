import { MutableRefObject } from 'react';
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
export declare const useStateWithRef: <S>(initialState: S) => [S, (newValue: S) => void, MutableRefObject<S>];
//# sourceMappingURL=use-state-with-ref.d.ts.map