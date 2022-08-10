import { Alignment, ControlProps, ScrollMode } from './types';
import {
  getDotIndexes,
  nextButtonDisabled,
  prevButtonDisabled
} from './default-controls';

describe('getDotIndexes', () => {
  it.each`
    slideCount | slidesToScroll | slidesToShow | cellAlign   | expected
    ${3}       | ${1}           | ${1}         | ${'left'}   | ${[0, 1, 2]}
    ${5}       | ${1}           | ${2}         | ${'left'}   | ${[0, 1, 2, 3]}
    ${4}       | ${1}           | ${2}         | ${'left'}   | ${[0, 1, 2]}
    ${4}       | ${1}           | ${3}         | ${'left'}   | ${[0, 1]}
    ${4}       | ${2}           | ${2}         | ${'left'}   | ${[0, 2]}
    ${5}       | ${2}           | ${2}         | ${'left'}   | ${[0, 2, 3]}
    ${4}       | ${3}           | ${3}         | ${'left'}   | ${[0, 1]}
    ${5}       | ${3}           | ${3}         | ${'left'}   | ${[0, 2]}
    ${4}       | ${2}           | ${2.5}       | ${'left'}   | ${[0, 1.5]}
    ${4}       | ${1.5}         | ${2}         | ${'left'}   | ${[0, 1.5, 2]}
    ${4}       | ${2}           | ${4}         | ${'left'}   | ${[0]}
    ${3}       | ${1}           | ${1}         | ${'right'}  | ${[0, 1, 2]}
    ${5}       | ${1}           | ${2}         | ${'right'}  | ${[1, 2, 3, 4]}
    ${4}       | ${1}           | ${2}         | ${'right'}  | ${[1, 2, 3]}
    ${4}       | ${1}           | ${3}         | ${'right'}  | ${[2, 3]}
    ${4}       | ${2}           | ${2}         | ${'right'}  | ${[1, 3]}
    ${5}       | ${2}           | ${2}         | ${'right'}  | ${[1, 3, 4]}
    ${4}       | ${3}           | ${3}         | ${'right'}  | ${[2, 3]}
    ${5}       | ${3}           | ${3}         | ${'right'}  | ${[2, 4]}
    ${4}       | ${2}           | ${2.5}       | ${'right'}  | ${[1.5, 3]}
    ${4}       | ${1.5}         | ${2}         | ${'right'}  | ${[1, 2.5, 3]}
    ${1}       | ${1}           | ${3}         | ${'right'}  | ${[0]}
    ${2}       | ${1}           | ${3}         | ${'right'}  | ${[1]}
    ${4}       | ${2}           | ${4}         | ${'right'}  | ${[3]}
    ${4}       | ${2}           | ${14}        | ${'center'} | ${[0, 2, 3]}
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
    ${4}       | ${1}           | ${2}         | ${'left'}   | ${[0, 1, 2]}
    ${4}       | ${2}           | ${2}         | ${'left'}   | ${[0, 2]}
    ${3}       | ${2}           | ${2}         | ${'left'}   | ${[0, 2]}
    ${4}       | ${3}           | ${3}         | ${'left'}   | ${[0, 3]}
    ${4}       | ${1}           | ${3}         | ${'left'}   | ${[0, 1]}
    ${4}       | ${2}           | ${2.5}       | ${'left'}   | ${[0, 2]}
    ${4}       | ${1.5}         | ${2}         | ${'left'}   | ${[0, 1.5, 3]}
    ${4}       | ${2}           | ${4}         | ${'left'}   | ${[0]}
    ${4}       | ${2}           | ${2}         | ${'right'}  | ${[1, 3]}
    ${5}       | ${2}           | ${2}         | ${'right'}  | ${[0, 2, 4]}
    ${5}       | ${3}           | ${3}         | ${'right'}  | ${[1, 4]}
    ${4}       | ${1}           | ${3}         | ${'right'}  | ${[2, 3]}
    ${4}       | ${2}           | ${2.5}       | ${'right'}  | ${[1, 3]}
    ${5}       | ${2}           | ${2.5}       | ${'right'}  | ${[0, 2, 4]}
    ${4}       | ${1.5}         | ${2}         | ${'right'}  | ${[0, 1.5, 3]}
    ${4}       | ${2}           | ${4}         | ${'right'}  | ${[3]}
    ${4}       | ${2}           | ${2}         | ${'center'} | ${[0, 2, 3]}
    ${4}       | ${2}           | ${14}        | ${'center'} | ${[0, 2, 3]}
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

describe('nextButtonDisabled', () => {
  it.each`
    currentSlide | slidesToShow | cellAlign   | expected
    ${1}         | ${1}         | ${'left'}   | ${false}
    ${1}         | ${2}         | ${'left'}   | ${true}
    ${2}         | ${1}         | ${'left'}   | ${true}
    ${2}         | ${2}         | ${'left'}   | ${true}
    ${1}         | ${2.5}       | ${'left'}   | ${true}
    ${1.5}       | ${2}         | ${'left'}   | ${true}
    ${0.5}       | ${2}         | ${'left'}   | ${false}
    ${1}         | ${1}         | ${'right'}  | ${false}
    ${1}         | ${2}         | ${'right'}  | ${false}
    ${2}         | ${1}         | ${'right'}  | ${true}
    ${2}         | ${2}         | ${'right'}  | ${true}
    ${1}         | ${2.5}       | ${'right'}  | ${false}
    ${1.5}       | ${2}         | ${'right'}  | ${false}
    ${1}         | ${1}         | ${'center'} | ${false}
    ${1}         | ${2}         | ${'center'} | ${false}
    ${2}         | ${1}         | ${'center'} | ${true}
    ${2}         | ${2}         | ${'center'} | ${true}
    ${1}         | ${2.5}       | ${'center'} | ${false}
    ${1.5}       | ${2}         | ${'center'} | ${false}
  `(
    'disables properly when allowing whitespace ' +
      '(slideIndex $currentSlide, $slidesToShow slidesToShow, $cellAlign align)',
    ({ currentSlide, slidesToShow, cellAlign, expected }) => {
      const args: Partial<ControlProps> = {
        currentSlide,
        slidesToShow,
        slideCount: 3,
        wrapAround: false,
        scrollMode: ScrollMode.page,
        cellAlign
      };
      expect(nextButtonDisabled(args as ControlProps)).toEqual(expected);
    }
  );

  it.each`
    currentSlide | slidesToShow | cellAlign   | expected
    ${1}         | ${1}         | ${'left'}   | ${false}
    ${1}         | ${2}         | ${'left'}   | ${true}
    ${2}         | ${1}         | ${'left'}   | ${true}
    ${2}         | ${2}         | ${'left'}   | ${true}
    ${1}         | ${2.5}       | ${'left'}   | ${true}
    ${1.5}       | ${2}         | ${'left'}   | ${true}
    ${0.5}       | ${2}         | ${'left'}   | ${false}
    ${1}         | ${1}         | ${'right'}  | ${false}
    ${1}         | ${2}         | ${'right'}  | ${false}
    ${2}         | ${1}         | ${'right'}  | ${true}
    ${2}         | ${2}         | ${'right'}  | ${true}
    ${1}         | ${2.5}       | ${'right'}  | ${false}
    ${1.5}       | ${2}         | ${'right'}  | ${false}
    ${0.5}       | ${2}         | ${'right'}  | ${false}
    ${1}         | ${1}         | ${'center'} | ${false}
    ${1}         | ${2}         | ${'center'} | ${false}
    ${2}         | ${1}         | ${'center'} | ${true}
    ${2}         | ${2}         | ${'center'} | ${true}
    ${1}         | ${2.5}       | ${'center'} | ${false}
    ${1.5}       | ${2}         | ${'center'} | ${false}
    ${0.5}       | ${2}         | ${'center'} | ${false}
  `(
    'disables properly when avoiding whitespace ' +
      '(slideIndex $currentSlide, $slidesToShow slidesToShow, $cellAlign align)',
    ({ currentSlide, slidesToShow, cellAlign, expected }) => {
      const args: Partial<ControlProps> = {
        currentSlide,
        slidesToShow,
        slideCount: 3,
        wrapAround: false,
        scrollMode: ScrollMode.remainder,
        cellAlign
      };
      expect(nextButtonDisabled(args as ControlProps)).toEqual(expected);
    }
  );
});

describe('prevButtonDisabled', () => {
  it.each`
    currentSlide | slidesToShow | cellAlign   | expected
    ${1}         | ${1}         | ${'left'}   | ${false}
    ${1}         | ${2}         | ${'left'}   | ${false}
    ${0}         | ${1}         | ${'left'}   | ${true}
    ${0}         | ${2}         | ${'left'}   | ${true}
    ${1}         | ${2.5}       | ${'left'}   | ${false}
    ${1.5}       | ${2}         | ${'left'}   | ${false}
    ${1}         | ${1}         | ${'center'} | ${false}
    ${1}         | ${2}         | ${'center'} | ${false}
    ${0}         | ${1}         | ${'center'} | ${true}
    ${0}         | ${2}         | ${'center'} | ${true}
    ${1}         | ${2.5}       | ${'center'} | ${false}
    ${1.5}       | ${2}         | ${'center'} | ${false}
    ${1}         | ${1}         | ${'right'}  | ${false}
    ${1}         | ${2}         | ${'right'}  | ${true}
    ${0}         | ${1}         | ${'right'}  | ${true}
    ${0}         | ${2}         | ${'right'}  | ${true}
    ${1}         | ${2.5}       | ${'right'}  | ${true}
    ${1.5}       | ${2}         | ${'right'}  | ${false}
    ${0.5}       | ${2}         | ${'right'}  | ${true}
  `(
    'disables properly when allowing whitespace ' +
      '(slideIndex $currentSlide, $slidesToShow slidesToShow, $cellAlign align)',
    ({ currentSlide, slidesToShow, cellAlign, expected }) => {
      const args: Partial<ControlProps> = {
        currentSlide,
        slidesToShow,
        wrapAround: false,
        cellAlign
      };
      expect(prevButtonDisabled(args as ControlProps)).toEqual(expected);
    }
  );

  it.each`
    currentSlide | slidesToShow | cellAlign   | expected
    ${1}         | ${1}         | ${'left'}   | ${false}
    ${1}         | ${2}         | ${'left'}   | ${false}
    ${0}         | ${1}         | ${'left'}   | ${true}
    ${0}         | ${2}         | ${'left'}   | ${true}
    ${1}         | ${2.5}       | ${'left'}   | ${false}
    ${1.5}       | ${2}         | ${'left'}   | ${false}
    ${0.5}       | ${2}         | ${'left'}   | ${false}
    ${1}         | ${1}         | ${'right'}  | ${false}
    ${1}         | ${2}         | ${'right'}  | ${true}
    ${0}         | ${1}         | ${'right'}  | ${true}
    ${0}         | ${2}         | ${'right'}  | ${true}
    ${1}         | ${2.5}       | ${'right'}  | ${true}
    ${0.5}       | ${2}         | ${'right'}  | ${true}
    ${1.5}       | ${2}         | ${'right'}  | ${false}
    ${1}         | ${1}         | ${'center'} | ${false}
    ${1}         | ${2}         | ${'center'} | ${false}
    ${0}         | ${1}         | ${'center'} | ${true}
    ${0}         | ${2}         | ${'center'} | ${true}
    ${1}         | ${2.5}       | ${'center'} | ${false}
    ${1.5}       | ${2}         | ${'center'} | ${false}
    ${0.5}       | ${2}         | ${'center'} | ${false}
  `(
    'disables properly when avoiding whitespace ' +
      '(slideIndex $currentSlide, $slidesToShow slidesToShow, $cellAlign align)',
    ({ currentSlide, slidesToShow, cellAlign, expected }) => {
      const args: Partial<ControlProps> = {
        currentSlide,
        slidesToShow,
        wrapAround: false,
        cellAlign
      };
      expect(prevButtonDisabled(args as ControlProps)).toEqual(expected);
    }
  );
});
