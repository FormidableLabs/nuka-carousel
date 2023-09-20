import { EasingFunction } from 'src/types';
/**
 * Provides an interpolated value, beginning at 0 and ending at 1, based on a
 * provided duration and animation timing function.
 */
export declare const useTween: (durationMs: number, easingFunction: EasingFunction, navigationNum: number, shouldInterrupt: boolean) => {
    isAnimating: boolean;
    value: number;
};
//# sourceMappingURL=use-tween.d.ts.map