"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSlideIntersectionObserver = void 0;
const react_1 = require("react");
const useSlideIntersectionObserver = (elementRef, rootRef, callback) => {
    const [entry, setEntry] = (0, react_1.useState)();
    const callbackRef = (0, react_1.useRef)(callback);
    (0, react_1.useEffect)(() => {
        callbackRef.current = callback;
    }, [callback]);
    (0, react_1.useEffect)(() => {
        const node = elementRef === null || elementRef === void 0 ? void 0 : elementRef.current;
        const root = rootRef === null || rootRef === void 0 ? void 0 : rootRef.current;
        if (!window.IntersectionObserver || !node || !root)
            return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setEntry(entry);
                callbackRef.current(entry);
            });
        }, {
            threshold: [0.05, 0.95],
            root,
        });
        observer.observe(node);
        return () => observer.disconnect();
    }, [elementRef, rootRef]);
    return entry;
};
exports.useSlideIntersectionObserver = useSlideIntersectionObserver;
//# sourceMappingURL=use-slide-intersection-observer.js.map