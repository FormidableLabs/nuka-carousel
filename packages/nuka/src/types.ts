import { ReactNode } from 'react';

export type ShowArrowsOption = boolean | 'always' | 'hover';
export type ScrollDistanceType = number | 'slide' | 'screen';

export type CarouselCallbacks = {
  beforeSlide?: (currentSlideIndex: number, endSlideIndex: number) => void;
  afterSlide?: (endSlideIndex: number) => void;
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
  minSwipeDistance?: number;
  scrollDistance?: ScrollDistanceType;
  showArrows?: ShowArrowsOption;
  showDots?: boolean;
  swiping?: boolean;
  title?: string;
  wrapMode?: 'nowrap' | 'wrap';
  initialPage?: number;
};

export type SlideHandle = {
  goForward: () => void;
  goBack: () => void;
  goToPage: (proposedIndex: number) => void;
};
