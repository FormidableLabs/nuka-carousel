import {
  assertVisibleSlide,
  navigateToNextSlide,
  navigateToPreviousSlide,
} from '../support/util';

describe('Wrap-Around Carousel', () => {
  const waDemoSel = '.wrap-around-demo ';

  it('should render carousel with 5 slides and only 1 visible slide and go through all of the slides', () => {
    cy.visitCarousel();

    cy.get('li').contains('Wrap Around').click();

    cy.get(waDemoSel + '.slider-frame').should(
      'have.attr',
      'aria-label',
      'carousel-slider'
    );

    assertVisibleSlide(waDemoSel, 1);

    cy.get(waDemoSel + '.paging-item').should('have.length', 5);

    /**
     * Click through to the final slide and verify it shows
     * and the next button is still enabled.
     */

    cy.get(waDemoSel + 'button[aria-label="Go to previous slide"]').should(
      'be.not.disabled'
    );
    navigateToNextSlide(waDemoSel);
    navigateToNextSlide(waDemoSel);
    navigateToNextSlide(waDemoSel);
    navigateToNextSlide(waDemoSel);
    assertVisibleSlide(waDemoSel, 5);

    /**
     * Click next slide to see if it can go from 5 -> 1
     * and the next previous is still enabled.
     */

    navigateToNextSlide(waDemoSel);
    assertVisibleSlide(waDemoSel, 1);

    /**
     * Click previous slide to see if it can go from 1 -> 5 again
     */

    navigateToPreviousSlide(waDemoSel);
    assertVisibleSlide(waDemoSel, 5);
  });
});
