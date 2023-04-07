import React from 'react';
import Carousel from 'nuka-carousel';
import {
  renderCenterLeftControls,
  renderCenterRightControls,
} from '@site/src/components/controls';
import { Cards } from '@site/src/components/cards';

type Props = {
  wrapAround?: boolean;
  autoplay?: boolean;
  startIndex?: number;
  className?: string;
};

export const BasicDemo = ({
  wrapAround = false,
  autoplay = false,
  startIndex = 0,
  className = '',
}: Props) => {
  return (
    <div className={className}>
      <Carousel
        slideIndex={startIndex}
        wrapAround={wrapAround}
        autoplay={autoplay}
        autoplayInterval={2000}
        renderCenterLeftControls={renderCenterLeftControls}
        renderCenterRightControls={renderCenterRightControls}
      >
        {Cards}
      </Carousel>
    </div>
  );
};
