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
    <div className={containerClassName} data-testId={'pageIndicatorContainer'}>
      {[...Array(totalIndicators)].map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToPage(index)}
          className={
            pageIndicatorClassName +
            ' ' +
            (currentPageIndex === index ? currentPageIndicatorClassName : '')
          }
        />
      ))}
    </div>
  );
};
