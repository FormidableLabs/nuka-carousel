/**
 * @jest-environment jsdom
 */

import React from 'react';
import { act, render } from '@testing-library/react';
import Carousel from './carousel';
import { CarouselProps } from './types';

// Fake timers using Jest
beforeEach(() => {
  jest.useFakeTimers();
});

// Running all pending timers and switching to real timers using Jest
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('Carousel', () => {
  const renderCarousel = ({
    slideCount = 5,
    ...props
  }: CarouselProps & { slideCount?: number } = {}) =>
    render(
      <Carousel {...props}>
        {[...Array(slideCount)].map((_, index) => (
          <img src="#" alt={`slide ${index}`} key={index} />
        ))}
      </Carousel>
    );

  it('autoplays at the right rate', () => {
    const beforeSlide = jest.fn();
    const afterSlide = jest.fn();
    const speed = 500;
    const autoplayInterval = 1000;
    const slideCount = 2;

    renderCarousel({
      slideCount,
      autoplay: true,
      autoplayInterval,
      speed,
      wrapAround: true,
      beforeSlide,
      afterSlide
    });

    expect(beforeSlide).toHaveBeenCalledTimes(0);
    expect(afterSlide).toHaveBeenCalledTimes(0);

    // autoplay initiated, waiting for first interval

    act(() => {
      jest.advanceTimersByTime(autoplayInterval);
    });

    expect(beforeSlide).toHaveBeenCalledTimes(1);
    expect(afterSlide).toHaveBeenCalledTimes(0);

    const checkTimingCycle = (timesMoved: number) => {
      // Animation begins, and next autoplay timeout set up

      act(() => {
        jest.advanceTimersByTime(speed);
      });

      // Animation completes

      expect(beforeSlide).toHaveBeenCalledTimes(timesMoved);
      expect(afterSlide).toHaveBeenCalledTimes(timesMoved);
      expect(afterSlide).toHaveBeenLastCalledWith(timesMoved % slideCount);

      act(() => {
        jest.advanceTimersByTime(autoplayInterval - speed);
      });

      // autoplay timeout triggers

      expect(beforeSlide).toHaveBeenCalledTimes(timesMoved + 1);
      expect(afterSlide).toHaveBeenCalledTimes(timesMoved);
    };

    checkTimingCycle(1);
    checkTimingCycle(2);
    checkTimingCycle(3);
  });
});
