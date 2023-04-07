import { assertVisibleSlide } from '../support/util';

describe('Swipe Carousel', () => {
  const carouselWidth = 750;
  const stdDemoSel = '.standard-demo ';

  it('should navigate the carousel using swipe gestures', () => {
    const distance = carouselWidth / 2;

    cy.visitCarousel();

    assertVisibleSlide(stdDemoSel, 1);

    cy.swipeSlider(stdDemoSel, distance);
    assertVisibleSlide(stdDemoSel, 2);

    cy.swipeSlider(stdDemoSel, distance);
    assertVisibleSlide(stdDemoSel, 3);

    cy.swipeSlider(stdDemoSel, -distance);
    assertVisibleSlide(stdDemoSel, 2);
  });

  it('should not navigate the carousel using incomplete swipe gestures', () => {
    cy.visitCarousel();

    assertVisibleSlide(stdDemoSel, 1);

    /**
     * An incomplete gesture at a standard intertia should not navigate to the next slide
     */
    cy.swipeSlider(stdDemoSel, carouselWidth / 4);
    assertVisibleSlide(stdDemoSel, 1);

    cy.swipeSlider(stdDemoSel, carouselWidth / 2);
    assertVisibleSlide(stdDemoSel, 2);

    /**
     * An incomplete gesture at a standard intertia should not navigate to the previous slide
     */
    cy.swipeSlider(stdDemoSel, -carouselWidth / 4);
    assertVisibleSlide(stdDemoSel, 2);
  });

  it('should navigate the carousel small quick gestures', () => {
    cy.visitCarousel();

    assertVisibleSlide(stdDemoSel, 1);

    cy.swipeSlider(stdDemoSel, carouselWidth / 4, { waitMs: 90 });
    assertVisibleSlide(stdDemoSel, 2);

    /**
     * Perform a reverse swipe to verify it works going backwards
     */
    cy.swipeSlider(stdDemoSel, -carouselWidth / 4, { waitMs: 90 });
    assertVisibleSlide(stdDemoSel, 1);
  });
});
