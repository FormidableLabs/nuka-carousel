/* eslint-disable cypress/no-unnecessary-waiting */
const waitThreshold = 100;

export const assertVisibleSlide = (demoId: string, slideNumber: number) => {
  cy.get(demoId + '.slide.slide-visible')
    .should('have.length', 1)
    .find('div')
    .should('have.attr', 'data-slide', `Slide ${slideNumber}`);
};

export const navigateToNextSlide = (demoId: string) => {
  cy.get(demoId + 'button[aria-label="Go to next slide"]')
    .should('not.be.disabled')
    .click();
  cy.wait(waitThreshold);
};

export const navigateToPreviousSlide = (demoId: string) => {
  cy.get(demoId + 'button[aria-label="Go to previous slide"]')
    .should('not.be.disabled')
    .click();
  cy.wait(waitThreshold);
};

export const getSliderXOffset = ($sliderList: JQuery<HTMLElement>) => {
  const parentElementOffset =
    $sliderList[0].parentElement.getBoundingClientRect().left;
  const sliderListOffset = $sliderList[0].getBoundingClientRect().left;

  return sliderListOffset - parentElementOffset;
};
