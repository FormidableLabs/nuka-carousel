import { ScrollMode } from './types';
import { getDotIndexes } from './default-controls';

describe('getDotIndexes', () => {
  it.each`
    slideCount | slidesToScroll | slidesToShow | expected
    ${5}       | ${1}           | ${2}         | ${[0, 1, 2, 3]}
    ${4}       | ${1}           | ${2}         | ${[0, 1, 2]}
    ${4}       | ${1}           | ${3}         | ${[0, 1]}
    ${4}       | ${2}           | ${2}         | ${[0, 2]}
    ${5}       | ${2}           | ${2}         | ${[0, 2, 3]}
    ${4}       | ${3}           | ${3}         | ${[0, 1]}
    ${5}       | ${3}           | ${3}         | ${[0, 2]}
    ${4}       | ${2}           | ${2.5}       | ${[0, 1.5]}
    ${4}       | ${1.5}         | ${2}         | ${[0, 1.5, 2]}
  `(
    'gets proper indices when avoiding whitespace ($slideCount slides, $slidesToScroll slidesToScroll, $slidesToShow slidesToShow)',
    ({ slideCount, slidesToScroll, slidesToShow, expected }) => {
      expect(
        getDotIndexes(
          slideCount,
          slidesToScroll,
          ScrollMode.remainder,
          slidesToShow,
          false
        )
      ).toEqual(expected);
    }
  );

  it.each`
    slideCount | slidesToScroll | slidesToShow | expected
    ${4}       | ${1}           | ${2}         | ${[0, 1, 2, 3]}
    ${4}       | ${2}           | ${2}         | ${[0, 2]}
    ${3}       | ${2}           | ${2}         | ${[0, 2]}
    ${4}       | ${3}           | ${3}         | ${[0, 3]}
    ${4}       | ${1}           | ${3}         | ${[0, 1, 2, 3]}
    ${4}       | ${2}           | ${2.5}       | ${[0, 2]}
    ${4}       | ${1.5}         | ${2}         | ${[0, 1.5, 3]}
  `(
    'gets proper indices when allowing whitespace ($slideCount slides, $slidesToScroll slidesToScroll, $slidesToShow slidesToShow)',
    ({ slideCount, slidesToScroll, slidesToShow, expected }) => {
      expect(
        getDotIndexes(
          slideCount,
          slidesToScroll,
          ScrollMode.page,
          slidesToShow,
          false
        )
      ).toEqual(expected);
    }
  );

  it.each`
    slideCount | slidesToScroll | slidesToShow | expected
    ${4}       | ${1}           | ${2}         | ${[0, 1, 2, 3]}
    ${4}       | ${2}           | ${2}         | ${[0, 2]}
    ${3}       | ${2}           | ${2}         | ${[0, 2]}
    ${4}       | ${3}           | ${3}         | ${[0, 3]}
    ${4}       | ${1}           | ${3}         | ${[0, 1, 2, 3]}
    ${4}       | ${2}           | ${2.5}       | ${[0, 2]}
    ${4}       | ${1.5}         | ${2}         | ${[0, 1.5, 3]}
  `(
    'gets proper indices when wrapping ($slideCount slides, $slidesToScroll slidesToScroll, $slidesToShow slidesToShow)',
    ({ slideCount, slidesToScroll, slidesToShow, expected }) => {
      expect(
        getDotIndexes(
          slideCount,
          slidesToScroll,
          ScrollMode.page, // ignored
          slidesToShow,
          true
        )
      ).toEqual(expected);
    }
  );
});
