import React, { AriaAttributes, CSSProperties } from 'react';

const styles: CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  padding: 0,
  margin: '-1px',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

const AnnounceSlide = ({
  message,
  ariaLive = 'polite',
}: {
  message: string;
  ariaLive: AriaAttributes['aria-live'];
}): React.ReactElement => (
  <div aria-live={ariaLive} aria-atomic="true" style={styles} tabIndex={-1}>
    {message}
  </div>
);

export const defaultRenderAnnounceSlideMessage = ({
  currentSlide,
  count,
}: {
  currentSlide: number;
  count: number;
}): string => `Slide ${currentSlide + 1} of ${count}`;

export default AnnounceSlide;
