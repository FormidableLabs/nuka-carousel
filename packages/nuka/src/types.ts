import { ReactNode } from 'react';

export type ShowArrowsOption = boolean | 'always' | 'hover';
export type ScrollDistanceType = number | 'slide' | 'screen';

export type CarouselCallbacks = {
  beforeSlide?: () => void;
  afterSlide?: () => void;
};

export type CarouselProps = CarouselCallbacks & {
  children: ReactNode;

  arrows?: ReactNode;
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
  dots?: ReactNode;
  id?: string;
  keyboard?: boolean;
  scrollDistance?: ScrollDistanceType;
  showArrows?: ShowArrowsOption;
  showDots?: boolean;
  swiping?: boolean;
  title?: string;
  wrapMode?: 'nowrap' | 'wrap' | 'infinite';
};

export type SlideHandle = {
  goForward: () => void;
  goBack: () => void;
  goToPage: (proposedIndex: number) => void;
};
