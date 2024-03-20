import React from 'react';

// this is a terrible hack to support vercel preview deployments
const basePath =
  global.process?.env.VERCEL_ENV === 'preview'
    ? ''
    : '/open-source/nuka-carousel';

export function Image({ src }: { src: string }) {
  return <img src={basePath + src} alt="image" />;
}
