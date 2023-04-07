import { assertVisibleSlide, navigateToNextSlide } from '../support/util';

describe('Standard Carousel', () => {
  const stdDemoSel = '.standard-demo ';

  it('should render carousel with 5 slides and only 1 visible slide and go through all of the slides', () => {
    cy.visitCarousel();

    cy.get(stdDemoSel + '.slider-frame').should(
      'have.attr',
      'aria-label',
      'carousel-slider'
    );

    assertVisibleSlide(stdDemoSel, 1);

    cy.get(stdDemoSel + '.paging-item').should('have.length', 5);

    cy.get(stdDemoSel + 'button[aria-label="Go to previous slide"]').should(
      'be.disabled'
    );

    /**
     * Navigate through the entire carousel and verify the buttons
     * are enabled until the last slide.
     */

    navigateToNextSlide(stdDemoSel);
    assertVisibleSlide(stdDemoSel, 2);

    navigateToNextSlide(stdDemoSel);
    assertVisibleSlide(stdDemoSel, 3);

    navigateToNextSlide(stdDemoSel);
    assertVisibleSlide(stdDemoSel, 4);

    navigateToNextSlide(stdDemoSel);
    assertVisibleSlide(stdDemoSel, 5);

    cy.get(stdDemoSel + 'button[aria-label="Go to next slide"]').should(
      'be.disabled'
    );
  });
});
