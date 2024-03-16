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
          className={classNames(
            pageIndicatorClassName || 'nuka-page-indicator',
            currentPageIndex === index
              ? currentPageIndicatorClassName || 'active'
              : ''
          )}
        />
      ))}
    </div>
  );
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
