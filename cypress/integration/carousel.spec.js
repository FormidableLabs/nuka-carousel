/// <reference types="cypress" />

context('Carousel', () => {
  describe('Carousel variations', () => {
    it('should render carousel with 4 slides and only 1 visible slide and go through all of the slides', () => {
      cy.visit('http://localhost:3000/?slides=4')

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img').should('have.attr', 'data-slide', 'Slide 1')

      cy.get('.paging-item').should('have.length', 4)

      cy.get('button').contains('Prev').should('be.disabled')
      cy.get('button').contains('Next').should('not.be.disabled').click()

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img').should('have.attr', 'data-slide', 'Slide 2')

      cy.get('button').contains('Prev').should('not.be.disabled')
      cy.get('button').contains('Next').should('not.be.disabled').click()

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img').should('have.attr', 'data-slide', 'Slide 3')

      cy.get('button').contains('Prev').should('not.be.disabled')
      cy.get('button').contains('Next').should('not.be.disabled').click()

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img').should('have.attr', 'data-slide', 'Slide 4')

      cy.get('button').contains('Next').should('be.disabled')
      cy.get('button').contains('Prev').should('not.be.disabled').click()

      cy.get('.slide.slide-visible')
        .should('have.length', 1)
        .find('img').should('have.attr', 'data-slide', 'Slide 3')

      cy.get('button').contains('Prev').should('not.be.disabled')
      cy.get('button').contains('Next').should('not.be.disabled')
    })

    it('should render carousel with 6 slides and 3 visible slides and go through all of the slides', () => {
      const params = {
        slidesToShow: 3  
      }

      cy.visit(`http://localhost:3000/?slides=6&params=${JSON.stringify(params)}`)

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 1')

      cy.get('.paging-item').should('have.length', 4)

      cy.get('button').contains('Prev').should('be.disabled')
      cy.get('button').contains('Next').should('not.be.disabled').click()

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 2')

      cy.get('button').contains('Prev').should('not.be.disabled')
      cy.get('button').contains('Next').should('not.be.disabled').click()

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 3')

      cy.get('button').contains('Prev').should('not.be.disabled')
      cy.get('button').contains('Next').should('not.be.disabled').click()

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 4')

      cy.get('button').contains('Next').should('be.disabled')
      cy.get('button').contains('Prev').should('not.be.disabled').click()

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 3')

      cy.get('button').contains('Prev').should('not.be.disabled')
      cy.get('button').contains('Next').should('not.be.disabled')
    })

    it('should render carousel with 6 slides and 3 visible slides and go through all of the slides with autoplay and without clicking the Next button', () => {
      const params = {
        slidesToShow: 3,
        autoplay: true,
        autoplayInterval: 1000
      }

      cy.visit(`http://localhost:3000/?slides=6&params=${JSON.stringify(params)}`)

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 1')

      cy.wait(1020)

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 2')
        
      cy.wait(1020)

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 3')

      cy.wait(1020)

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 4')
    })

    it('should render carousel with 6 slides and 3 visible slides and go through all of the slides starting from the last slide with autoplay and without clicking the Prev button', () => {
      const params = {
        slidesToShow: 3,
        autoplay: true,
        autoplayInterval: 1000,
        autoplayReverse: true
      }

      cy.visit(`http://localhost:3000/?slides=6&params=${JSON.stringify(params)}`)

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 4')

      cy.wait(1020)
        
      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 3')
      cy.wait(1020)

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 2')

      cy.wait(1020)

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 1')
    })

    it('should render carousel with 6 slides and 3 visible slides and go through all of the slides with autoplay and without clicking the Next button and when hover the slider should pause', () => {
      const params = {
        slidesToShow: 3,
        autoplay: true,
        autoplayInterval: 1000,
        pauseOnHover: true,
      }

      cy.visit(`http://localhost:3000/?slides=6&params=${JSON.stringify(params)}`)

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 1')

      cy.wait(1020)
        
      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 2')


      cy.get(".slider-container").trigger('mouseover');
      cy.wait(1500)
      
      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 2')
      
      cy.get(".slider-container").trigger('mouseout');
      
      cy.wait(1020)

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 3')

      cy.wait(1020)

      cy.get('.slide.slide-visible')
        .should('have.length', 3)
        .find('img').first().should('have.attr', 'data-slide', 'Slide 4')
    })
  })
})
