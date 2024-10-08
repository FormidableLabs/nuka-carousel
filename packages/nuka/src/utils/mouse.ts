export function isMouseEvent(
  e: React.MouseEvent | React.TouchEvent,
): e is React.MouseEvent {
  return 'clientX' && 'clientY' in e;
}
