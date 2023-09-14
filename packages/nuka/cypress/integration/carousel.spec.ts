/* eslint-disable cypress/no-unnecessary-waiting */

context('Carousel', () => {
  // Speed up transition animation time
  const sharedParams = { speed: 50 };

  describe('Carousel variations', () => {
    it.skip('should render carousel with 4 slides and only 1 visible slide and go through all of the slides', () => {
      cy.visitWithCarouselProps({
        ...sharedParams,
        slideCount: 4,
      });

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 1');

      cy.get('.slide.slide-visible').should('not.have.attr', 'inert');
      cy.get('.slide').not('.slide-visible').should('have.attr', 'inert');

      cy.get('.paging-item').should('have.length', 4);

      cy.get('button').contains('Prev').should('be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 2');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 3');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 4');

      cy.get('button').contains('Next').should('be.disabled');
      cy.get('button').contains('Prev').should('not.be.disabled').click();

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 3');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled');
    });

    it.skip('should render carousel with 6 slides and 2 visible slides and slides to scroll equal to 2', () => {
      cy.visitWithCarouselProps({
        ...sharedParams,
        slideCount: 6,
        slidesToShow: 2,
        slidesToScroll: 2,
      });

      cy.get('.slide.slide-visible')
        .should('have.length', 2)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 1');

      cy.get('button').contains('Prev').should('be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();

      cy.get('.slide.slide-visible')
        .should('have.length', 2)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 3');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();

      cy.get('.slide.slide-visible')
        .should('have.length', 2)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 5');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('be.disabled');
    });

    it('should render carousel with 5 slides and 2 visible slides without controls', () => {
      cy.visitWithCarouselProps({
        ...sharedParams,
        slideCount: 5,
        slidesToShow: 2,
        withoutControls: true,
      });

      cy.get('.slide.slide-visible')
        .should('have.length', 2)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 1');

      cy.get('button').should('not.exist');
      cy.get('.paging-item').should('not.exist');
    });

    it('should have role region if label is supplied', () => {
      const params = {
        carouselId: 'region-carousel',
        frameAriaLabel: 'Featured',
      };

      cy.visit(
        `http://localhost:3000/?slides=5&params=${JSON.stringify(params)}`
      );

      cy.get(`#${params.carouselId}`)
        .should('have.attr', 'aria-label', params.frameAriaLabel)
        .should('have.attr', 'role', 'region')
        .and('have.attr', 'aria-roledescription', 'carousel');
    });

    it('should have role group if no label supplied', () => {
      const params = {
        carouselId: 'group-carousel',
      };

      cy.visit(
        `http://localhost:3000/?slides=5&params=${JSON.stringify(params)}`
      );

      cy.get(`#${params.carouselId}`)
        .should('have.attr', 'role', 'group')
        .and('have.attr', 'aria-roledescription', 'carousel');
    });

    it('should render controls with appropriate roles and aria attributes.', () => {
      const params = {
        carouselId: 'roles-and-controls',
        tabbed: true,
      };

      cy.visit(
        `http://localhost:3000/?slides=5&params=${JSON.stringify(params)}`
      );

      cy.get('button')
        .contains('Prev')
        .should('have.attr', 'aria-controls', params.carouselId);
      cy.get('button')
        .contains('Next')
        .should('have.attr', 'aria-controls', params.carouselId);
      cy.get('.paging-item')
        .first()
        .should('have.attr', 'role', 'tab')
        .and('have.attr', 'aria-controls', `${params.carouselId}-slide-1`)
        .and('have.attr', 'aria-selected', 'true');
      cy.get('.paging-item')
        .last()
        .should('have.attr', 'role', 'tab')
        .and('have.attr', 'aria-controls', `${params.carouselId}-slide-5`)
        .and('have.attr', 'aria-selected', 'false');
      cy.get('.paging-item')
        .first()
        .parent()
        .should('have.attr', 'role', 'tablist');
      cy.get(`#${params.carouselId}-slide-1`).should(
        'have.attr',
        'role',
        'tabpanel'
      );

      cy.get(`#${params.carouselId}-slide-1`).should(
        'not.have.attr',
        'aria-roledescription'
      );

      cy.get('[aria-label="next"]').click();

      cy.get('.paging-item')
        .eq(0)
        .should('have.attr', 'aria-selected', 'false');
      cy.get('.paging-item').eq(1).should('have.attr', 'aria-selected', 'true');
      cy.get('.paging-item')
        .eq(2)
        .should('have.attr', 'aria-selected', 'false');
      cy.get('.paging-item')
        .eq(3)
        .should('have.attr', 'aria-selected', 'false');
    });

    it('should render slides with correct description and role when tab pagination is unused.', () => {
      const params = {
        tabbed: false,
        renderBottomCenterControls: null,
        carouselId: 'untabbed',
      };

      cy.visit(
        `http://localhost:3000/?slides=5&params=${JSON.stringify(params)}`
      );

      cy.get(`#${params.carouselId}-slide-1`)
        .should('have.attr', 'role', 'group')
        .and('have.attr', 'aria-roledescription', 'slide');
      cy.get('.paging-item').should('not.exist');
    });
  });
});
