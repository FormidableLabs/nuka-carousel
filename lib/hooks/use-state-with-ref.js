"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStateWithRef = void 0;
const react_1 = require("react");
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
const useStateWithRef = (initialState) => {
    const [value, setValue] = (0, react_1.useState)(initialState);
    // Need to explicitly type this out, or the overloads can confuse the
    // compiler to think that this might be a React Component ref
    const valueRef = (0, react_1.useRef)(initialState);
    const setValueAndRef = (0, react_1.useCallback)((newValue) => {
        valueRef.current = newValue;
        setValue(newValue);
    }, []);
    return [value, setValueAndRef, valueRef];
};
exports.useStateWithRef = useStateWithRef;
//# sourceMappingURL=use-state-with-ref.js.map