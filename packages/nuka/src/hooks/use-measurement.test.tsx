/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from '@testing-library/react';

import { useMeasurement } from './use-measurement';
import * as hooks from './use-resize-observer';
import * as browser from '../utils/browser';

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

  it('should return default values if offsetWidth is 0', () => {
    const element = {
      current: {
        scrollWidth: 0,
        offsetWidth: 0,
        querySelector: () => ({
          children: [],
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

    expect(totalPages).toBe(0);
    expect(scrollOffset).toEqual([]);
  });

  it('should return default values if scrollDistance is 0', () => {
    const element = {
      current: {
        scrollWidth: 1000,
        offsetWidth: 500,
        querySelector: () => ({
          children: [],
        }),
      },
    } as any;

    const { result } = renderHook(() =>
      useMeasurement({
        element,
        scrollDistance: 0,
      }),
    );

    const { totalPages, scrollOffset } = result.current;

    expect(totalPages).toBe(0);
    expect(scrollOffset).toEqual([]);
  });

  it('should return default values if scrollDistance is < 0', () => {
    const element = {
      current: {
        scrollWidth: 1000,
        offsetWidth: 500,
        querySelector: () => ({
          children: [],
        }),
      },
    } as any;

    const { result } = renderHook(() =>
      useMeasurement({
        element,
        scrollDistance: -1,
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

  describe('RTL support', () => {
    let isRTLSpy: jest.SpyInstance;

    const mockElement = {
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

    beforeEach(() => {
      isRTLSpy = jest.spyOn(browser, 'isRTL');
    });

    afterEach(() => {
      isRTLSpy.mockRestore();
    });

    it.each([
      ['screen', 2, [0, -500]],
      ['slide', 3, [0, -200, -500]],
      [200, 3, [0, -200, -400]],
    ])(
      'should return negative scroll offsets for %s mode in RTL',
      (scrollDistance, expectedPages, expectedOffsets) => {
        isRTLSpy.mockReturnValue(true);

        const { result } = renderHook(() =>
          useMeasurement({
            element: mockElement,
            scrollDistance: scrollDistance as any,
          }),
        );

        expect(result.current.totalPages).toBe(expectedPages);
        expect(result.current.scrollOffset).toEqual(expectedOffsets);
      },
    );

    it('should return positive scroll offsets in LTR mode', () => {
      isRTLSpy.mockReturnValue(false);

      const { result } = renderHook(() =>
        useMeasurement({
          element: mockElement,
          scrollDistance: 'screen',
        }),
      );

      expect(result.current.totalPages).toBe(2);
      expect(result.current.scrollOffset).toEqual([0, 500]);
    });
  });
});
