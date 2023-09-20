// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { CarouselProps } from '../../src/types';
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Custom command typings, based on documentation at
// https://docs.cypress.io/guides/tooling/typescript-support#Types-for-Custom-Commands
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Opens the dev site with a carousel set to the designated props.
       */
      visitWithCarouselProps(
        propsObj: CarouselProps & { slideCount?: number }
      ): ReturnType<typeof cy.visit>;
      /**
       * Simulates a swipe gesture on the carousel
       * @param distance - the distance (px) to swipe from right to left (or
       * left to right if negative)
       */
      swipeSlider(
        distance: number,
        options?: { waitMs?: number }
      ): ReturnType<typeof cy.get>;
    }
  }
}

Cypress.Commands.add(
  'visitWithCarouselProps',
  ({ slideCount = 9, ...props } = {}) => {
    cy.visit(
      `http://localhost:3000/?slides=${slideCount}&params=${JSON.stringify(
        props
      )}`
    );
  }
);

Cypress.Commands.add('swipeSlider', (distance, { waitMs = 1000 } = {}) => {
  const [start, end] = distance >= 0 ? [distance, 0] : [0, Math.abs(distance)];

  // Mock out the Date object so we can precisely simulate gesture event
  // timing. Cypress' timing is too flaky due to its UI checks to be reliable
  // on the millisecond level.
  cy.clock(Date.UTC(2018, 10, 30), ['Date']);

  cy.get('.slider-container')
    .trigger('mousedown', { which: 1 })
    .trigger('mousemove', { clientX: start })
    .then(function () {
      this.clock.tick(waitMs - 1);
    })
    .trigger('mousemove', {
      // Add in one extra move event prior to the final one to fill the
      // position buffer used to calculate inertia, so that calls with waitMs
      // longer than 100ms (the maximum the position buffer keeps) will get
      // proper velocity calculations. We use linear interpolation to
      // determine a point that is consistent with a swipe of constant speed
      // from start to end.
      clientX: start + ((waitMs - 1) / waitMs) * (end - start),
    })
    .then(function () {
      this.clock.tick(1);
    })
    .trigger('mousemove', { clientX: end })
    .trigger('mouseup')
    .then(function () {
      this.clock.restore();
    });
});
