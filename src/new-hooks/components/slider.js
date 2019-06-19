import React from 'react';
import { useTransition, animated } from 'react-spring';
import './anim-style.css';

const Slider = ({
  children,
  slideIndex,
  slideDirection,
  slideWidth,
  slideHeight
}) => {
  const lifeCycle =
    slideDirection === 'prev'
      ? {
          from: {
            width: '100%',
            position: 'absolute',
            transform: 'translate(-100%, 0%)'
          },
          enter: {
            width: '100%',
            position: 'absolute',
            transform: 'translate(0, 0%)'
          },
          leave: {
            width: '100%',
            position: 'absolute',
            transform: 'translate(100%, 0%)'
          }
        }
      : {
          from: {
            width: '100%',
            position: 'absolute',
            transform: 'translate(100%, 0%)'
          },
          enter: {
            width: '100%',
            position: 'absolute',
            transform: 'translate(0, 0%)'
          },
          leave: {
            width: '100%',
            position: 'absolute',
            transform: 'translate(-100%, 0%)'
          }
        };
  const transitions = useTransition(slideIndex, p => p, lifeCycle);

  return (
    <div
      className="slider-style"
      style={{
        width: `${slideWidth}`,
        height: `${slideHeight}`,
        overflow: 'hidden'
      }}
    >
      {transitions.map(({ item, props, key }) => {
        const Slide = ({ style }) => (
          <animated.div style={{ ...style }}>{children[item]}</animated.div>
        );
        return <Slide key={key} style={props} />;
      })}
    </div>
  );
};

export default Slider;
