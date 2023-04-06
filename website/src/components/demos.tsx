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
};

export const BasicDemo = ({
  wrapAround = false,
  autoplay = false,
  startIndex = 0,
}: Props) => {
  return (
    <div>
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
