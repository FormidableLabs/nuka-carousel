import React from 'react';

const colors = ['7732bb', '047cc0', '00884b', 'e3bc13', 'db7c00', 'aa231f'];

export const Demo = colors.map((color, index) => (
  <img
    src={`http://placehold.it/1000x400/${color}/ffffff/&text=slide${index + 1}`}
    alt={`Slide ${index + 1}`}
    key={color}
  />
));
