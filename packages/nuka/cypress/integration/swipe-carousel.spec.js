// / <reference types="cypress" />
/* eslint-disable cypress/no-unnecessary-waiting */

// Test cases
// Swipe before and after threshold

context('Swipe Carousel', () => {
  describe('Swipe Carousel variations', () => {
    it('should render a carousel with 6 slides and 3 visible slides and go through all of the slides by swiping forwards and then backwards', () => {
      const params = {
        slidesToShow: 3
      };

      const swipeSlider = (backward) => {
        cy.get('.slider-container')
          .trigger('mousedown', { which: 1 })
          .trigger('mousemove', {
            clientX: backward ? 0 : 500
          })
          .trigger('mousemove', {
            clientX: backward ? 500 : 0
          })
          .trigger('mouseup');
      };

      cy.visit(
        `http://localhost:3000/?slides=6&params=${JSON.stringify(params)}`
      );

      swipeSlider();

      cy.wait(1020);

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 2');

      swipeSlider();

      cy.wait(1020);

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 3');

      swipeSlider();

      cy.wait(1020);

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 4');

      swipeSlider(true);

      cy.wait(1020);

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 3');

      swipeSlider(true);

      cy.wait(1020);

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 2');

      swipeSlider(true);

      cy.wait(1020);

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 1');
    });

    it('should render a carousel with 6 slides and 3 visible slides and not advance with a small swipe', () => {
      const params = {
        slidesToShow: 3
      };

      const swipeSlider = (backward) => {
        cy.get('.slider-container')
          .trigger('mousedown', { which: 1 })
          .trigger('mousemove', {
            clientX: backward ? 0 : 50
          })
          .trigger('mousemove', {
            clientX: backward ? 50 : 0
          })
          .trigger('mouseup');
      };

      cy.visit(
        `http://localhost:3000/?slides=6&params=${JSON.stringify(params)}`
      );

      swipeSlider();

      cy.wait(1020);

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 1');

      swipeSlider(true);

      cy.wait(1020);

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 1');
    });
  });
});
