/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { Carousel } from './Carousel';
import { ExampleSlide } from './ExampleSlide';

describe('Carousel', () => {
  it('renders', () => {
    render(
      <Carousel>
        <ExampleSlide index={0} />
      </Carousel>
    );
  });
  it.todo('passes a className and ref for the parent');
  it.todo('passes the same className for each of the children');
  it.todo('is draggable through touch controls');
  it.todo('has a next and previous function that is callable from its parent');
  it.todo('can slide');
  it.todo('omits slides whose children are falsy');

  it.todo('autoplays at the right rate');

  it.todo('returns the right number of page dots');
});
