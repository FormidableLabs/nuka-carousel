/* eslint-disable cypress/no-unnecessary-waiting */

describe('Wrap-Around Carousel', () => {
  const waDemoSel = '.wrap-around-demo ';
  const waitThreshold = 500;

  it('should render carousel with 5 slides and only 1 visible slide and go through all of the slides', () => {
    cy.visitCarousel();

    cy.get('li').contains('Wrap Around').click();

    cy.get(waDemoSel + '.slider-frame').should(
      'have.attr',
      'aria-label',
      'carousel-slider'
    );

    cy.get(waDemoSel + '.slide.slide-visible')
      .should('have.length', 1)
      .find('div')
      .should('have.attr', 'data-slide', 'Slide 1');

    cy.get(waDemoSel + '.slide.slide-visible').should('not.have.attr', 'inert');
    cy.get('.slide').not('.slide-visible').should('have.attr', 'inert');

    cy.get(waDemoSel + '.paging-item').should('have.length', 5);

    /**
     * Click through to the final slide and verify it shows
     * and the next button is still enabled.
     */

    cy.get(waDemoSel + 'button[aria-label="Go to previous slide"]').should(
      'be.not.disabled'
    );
    cy.get(waDemoSel + 'button[aria-label="Go to next slide"]')
      .should('not.be.disabled')
      .click();
    cy.wait(waitThreshold);

    cy.get(waDemoSel + 'button[aria-label="Go to next slide"]')
      .should('not.be.disabled')
      .click();
    cy.wait(waitThreshold);

    cy.get(waDemoSel + 'button[aria-label="Go to next slide"]')
      .should('not.be.disabled')
      .click();
    cy.wait(waitThreshold);

    cy.get(waDemoSel + 'button[aria-label="Go to next slide"]')
      .should('not.be.disabled')
      .click();
    cy.wait(500);

    cy.get(waDemoSel + '.slide.slide-visible')
      .should('have.length', 1)
      .find('div')
      .should('have.attr', 'data-slide', 'Slide 5');

    /**
     * Click next slide to see if it can go from 5 -> 1
     * and the next previous is still enabled.
     */

    cy.get(waDemoSel + 'button[aria-label="Go to next slide"]')
      .should('not.be.disabled')
      .click();
    cy.wait(waitThreshold);

    cy.get(waDemoSel + '.slide.slide-visible')
      .should('have.length', 1)
      .find('div')
      .should('have.attr', 'data-slide', 'Slide 1');

    /**
     * Click previous slide to see if it can go from 1 -> 5 again
     */

    cy.get(waDemoSel + 'button[aria-label="Go to previous slide"]')
      .should('not.be.disabled')
      .click();
    cy.wait(waitThreshold);

    cy.get(waDemoSel + '.slide.slide-visible')
      .should('have.length', 1)
      .find('div')
      .should('have.attr', 'data-slide', 'Slide 5');
  });
});
