import { CSSProperties } from 'react';

const getExampleSlideStyles = (index: number): CSSProperties => ({
  backgroundColor: index % 2 == 0 ? 'gray' : 'lightGray',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '15vw',
  minWidth: index === 1 ? '300px' : 'auto',
});

export const ExampleSlide = ({ index }: { index: number }) => (
  <div style={getExampleSlideStyles(index)}>{index}</div>
);
