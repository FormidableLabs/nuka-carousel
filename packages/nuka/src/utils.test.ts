import { Alignment, ScrollMode } from './types';
import { getNextMoveIndex, getPrevMoveIndex, isSlideVisible } from './utils';

describe('isSlideVisible', () => {
  it.each`
    currentSlide | indexToCheck | slidesToShow | expected
    ${1}         | ${0}         | ${2}         | ${false}
    ${1}         | ${1}         | ${2}         | ${true}
    ${1}         | ${2}         | ${2}         | ${true}
    ${1}         | ${3}         | ${2}         | ${false}
    ${1}         | ${0}         | ${1.5}       | ${false}
    ${1}         | ${1}         | ${1.5}       | ${true}
    ${1}         | ${2}         | ${1.5}       | ${true}
    ${1}         | ${3}         | ${1.5}       | ${false}
    ${1.5}       | ${0}         | ${2}         | ${false}
    ${1.5}       | ${1}         | ${2}         | ${true}
    ${1.5}       | ${2}         | ${2}         | ${true}
    ${1.5}       | ${3}         | ${2}         | ${true}
    ${1.5}       | ${4}         | ${2}         | ${false}
    ${1}         | ${0}         | ${1}         | ${false}
    ${1}         | ${1}         | ${1}         | ${true}
    ${1}         | ${2}         | ${1}         | ${false}
    ${1.5}       | ${0}         | ${1}         | ${false}
    ${1.5}       | ${1}         | ${1}         | ${true}
    ${1.5}       | ${2}         | ${1}         | ${true}
    ${1.5}       | ${3}         | ${1}         | ${false}
  `(
    'works with left align ' +
      '(showing index $currentSlide, check index $indexToCheck, $slidesToShow slidesToShow)',
    ({ currentSlide, indexToCheck, slidesToShow, expected }) => {
      expect(
        isSlideVisible(currentSlide, indexToCheck, slidesToShow, Alignment.Left)
      ).toEqual(expected);
    }
  );

  it.each`
    currentSlide | indexToCheck | slidesToShow | expected
    ${1}         | ${-1}        | ${2}         | ${false}
    ${1}         | ${0}         | ${2}         | ${true}
    ${1}         | ${1}         | ${2}         | ${true}
    ${1}         | ${2}         | ${2}         | ${false}
    ${1}         | ${-1}        | ${1.5}       | ${false}
    ${1}         | ${0}         | ${1.5}       | ${true}
    ${1}         | ${1}         | ${1.5}       | ${true}
    ${1}         | ${2}         | ${1.5}       | ${false}
    ${1.5}       | ${-1}        | ${2}         | ${false}
    ${1.5}       | ${0}         | ${2}         | ${true}
    ${1.5}       | ${1}         | ${2}         | ${true}
    ${1.5}       | ${2}         | ${2}         | ${true}
    ${1.5}       | ${3}         | ${2}         | ${false}
    ${1}         | ${0}         | ${1}         | ${false}
    ${1}         | ${1}         | ${1}         | ${true}
    ${1}         | ${2}         | ${1}         | ${false}
    ${1.5}       | ${0}         | ${1}         | ${false}
    ${1.5}       | ${1}         | ${1}         | ${true}
    ${1.5}       | ${2}         | ${1}         | ${true}
    ${1.5}       | ${3}         | ${1}         | ${false}
  `(
    'works with right align ' +
      '(showing index $currentSlide, check index $indexToCheck, $slidesToShow slidesToShow)',
    ({ currentSlide, indexToCheck, slidesToShow, expected }) => {
      expect(
        isSlideVisible(
          currentSlide,
          indexToCheck,
          slidesToShow,
          Alignment.Right
        )
      ).toEqual(expected);
    }
  );

  it.each`
    currentSlide | indexToCheck | slidesToShow | expected
    ${1}         | ${-1}        | ${3}         | ${false}
    ${1}         | ${0}         | ${3}         | ${true}
    ${1}         | ${1}         | ${3}         | ${true}
    ${1}         | ${2}         | ${3}         | ${true}
    ${1}         | ${3}         | ${3}         | ${false}
    ${1}         | ${-1}        | ${2.5}       | ${false}
    ${1}         | ${0}         | ${2.5}       | ${true}
    ${1}         | ${1}         | ${2.5}       | ${true}
    ${1}         | ${2}         | ${2.5}       | ${true}
    ${1}         | ${3}         | ${2.5}       | ${false}
    ${1}         | ${-1}        | ${2}         | ${false}
    ${1}         | ${0}         | ${2}         | ${true}
    ${1}         | ${1}         | ${2}         | ${true}
    ${1}         | ${2}         | ${2}         | ${true}
    ${1}         | ${3}         | ${2}         | ${false}
    ${1.2}       | ${-1}        | ${2}         | ${false}
    ${1.2}       | ${0}         | ${2}         | ${true}
    ${1.2}       | ${1}         | ${2}         | ${true}
    ${1.2}       | ${2}         | ${2}         | ${true}
    ${1.2}       | ${3}         | ${2}         | ${false}
    ${1.7}       | ${0}         | ${2}         | ${false}
    ${1.7}       | ${1}         | ${2}         | ${true}
    ${1.7}       | ${2}         | ${2}         | ${true}
    ${1.7}       | ${3}         | ${2}         | ${true}
    ${1.7}       | ${4}         | ${2}         | ${false}
    ${1}         | ${0}         | ${1}         | ${false}
    ${1}         | ${1}         | ${1}         | ${true}
    ${1}         | ${2}         | ${1}         | ${false}
    ${1.5}       | ${0}         | ${1}         | ${false}
    ${1.5}       | ${1}         | ${1}         | ${true}
    ${1.5}       | ${2}         | ${1}         | ${true}
    ${1.5}       | ${3}         | ${1}         | ${false}
  `(
    'works with center align ' +
      '(showing index $currentSlide, check index $indexToCheck, $slidesToShow slidesToShow)',
    ({ currentSlide, indexToCheck, slidesToShow, expected }) => {
      expect(
        isSlideVisible(
          currentSlide,
          indexToCheck,
          slidesToShow,
          Alignment.Center
        )
      ).toEqual(expected);
    }
  );
});

describe('getNextMoveIndex', () => {
  it.each`
    currentSlide | slideCount | slidesToScroll | expected
    ${1}         | ${3}       | ${2}           | ${3}
    ${1}         | ${2}       | ${2}           | ${3}
    ${-1}        | ${2}       | ${1}           | ${0}
    ${1}         | ${1}       | ${1}           | ${2}
    ${1}         | ${2}       | ${1}           | ${2}
  `(
    'does basic calculation with wrapAround=true ' +
      '(currentSlide $currentSlide, slideCount $slideCount, slidesToScroll $slidesToScroll)',
    ({ currentSlide, slideCount, slidesToScroll, expected }) => {
      const args = [
        ScrollMode.page,
        true,
        currentSlide,
        slideCount,
        slidesToScroll,
        1,
      ] as const;
      expect(getNextMoveIndex(...args, Alignment.Left)).toEqual(expected);
      expect(getNextMoveIndex(...args, Alignment.Right)).toEqual(expected);
      expect(getNextMoveIndex(...args, Alignment.Center)).toEqual(expected);
    }
  );

  it.each`
    currentSlide | slidesToShow | slidesToScroll | cellAlign   | expected
    ${2}         | ${1}         | ${1}           | ${'left'}   | ${2}
    ${1}         | ${1}         | ${1}           | ${'left'}   | ${2}
    ${1.5}       | ${1}         | ${1}           | ${'left'}   | ${2}
    ${1.5}       | ${2}         | ${1}           | ${'left'}   | ${1.5}
    ${2}         | ${2}         | ${1}           | ${'left'}   | ${2}
    ${1}         | ${2}         | ${1}           | ${'left'}   | ${1}
    ${1}         | ${2}         | ${2}           | ${'left'}   | ${1}
    ${1}         | ${2}         | ${1.5}         | ${'left'}   | ${1}
    ${0}         | ${1}         | ${1}           | ${'left'}   | ${1}
    ${0.5}       | ${1}         | ${1}           | ${'left'}   | ${1.5}
    ${0}         | ${2}         | ${1}           | ${'left'}   | ${1}
    ${0}         | ${2}         | ${2}           | ${'left'}   | ${2}
    ${0}         | ${2}         | ${1.5}         | ${'left'}   | ${1.5}
    ${0}         | ${1.5}       | ${2}           | ${'left'}   | ${2}
    ${2}         | ${1}         | ${1}           | ${'right'}  | ${2}
    ${1}         | ${1}         | ${1}           | ${'right'}  | ${2}
    ${1.5}       | ${1}         | ${1}           | ${'right'}  | ${2}
    ${1}         | ${2}         | ${1}           | ${'right'}  | ${2}
    ${1}         | ${2}         | ${2}           | ${'right'}  | ${2}
    ${1}         | ${2}         | ${1.5}         | ${'right'}  | ${2}
    ${0}         | ${1}         | ${1}           | ${'right'}  | ${1}
    ${0.5}       | ${1}         | ${1}           | ${'right'}  | ${1.5}
    ${0}         | ${2}         | ${1}           | ${'right'}  | ${1}
    ${0}         | ${2}         | ${2}           | ${'right'}  | ${2}
    ${0}         | ${2}         | ${1.5}         | ${'right'}  | ${1.5}
    ${0}         | ${1.5}       | ${2}           | ${'right'}  | ${2}
    ${2}         | ${1}         | ${1}           | ${'center'} | ${2}
    ${1}         | ${1}         | ${1}           | ${'center'} | ${2}
    ${1.5}       | ${1}         | ${1}           | ${'center'} | ${2}
    ${1}         | ${2}         | ${1}           | ${'center'} | ${2}
    ${1}         | ${2}         | ${2}           | ${'center'} | ${2}
    ${1}         | ${2}         | ${1.5}         | ${'center'} | ${2}
    ${0}         | ${1}         | ${1}           | ${'center'} | ${1}
    ${0.5}       | ${1}         | ${1}           | ${'center'} | ${1.5}
    ${0}         | ${2}         | ${1}           | ${'center'} | ${1}
    ${0}         | ${2}         | ${2}           | ${'center'} | ${2}
    ${0}         | ${2}         | ${1.5}         | ${'center'} | ${1.5}
    ${0}         | ${1.5}       | ${2}           | ${'center'} | ${2}
  `(
    'gets correct index when allowing whitespace ' +
      '(slideIndex $currentSlide, $slidesToShow slidesToShow, $slidesToScroll slidesToScroll, $cellAlign align)',
    ({ currentSlide, slidesToShow, slidesToScroll, cellAlign, expected }) => {
      expect(
        getNextMoveIndex(
          ScrollMode.page,
          false,
          currentSlide,
          3,
          slidesToScroll,
          slidesToShow,
          cellAlign
        )
      ).toEqual(expected);
    }
  );

  it.each`
    currentSlide | slidesToShow | slidesToScroll | cellAlign   | expected
    ${2}         | ${1}         | ${1}           | ${'left'}   | ${2}
    ${1}         | ${1}         | ${1}           | ${'left'}   | ${2}
    ${1.5}       | ${1}         | ${1}           | ${'left'}   | ${2}
    ${1}         | ${2}         | ${1}           | ${'left'}   | ${1}
    ${1}         | ${2}         | ${2}           | ${'left'}   | ${1}
    ${1}         | ${2}         | ${1.5}         | ${'left'}   | ${1}
    ${0}         | ${1}         | ${1}           | ${'left'}   | ${1}
    ${0.5}       | ${1}         | ${1}           | ${'left'}   | ${1.5}
    ${0}         | ${2}         | ${1}           | ${'left'}   | ${1}
    ${0}         | ${2}         | ${2}           | ${'left'}   | ${1}
    ${0}         | ${2}         | ${1.5}         | ${'left'}   | ${1}
    ${3}         | ${1}         | ${11}          | ${'left'}   | ${3}
    ${0}         | ${1.5}       | ${2}           | ${'left'}   | ${1.5}
    ${1}         | ${2}         | ${1}           | ${'center'} | ${2}
    ${1}         | ${2}         | ${1}           | ${'right'}  | ${2}
  `(
    'gets correct index when avoiding whitespace ' +
      '(slideIndex $currentSlide, $slidesToShow slidesToShow, $slidesToScroll slidesToScroll, $cellAlign align)',
    ({ currentSlide, slidesToShow, slidesToScroll, cellAlign, expected }) => {
      expect(
        getNextMoveIndex(
          ScrollMode.remainder,
          false,
          currentSlide,
          3,
          slidesToScroll,
          slidesToShow,
          cellAlign
        )
      ).toEqual(expected);
    }
  );
});

describe('getPrevMoveIndex', () => {
  it.each`
    currentSlide | slidesToScroll | expected
    ${1}         | ${2}           | ${-1}
    ${4}         | ${2}           | ${2}
    ${-1}        | ${1}           | ${-2}
  `(
    'does basic calculation with wrapAround=true ' +
      '(currentSlide $currentSlide, slidesToScroll $slidesToScroll)',
    ({ currentSlide, slidesToScroll, expected }) => {
      expect(
        getPrevMoveIndex(
          ScrollMode.page,
          true,
          currentSlide,
          slidesToScroll,
          1,
          Alignment.Left
        )
      ).toEqual(expected);
    }
  );

  it.each`
    currentSlide | slidesToShow | slidesToScroll | cellAlign   | expected
    ${0}         | ${1}         | ${1}           | ${'left'}   | ${0}
    ${1}         | ${1}         | ${1}           | ${'left'}   | ${0}
    ${1.5}       | ${1}         | ${1}           | ${'left'}   | ${0.5}
    ${1.5}       | ${2}         | ${1}           | ${'left'}   | ${0.5}
    ${1}         | ${2}         | ${1}           | ${'left'}   | ${0}
    ${1}         | ${2}         | ${2}           | ${'left'}   | ${0}
    ${1}         | ${2}         | ${1.5}         | ${'left'}   | ${0}
    ${2}         | ${2}         | ${1.5}         | ${'left'}   | ${0.5}
    ${2}         | ${2}         | ${2}           | ${'left'}   | ${0}
    ${2}         | ${1.5}       | ${2}           | ${'left'}   | ${0}
    ${0}         | ${1}         | ${1}           | ${'right'}  | ${0}
    ${1}         | ${1}         | ${1}           | ${'right'}  | ${0}
    ${1.5}       | ${1}         | ${1}           | ${'right'}  | ${0.5}
    ${1.5}       | ${2}         | ${1}           | ${'right'}  | ${0.5}
    ${1}         | ${2}         | ${1}           | ${'right'}  | ${1}
    ${1}         | ${2}         | ${2}           | ${'right'}  | ${1}
    ${1}         | ${2}         | ${1.5}         | ${'right'}  | ${1}
    ${2}         | ${2}         | ${1.5}         | ${'right'}  | ${0.5}
    ${2}         | ${2}         | ${2}           | ${'right'}  | ${0}
    ${2}         | ${1.5}       | ${2}           | ${'right'}  | ${0}
    ${0}         | ${1}         | ${1}           | ${'center'} | ${0}
    ${1}         | ${1}         | ${1}           | ${'center'} | ${0}
    ${1.5}       | ${1}         | ${1}           | ${'center'} | ${0.5}
    ${1.5}       | ${2}         | ${1}           | ${'center'} | ${0.5}
    ${1}         | ${2}         | ${1}           | ${'center'} | ${0}
    ${1}         | ${2}         | ${2}           | ${'center'} | ${0}
    ${1}         | ${2}         | ${1.5}         | ${'center'} | ${0}
    ${2}         | ${2}         | ${1.5}         | ${'center'} | ${0.5}
    ${2}         | ${2}         | ${2}           | ${'center'} | ${0}
    ${2}         | ${1.5}       | ${2}           | ${'center'} | ${0}
  `(
    'gets correct index when allowing whitespace ' +
      '(slideIndex $currentSlide, $slidesToShow slidesToShow, $slidesToScroll slidesToScroll, $cellAlign align)',
    ({ currentSlide, slidesToShow, slidesToScroll, cellAlign, expected }) => {
      expect(
        getPrevMoveIndex(
          ScrollMode.page,
          false,
          currentSlide,
          slidesToScroll,
          slidesToShow,
          cellAlign
        )
      ).toEqual(expected);
    }
  );

  it.each`
    currentSlide | slidesToShow | slidesToScroll | cellAlign   | expected
    ${0}         | ${1}         | ${1}           | ${'right'}  | ${0}
    ${1}         | ${1}         | ${1}           | ${'right'}  | ${0}
    ${1.5}       | ${1}         | ${1}           | ${'right'}  | ${0.5}
    ${1.5}       | ${2}         | ${1}           | ${'right'}  | ${1}
    ${1}         | ${2}         | ${1}           | ${'right'}  | ${1}
    ${1}         | ${2}         | ${2}           | ${'right'}  | ${1}
    ${1}         | ${2}         | ${1.5}         | ${'right'}  | ${1}
    ${2}         | ${2}         | ${1.5}         | ${'right'}  | ${1}
    ${2}         | ${2}         | ${2}           | ${'right'}  | ${1}
    ${2}         | ${1.5}       | ${2}           | ${'right'}  | ${0.5}
    ${1}         | ${2}         | ${1}           | ${'center'} | ${0}
    ${1}         | ${2}         | ${1}           | ${'left'}   | ${0}
  `(
    'gets correct index when avoiding whitespace ' +
      '(slideIndex $currentSlide, $slidesToShow slidesToShow, $slidesToScroll slidesToScroll, $cellAlign align)',
    ({ currentSlide, slidesToShow, slidesToScroll, cellAlign, expected }) => {
      expect(
        getPrevMoveIndex(
          ScrollMode.remainder,
          false,
          currentSlide,
          slidesToScroll,
          slidesToShow,
          cellAlign
        )
      ).toEqual(expected);
    }
  );
});
