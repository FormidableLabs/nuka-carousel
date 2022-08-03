import { Alignment } from './types';
import { isSlideVisible } from './utils';

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
    'works with left align (showing index $currentSlide, check index $indexToCheck, $slidesToShow slidesToShow)',
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
    'works with right align (showing index $currentSlide, check index $indexToCheck, $slidesToShow slidesToShow)',
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
    'works with center align (showing index $currentSlide, check index $indexToCheck, $slidesToShow slidesToShow)',
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
