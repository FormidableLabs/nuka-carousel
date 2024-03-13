import React, { useRef } from 'react';
import { Carousel, SlideHandle } from 'nuka-carousel';

type scrollDistanceType = number | 'slide' | 'screen';

type Props = {
  scrollDistance?: scrollDistanceType;
  className?: string;
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
  showForwardBackButtons,
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
        className={className}
        ref={ref}
      >
        <img src="/open-source/nuka-carousel/img/pexels-01.jpg" />
        <img src="/open-source/nuka-carousel/img/pexels-02.jpg" />
        <img src="/open-source/nuka-carousel/img/pexels-03.jpg" />
      </Carousel>

      {showForwardBackButtons && (
        <div>
          <button onClick={() => ref.current && ref.current.goBack()}>
            &lt;
          </button>
          <button onClick={() => ref.current && ref.current.goForward()}>
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export const MethodsDemo = () => {
  const ref = useRef<SlideHandle>(null);
  return (
    <div>
      <Carousel autoplay={false} scrollDistance={'slide'} ref={ref}>
        <img src="/open-source/nuka-carousel/img/pexels-01.jpg" />
        <img src="/open-source/nuka-carousel/img/pexels-02.jpg" />
        <img src="/open-source/nuka-carousel/img/pexels-03.jpg" />
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
