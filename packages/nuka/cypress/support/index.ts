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
    }
  }
}

Cypress.Commands.add(
  'visitWithCarouselProps',
  ({ slideCount = 5, ...props } = {}) => {
    cy.visit(
      `http://localhost:3000/?slides=${slideCount}&params=${JSON.stringify(
        props
      )}`
    );
  }
);
