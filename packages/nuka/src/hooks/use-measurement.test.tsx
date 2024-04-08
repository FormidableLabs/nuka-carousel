/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from '@testing-library/react';

import { useMeasurement } from './use-measurement';
import * as hooks from './use-resize-observer';

const domElement = {} as any;
jest.spyOn(hooks, 'useResizeObserver').mockImplementation(() => domElement);

describe('useMeasurement', () => {
  it('return the default values', () => {
    const { result } = renderHook(() =>
      useMeasurement({
        element: { current: null },
        scrollDistance: 'screen',
      }),
    );

    const { totalPages, scrollOffset } = result.current;

    expect(totalPages).toBe(0);
    expect(scrollOffset).toEqual([]);
  });

  it('should return measurements for screen', () => {
    const element = {
      current: {
        // this test covers a specific rounding error that can
        // occur when the scrollWidth/offsetWidth returns a float
        scrollWidth: 900,
        offsetWidth: 500,
        querySelector: () => ({
          children: [
            { offsetWidth: 200 },
            { offsetWidth: 300 },
            { offsetWidth: 400 },
          ],
        }),
      },
    } as any;

    const { result } = renderHook(() =>
      useMeasurement({
        element,
        scrollDistance: 'screen',
      }),
    );

    const { totalPages, scrollOffset } = result.current;

    expect(totalPages).toBe(2);
    expect(scrollOffset).toEqual([0, 500]);
  });

  it('should return measurements for screen with fractional pixels', () => {
    const element = {
      current: {
        // this test covers a specific rounding error that can
        // occur when the scrollWidth/offsetWidth returns a float
        scrollWidth: 1720,
        offsetWidth: 573,
        querySelector: () => ({
          children: [
            { offsetWidth: 573 },
            { offsetWidth: 573 },
            { offsetWidth: 573 },
          ],
        }),
      },
    } as any;

    const { result } = renderHook(() =>
      useMeasurement({
        element,
        scrollDistance: 'screen',
      }),
    );

    const { totalPages, scrollOffset } = result.current;

    expect(totalPages).toBe(3);
    expect(scrollOffset).toEqual([0, 573, 1146]);
  });

  it('should return measurements for slide distance', () => {
    const element = {
      current: {
        scrollWidth: 900,
        offsetWidth: 500,
        querySelector: () => ({
          children: [
            { offsetWidth: 200 },
            { offsetWidth: 300 },
            { offsetWidth: 400 },
          ],
        }),
      },
    } as any;

    const { result } = renderHook(() =>
      useMeasurement({
        element,
        scrollDistance: 'slide',
      }),
    );

    const { totalPages, scrollOffset } = result.current;

    expect(totalPages).toBe(3);
    expect(scrollOffset).toEqual([0, 200, 500]);
  });

  it('should return measurements for numbered distance', () => {
    const element = {
      current: {
        scrollWidth: 900,
        offsetWidth: 500,
        querySelector: () => ({
          children: [
            { offsetWidth: 200 },
            { offsetWidth: 300 },
            { offsetWidth: 400 },
          ],
        }),
      },
    } as any;

    const { result } = renderHook(() =>
      useMeasurement({
        element,
        scrollDistance: 200,
      }),
    );

    const { totalPages, scrollOffset } = result.current;

    expect(totalPages).toBe(3);
    expect(scrollOffset).toEqual([0, 200, 400]);
  });
});
