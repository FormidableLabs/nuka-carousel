/* eslint-disable max-nested-callbacks */
describe('Nuka Carousel', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:8080');
  });

  describe('Button Navigation and Loading', () => {
    it('should load the carousel page with the initial slide.', async () => {
      await expect(page).toMatch('Nuka Carousel: Slide 1');
    });

    it('should show the next slide when the Next button is clicked.', async () => {
      await expect(page).toClick('button', { text: 'NEXT' });
      await expect(page).toMatch('Nuka Carousel: Slide 2');
    });

    it('should show the previous slide when the Previous button is clicked.', async () => {
      await expect(page).toClick('button', { text: 'NEXT' });
      await expect(page).toMatch('Nuka Carousel: Slide 2');
      await expect(page).toClick('button', { text: 'PREV' });
      await expect(page).toMatch('Nuka Carousel: Slide 1');
    });

    it('should navigate to the last slide from the first in wrapAround mode.', async () => {
      await expect(page).toClick('button', { text: 'Toggle Wrap Around' });
      await expect(page).toMatch('Nuka Carousel: Slide 1');
      await expect(page).toClick('button', { text: 'PREV' });
      await expect(page).toMatch('Nuka Carousel: Slide 6');
    });

    it('should navigate to the first slide from the last in wrapAround mode.', async () => {
      await expect(page).toClick('button', { text: 'Toggle Wrap Around' });
      await expect(page).toClick('button', { text: '6' });
      await expect(page).toMatch('Nuka Carousel: Slide 6');
      await expect(page).toClick('button', { text: 'NEXT' });
      await expect(page).toMatch('Nuka Carousel: Slide 1');
    });
  });

  describe('Swipe and Drag Events', () => {
    beforeEach(async () => {
      await page.setViewport({
        width: 1024,
        height: 768,
        hasTouch: true,
        isMobile: true
      });
    });

    it('should show the next slide when swiped to the left.', async () => {
      const slide = await page.$('.slider-slide');
      const metrics = await slide.boundingBox();
      const startX = metrics.x + metrics.width / 2.0;
      const startY = metrics.y + metrics.height / 2.0;
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX - metrics.width / 3.0, startY);
      await page.mouse.up();
      await expect(page).toMatch('Nuka Carousel: Slide 2');
    });

    it('should show the previous slide when swiped to the right.', async () => {
      const slide = await page.$('.slider-slide');
      const metrics = await slide.boundingBox();
      const startX = metrics.x + metrics.width / 2.0;
      const startY = metrics.y + metrics.height / 2.0;
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX - metrics.width / 3.0, startY);
      await page.mouse.up();
      await expect(page).toMatch('Nuka Carousel: Slide 2');
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX + metrics.width / 3.0, startY);
      await page.mouse.up();
      await expect(page).toMatch('Nuka Carousel: Slide 1');
    });

    it('should show the last slide when swiped right from the first.', async () => {
      await expect(page).toClick('button', { text: 'Toggle Wrap Around' });
      const slide = await page.$('.slider-slide');
      const metrics = await slide.boundingBox();
      const startX = metrics.x + metrics.width / 2.0;
      const startY = metrics.y + metrics.height / 2.0;
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX + metrics.width / 3.0, startY);
      await page.mouse.up();
      await expect(page).toMatch('Nuka Carousel: Slide 6');
    });

    it('should show the first slide when swiped left from the last.', async () => {
      await expect(page).toClick('button', { text: 'Toggle Wrap Around' });
      const slide = await page.$('.slider-slide');
      const metrics = await slide.boundingBox();
      const startX = metrics.x + metrics.width / 2.0;
      const startY = metrics.y + metrics.height / 2.0;
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX + metrics.width / 3.0, startY);
      await page.mouse.up();
      await expect(page).toMatch('Nuka Carousel: Slide 6');
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX - metrics.width / 3.0, startY);
      await page.mouse.up();
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await expect(page).toMatch('Nuka Carousel: Slide 1');
    });
  });
});
