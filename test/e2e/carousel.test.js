/* eslint-disable max-nested-callbacks */

describe('Nuka Carousel', () => {
  // jest.setTimeout(30000);
  const getStyles = (selector, keys) => {
    const e = document.querySelector(selector);
    const styles = window.getComputedStyle(e);
    return keys.reduce((acc, curr) => {
      acc[curr] = styles[curr];
      return acc;
    }, {});
  };

  const defaultNavigationAndLoading = () => {
    it('should load the carousel page with the initial slide.', async () => {
      await expect(page).toMatch('Nuka Carousel: Slide 1');
    });

    it('should show the next slide when the Next button is clicked.', async () => {
      await expect(page).toClick('button', { text: 'Next' });
      await expect(page).toMatch('Nuka Carousel: Slide 2');
    });

    it('should show the previous slide when the Previous button is clicked.', async () => {
      await expect(page).toClick('button', { text: 'Next' });
      await expect(page).toMatch('Nuka Carousel: Slide 2');
      await page.waitFor(600); // need to let slide transition complete
      await expect(page).toClick('button', { text: 'Prev' });
      await expect(page).toMatch('Nuka Carousel: Slide 1');
    });

    it('should be hidden if containing div visibility is set to hidden', async () => {
      const visibleStyles = await page.evaluate(getStyles, `.slider`, [
        'visibility'
      ]);

      await expect(visibleStyles.visibility).toMatch('visible');

      await page.evaluate(() => {
        document.getElementById('content').style.visibility = 'hidden';
      });

      const hiddenStyles = await page.evaluate(getStyles, `.slider`, [
        'visibility'
      ]);

      await expect(hiddenStyles.visibility).toMatch('hidden');
    });

    describe('when in wrapAround mode', () => {
      beforeEach(async () => {
        await expect(page).toClick('button', { text: 'Toggle Wrap Around' });
      });

      it('should navigate to the last slide from the first.', async () => {
        await expect(page).toMatch('Nuka Carousel: Slide 1');
        await expect(page).toClick('button', { text: 'Prev' });
        await expect(page).toMatch('Nuka Carousel: Slide 9');
      });

      it('should navigate to the first slide from the last.', async () => {
        await page.waitFor(600); // need to let slide transition complete
        await expect(page).toClick('button', { text: '9' });
        await expect(page).toMatch('Nuka Carousel: Slide 9');
        await page.waitFor(600); // need to let slide transition complete
        await expect(page).toClick('button', { text: 'Next' });
        await expect(page).toMatch('Nuka Carousel: Slide 1');
      });

      it('should navigate to the first slide from the second with only 3 slides.', async () => {
        await page.waitFor(600); // need to let slide transition complete
        await expect(page).toClick('button', {
          text: 'Toggle Show 3 Slides Only'
        });
        await page.waitFor(600); // need to let slide transition complete
        await expect(page).toClick('button', { text: '3' });
        await expect(page).toMatch('Nuka Carousel: Slide 3');
        await page.waitFor(600); // need to let slide transition complete
        await expect(page).toClick('button', { text: 'Next' });
        await expect(page).toMatch('Nuka Carousel: Slide 1');
      });
    });
  };

  const nextThroughAllSlides = async () => {
    await expect(page).toMatch('Nuka Carousel: Slide 1');

    await expect(page).toClick('button', { text: 'Next' });
    await expect(page).toMatch('Nuka Carousel: Slide 2');
    await page.waitFor(600);

    await expect(page).toClick('button', { text: 'Next' });
    await expect(page).toMatch('Nuka Carousel: Slide 3');
    await page.waitFor(600);

    await expect(page).toClick('button', { text: 'Next' });
    await expect(page).toMatch('Nuka Carousel: Slide 4');
    await page.waitFor(600);

    await expect(page).toClick('button', { text: 'Next' });
    await expect(page).toMatch('Nuka Carousel: Slide 5');
    await page.waitFor(600);

    await expect(page).toClick('button', { text: 'Next' });
    await expect(page).toMatch('Nuka Carousel: Slide 6');
    await page.waitFor(600);

    await expect(page).toClick('button', { text: 'Next' });
    await expect(page).toMatch('Nuka Carousel: Slide 7');
    await page.waitFor(600);

    await expect(page).toClick('button', { text: 'Next' });
    await expect(page).toMatch('Nuka Carousel: Slide 8');
    await page.waitFor(600);

    await expect(page).toClick('button', { text: 'Next' });
    await expect(page).toMatch('Nuka Carousel: Slide 9');
  };

  beforeEach(async () => {
    await page.goto('http://localhost:8080');
  });

  describe('Button Navigation and Loading', () => {
    describe('transitionMode - scroll', () => {
      defaultNavigationAndLoading();

      describe('when next button is pressed', () => {
        it('should allow you to navigate entire slide deck when left aligned', async () => {
          await expect(page).toClick('button', {
            text: 'Toggle Partially Visible Slides'
          });
          await expect(page).toClick('button', { text: 'Left' });
          await page.waitFor(600); // need to let slide transition complete

          await nextThroughAllSlides();
        });

        it('should allow you to navigate entire slide deck when center aligned', async () => {
          await expect(page).toClick('button', {
            text: 'Toggle Partially Visible Slides'
          });
          await expect(page).toClick('button', { text: 'Center' });
          await page.waitFor(600); // need to let slide transition complete

          await nextThroughAllSlides();
        });

        it('should allow you to navigate entire slide deck when right aligned', async () => {
          await expect(page).toClick('button', {
            text: 'Toggle Partially Visible Slides'
          });
          await expect(page).toClick('button', { text: 'Right' });
          await page.waitFor(600); // need to let slide transition complete

          await nextThroughAllSlides();
        });
      });
    });

    describe('transitionMode - fade', () => {
      beforeEach(async () => {
        await expect(page).toClick('button', { text: 'Toggle Fade On' });
      });

      defaultNavigationAndLoading();

      it('should set currentSlide opacity to 1 and visibility to inherit', async () => {
        const activeSlide = 3;
        await expect(page).toClick('button', { text: `${activeSlide}` });
        await page.waitFor(600); // need to let slide transition complete

        const styles = await page.evaluate(
          getStyles,
          `.slider-slide:nth-child(${activeSlide})`,
          ['opacity', 'visibility']
        );

        await expect(styles.opacity).toMatch('1');
        await expect(styles.visibility).toMatch('visible');
      });

      it('should set hidden slides visibility to hidden', async () => {
        const activeSlide = 4;
        const slideCount = 6;
        await expect(page).toClick('button', { text: `${activeSlide}` });
        await page.waitFor(600); // need to let slide transition complete

        for (let i = 0; i < slideCount; i++) {
          if (i !== activeSlide - 1) {
            const styles = await page.evaluate(
              getStyles,
              `.slider-slide:nth-child(${i + 1})`,
              ['visibility']
            );

            await expect(styles.visibility).toMatch('hidden');
          }
        }
      });
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
      await page.waitFor(600); // need to let slide transition complete
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
      await expect(page).toMatch('Nuka Carousel: Slide 9');
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
      await expect(page).toMatch('Nuka Carousel: Slide 9');
      await page.waitFor(600); // need to let slide transition complete
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX - metrics.width / 3.0, startY);
      await page.mouse.up();
      await expect(page).toMatch('Nuka Carousel: Slide 1');
    });

    it('should handle wraparound and setLeft before and after', async () => {
      await page.$('.slider-slide');
      await expect(page).toClick('button', { text: 'Toggle Wrap Around' });
      let firstSlide = await page.evaluate(
        getStyles,
        `.slider-slide:first-child`,
        ['left', 'width']
      );
      let lastSlide = await page.evaluate(
        getStyles,
        `.slider-slide:last-child`,
        ['left']
      );
      const getWidth = parseInt(firstSlide.width, 10);

      // first slide in first position
      await expect(firstSlide.left).toMatch('0px');

      // last slide, positioned right behind first slide
      await expect(lastSlide.left).toMatch(`-${getWidth}px`);

      await expect(page).toClick('button', { text: 'Prev' });
      await expect(page).toMatch('Nuka Carousel: Slide 9');
      await page.waitFor(600); // need to let slide transition complete
      firstSlide = await page.evaluate(getStyles, `.slider-slide:first-child`, [
        'left'
      ]);
      lastSlide = await page.evaluate(getStyles, `.slider-slide:last-child`, [
        'left'
      ]);
      await expect(firstSlide.left).toMatch(`${getWidth * 9}px`);
      await expect(lastSlide.left).toMatch(`${getWidth * 8}px`);
    });

    it('should maintain left position of last slide on drag start when wrapping around from first -> last', async () => {
      const slide = await page.$('.slider-slide');
      const metrics = await slide.boundingBox();
      const pointX = metrics.x + metrics.width / 2.0;
      const pointY = metrics.y + metrics.height / 2.0;
      await expect(page).toClick('button', { text: 'Toggle Wrap Around' });
      await expect(page).toClick('button', { text: 'Prev' });
      await expect(page).toMatch('Nuka Carousel: Slide 9');
      await page.waitFor(600); // need to let slide transition complete
      const getComputedStyleLeft = () => {
        const e = document.querySelector('.slider-slide:last-child');
        return window.getComputedStyle(e).left;
      };
      const mouseUpLeft = await page.evaluate(getComputedStyleLeft);
      await page.mouse.move(pointX, pointY);
      await page.mouse.down();
      const mouseUpDown = await page.evaluate(getComputedStyleLeft);
      expect(mouseUpLeft).toMatch(mouseUpDown);
    });

    it('should maintain left position of first slide on drag start when wrapping around from last -> first', async () => {
      const slide = await page.$('.slider-slide');
      const metrics = await slide.boundingBox();
      const pointX = metrics.x + metrics.width / 2.0;
      const pointY = metrics.y + metrics.height / 2.0;
      await expect(page).toClick('button', { text: 'Toggle Wrap Around' });
      await expect(page).toClick('button', { text: '9' });
      await expect(page).toMatch('Nuka Carousel: Slide 9');
      await page.waitFor(600); // need to let slide transition complete
      await expect(page).toClick('button', { text: 'Next' });
      await expect(page).toMatch('Nuka Carousel: Slide 1');
      await page.waitFor(600); // need to let slide transition complete
      const getComputedStyleLeft = () => {
        const e = document.querySelector('.slider-slide:first-child');
        return window.getComputedStyle(e).left;
      };
      const mouseUpLeft = await page.evaluate(getComputedStyleLeft);
      await page.mouse.move(pointX, pointY);
      await page.mouse.down();
      const mouseUpDown = await page.evaluate(getComputedStyleLeft);
      expect(mouseUpLeft).toMatch(mouseUpDown);
    });

    it('should handle click events when slides wrap around from first -> last', async () => {
      const slide = await page.$('.slider-slide');
      const metrics = await slide.boundingBox();
      const pointX = metrics.x + metrics.width / 2.0;
      const pointY = metrics.y + metrics.height / 2.0;
      await expect(page).toClick('button', { text: 'Toggle Wrap Around' });
      await expect(page).toClick('button', { text: 'Prev' });
      await expect(page).toMatch('Nuka Carousel: Slide 9');
      await page.waitFor(600); // need to let slide transition complete
      const getTextDecoration = () => {
        const e = document.querySelector('.slider-control-topcenter div');
        return window.getComputedStyle(e).textDecorationLine;
      };
      let textDecoration = await page.evaluate(getTextDecoration);
      expect(textDecoration).toMatch('none');
      await page.mouse.click(pointX, pointY);
      textDecoration = await page.evaluate(getTextDecoration);
      expect(textDecoration).toMatch('underline');
      await page.mouse.click(pointX, pointY);
      textDecoration = await page.evaluate(getTextDecoration);
      expect(textDecoration).toMatch('none');
    });

    it('should handle click events when slides wrap around from last -> first', async () => {
      const slide = await page.$('.slider-slide');
      const metrics = await slide.boundingBox();
      const pointX = metrics.x + metrics.width / 2.0;
      const pointY = metrics.y + metrics.height / 2.0;
      await expect(page).toClick('button', { text: 'Toggle Wrap Around' });
      await expect(page).toClick('button', { text: '9' });
      await expect(page).toMatch('Nuka Carousel: Slide 9');
      await page.waitFor(600); // need to let slide transition complete
      await expect(page).toClick('button', { text: 'Next' });
      await expect(page).toMatch('Nuka Carousel: Slide 1');
      await page.waitFor(600); // need to let slide transition complete
      const getTextDecoration = () => {
        const e = document.querySelector('.slider-control-topcenter div');
        return window.getComputedStyle(e).textDecorationLine;
      };
      let textDecoration = await page.evaluate(getTextDecoration);
      expect(textDecoration).toMatch('none');
      await page.mouse.click(pointX, pointY);
      textDecoration = await page.evaluate(getTextDecoration);
      expect(textDecoration).toMatch('underline');
      await page.mouse.click(pointX, pointY);
      textDecoration = await page.evaluate(getTextDecoration);
      expect(textDecoration).toMatch('none');
    });

    it('should show the 4th slide when swiped further to the left and slidesToScroll is set to auto.', async () => {
      const slide = await page.$('.slider-list');
      const metrics = await slide.boundingBox();
      const startX = metrics.x + metrics.width - 30;
      const startY = metrics.y + metrics.height / 1.5;
      await expect(page).toClick('button', { text: 'Toggle Drag Multiple On' });
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(metrics.x + 30, startY);
      await page.mouse.up();
      await expect(page).toMatch('Nuka Carousel: Slide 4');
    });
  });

  describe('Neighboring Slide Visibility and Slide Alignment', () => {
    const approximately = (a, b) => {
      return Math.abs(parseFloat(a) - parseFloat(b)) < 0.25;
    };

    const transitionSpeed = 700;

    beforeEach(async () => {
      await page.setViewport({
        width: 1024,
        height: 768
      });
      await expect(page).toClick('button', {
        text: 'Toggle Partially Visible Slides'
      });
    });

    describe('WrapAround Disabled and center aligned', () => {
      beforeEach(async () => {
        await expect(page).toClick('button', { text: 'Center' });
      });

      it('should not partially show last slide when on first slide.', async () => {
        // starts on first slide
        const styles = await page.evaluate(
          getStyles,
          '.slider-slide:last-child',
          ['left', 'width']
        );
        const slideCount = (await page.$$('.slider-slide')).length;
        const correctLeft = parseFloat(styles.width) * (slideCount - 1);

        expect(`${approximately(styles.left, correctLeft)}`).toMatch('true');
      });

      it('should not partially show first slide when on last slide.', async () => {
        await expect(page).toClick('button', { text: '6' });
        await page.waitFor(transitionSpeed); // need to let slide transition complete
        const styles = await page.evaluate(
          getStyles,
          '.slider-slide:first-child',
          ['left']
        );
        expect(styles.left).toMatch('0px');
      });

      it('should partially show previous and next slide when on a middle slide.', async () => {
        const slide = 3;
        await expect(page).toClick('button', { text: `${slide}` });
        await page.waitFor(transitionSpeed); // need to let slide transition complete

        const prevSlide = slide - 1;
        const prevStyles = await page.evaluate(
          getStyles,
          `.slider-slide:nth-child(${prevSlide})`,
          ['left', 'width']
        );
        const correctPrevLeft = parseFloat(prevStyles.width) * (prevSlide - 1);
        expect(`${approximately(prevStyles.left, correctPrevLeft)}`).toMatch(
          'true'
        );

        const nextSlide = slide + 1;
        const nextStyles = await page.evaluate(
          getStyles,
          `.slider-slide:nth-child(${nextSlide})`,
          ['left', 'width']
        );
        const correctNextLeft = parseFloat(nextStyles.width) * (nextSlide - 1);
        expect(`${approximately(nextStyles.left, correctNextLeft)}`).toMatch(
          'true'
        );
      });
    });

    describe('WrapAround Enabled and center aligned', () => {
      beforeEach(async () => {
        await expect(page).toClick('button', { text: 'Toggle Wrap Around' });
        await expect(page).toClick('button', { text: 'Center' });
      });

      it('should partially show last slide when on first slide.', async () => {
        // starts on first slide
        const styles = await page.evaluate(
          getStyles,
          '.slider-slide:last-child',
          ['left', 'width']
        );
        const correctLeft = -parseFloat(styles.width);
        expect(`${approximately(styles.left, correctLeft)}`).toMatch('true');
      });

      it('should partially show first slide when on last slide.', async () => {
        await expect(page).toClick('button', { text: '6' });
        await page.waitFor(transitionSpeed); // need to let slide transition complete
        const styles = await page.evaluate(
          getStyles,
          '.slider-slide:first-child',
          ['left', 'width']
        );
        const slideCount = (await page.$$('.slider-slide')).length;
        const correctLeft = parseFloat(styles.width) * slideCount;
        expect(`${approximately(styles.left, correctLeft)}`).toMatch('true');
      });

      it('should partially show previous and next slide when on a middle slide.', async () => {
        const slide = 3;
        await expect(page).toClick('button', { text: `${slide}` });
        await page.waitFor(transitionSpeed); // need to let slide transition complete

        const prevSlide = slide - 1;
        const prevStyles = await page.evaluate(
          getStyles,
          `.slider-slide:nth-child(${prevSlide})`,
          ['left', 'width']
        );
        const correctPrevLeft = parseFloat(prevStyles.width) * (prevSlide - 1);
        expect(`${approximately(prevStyles.left, correctPrevLeft)}`).toMatch(
          'true'
        );

        const nextSlide = slide + 1;
        const nextStyles = await page.evaluate(
          getStyles,
          `.slider-slide:nth-child(${nextSlide})`,
          ['left', 'width']
        );
        const correctNextLeft = parseFloat(nextStyles.width) * (nextSlide - 1);
        expect(`${approximately(nextStyles.left, correctNextLeft)}`).toMatch(
          'true'
        );
      });
    });
  });
});
