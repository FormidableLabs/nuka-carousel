import { isBrowser, isRTL } from './browser';

describe('browser utils', () => {
  describe('isBrowser', () => {
    it('should return true in a browser environment', () => {
      expect(isBrowser()).toBe(true);
    });
  });

  describe('isRTL', () => {
    let originalDir: string;

    beforeEach(() => {
      originalDir = document.documentElement.dir;
    });

    afterEach(() => {
      document.documentElement.dir = originalDir;
    });

    it.each([
      ['rtl', true],
      ['ltr', false],
      ['', false],
      ['auto', false],
    ])('should return %s when document direction is "%s"', (dir, expected) => {
      document.documentElement.dir = dir;
      expect(isRTL()).toBe(expected);
    });

    it.each([
      ['rtl', true],
      ['ltr', false],
    ])(
      'should detect %s from element computed style',
      (dir, expected) => {
        const element = document.createElement('div');
        element.dir = dir;
        document.body.appendChild(element);

        expect(isRTL(element)).toBe(expected);

        document.body.removeChild(element);
      },
    );

    it('should inherit RTL from parent element', () => {
      const parent = document.createElement('div');
      parent.dir = 'rtl';
      const child = document.createElement('div');
      parent.appendChild(child);
      document.body.appendChild(parent);

      expect(isRTL(child)).toBe(true);

      document.body.removeChild(parent);
    });
  });
});
