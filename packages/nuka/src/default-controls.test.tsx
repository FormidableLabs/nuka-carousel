import { Alignment, ScrollMode } from './types';
import { getDotIndexes } from './default-controls';

describe('getDotIndexes', () => {
  it.each`
    slideCount | slidesToScroll | slidesToShow | cellAlign  | expected
    ${3}       | ${1}           | ${1}         | ${'left'}  | ${[0, 1, 2]}
    ${5}       | ${1}           | ${2}         | ${'left'}  | ${[0, 1, 2, 3]}
    ${4}       | ${1}           | ${2}         | ${'left'}  | ${[0, 1, 2]}
    ${4}       | ${1}           | ${3}         | ${'left'}  | ${[0, 1]}
    ${4}       | ${2}           | ${2}         | ${'left'}  | ${[0, 2]}
    ${5}       | ${2}           | ${2}         | ${'left'}  | ${[0, 2, 3]}
    ${4}       | ${3}           | ${3}         | ${'left'}  | ${[0, 1]}
    ${5}       | ${3}           | ${3}         | ${'left'}  | ${[0, 2]}
    ${4}       | ${2}           | ${2.5}       | ${'left'}  | ${[0, 1.5]}
    ${4}       | ${1.5}         | ${2}         | ${'left'}  | ${[0, 1.5, 2]}
    ${3}       | ${1}           | ${1}         | ${'right'} | ${[0, 1, 2]}
    ${5}       | ${1}           | ${2}         | ${'right'} | ${[1, 2, 3, 4]}
    ${4}       | ${1}           | ${2}         | ${'right'} | ${[1, 2, 3]}
    ${4}       | ${1}           | ${3}         | ${'right'} | ${[2, 3]}
    ${4}       | ${2}           | ${2}         | ${'right'} | ${[1, 3]}
    ${5}       | ${2}           | ${2}         | ${'right'} | ${[1, 3, 4]}
    ${4}       | ${3}           | ${3}         | ${'right'} | ${[2, 3]}
    ${5}       | ${3}           | ${3}         | ${'right'} | ${[2, 4]}
    ${4}       | ${2}           | ${2.5}       | ${'right'} | ${[1.5, 3]}
    ${4}       | ${1.5}         | ${2}         | ${'right'} | ${[1, 2.5, 3]}
    ${1}       | ${1}           | ${3}         | ${'right'} | ${[0]}
    ${2}       | ${1}           | ${3}         | ${'right'} | ${[1]}
  `(
    'gets proper indices when avoiding whitespace ' +
      '($slideCount slides, $slidesToScroll slidesToScroll, $slidesToShow slidesToShow, $cellAlign align)',
    ({ slideCount, slidesToScroll, slidesToShow, cellAlign, expected }) => {
      expect(
        getDotIndexes(
          slideCount,
          slidesToScroll,
          ScrollMode.remainder,
          slidesToShow,
          false,
          cellAlign
        )
      ).toEqual(expected);
    }
  );

  it.each`
    slideCount | slidesToScroll | slidesToShow | cellAlign   | expected
    ${4}       | ${1}           | ${2}         | ${'left'}   | ${[0, 1, 2, 3]}
    ${4}       | ${2}           | ${2}         | ${'left'}   | ${[0, 2]}
    ${3}       | ${2}           | ${2}         | ${'left'}   | ${[0, 2]}
    ${4}       | ${3}           | ${3}         | ${'left'}   | ${[0, 3]}
    ${4}       | ${1}           | ${3}         | ${'left'}   | ${[0, 1, 2, 3]}
    ${4}       | ${2}           | ${2.5}       | ${'left'}   | ${[0, 2]}
    ${4}       | ${1.5}         | ${2}         | ${'left'}   | ${[0, 1.5, 3]}
    ${4}       | ${2}           | ${2}         | ${'right'}  | ${[0, 2, 3]}
    ${4}       | ${2}           | ${2}         | ${'center'} | ${[0, 2, 3]}
  `(
    'gets proper indices when allowing whitespace ' +
      '($slideCount slides, $slidesToScroll slidesToScroll, $slidesToShow slidesToShow, $cellAlign align)',
    ({ slideCount, slidesToScroll, slidesToShow, cellAlign, expected }) => {
      expect(
        getDotIndexes(
          slideCount,
          slidesToScroll,
          ScrollMode.page,
          slidesToShow,
          false,
          cellAlign
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
    'gets proper indices when wrapping ' +
      '($slideCount slides, $slidesToScroll slidesToScroll, $slidesToShow slidesToShow)',
    ({ slideCount, slidesToScroll, slidesToShow, expected }) => {
      expect(
        getDotIndexes(
          slideCount,
          slidesToScroll,
          ScrollMode.page, // ignored
          slidesToShow,
          true,
          Alignment.Left
        )
      ).toEqual(expected);
    }
  );
});
