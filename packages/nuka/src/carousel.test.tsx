/**
 * @jest-environment jsdom
 */

import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
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
      afterSlide,
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

  it('omits slides whose children are falsy', () => {
    const { container } = render(
      <Carousel>
        <img src="#" alt={`slide 1`} />
        <img src="#" alt={`slide 2`} />
        {false && <img src="#" alt={`slide 3`} />}
        {null}
        <img src="#" alt={`slide 5`} />
      </Carousel>
    );

    expect(container.getElementsByClassName('slide').length).toBe(3);
  });

  it('can be controlled with the keyboard', () => {
    const beforeSlide = jest.fn();
    const keyCodeConfig = {
      nextSlide: [39],
      previousSlide: [37],
      firstSlide: [81],
      lastSlide: [69],
      pause: [32],
    };
    renderCarousel({
      enableKeyboardControls: true,
      keyCodeConfig,
      slideCount: 8,
      beforeSlide,
    });

    const carouselFrame = screen.getByRole('region');

    fireEvent.keyDown(carouselFrame, { keyCode: keyCodeConfig.nextSlide[0] });
    expect(beforeSlide).toHaveBeenLastCalledWith(0, 1);

    fireEvent.keyDown(carouselFrame, { keyCode: keyCodeConfig.nextSlide[0] });
    expect(beforeSlide).toHaveBeenLastCalledWith(1, 2);

    fireEvent.keyDown(carouselFrame, {
      keyCode: keyCodeConfig.previousSlide[0],
    });
    expect(beforeSlide).toHaveBeenLastCalledWith(2, 1);

    fireEvent.keyDown(carouselFrame, {
      keyCode: keyCodeConfig.previousSlide[0],
    });
    expect(beforeSlide).toHaveBeenLastCalledWith(1, 0);

    fireEvent.keyDown(carouselFrame, { keyCode: keyCodeConfig.lastSlide[0] });
    expect(beforeSlide).toHaveBeenLastCalledWith(0, 7);

    fireEvent.keyDown(carouselFrame, { keyCode: keyCodeConfig.firstSlide[0] });
    expect(beforeSlide).toHaveBeenLastCalledWith(7, 0);
  });
});
