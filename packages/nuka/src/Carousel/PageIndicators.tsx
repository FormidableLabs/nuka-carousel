import { cls } from '../utils';

export type PageIndicatorsProps = {
  totalIndicators: number;
  currentPageIndex: number;
  currentPageIndicatorClassName?: string;
  pageIndicatorClassName?: string;
  containerClassName?: string;
  scrollToPage: (index: number) => void;
};

export const PageIndicators = ({
  totalIndicators,
  currentPageIndex,
  currentPageIndicatorClassName,
  pageIndicatorClassName,
  containerClassName,
  scrollToPage,
}: PageIndicatorsProps) => {
  return (
    <div
      className={containerClassName || 'nuka-page-container'}
      data-testid="pageIndicatorContainer"
    >
      {[...Array(totalIndicators)].map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToPage(index)}
          className={cls(
            pageIndicatorClassName || 'nuka-page-indicator',
            currentPageIndex === index
              ? currentPageIndicatorClassName || 'nuka-page-indicator-active'
              : ''
          )}
        >
          <span className="nuka-hidden">{index + 1}</span>
        </button>
      ))}
    </div>
  );
};
