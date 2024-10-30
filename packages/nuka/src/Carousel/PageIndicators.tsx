import { useCarousel } from '../hooks/use-carousel';
import { cls } from '../utils';

export const PageIndicators = () => {
  const { totalPages, currentPage, goToPage } = useCarousel();

  const className = (index: number) =>
    cls(
      'nuka-page-indicator',
      currentPage === index ? 'nuka-page-indicator-active' : '',
    );

  return (
    <div className="nuka-page-container" data-testid="pageIndicatorContainer">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => goToPage(index)}
          className={className(index)}
        >
          <span className="nuka-hidden">Slide {index + 1}</span>
        </button>
      ))}
    </div>
  );
};
