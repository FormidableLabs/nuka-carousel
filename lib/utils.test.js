"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const utils_1 = require("./utils");
describe('getNextMoveIndex', () => {
    it.each `
    currentSlide | slideCount | slidesToScroll | expected
    ${1}         | ${3}       | ${2}           | ${3}
    ${1}         | ${2}       | ${2}           | ${3}
    ${-1}        | ${2}       | ${1}           | ${0}
    ${1}         | ${1}       | ${1}           | ${2}
    ${1}         | ${2}       | ${1}           | ${2}
  `('does basic calculation with wrapAround=true ' +
        '(currentSlide $currentSlide, slideCount $slideCount, slidesToScroll $slidesToScroll)', ({ currentSlide, slideCount, slidesToScroll, expected }) => {
        const args = [
            types_1.ScrollMode.page,
            true,
            currentSlide,
            slideCount,
            slidesToScroll,
            1,
        ];
        expect((0, utils_1.getNextMoveIndex)(...args, 'left')).toEqual(expected);
        expect((0, utils_1.getNextMoveIndex)(...args, 'right')).toEqual(expected);
        expect((0, utils_1.getNextMoveIndex)(...args, 'center')).toEqual(expected);
    });
    it.each `
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
  `('gets correct index when allowing whitespace ' +
        '(slideIndex $currentSlide, $slidesToShow slidesToShow, $slidesToScroll slidesToScroll, $cellAlign align)', ({ currentSlide, slidesToShow, slidesToScroll, cellAlign, expected }) => {
        expect((0, utils_1.getNextMoveIndex)(types_1.ScrollMode.page, false, currentSlide, 3, slidesToScroll, slidesToShow, cellAlign)).toEqual(expected);
    });
    it.each `
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
  `('gets correct index when avoiding whitespace ' +
        '(slideIndex $currentSlide, $slidesToShow slidesToShow, $slidesToScroll slidesToScroll, $cellAlign align)', ({ currentSlide, slidesToShow, slidesToScroll, cellAlign, expected }) => {
        expect((0, utils_1.getNextMoveIndex)(types_1.ScrollMode.remainder, false, currentSlide, 3, slidesToScroll, slidesToShow, cellAlign)).toEqual(expected);
    });
});
describe('getPrevMoveIndex', () => {
    it.each `
    currentSlide | slidesToScroll | expected
    ${1}         | ${2}           | ${-1}
    ${4}         | ${2}           | ${2}
    ${-1}        | ${1}           | ${-2}
  `('does basic calculation with wrapAround=true ' +
        '(currentSlide $currentSlide, slidesToScroll $slidesToScroll)', ({ currentSlide, slidesToScroll, expected }) => {
        expect((0, utils_1.getPrevMoveIndex)(types_1.ScrollMode.page, true, currentSlide, slidesToScroll, 1, 'left')).toEqual(expected);
    });
    it.each `
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
  `('gets correct index when allowing whitespace ' +
        '(slideIndex $currentSlide, $slidesToShow slidesToShow, $slidesToScroll slidesToScroll, $cellAlign align)', ({ currentSlide, slidesToShow, slidesToScroll, cellAlign, expected }) => {
        expect((0, utils_1.getPrevMoveIndex)(types_1.ScrollMode.page, false, currentSlide, slidesToScroll, slidesToShow, cellAlign)).toEqual(expected);
    });
    it.each `
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
  `('gets correct index when avoiding whitespace ' +
        '(slideIndex $currentSlide, $slidesToShow slidesToShow, $slidesToScroll slidesToScroll, $cellAlign align)', ({ currentSlide, slidesToShow, slidesToScroll, cellAlign, expected }) => {
        expect((0, utils_1.getPrevMoveIndex)(types_1.ScrollMode.remainder, false, currentSlide, slidesToScroll, slidesToShow, cellAlign)).toEqual(expected);
    });
});
describe('getBoundedIndex', () => {
    it.each `
    rawIndex | slideCount | expected
    ${0}     | ${1}       | ${0}
    ${1}     | ${2}       | ${1}
    ${2}     | ${2}       | ${0}
    ${3}     | ${2}       | ${1}
    ${4}     | ${2}       | ${0}
    ${-1}    | ${2}       | ${1}
    ${-2}    | ${2}       | ${0}
    ${-2}    | ${3}       | ${1}
    ${-3}    | ${3}       | ${0}
    ${-6}    | ${3}       | ${0}
    ${-7}    | ${3}       | ${2}
    ${-7.5}  | ${3}       | ${1.5}
  `('gets the right index when bounds applied ' +
        '(rawIndex $rawIndex, slideCount $slideCount)', ({ rawIndex, slideCount, expected }) => {
        expect((0, utils_1.getBoundedIndex)(rawIndex, slideCount)).toEqual(expected);
    });
});
//# sourceMappingURL=utils.test.js.map