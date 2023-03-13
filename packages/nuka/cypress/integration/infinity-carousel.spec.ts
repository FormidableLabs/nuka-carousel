/* eslint-disable cypress/no-unnecessary-waiting */

context('Infinity Carousel', () => {
  // Speed up transition animation time
  const sharedParams = { speed: 50 };

  describe('Infinity Carousel variations', () => {
    it('should render infinity carousel with 4 slides and only 1 visible slide and go through all of the slides', () => {
      cy.visitWithCarouselProps({
        ...sharedParams,
        slideCount: 4,
        wrapAround: true,
      });

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 1');

      cy.get('.paging-item').should('have.length', 4);

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 2');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 3');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 4');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 1');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 2');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 3');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 4');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 1');

      cy.get('button').contains('Next').should('not.be.disabled');
      cy.get('button').contains('Prev').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 4');

      cy.get('button').contains('Next').should('not.be.disabled');
      cy.get('button').contains('Prev').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 3');

      cy.get('button').contains('Next').should('not.be.disabled');
      cy.get('button').contains('Prev').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 2');

      cy.get('button').contains('Next').should('not.be.disabled');
      cy.get('button').contains('Prev').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img')
        .should('have.attr', 'data-slide', 'Slide 1');
    });

    it('should render infinity carousel with 4 slides and 3 visible slides and go through all of the slides', () => {
      cy.visitWithCarouselProps({
        ...sharedParams,
        slideCount: 4,
        slidesToShow: 3,
        wrapAround: true,
      });

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 1');

      cy.get('.paging-item').should('have.length', 4);

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 2');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 3');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 4');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 1');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 2');
    });

    it('should render infinity carousel with 6 slides and 2 visible slides and slides to scroll equal to 2', () => {
      cy.visitWithCarouselProps({
        ...sharedParams,
        slideCount: 6,
        slidesToShow: 2,
        slidesToScroll: 2,
        wrapAround: true,
      });

      cy.get('.slide.slide-visible')
        .should('have.length', 2)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 1');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 2)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 3');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 2)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 5');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 2)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 1');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 2)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 3');
    });

    it('should render infinity carousel with 4 slides and all of them should be visible and go through all of the slides', () => {
      cy.visitWithCarouselProps({
        ...sharedParams,
        slideCount: 4,
        slidesToShow: 4,
        wrapAround: true,
      });

      cy.get('.slide.slide-visible')
        .should('have.length', 4)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 1');

      cy.get('.paging-item').should('have.length', 4);

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 4)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 2');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 4)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 3');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 4)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 4');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 4)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 1');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 4)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 2');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 4)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 3');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 4)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 4');

      cy.get('button').contains('Prev').should('not.be.disabled');
      cy.get('button').contains('Next').should('not.be.disabled').click();
      cy.wait(2000);

      cy.get('.slide.slide-visible')
        .should('have.length', 4)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 1');
    });

    it('should render infinity carousel with 5 slides and 2 visible slides without controls', () => {
      cy.visitWithCarouselProps({
        ...sharedParams,
        slideCount: 5,
        slidesToShow: 2,
        withoutControls: true,
        wrapAround: true,
      });

      cy.get('.slide.slide-visible')
        .should('have.length', 2)
        .find('img')
        .first()
        .should('have.attr', 'data-slide', 'Slide 1');

      cy.get('button').should('not.exist');
      cy.get('.paging-item').should('not.exist');
    });
  });
});
