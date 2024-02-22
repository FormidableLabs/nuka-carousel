import React, { useRef } from 'react';
import Carousel, { SlideHandle } from 'nuka-carousel';
import { generateCards } from '@site/src/components/cards';

type scrollDistanceType = number | 'slide' | 'screen';

type Props = {
  className?: string;
  scrollDistance?: scrollDistanceType;
  wrapperClassName?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  showPageIndicators?: boolean;
  pageIndicatorProps?: {
    currentPageIndicatorClassName?: string;
    pageIndicatorClassName?: string;
    containerClassName?: string;
  };
  showForwardBackButtons?: boolean;
};

export const BasicDemo = ({
  autoplay,
  autoplayInterval,
  scrollDistance,
  showPageIndicators,
  pageIndicatorProps,
  wrapperClassName,
  className = '',
}: Props) => {
  const ref = useRef<SlideHandle>(null);
  return (
    <div className={className}>
      <Carousel
        autoplay={autoplay}
        autoplayInterval={autoplayInterval}
        showPageIndicators={showPageIndicators}
        pageIndicatorProps={pageIndicatorProps}
        scrollDistance={scrollDistance}
        wrapperClassName={wrapperClassName}
        ref={ref}
      >
        {generateCards()}
      </Carousel>

      <div>
        <button onClick={() => ref.current && ref.current.goBack()}>
          &lt;
        </button>
        <button onClick={() => ref.current && ref.current.goForward()}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export const MethodsDemo = () => {
  const ref = useRef<SlideHandle>(null);
  return (
    <div>
      <Carousel autoplay={false} scrollDistance={'slide'} ref={ref}>
        {generateCards()}
      </Carousel>

      <div>
        <button onClick={() => ref.current && ref.current.goBack()}>
          goBack()
        </button>
        <button onClick={() => ref.current && ref.current.goForward()}>
          goForward()
        </button>
      </div>
    </div>
  );
};
