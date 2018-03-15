describe('Nuka Carousel', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:8080');
  });

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
});
