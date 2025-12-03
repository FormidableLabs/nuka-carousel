export const isBrowser = () => typeof window !== 'undefined';

/**
 * Detects if an element or the document is in right-to-left (RTL) mode.
 * Checks the computed direction style to support both document-level and element-level RTL.
 * This is used to adjust scroll offsets for RTL layouts.
 */
export function isRTL(element?: HTMLElement | null) {
  if (!isBrowser()) return false;
  
  if (element) {
    const direction = window.getComputedStyle(element).direction;
    return direction === 'rtl';
  }
  
  return document.documentElement.dir === 'rtl';
}
