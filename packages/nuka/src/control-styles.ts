import { CSSProperties } from 'react';
import { Positions } from './types';

const commonStyles: CSSProperties = {
  position: 'absolute',
  display: 'flex',
  zIndex: 1,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

/**
 * Gets flexbox alignment and justify-content styles for a given position.
 */
const getControlContainerFlexStyles = (pos: Positions): CSSProperties => {
  let alignItems: CSSProperties['alignItems'];

  switch (pos) {
    case Positions.TopLeft:
    case Positions.TopCenter:
    case Positions.TopRight:
      alignItems = 'flex-start';
      break;
    case Positions.CenterLeft:
    case Positions.CenterCenter:
    case Positions.CenterRight:
      alignItems = 'center';
      break;
    case Positions.BottomLeft:
    case Positions.BottomCenter:
    case Positions.BottomRight:
      alignItems = 'flex-end';
      break;
  }

  let justifyContent: CSSProperties['justifyContent'];
  switch (pos) {
    case Positions.TopLeft:
    case Positions.CenterLeft:
    case Positions.BottomLeft:
      justifyContent = 'flex-start';
      break;
    case Positions.TopCenter:
    case Positions.CenterCenter:
    case Positions.BottomCenter:
      justifyContent = 'center';
      break;
    case Positions.TopRight:
    case Positions.CenterRight:
    case Positions.BottomRight:
      justifyContent = 'flex-end';
      break;
  }

  return { alignItems, justifyContent };
};

/**
 * Gets the styles for a back/forward control container to align the control
 * properly within the parent.
 */
export const getControlContainerStyles = (pos: Positions): CSSProperties => {
  return { ...getControlContainerFlexStyles(pos), ...commonStyles };
};
