import React from 'react';
import Carousel from 'nuka-carousel';
import {
  renderCenterLeftControls,
  renderCenterRightControls,
} from '@site/src/components/controls';
import { Cards } from '@site/src/components/cards';
import clsx from 'clsx';

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
    <div className={clsx(className, 'w-full md:w-[600px] lg:w-[750px]')}>
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
