// Test cases
// Swipe before and after threshold

context('Swipe Carousel', () => {
  const carouselWidth = 600;
  const sharedParams = {
    // Speed up transition animation time
    speed: 50,
    // set fixed width for easier drag distance calculations
    style: { width: carouselWidth },
  };

  const assertFirstSlideIs = (slideNumber: number) => {
    cy.get('.slide.slide-visible img').should(
      'have.attr',
      'data-slide',
      `Slide ${slideNumber}`
    );
  };
  const getSliderXOffset = ($sliderList: JQuery<HTMLElement>) => {
    const parentElementOffset =
      $sliderList[0].parentElement.getBoundingClientRect().left;
    const sliderListOffset = $sliderList[0].getBoundingClientRect().left;

    return sliderListOffset - parentElementOffset;
  };

  describe('Swipe Carousel variations', () => {
    it('should render a carousel with 6 slides and 3 visible slides and go through all of the slides by swiping forwards and then reverses', () => {
      const slidesToShow = 3;

      cy.visitWithCarouselProps({
        ...sharedParams,
        slidesToShow,
      });

      // Half of one slide should be barely enough to scroll once with the
      // default threshold
      const distance = carouselWidth / slidesToShow / 2;

      assertFirstSlideIs(1);

      cy.swipeSlider(distance);

      assertFirstSlideIs(2);

      cy.swipeSlider(distance);

      assertFirstSlideIs(3);

      cy.swipeSlider(-distance);

      assertFirstSlideIs(2);

      cy.swipeSlider(-distance);

      assertFirstSlideIs(1);
    });

    it('should render a carousel with 6 slides and 3 visible slides and not advance with a small swipe', () => {
      const slidesToShow = 3;

      cy.visitWithCarouselProps({
        ...sharedParams,
        slidesToShow,
      });

      // Half of one slide should be barely enough to scroll once with the
      // default threshold
      const distance = carouselWidth / slidesToShow / 2 - 1;

      assertFirstSlideIs(1);

      cy.swipeSlider(distance);

      assertFirstSlideIs(1);

      cy.swipeSlider(distance + 1);

      assertFirstSlideIs(2);

      cy.swipeSlider(-distance);

      assertFirstSlideIs(2);
    });

    it('should allow edge swiping when disableEdgeSwiping="false" (default)', () => {
      cy.visitWithCarouselProps({
        ...sharedParams,
        slideCount: 2,
        disableEdgeSwiping: false,
      });

      // Initiating a drag from the left to the right
      cy.get('.slider-container')
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: 0 })
        .trigger('mousemove', { clientX: 150 });

      // Checking that the slide is pulled to the right, with whitespace exposed
      // to its left.
      cy.get('.slider-list').should(($sliderList) => {
        expect(getSliderXOffset($sliderList)).to.be.greaterThan(0);
      });

      // Release the previous drag
      cy.get('.slider-container').trigger('mouseup');

      // Move forward to the next (and final) slide
      cy.swipeSlider(carouselWidth);

      cy.get('.slider-list').should(($sliderList) => {
        expect(getSliderXOffset($sliderList)).to.be.greaterThan(-(carouselWidth + 1));
        expect(getSliderXOffset($sliderList)).to.be.lessThan(-(carouselWidth - 1));
      });

      // Initiating a drag from the right to the left
      cy.get('.slider-container')
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: 150 })
        .trigger('mousemove', { clientX: 0 });

      // Checking that the slide is pulled to the left, with whitespace exposed
      // to its right.
      cy.get('.slider-list').should(($sliderList) => {
        expect(getSliderXOffset($sliderList)).to.be.lessThan(-carouselWidth);
      });

      // Release the previous drag
      cy.get('.slider-container').trigger('mouseup');
    });

    it('should prevent edge swiping when disableEdgeSwiping="true"', () => {
      cy.visitWithCarouselProps({
        ...sharedParams,
        slideCount: 2,
        disableEdgeSwiping: true,
      });

      // Initiating a drag from the left to the right
      cy.get('.slider-container')
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: 0 })
        .trigger('mousemove', { clientX: 150 });

      // Checking that the slide is not pulled to the right, showing whitespace
      cy.get('.slider-list').should(($sliderList) => {
        expect(getSliderXOffset($sliderList)).to.equal(0);
      });

      // Release the previous drag
      cy.get('.slider-container').trigger('mouseup');

      // Move forward to the next (and final) slide
      cy.swipeSlider(carouselWidth);

      cy.get('.slider-list').should(($sliderList) => {
        expect(getSliderXOffset($sliderList)).to.equal(-carouselWidth);
      });

      // Initiating a drag from the right to the left
      cy.get('.slider-container')
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: 150 })
        .trigger('mousemove', { clientX: 0 });

      // Checking that the slide is not pulled to the left, showing whitespace
      cy.get('.slider-list').should(($sliderList) => {
        expect(getSliderXOffset($sliderList)).to.equal(-carouselWidth);
      });

      // Release the previous drag
      cy.get('.slider-container').trigger('mouseup');
    });

    it('should allow quick, short gestures to scroll based on inertia', () => {
      cy.visitWithCarouselProps({
        ...sharedParams,
      });

      assertFirstSlideIs(1);

      // Short, slow swipe is not enough to trigger scroll
      cy.swipeSlider(carouselWidth / 4, { waitMs: 1000 });

      assertFirstSlideIs(1);

      // Short, fast swipe _is_ enough to trigger scroll
      cy.swipeSlider(carouselWidth / 4, { waitMs: 90 });

      assertFirstSlideIs(2);

      // Do the same steps, backwards towards the start of the carousel

      cy.swipeSlider(-carouselWidth / 4, { waitMs: 1000 });

      assertFirstSlideIs(2);

      cy.swipeSlider(-carouselWidth / 4, { waitMs: 90 });

      assertFirstSlideIs(1);
    });

    it('should be able to scroll multiple times at once with gestures', () => {
      const slidesToShow = 3;
      cy.visitWithCarouselProps({
        ...sharedParams,
        slidesToShow,
      });

      assertFirstSlideIs(1);

      const slideWidth = carouselWidth / slidesToShow;

      // Slow, single-slide, threshold-exceeding scroll
      cy.swipeSlider(slideWidth / 2, { waitMs: 1000 });

      assertFirstSlideIs(2);

      // Slow, double-slide-width scroll
      cy.swipeSlider(2 * slideWidth, { waitMs: 1000 });

      assertFirstSlideIs(4);

      // Do the same steps, backwards towards the start of the carousel

      cy.swipeSlider(-2 * slideWidth, { waitMs: 1000 });

      assertFirstSlideIs(2);

      cy.swipeSlider(-slideWidth / 2, { waitMs: 1000 });

      assertFirstSlideIs(1);

      // Fast, multiple-slide-width scroll
      cy.swipeSlider(2 * slideWidth, { waitMs: 100 });

      assertFirstSlideIs(5);

      cy.swipeSlider(-2 * slideWidth, { waitMs: 100 });

      assertFirstSlideIs(1);
    });
  });
});
