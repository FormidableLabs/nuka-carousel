import { CSSProperties } from 'react';
import { Positions } from './types';

export const getDecoratorStyles = (pos: Positions): CSSProperties => {
  switch (pos) {
    case Positions.TopLeft: {
      return {
        position: 'absolute',
        top: 0,
        left: 0
      };
    }
    case Positions.TopCenter: {
      return {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        WebkitTransform: 'translateX(-50%)',
        msTransform: 'translateX(-50%)'
      };
    }
    case Positions.TopRight: {
      return {
        position: 'absolute',
        top: 0,
        right: 0
      };
    }
    case Positions.CenterLeft: {
      return {
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
        WebkitTransform: 'translateY(-50%)',
        msTransform: 'translateY(-50%)'
      };
    }
    case Positions.CenterCenter: {
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        WebkitTransform: 'translate(-50%, -50%)',
        msTransform: 'translate(-50%, -50%)'
      };
    }
    case Positions.CenterRight: {
      return {
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        WebkitTransform: 'translateY(-50%)',
        msTransform: 'translateY(-50%)'
      };
    }
    case Positions.BottomLeft: {
      return {
        position: 'absolute',
        bottom: 0,
        left: 0
      };
    }
    case Positions.BottomCenter: {
      return {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        WebkitTransform: 'translateX(-50%)',
        msTransform: 'translateX(-50%)'
      };
    }
    case Positions.BottomRight: {
      return {
        position: 'absolute',
        bottom: 0,
        right: 0
      };
    }
    default: {
      return {
        position: 'absolute',
        top: 0,
        left: 0
      };
    }
  }
};
