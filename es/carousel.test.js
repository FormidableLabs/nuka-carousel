"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _jestAxe = require("jest-axe");

var _carousel = _interopRequireDefault(require("./carousel"));

var _excluded = ["slideCount"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function hasNoViolations(_x) {
  return _hasNoViolations.apply(this, arguments);
} // Fake timers using Jest


function _hasNoViolations() {
  _hasNoViolations = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(html) {
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return (0, _react2.waitFor)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
              return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      _context13.t0 = expect;
                      _context13.next = 3;
                      return (0, _jestAxe.axe)(html);

                    case 3:
                      _context13.t1 = _context13.sent;
                      (0, _context13.t0)(_context13.t1).toHaveNoViolations();

                    case 5:
                    case "end":
                      return _context13.stop();
                  }
                }
              }, _callee13);
            })));

          case 2:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _hasNoViolations.apply(this, arguments);
}

beforeEach(function () {
  jest.useFakeTimers();
}); // Running all pending timers and switching to real timers using Jest

afterEach(function () {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});
/**
 * Mock dimensions for the carousel for calculations where carousel dimensions
 * are used, such as with dragging thresholds
 */

var createCarouselRefWithMockedDimensions = function createCarouselRefWithMockedDimensions() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$defaultWidth = _ref.defaultWidth,
      defaultWidth = _ref$defaultWidth === void 0 ? 600 : _ref$defaultWidth;

  var refValue = null;
  var widthGetterMock = jest.fn(function () {
    return defaultWidth;
  });
  var carouselRef = Object.create({}, {
    current: {
      get: function get() {
        return refValue;
      },
      set: function set(newValue) {
        refValue = newValue;

        if (refValue) {
          Object.defineProperty(refValue, 'offsetWidth', {
            get: widthGetterMock
          });
        }
      }
    }
  });
  return {
    ref: carouselRef,
    widthGetterMock: widthGetterMock
  };
};

describe('Carousel', function () {
  var renderCarousel = function renderCarousel() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref2$slideCount = _ref2.slideCount,
        slideCount = _ref2$slideCount === void 0 ? 5 : _ref2$slideCount,
        props = _objectWithoutProperties(_ref2, _excluded);

    return (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_carousel["default"], props, _toConsumableArray(Array(slideCount)).map(function (_, index) {
      return /*#__PURE__*/_react["default"].createElement("img", {
        src: "#",
        alt: "slide ".concat(index),
        key: index
      });
    })));
  };

  it('autoplays at the right rate', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var beforeSlide, afterSlide, speed, autoplayInterval, slideCount, _renderCarousel, container, checkTimingCycle;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            beforeSlide = jest.fn();
            afterSlide = jest.fn();
            speed = 500;
            autoplayInterval = 1000;
            slideCount = 2;
            _renderCarousel = renderCarousel({
              slideCount: slideCount,
              autoplay: true,
              autoplayInterval: autoplayInterval,
              speed: speed,
              wrapAround: true,
              beforeSlide: beforeSlide,
              afterSlide: afterSlide
            }), container = _renderCarousel.container;
            expect(beforeSlide).toHaveBeenCalledTimes(0);
            expect(afterSlide).toHaveBeenCalledTimes(0); // autoplay initiated, waiting for first interval

            (0, _react2.act)(function () {
              jest.advanceTimersByTime(autoplayInterval);
            });
            expect(beforeSlide).toHaveBeenCalledTimes(1);
            expect(afterSlide).toHaveBeenCalledTimes(0);

            checkTimingCycle = function checkTimingCycle(timesMoved) {
              // Animation begins, and next autoplay timeout set up
              (0, _react2.act)(function () {
                jest.advanceTimersByTime(speed);
              }); // Animation completes

              expect(beforeSlide).toHaveBeenCalledTimes(timesMoved);
              expect(afterSlide).toHaveBeenCalledTimes(timesMoved);
              expect(afterSlide).toHaveBeenLastCalledWith(timesMoved % slideCount);
              (0, _react2.act)(function () {
                jest.advanceTimersByTime(autoplayInterval - speed);
              }); // autoplay timeout triggers

              expect(beforeSlide).toHaveBeenCalledTimes(timesMoved + 1);
              expect(afterSlide).toHaveBeenCalledTimes(timesMoved);
            };

            checkTimingCycle(1);
            checkTimingCycle(2);
            checkTimingCycle(3);
            _context.next = 17;
            return hasNoViolations(container);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('slide change resets autoplay duration', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var afterSlide, speed, autoplayInterval, slideCount, carouselId, keyCodeConfig, slideChangedTimes, sliderFrame;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            afterSlide = jest.fn();
            speed = 500;
            autoplayInterval = 1000;
            slideCount = 4;
            carouselId = 'reset-autoplay';
            keyCodeConfig = {
              pause: [32]
            };
            slideChangedTimes = 0;
            renderCarousel({
              slideCount: slideCount,
              autoplay: true,
              autoplayInterval: autoplayInterval,
              speed: speed,
              wrapAround: true,
              beforeSlide: afterSlide,
              keyCodeConfig: keyCodeConfig,
              enableKeyboardControls: true,
              carouselId: carouselId,
              resumeAfterPause: false
            });
            (0, _react2.act)(function () {
              jest.advanceTimersByTime(speed);
            });
            sliderFrame = _react2.screen.getByTestId("".concat(carouselId, "-slider-frame"));
            expect(afterSlide).toHaveBeenCalledTimes(slideChangedTimes); // autoplay initiated, waiting for first interval

            (0, _react2.act)(function () {
              jest.advanceTimersByTime(autoplayInterval);
            }); // Slide changed by autoplay

            expect(afterSlide).toHaveBeenCalledTimes(++slideChangedTimes); // Pause

            _react2.fireEvent.keyDown(sliderFrame, {
              keyCode: 32
            });

            (0, _react2.act)(function () {
              jest.advanceTimersByTime(autoplayInterval);
            }); // No slide change

            expect(afterSlide).toHaveBeenCalledTimes(slideChangedTimes); // Navigate to next slide while paused.

            _context2.next = 18;
            return _react2.fireEvent.click(_react2.screen.getByRole('button', {
              name: /next/
            }));

          case 18:
            // Slide changed by next button
            expect(afterSlide).toHaveBeenCalledTimes(++slideChangedTimes); // Still paused

            (0, _react2.act)(function () {
              jest.advanceTimersByTime(autoplayInterval);
            });
            expect(afterSlide).toHaveBeenCalledTimes(slideChangedTimes); // Unpause

            _react2.fireEvent.keyDown(sliderFrame, {
              keyCode: 32
            });
            /** Advance slightly to ensure slide navigated to while paused gets full duration */


            (0, _react2.act)(function () {
              jest.advanceTimersByTime(autoplayInterval - 1);
            }); // Autoplay duration has been reset and we are still on the same slide.

            expect(afterSlide).toHaveBeenCalledTimes(slideChangedTimes); // Autoplay advances to the next slide.

            (0, _react2.act)(function () {
              jest.advanceTimersByTime(autoplayInterval - 1);
            }); // Finally slide has changed.

            expect(afterSlide).toHaveBeenCalledTimes(++slideChangedTimes);

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('autoplay duration is resumed if slide has not changed', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var afterSlide, speed, autoplayInterval, slideCount, carouselId, keyCodeConfig, slideChangedTimes, sliderFrame;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            afterSlide = jest.fn();
            speed = 500;
            autoplayInterval = 2000;
            slideCount = 4;
            carouselId = 'reset-autoplay';
            keyCodeConfig = {
              pause: [32]
            };
            slideChangedTimes = 0;
            renderCarousel({
              slideCount: slideCount,
              autoplay: true,
              autoplayInterval: autoplayInterval,
              speed: speed,
              wrapAround: true,
              beforeSlide: afterSlide,
              keyCodeConfig: keyCodeConfig,
              enableKeyboardControls: true,
              carouselId: carouselId,
              resumeAfterPause: true
            });
            (0, _react2.act)(function () {
              jest.advanceTimersByTime(speed);
            });
            sliderFrame = _react2.screen.getByTestId("".concat(carouselId, "-slider-frame"));
            expect(afterSlide).toHaveBeenCalledTimes(slideChangedTimes); // autoplay initiated, waiting for first interval

            (0, _react2.act)(function () {
              jest.advanceTimersByTime(autoplayInterval);
            }); // Slide changed by autoplay

            expect(afterSlide).toHaveBeenCalledTimes(++slideChangedTimes); // Advance half the duration. Cache will be half the duration.

            (0, _react2.act)(function () {
              jest.advanceTimersByTime(autoplayInterval / 2);
            });
            expect(afterSlide).toHaveBeenCalledTimes(slideChangedTimes); // Pause

            _react2.fireEvent.keyDown(sliderFrame, {
              keyCode: 32
            }); // fireEvent.mouseOver(sliderFrame);


            (0, _react2.act)(function () {
              jest.advanceTimersByTime(autoplayInterval);
            }); // No slide change

            expect(afterSlide).toHaveBeenCalledTimes(slideChangedTimes); // Unpause

            _react2.fireEvent.keyDown(sliderFrame, {
              keyCode: 32
            }); // fireEvent.mouseOut(sliderFrame);
            // No slide change


            expect(afterSlide).toHaveBeenCalledTimes(slideChangedTimes);
            /** Advance slightly more than the cached but less than whole duration. */

            (0, _react2.act)(function () {
              jest.advanceTimersByTime(autoplayInterval / 2 + 1);
            }); // Autoplay duration has been resumed and slide has changed.

            expect(afterSlide).toHaveBeenCalledTimes(++slideChangedTimes);

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('omits slides whose children are falsy', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var _render, container;

    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _render = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_carousel["default"], null, /*#__PURE__*/_react["default"].createElement("img", {
              src: "#",
              alt: "slide 1"
            }), /*#__PURE__*/_react["default"].createElement("img", {
              src: "#",
              alt: "slide 2"
            }), false && /*#__PURE__*/_react["default"].createElement("img", {
              src: "#",
              alt: "slide 3"
            }), null, /*#__PURE__*/_react["default"].createElement("img", {
              src: "#",
              alt: "slide 5"
            }))), container = _render.container;
            expect(container.getElementsByClassName('slide').length).toBe(3);
            _context4.next = 4;
            return hasNoViolations(container);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('can be controlled with the keyboard', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var carouselId, beforeSlide, keyCodeConfig, slideCount, _renderCarousel2, container, sliderFrame;

    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            carouselId = 'keyboard';
            beforeSlide = jest.fn();
            keyCodeConfig = {
              nextSlide: [39],
              previousSlide: [37],
              firstSlide: [81],
              lastSlide: [69],
              pause: [32]
            };
            slideCount = 8;
            _renderCarousel2 = renderCarousel({
              enableKeyboardControls: true,
              keyCodeConfig: keyCodeConfig,
              slideCount: slideCount,
              beforeSlide: beforeSlide,
              frameAriaLabel: 'keyboard',
              landmark: true,
              carouselId: carouselId
            }), container = _renderCarousel2.container;
            sliderFrame = _react2.screen.getByTestId("".concat(carouselId, "-slider-frame"));

            _react2.fireEvent.keyDown(sliderFrame, {
              keyCode: keyCodeConfig.nextSlide[0]
            });

            expect(beforeSlide).toHaveBeenLastCalledWith(0, 1);

            _react2.fireEvent.keyDown(sliderFrame, {
              keyCode: keyCodeConfig.nextSlide[0]
            });

            expect(beforeSlide).toHaveBeenLastCalledWith(1, 2);

            _react2.fireEvent.keyDown(sliderFrame, {
              keyCode: keyCodeConfig.previousSlide[0]
            });

            expect(beforeSlide).toHaveBeenLastCalledWith(2, 1);

            _react2.fireEvent.keyDown(sliderFrame, {
              keyCode: keyCodeConfig.previousSlide[0]
            });

            expect(beforeSlide).toHaveBeenLastCalledWith(1, 0);

            _react2.fireEvent.keyDown(sliderFrame, {
              keyCode: keyCodeConfig.lastSlide[0]
            });

            expect(beforeSlide).toHaveBeenLastCalledWith(0, slideCount - 1);

            _react2.fireEvent.keyDown(sliderFrame, {
              keyCode: keyCodeConfig.firstSlide[0]
            });

            expect(beforeSlide).toHaveBeenLastCalledWith(slideCount - 1, 0);
            _context5.next = 20;
            return hasNoViolations(container);

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('detects user-triggered navigation', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var carouselId, beforeSlide, onUserNavigation, keyCodeConfig, autoplayInterval, slideCount, _renderCarousel3, container, sliderFrame;

    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            carouselId = 'user-navigation';
            beforeSlide = jest.fn();
            onUserNavigation = jest.fn();
            keyCodeConfig = {
              nextSlide: [39],
              previousSlide: [37],
              firstSlide: [81],
              lastSlide: [69],
              pause: [32]
            };
            autoplayInterval = 3000;
            slideCount = 8;
            _renderCarousel3 = renderCarousel({
              enableKeyboardControls: true,
              autoplay: true,
              autoplayInterval: autoplayInterval,
              keyCodeConfig: keyCodeConfig,
              innerRef: createCarouselRefWithMockedDimensions().ref,
              slideCount: slideCount,
              beforeSlide: beforeSlide,
              onUserNavigation: onUserNavigation,
              frameAriaLabel: 'user navigation',
              landmark: true,
              carouselId: carouselId
            }), container = _renderCarousel3.container;
            expect(onUserNavigation).toHaveBeenCalledTimes(0); // Let enough time pass that autoplay triggers navigation

            (0, _react2.act)(function () {
              jest.advanceTimersByTime(autoplayInterval);
            }); // Make sure the navigation happened, but did not trigger the
            // `onUserNavigation` callback (because it wasn't user-initiated)

            expect(onUserNavigation).toHaveBeenCalledTimes(0);
            expect(beforeSlide).toHaveBeenLastCalledWith(0, 1);
            sliderFrame = _react2.screen.getByTestId("".concat(carouselId, "-slider-frame")); // Simulating keyboard shortcut use to navigate

            _react2.fireEvent.keyDown(sliderFrame, {
              keyCode: keyCodeConfig.nextSlide[0]
            });

            expect(beforeSlide).toHaveBeenLastCalledWith(1, 2);
            expect(onUserNavigation).toHaveBeenCalledTimes(1);

            _react2.fireEvent.keyDown(sliderFrame, {
              keyCode: keyCodeConfig.previousSlide[0]
            });

            expect(onUserNavigation).toHaveBeenCalledTimes(2);

            _react2.fireEvent.keyDown(sliderFrame, {
              keyCode: keyCodeConfig.lastSlide[0]
            });

            expect(onUserNavigation).toHaveBeenCalledTimes(3);

            _react2.fireEvent.keyDown(sliderFrame, {
              keyCode: keyCodeConfig.firstSlide[0]
            });

            expect(onUserNavigation).toHaveBeenCalledTimes(4); // Simulating clicks on default controls to navigate

            _react2.fireEvent.click(_react2.screen.getByRole('button', {
              name: /next/
            }));

            expect(onUserNavigation).toHaveBeenCalledTimes(5);

            _react2.fireEvent.click(_react2.screen.getByRole('button', {
              name: /prev/
            }));

            expect(onUserNavigation).toHaveBeenCalledTimes(6);

            _react2.fireEvent.click(_react2.screen.getByRole('tab', {
              name: /slide 2/
            }));

            expect(onUserNavigation).toHaveBeenCalledTimes(7); // Simulating drag to navigate

            _react2.fireEvent.mouseDown(sliderFrame, {
              clientX: 100
            });

            _react2.fireEvent.mouseMove(sliderFrame, {
              clientX: 100
            });

            jest.advanceTimersByTime(100);

            _react2.fireEvent.mouseMove(sliderFrame, {
              clientX: 700
            });

            _react2.fireEvent.mouseUp(sliderFrame, {
              clientX: 700
            });

            expect(onUserNavigation).toHaveBeenCalledTimes(8); // Simulating swipe to navigate

            _react2.fireEvent.touchStart(sliderFrame, {
              touches: [{
                pageX: 700
              }]
            });

            _react2.fireEvent.touchMove(sliderFrame, {
              touches: [{
                pageX: 700
              }]
            });

            jest.advanceTimersByTime(100);

            _react2.fireEvent.touchMove(sliderFrame, {
              touches: [{
                pageX: 100
              }]
            });

            _react2.fireEvent.touchEnd(sliderFrame, {
              touches: [{
                pageX: 100
              }]
            });

            expect(onUserNavigation).toHaveBeenCalledTimes(9); // Should not be triggering navigation callback when dragging didn't trigger navigation

            _react2.fireEvent.mouseDown(sliderFrame, {
              clientX: 100
            });

            _react2.fireEvent.mouseMove(sliderFrame, {
              clientX: 100
            });

            jest.advanceTimersByTime(10);

            _react2.fireEvent.mouseMove(sliderFrame, {
              clientX: 105
            });

            _react2.fireEvent.mouseUp(sliderFrame, {
              clientX: 105
            });

            expect(onUserNavigation).toHaveBeenCalledTimes(9);
            _context6.next = 47;
            return hasNoViolations(container);

          case 47:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it('calls default control callbacks when interacted with', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var beforeSlide, nextButtonOnClick, prevButtonOnClick, pagingDotsOnClick, slideCount, _renderCarousel4, container, preventDefault;

    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            beforeSlide = jest.fn();
            nextButtonOnClick = jest.fn();
            prevButtonOnClick = jest.fn();
            pagingDotsOnClick = jest.fn();
            slideCount = 8;
            _renderCarousel4 = renderCarousel({
              slideCount: slideCount,
              beforeSlide: beforeSlide,
              defaultControlsConfig: {
                nextButtonOnClick: nextButtonOnClick,
                prevButtonOnClick: prevButtonOnClick,
                pagingDotsOnClick: pagingDotsOnClick
              }
            }), container = _renderCarousel4.container; // Simulating clicks on default controls to navigate

            expect(nextButtonOnClick).toHaveBeenCalledTimes(0);

            _react2.fireEvent.click(_react2.screen.getByRole('button', {
              name: /next/
            }));

            expect(nextButtonOnClick).toHaveBeenCalledTimes(1);
            expect(prevButtonOnClick).toHaveBeenCalledTimes(0);

            _react2.fireEvent.click(_react2.screen.getByRole('button', {
              name: /prev/
            }));

            expect(prevButtonOnClick).toHaveBeenCalledTimes(1);
            expect(pagingDotsOnClick).toHaveBeenCalledTimes(0);

            _react2.fireEvent.click(_react2.screen.getByRole('tab', {
              name: /slide 2/
            }));

            expect(pagingDotsOnClick).toHaveBeenCalledTimes(1); // Check that calling preventDefault in the custom callback will stop the
            // default behavior (navigation) before it happens

            preventDefault = function preventDefault(event) {
              return event.preventDefault();
            };

            nextButtonOnClick.mockImplementation(preventDefault);
            prevButtonOnClick.mockImplementation(preventDefault);
            pagingDotsOnClick.mockImplementation(preventDefault);
            expect(beforeSlide).toHaveBeenCalledTimes(3);

            _react2.fireEvent.click(_react2.screen.getByRole('button', {
              name: /next/
            }));

            _react2.fireEvent.click(_react2.screen.getByRole('button', {
              name: /prev/
            }));

            _react2.fireEvent.click(_react2.screen.getByRole('tab', {
              name: /slide 2/
            }));

            expect(beforeSlide).toHaveBeenCalledTimes(3);
            _context7.next = 26;
            return hasNoViolations(container);

          case 26:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it('has role group by default', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    var slideCount, carouselId, _renderCarousel5, container, carouselFrame;

    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            slideCount = 8;
            carouselId = 'role-group';
            _renderCarousel5 = renderCarousel({
              carouselId: carouselId,
              slideCount: slideCount
            }), container = _renderCarousel5.container;
            carouselFrame = _react2.screen.getByTestId(carouselId);
            expect(carouselFrame).toHaveAttribute('role', 'group');
            expect(carouselFrame).toHaveAttribute('aria-roledescription', 'carousel');
            _context8.next = 8;
            return hasNoViolations(container);

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  it('is a region landmark', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var slideCount, carouselId, _renderCarousel6, container, carouselFrame;

    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            slideCount = 8;
            carouselId = 'roles';
            _renderCarousel6 = renderCarousel({
              carouselId: carouselId,
              slideCount: slideCount,
              landmark: true
            }), container = _renderCarousel6.container;
            carouselFrame = _react2.screen.getByRole('region');
            expect(carouselFrame).toHaveAttribute('aria-roledescription', 'carousel');
            _context9.next = 7;
            return hasNoViolations(container);

          case 7:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
  it('has appropriate attributes', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    var slideCount, carouselId, _renderCarousel7, container, carouselFrame, next, prev;

    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            slideCount = 8;
            carouselId = 'roles';
            _renderCarousel7 = renderCarousel({
              carouselId: carouselId,
              slideCount: slideCount
            }), container = _renderCarousel7.container;
            carouselFrame = _react2.screen.getByRole('group');
            expect(carouselFrame).toHaveAttribute('role', 'group');
            expect(carouselFrame).toHaveAttribute('aria-roledescription', 'carousel');
            next = _react2.screen.getByRole('button', {
              name: 'next'
            });
            expect(next).toHaveAttribute('aria-controls', "".concat(carouselId, "-slider-frame"));
            prev = _react2.screen.getByRole('button', {
              name: 'previous'
            });
            expect(prev).toHaveAttribute('aria-controls', "".concat(carouselId, "-slider-frame"));
            _context10.next = 12;
            return hasNoViolations(container);

          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  it('paging dots have appropriate tab roles', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
    var slideCount, carouselId, _renderCarousel8, container, dots, firstDot, lastDot, tablist, firstSlide;

    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            slideCount = 8;
            carouselId = 'tabs';
            _renderCarousel8 = renderCarousel({
              carouselId: carouselId,
              slideCount: slideCount,
              tabbed: true
            }), container = _renderCarousel8.container;
            dots = _react2.screen.getAllByRole('tab');
            firstDot = dots[0];
            expect(firstDot).toHaveAttribute('aria-controls', "".concat(carouselId, "-slide-1"));
            expect(firstDot).toHaveAttribute('aria-selected', 'true');
            lastDot = dots[dots.length - 1];
            expect(lastDot).toHaveAttribute('aria-controls', "".concat(carouselId, "-slide-8"));
            expect(lastDot).toHaveAttribute('aria-selected', 'false');
            tablist = _react2.screen.getByRole('tablist');
            expect(tablist).toHaveAttribute('aria-label', 'Choose slide to display.');
            firstSlide = container.querySelector("#".concat(carouselId, "-slide-1"));
            expect(firstSlide).toHaveAttribute('role', 'tabpanel');
            expect(firstSlide).not.toHaveAttribute('aria-roledescription');
            _context11.next = 17;
            return (0, _react2.waitFor)(function () {
              lastDot.click();
              expect(firstDot).toHaveAttribute('aria-selected', 'false');
              expect(lastDot).toHaveAttribute('aria-selected', 'true');
            });

          case 17:
            _context11.next = 19;
            return hasNoViolations(container);

          case 19:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
  it('without tabs should have appropriate roles.', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
    var carouselId, _renderCarousel9, container, firstSlide;

    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            carouselId = 'untabbed';
            _renderCarousel9 = renderCarousel({
              carouselId: carouselId,
              tabbed: false
            }), container = _renderCarousel9.container;
            firstSlide = container.querySelector("#".concat(carouselId, "-slide-1"));
            expect(firstSlide).toHaveAttribute('role', 'group');
            expect(firstSlide).toHaveAttribute('aria-roledescription', 'slide');
            expect(_react2.screen.queryByRole('tab')).not.toBeInTheDocument();
            expect(_react2.screen.queryByRole('tablist')).not.toBeInTheDocument();
            expect(_react2.screen.queryByRole('tabpanel')).not.toBeInTheDocument();
            _context12.next = 10;
            return hasNoViolations(container);

          case 10:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
});