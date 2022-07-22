import React, { AriaAttributes } from 'react';
declare const AnnounceSlide: ({ message, ariaLive }: {
    message: string;
    ariaLive: AriaAttributes['aria-live'];
}) => React.ReactElement;
export declare const defaultRenderAnnounceSlideMessage: ({ currentSlide, count }: {
    currentSlide: number;
    count: number;
}) => string;
export default AnnounceSlide;
