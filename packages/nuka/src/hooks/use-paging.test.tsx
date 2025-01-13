import { renderHook, act } from '@testing-library/react';

import { usePaging } from './use-paging';

describe('usePaging', () => {
  it('should return the current page', () => {
    const { result } = renderHook(() =>
      usePaging({ totalPages: 3, wrapMode: 'wrap' }),
    );
    expect(result.current.currentPage).toBe(0);
  });

  it('should go to the next page', () => {
    const { result } = renderHook(() =>
      usePaging({ totalPages: 3, wrapMode: 'wrap' }),
    );
    act(() => {
      result.current.goForward();
    });
    expect(result.current.currentPage).toBe(1);
  });

  it('should go to the next page and loop back to the first page', () => {
    const { result } = renderHook(() =>
      usePaging({ totalPages: 3, wrapMode: 'wrap' }),
    );
    act(() => {
      result.current.goForward();
      result.current.goForward();
      result.current.goForward();
    });
    expect(result.current.currentPage).toBe(0);
  });

  it('should stop at the last page', () => {
    const { result } = renderHook(() =>
      usePaging({ totalPages: 3, wrapMode: 'nowrap' }),
    );
    act(() => {
      result.current.goForward();
      result.current.goForward();
      result.current.goForward();
    });
    expect(result.current.currentPage).toBe(2);
  });

  it('should go to the previous page', () => {
    const { result } = renderHook(() =>
      usePaging({ totalPages: 3, wrapMode: 'wrap' }),
    );
    act(() => {
      result.current.goForward();
      result.current.goBack();
    });
    expect(result.current.currentPage).toBe(0);
  });

  it('should go to the previous page and wrap back to the last page', () => {
    const { result } = renderHook(() =>
      usePaging({ totalPages: 3, wrapMode: 'wrap' }),
    );
    act(() => {
      result.current.goBack();
    });
    expect(result.current.currentPage).toBe(2);
  });

  it('should stop at the first page', () => {
    const { result } = renderHook(() =>
      usePaging({ totalPages: 3, wrapMode: 'nowrap' }),
    );
    act(() => {
      result.current.goBack();
    });
    expect(result.current.currentPage).toBe(0);
  });

  it('should go to any page', () => {
    const { result } = renderHook(() =>
      usePaging({ totalPages: 5, wrapMode: 'wrap' }),
    );
    act(() => {
      result.current.goToPage(3);
    });
    expect(result.current.currentPage).toBe(3);
  });

  it('should not go to a page that is out of bounds', () => {
    const { result } = renderHook(() =>
      usePaging({ totalPages: 5, wrapMode: 'wrap' }),
    );
    act(() => {
      result.current.goToPage(10);
    });
    expect(result.current.currentPage).toBe(0);
  });

  it('should start at index 0 if not given an initial page index', () => {
    const { result } = renderHook(() =>
      usePaging({ totalPages: 5, wrapMode: 'wrap' }),
    );
    expect(result.current.currentPage).toBe(0);
  });

  it('should start at the given initial page index', () => {
    const { result } = renderHook(() =>
      usePaging({ totalPages: 5, wrapMode: 'wrap', initialPage: 2 }),
    );
    expect(result.current.currentPage).toBe(2);
  });

  it('should start at index 0 if initial page is out of bounds', () => {
    const { result } = renderHook(() =>
      usePaging({ totalPages: 5, wrapMode: 'wrap', initialPage: 200 }),
    );
    expect(result.current.currentPage).toBe(0);
  });
});
