import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';
import { CSSProperties } from 'react';

const meta: Meta<typeof Carousel> = {
  title: 'components/Carousel',
  component: (props) => <Carousel {...props} />,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Carousel>;

const getExampleSlideStyles = (index: number): CSSProperties => ({
  backgroundColor: index % 2 == 0 ? 'gray' : 'lightGray',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '15vw',
});

const Slide = ({ index }: { index: number }) => (
  <div style={getExampleSlideStyles(index)}>{index}</div>
);

export const Default: Story = {
  args: {
    children: (
      <>
        {[...Array(6)].map((_, index) => (
          <Slide key={index} index={index} />
        ))}
      </>
    ),
  },
};
