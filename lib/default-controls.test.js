"use strict";

var _types = require("./types");
var _defaultControls = require("./default-controls");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
describe('getDotIndexes', function () {
  it.each(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    slideCount | slidesToScroll | slidesToShow | cellAlign   | expected\n    ", "       | ", "           | ", "         | ", "   | ", "\n    ", "       | ", "           | ", "         | ", "   | ", "\n    ", "       | ", "           | ", "         | ", "   | ", "\n    ", "       | ", "           | ", "         | ", "   | ", "\n    ", "       | ", "           | ", "         | ", "   | ", "\n    ", "       | ", "           | ", "         | ", "   | ", "\n    ", "       | ", "           | ", "         | ", "   | ", "\n    ", "       | ", "           | ", "         | ", "   | ", "\n    ", "       | ", "           | ", "       | ", "   | ", "\n    ", "       | ", "         | ", "         | ", "   | ", "\n    ", "       | ", "           | ", "         | ", "   | ", "\n    ", "       | ", "           | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "       | ", "  | ", "\n    ", "       | ", "         | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "        | ", " | ", "\n  "])), 3, 1, 1, 'left', [0, 1, 2], 5, 1, 2, 'left', [0, 1, 2, 3], 4, 1, 2, 'left', [0, 1, 2], 4, 1, 3, 'left', [0, 1], 4, 2, 2, 'left', [0, 2], 5, 2, 2, 'left', [0, 2, 3], 4, 3, 3, 'left', [0, 1], 5, 3, 3, 'left', [0, 2], 4, 2, 2.5, 'left', [0, 1.5], 4, 1.5, 2, 'left', [0, 1.5, 2], 4, 2, 4, 'left', [0], 3, 1, 1, 'right', [0, 1, 2], 5, 1, 2, 'right', [1, 2, 3, 4], 4, 1, 2, 'right', [1, 2, 3], 4, 1, 3, 'right', [2, 3], 4, 2, 2, 'right', [1, 3], 5, 2, 2, 'right', [1, 3, 4], 4, 3, 3, 'right', [2, 3], 5, 3, 3, 'right', [2, 4], 4, 2, 2.5, 'right', [1.5, 3], 4, 1.5, 2, 'right', [1, 2.5, 3], 1, 1, 3, 'right', [0], 2, 1, 3, 'right', [1], 4, 2, 4, 'right', [3], 4, 2, 14, 'center', [0, 2, 3])('gets proper indices when avoiding whitespace ' + '($slideCount slides, $slidesToScroll slidesToScroll, $slidesToShow slidesToShow, $cellAlign align)', function (_ref) {
    var slideCount = _ref.slideCount,
      slidesToScroll = _ref.slidesToScroll,
      slidesToShow = _ref.slidesToShow,
      cellAlign = _ref.cellAlign,
      expected = _ref.expected;
    expect((0, _defaultControls.getDotIndexes)(slideCount, slidesToScroll, _types.ScrollMode.remainder, slidesToShow, false, cellAlign)).toEqual(expected);
  });
  it.each(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    slideCount | slidesToScroll | slidesToShow | cellAlign   | expected\n    ", "       | ", "           | ", "         | ", "   | ", "\n    ", "       | ", "           | ", "         | ", "   | ", "\n    ", "       | ", "           | ", "         | ", "   | ", "\n    ", "       | ", "           | ", "         | ", "   | ", "\n    ", "       | ", "           | ", "         | ", "   | ", "\n    ", "       | ", "           | ", "       | ", "   | ", "\n    ", "       | ", "         | ", "         | ", "   | ", "\n    ", "       | ", "           | ", "         | ", "   | ", "\n    ", "       | ", "           | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "       | ", "  | ", "\n    ", "       | ", "           | ", "       | ", "  | ", "\n    ", "       | ", "         | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "         | ", "  | ", "\n    ", "       | ", "           | ", "         | ", " | ", "\n    ", "       | ", "           | ", "        | ", " | ", "\n  "])), 4, 1, 2, 'left', [0, 1, 2], 4, 2, 2, 'left', [0, 2], 3, 2, 2, 'left', [0, 2], 4, 3, 3, 'left', [0, 3], 4, 1, 3, 'left', [0, 1], 4, 2, 2.5, 'left', [0, 2], 4, 1.5, 2, 'left', [0, 1.5, 3], 4, 2, 4, 'left', [0], 4, 2, 2, 'right', [1, 3], 5, 2, 2, 'right', [0, 2, 4], 5, 3, 3, 'right', [1, 4], 4, 1, 3, 'right', [2, 3], 4, 2, 2.5, 'right', [1, 3], 5, 2, 2.5, 'right', [0, 2, 4], 4, 1.5, 2, 'right', [0, 1.5, 3], 4, 2, 4, 'right', [3], 4, 2, 2, 'center', [0, 2, 3], 4, 2, 14, 'center', [0, 2, 3])('gets proper indices when allowing whitespace ' + '($slideCount slides, $slidesToScroll slidesToScroll, $slidesToShow slidesToShow, $cellAlign align)', function (_ref2) {
    var slideCount = _ref2.slideCount,
      slidesToScroll = _ref2.slidesToScroll,
      slidesToShow = _ref2.slidesToShow,
      cellAlign = _ref2.cellAlign,
      expected = _ref2.expected;
    expect((0, _defaultControls.getDotIndexes)(slideCount, slidesToScroll, _types.ScrollMode.page, slidesToShow, false, cellAlign)).toEqual(expected);
  });
  it.each(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    slideCount | slidesToScroll | slidesToShow | expected\n    ", "       | ", "           | ", "         | ", "\n    ", "       | ", "           | ", "         | ", "\n    ", "       | ", "           | ", "         | ", "\n    ", "       | ", "           | ", "         | ", "\n    ", "       | ", "           | ", "         | ", "\n    ", "       | ", "           | ", "       | ", "\n    ", "       | ", "         | ", "         | ", "\n  "])), 4, 1, 2, [0, 1, 2, 3], 4, 2, 2, [0, 2], 3, 2, 2, [0, 2], 4, 3, 3, [0, 3], 4, 1, 3, [0, 1, 2, 3], 4, 2, 2.5, [0, 2], 4, 1.5, 2, [0, 1.5, 3])('gets proper indices when wrapping ' + '($slideCount slides, $slidesToScroll slidesToScroll, $slidesToShow slidesToShow)', function (_ref3) {
    var slideCount = _ref3.slideCount,
      slidesToScroll = _ref3.slidesToScroll,
      slidesToShow = _ref3.slidesToShow,
      expected = _ref3.expected;
    expect((0, _defaultControls.getDotIndexes)(slideCount, slidesToScroll, _types.ScrollMode.page,
    // ignored
    slidesToShow, true, 'left')).toEqual(expected);
  });
});
describe('nextButtonDisabled', function () {
  it.each(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    currentSlide | slidesToShow | cellAlign   | expected\n    ", "         | ", "         | ", "   | ", "\n    ", "         | ", "         | ", "   | ", "\n    ", "         | ", "         | ", "   | ", "\n    ", "         | ", "         | ", "   | ", "\n    ", "         | ", "       | ", "   | ", "\n    ", "       | ", "         | ", "   | ", "\n    ", "       | ", "         | ", "   | ", "\n    ", "         | ", "         | ", "  | ", "\n    ", "         | ", "         | ", "  | ", "\n    ", "         | ", "         | ", "  | ", "\n    ", "         | ", "         | ", "  | ", "\n    ", "         | ", "       | ", "  | ", "\n    ", "       | ", "         | ", "  | ", "\n    ", "         | ", "         | ", " | ", "\n    ", "         | ", "         | ", " | ", "\n    ", "         | ", "         | ", " | ", "\n    ", "         | ", "         | ", " | ", "\n    ", "         | ", "       | ", " | ", "\n    ", "       | ", "         | ", " | ", "\n  "])), 1, 1, 'left', false, 1, 2, 'left', true, 2, 1, 'left', true, 2, 2, 'left', true, 1, 2.5, 'left', true, 1.5, 2, 'left', true, 0.5, 2, 'left', false, 1, 1, 'right', false, 1, 2, 'right', false, 2, 1, 'right', true, 2, 2, 'right', true, 1, 2.5, 'right', false, 1.5, 2, 'right', false, 1, 1, 'center', false, 1, 2, 'center', false, 2, 1, 'center', true, 2, 2, 'center', true, 1, 2.5, 'center', false, 1.5, 2, 'center', false)('disables properly when allowing whitespace ' + '(slideIndex $currentSlide, $slidesToShow slidesToShow, $cellAlign align)', function (_ref4) {
    var currentSlide = _ref4.currentSlide,
      slidesToShow = _ref4.slidesToShow,
      cellAlign = _ref4.cellAlign,
      expected = _ref4.expected;
    var args = {
      currentSlide: currentSlide,
      slidesToShow: slidesToShow,
      slideCount: 3,
      wrapAround: false,
      scrollMode: _types.ScrollMode.page,
      cellAlign: cellAlign
    };
    expect((0, _defaultControls.nextButtonDisabled)(args)).toEqual(expected);
  });
  it.each(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    currentSlide | slidesToShow | cellAlign   | expected\n    ", "         | ", "         | ", "   | ", "\n    ", "         | ", "         | ", "   | ", "\n    ", "         | ", "         | ", "   | ", "\n    ", "         | ", "         | ", "   | ", "\n    ", "         | ", "       | ", "   | ", "\n    ", "       | ", "         | ", "   | ", "\n    ", "       | ", "         | ", "   | ", "\n    ", "         | ", "         | ", "  | ", "\n    ", "         | ", "         | ", "  | ", "\n    ", "         | ", "         | ", "  | ", "\n    ", "         | ", "         | ", "  | ", "\n    ", "         | ", "       | ", "  | ", "\n    ", "       | ", "         | ", "  | ", "\n    ", "       | ", "         | ", "  | ", "\n    ", "         | ", "         | ", " | ", "\n    ", "         | ", "         | ", " | ", "\n    ", "         | ", "         | ", " | ", "\n    ", "         | ", "         | ", " | ", "\n    ", "         | ", "       | ", " | ", "\n    ", "       | ", "         | ", " | ", "\n    ", "       | ", "         | ", " | ", "\n  "])), 1, 1, 'left', false, 1, 2, 'left', true, 2, 1, 'left', true, 2, 2, 'left', true, 1, 2.5, 'left', true, 1.5, 2, 'left', true, 0.5, 2, 'left', false, 1, 1, 'right', false, 1, 2, 'right', false, 2, 1, 'right', true, 2, 2, 'right', true, 1, 2.5, 'right', false, 1.5, 2, 'right', false, 0.5, 2, 'right', false, 1, 1, 'center', false, 1, 2, 'center', false, 2, 1, 'center', true, 2, 2, 'center', true, 1, 2.5, 'center', false, 1.5, 2, 'center', false, 0.5, 2, 'center', false)('disables properly when avoiding whitespace ' + '(slideIndex $currentSlide, $slidesToShow slidesToShow, $cellAlign align)', function (_ref5) {
    var currentSlide = _ref5.currentSlide,
      slidesToShow = _ref5.slidesToShow,
      cellAlign = _ref5.cellAlign,
      expected = _ref5.expected;
    var args = {
      currentSlide: currentSlide,
      slidesToShow: slidesToShow,
      slideCount: 3,
      wrapAround: false,
      scrollMode: _types.ScrollMode.remainder,
      cellAlign: cellAlign
    };
    expect((0, _defaultControls.nextButtonDisabled)(args)).toEqual(expected);
  });
});
describe('prevButtonDisabled', function () {
  it.each(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n    currentSlide | slidesToShow | cellAlign   | expected\n    ", "         | ", "         | ", "   | ", "\n    ", "         | ", "         | ", "   | ", "\n    ", "         | ", "         | ", "   | ", "\n    ", "         | ", "         | ", "   | ", "\n    ", "         | ", "       | ", "   | ", "\n    ", "       | ", "         | ", "   | ", "\n    ", "         | ", "         | ", " | ", "\n    ", "         | ", "         | ", " | ", "\n    ", "         | ", "         | ", " | ", "\n    ", "         | ", "         | ", " | ", "\n    ", "         | ", "       | ", " | ", "\n    ", "       | ", "         | ", " | ", "\n    ", "         | ", "         | ", "  | ", "\n    ", "         | ", "         | ", "  | ", "\n    ", "         | ", "         | ", "  | ", "\n    ", "         | ", "         | ", "  | ", "\n    ", "         | ", "       | ", "  | ", "\n    ", "       | ", "         | ", "  | ", "\n    ", "       | ", "         | ", "  | ", "\n  "])), 1, 1, 'left', false, 1, 2, 'left', false, 0, 1, 'left', true, 0, 2, 'left', true, 1, 2.5, 'left', false, 1.5, 2, 'left', false, 1, 1, 'center', false, 1, 2, 'center', false, 0, 1, 'center', true, 0, 2, 'center', true, 1, 2.5, 'center', false, 1.5, 2, 'center', false, 1, 1, 'right', false, 1, 2, 'right', true, 0, 1, 'right', true, 0, 2, 'right', true, 1, 2.5, 'right', true, 1.5, 2, 'right', false, 0.5, 2, 'right', true)('disables properly when allowing whitespace ' + '(slideIndex $currentSlide, $slidesToShow slidesToShow, $cellAlign align)', function (_ref6) {
    var currentSlide = _ref6.currentSlide,
      slidesToShow = _ref6.slidesToShow,
      cellAlign = _ref6.cellAlign,
      expected = _ref6.expected;
    var args = {
      currentSlide: currentSlide,
      slidesToShow: slidesToShow,
      wrapAround: false,
      cellAlign: cellAlign
    };
    expect((0, _defaultControls.prevButtonDisabled)(args)).toEqual(expected);
  });
  it.each(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n    currentSlide | slidesToShow | cellAlign   | expected\n    ", "         | ", "         | ", "   | ", "\n    ", "         | ", "         | ", "   | ", "\n    ", "         | ", "         | ", "   | ", "\n    ", "         | ", "         | ", "   | ", "\n    ", "         | ", "       | ", "   | ", "\n    ", "       | ", "         | ", "   | ", "\n    ", "       | ", "         | ", "   | ", "\n    ", "         | ", "         | ", "  | ", "\n    ", "         | ", "         | ", "  | ", "\n    ", "         | ", "         | ", "  | ", "\n    ", "         | ", "         | ", "  | ", "\n    ", "         | ", "       | ", "  | ", "\n    ", "       | ", "         | ", "  | ", "\n    ", "       | ", "         | ", "  | ", "\n    ", "         | ", "         | ", " | ", "\n    ", "         | ", "         | ", " | ", "\n    ", "         | ", "         | ", " | ", "\n    ", "         | ", "         | ", " | ", "\n    ", "         | ", "       | ", " | ", "\n    ", "       | ", "         | ", " | ", "\n    ", "       | ", "         | ", " | ", "\n  "])), 1, 1, 'left', false, 1, 2, 'left', false, 0, 1, 'left', true, 0, 2, 'left', true, 1, 2.5, 'left', false, 1.5, 2, 'left', false, 0.5, 2, 'left', false, 1, 1, 'right', false, 1, 2, 'right', true, 0, 1, 'right', true, 0, 2, 'right', true, 1, 2.5, 'right', true, 0.5, 2, 'right', true, 1.5, 2, 'right', false, 1, 1, 'center', false, 1, 2, 'center', false, 0, 1, 'center', true, 0, 2, 'center', true, 1, 2.5, 'center', false, 1.5, 2, 'center', false, 0.5, 2, 'center', false)('disables properly when avoiding whitespace ' + '(slideIndex $currentSlide, $slidesToShow slidesToShow, $cellAlign align)', function (_ref7) {
    var currentSlide = _ref7.currentSlide,
      slidesToShow = _ref7.slidesToShow,
      cellAlign = _ref7.cellAlign,
      expected = _ref7.expected;
    var args = {
      currentSlide: currentSlide,
      slidesToShow: slidesToShow,
      wrapAround: false,
      cellAlign: cellAlign
    };
    expect((0, _defaultControls.prevButtonDisabled)(args)).toEqual(expected);
  });
});