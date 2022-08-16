// / <reference types="cypress" />
/* eslint-disable cypress/no-unnecessary-waiting */

// Test cases
// Swipe before and after threshold

context('Swipe Carousel', () => {
  const carouselWidth = 600;
  // Speed up transition animation time and set fixed width for easier drag
  // distance calculations
  const sharedParams = { speed: 50, style: { width: carouselWidth } };

  const swipeSlider = (
    distance,
    { waitMs = 120 }: { waitMs?: number } = {}
  ) => {
    const [start, end] =
      distance >= 0 ? [distance, 0] : [0, Math.abs(distance)];

    cy.get('.slider-container')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: start });

    cy.wait(waitMs);

    cy.get('.slider-container')
      .trigger('mousemove', { clientX: end })
      .trigger('mouseup');
  };
  const assertFirstSlideIs = (slideNumber: number) => {
    cy.get('.slide.slide-visible img').should(
      'have.attr',
      'data-slide',
      `Slide ${slideNumber}`
    );
  };

  describe('Swipe Carousel variations', () => {
    it('should render a carousel with 6 slides and 3 visible slides and go through all of the slides by swiping forwards and then reverses', () => {
      const slidesToShow = 3;
      const params = {
        ...sharedParams,
        slidesToShow
      };

      cy.visit(
        `http://localhost:3000/?slides=6&params=${JSON.stringify(params)}`
      );

      // Half of one slide should be barely enough to scroll once with the
      // default threshold
      const distance = carouselWidth / slidesToShow / 2;

      assertFirstSlideIs(1);

      swipeSlider(distance);

      assertFirstSlideIs(2);

      swipeSlider(distance);

      assertFirstSlideIs(3);

      swipeSlider(-distance);

      assertFirstSlideIs(2);

      swipeSlider(-distance);

      assertFirstSlideIs(1);
    });

    it('should render a carousel with 6 slides and 3 visible slides and not advance with a small swipe', () => {
      const slidesToShow = 3;
      const params = {
        ...sharedParams,
        slidesToShow
      };

      // Half of one slide should be barely enough to scroll once with the
      // default threshold
      const distance = carouselWidth / slidesToShow / 2 - 1;

      cy.visit(
        `http://localhost:3000/?slides=6&params=${JSON.stringify(params)}`
      );

      assertFirstSlideIs(1);

      swipeSlider(distance);

      assertFirstSlideIs(1);

      swipeSlider(distance + 1);

      assertFirstSlideIs(2);

      swipeSlider(-distance);

      assertFirstSlideIs(2);
    });
  });
});
