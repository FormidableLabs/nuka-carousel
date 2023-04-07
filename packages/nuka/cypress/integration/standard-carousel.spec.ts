/* eslint-disable cypress/no-unnecessary-waiting */

describe('Standard Carousel', () => {
  const stdDemoSel = '.standard-demo ';
  const waitThreshold = 500;

  it('should render carousel with 5 slides and only 1 visible slide and go through all of the slides', () => {
    cy.visitCarousel();

    cy.get(stdDemoSel + '.slider-frame').should(
      'have.attr',
      'aria-label',
      'carousel-slider'
    );

    cy.get(stdDemoSel + '.slide.slide-visible')
      .should('have.length', 1)
      .find('div')
      .should('have.attr', 'data-slide', 'Slide 1');

    cy.get(stdDemoSel + '.slide.slide-visible').should(
      'not.have.attr',
      'inert'
    );
    cy.get('.slide').not('.slide-visible').should('have.attr', 'inert');

    cy.get(stdDemoSel + '.paging-item').should('have.length', 5);

    cy.get(stdDemoSel + 'button[aria-label="Go to previous slide"]').should(
      'be.disabled'
    );
    cy.get(stdDemoSel + 'button[aria-label="Go to next slide"]')
      .should('not.be.disabled')
      .click();
    cy.wait(waitThreshold);

    cy.get(stdDemoSel + '.slide.slide-visible')
      .should('have.length', 1)
      .find('div')
      .should('have.attr', 'data-slide', 'Slide 2');

    cy.get(stdDemoSel + 'button[aria-label="Go to next slide"]')
      .should('not.be.disabled')
      .click();
    cy.wait(waitThreshold);

    cy.get(stdDemoSel + '.slide.slide-visible')
      .should('have.length', 1)
      .find('div')
      .should('have.attr', 'data-slide', 'Slide 3');

    cy.get(stdDemoSel + 'button[aria-label="Go to next slide"]')
      .should('not.be.disabled')
      .click();
    cy.wait(waitThreshold);

    cy.get(stdDemoSel + '.slide.slide-visible')
      .should('have.length', 1)
      .find('div')
      .should('have.attr', 'data-slide', 'Slide 4');

    cy.get(stdDemoSel + 'button[aria-label="Go to next slide"]')
      .should('not.be.disabled')
      .click();
    cy.wait(waitThreshold);

    cy.get(stdDemoSel + '.slide.slide-visible')
      .should('have.length', 1)
      .find('div')
      .should('have.attr', 'data-slide', 'Slide 5');

    cy.get(stdDemoSel + 'button[aria-label="Go to next slide"]').should(
      'be.disabled'
    );
  });
});
