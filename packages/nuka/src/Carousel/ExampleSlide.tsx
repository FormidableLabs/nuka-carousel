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

export const FullWidthSlide = ({ index }: { index: number }) => (
  <div
    style={{
      ...getExampleSlideStyles(index),
      padding: '15vw 0',
      minWidth: '100%',
    }}
  >
    {index}
  </div>
);

export const FocusableLinkSlide = ({ index }: { index: number }) => (
  <a
    href="#"
    style={{
      ...getExampleSlideStyles(index),
      flexDirection: 'column',
    }}
    onFocus={(event) => event.target.scrollIntoView()}
    className="focusable"
  >
    Card {index}
  </a>
);
