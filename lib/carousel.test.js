"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _carousel = _interopRequireDefault(require("./carousel"));
var _excluded = ["slideCount"];
/**
 * @jest-environment jsdom
 */
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
// Fake timers using Jest
beforeEach(function () {
  jest.useFakeTimers();
});

// Running all pending timers and switching to real timers using Jest
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
  it('autoplays at the right rate', function () {
    var beforeSlide = jest.fn();
    var afterSlide = jest.fn();
    var speed = 500;
    var autoplayInterval = 1000;
    var slideCount = 2;
    renderCarousel({
      slideCount: slideCount,
      autoplay: true,
      autoplayInterval: autoplayInterval,
      speed: speed,
      wrapAround: true,
      beforeSlide: beforeSlide,
      afterSlide: afterSlide
    });
    expect(beforeSlide).toHaveBeenCalledTimes(0);
    expect(afterSlide).toHaveBeenCalledTimes(0);

    // autoplay initiated, waiting for first interval

    (0, _react2.act)(function () {
      jest.advanceTimersByTime(autoplayInterval);
    });
    expect(beforeSlide).toHaveBeenCalledTimes(1);
    expect(afterSlide).toHaveBeenCalledTimes(0);
    var checkTimingCycle = function checkTimingCycle(timesMoved) {
      // Animation begins, and next autoplay timeout set up

      (0, _react2.act)(function () {
        jest.advanceTimersByTime(speed);
      });

      // Animation completes

      expect(beforeSlide).toHaveBeenCalledTimes(timesMoved);
      expect(afterSlide).toHaveBeenCalledTimes(timesMoved);
      expect(afterSlide).toHaveBeenLastCalledWith(timesMoved % slideCount);
      (0, _react2.act)(function () {
        jest.advanceTimersByTime(autoplayInterval - speed);
      });

      // autoplay timeout triggers

      expect(beforeSlide).toHaveBeenCalledTimes(timesMoved + 1);
      expect(afterSlide).toHaveBeenCalledTimes(timesMoved);
    };
    checkTimingCycle(1);
    checkTimingCycle(2);
    checkTimingCycle(3);
  });
  it('omits slides whose children are falsy', function () {
    var _render = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_carousel["default"], null, /*#__PURE__*/_react["default"].createElement("img", {
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
      }))),
      container = _render.container;
    expect(container.getElementsByClassName('slide').length).toBe(3);
  });
  it('can be controlled with the keyboard', function () {
    var beforeSlide = jest.fn();
    var keyCodeConfig = {
      nextSlide: [39],
      previousSlide: [37],
      firstSlide: [81],
      lastSlide: [69],
      pause: [32]
    };
    var slideCount = 8;
    renderCarousel({
      enableKeyboardControls: true,
      keyCodeConfig: keyCodeConfig,
      slideCount: slideCount,
      beforeSlide: beforeSlide
    });
    var carouselFrame = _react2.screen.getByRole('region');
    _react2.fireEvent.keyDown(carouselFrame, {
      keyCode: keyCodeConfig.nextSlide[0]
    });
    expect(beforeSlide).toHaveBeenLastCalledWith(0, 1);
    _react2.fireEvent.keyDown(carouselFrame, {
      keyCode: keyCodeConfig.nextSlide[0]
    });
    expect(beforeSlide).toHaveBeenLastCalledWith(1, 2);
    _react2.fireEvent.keyDown(carouselFrame, {
      keyCode: keyCodeConfig.previousSlide[0]
    });
    expect(beforeSlide).toHaveBeenLastCalledWith(2, 1);
    _react2.fireEvent.keyDown(carouselFrame, {
      keyCode: keyCodeConfig.previousSlide[0]
    });
    expect(beforeSlide).toHaveBeenLastCalledWith(1, 0);
    _react2.fireEvent.keyDown(carouselFrame, {
      keyCode: keyCodeConfig.lastSlide[0]
    });
    expect(beforeSlide).toHaveBeenLastCalledWith(0, slideCount - 1);
    _react2.fireEvent.keyDown(carouselFrame, {
      keyCode: keyCodeConfig.firstSlide[0]
    });
    expect(beforeSlide).toHaveBeenLastCalledWith(slideCount - 1, 0);
  });
  it('detects user-triggered navigation', function () {
    var beforeSlide = jest.fn();
    var onUserNavigation = jest.fn();
    var keyCodeConfig = {
      nextSlide: [39],
      previousSlide: [37],
      firstSlide: [81],
      lastSlide: [69],
      pause: [32]
    };
    var autoplayInterval = 3000;
    var slideCount = 8;
    renderCarousel({
      enableKeyboardControls: true,
      autoplay: true,
      autoplayInterval: autoplayInterval,
      keyCodeConfig: keyCodeConfig,
      innerRef: createCarouselRefWithMockedDimensions().ref,
      slideCount: slideCount,
      beforeSlide: beforeSlide,
      onUserNavigation: onUserNavigation
    });
    expect(onUserNavigation).toHaveBeenCalledTimes(0);

    // Let enough time pass that autoplay triggers navigation
    (0, _react2.act)(function () {
      jest.advanceTimersByTime(autoplayInterval);
    });

    // Make sure the navigation happened, but did not trigger the
    // `onUserNavigation` callback (because it wasn't user-initiated)
    expect(onUserNavigation).toHaveBeenCalledTimes(0);
    expect(beforeSlide).toHaveBeenLastCalledWith(0, 1);
    var carouselFrame = _react2.screen.getByRole('region');

    // Simulating keyboard shortcut use to navigate
    _react2.fireEvent.keyDown(carouselFrame, {
      keyCode: keyCodeConfig.nextSlide[0]
    });
    expect(beforeSlide).toHaveBeenLastCalledWith(1, 2);
    expect(onUserNavigation).toHaveBeenCalledTimes(1);
    _react2.fireEvent.keyDown(carouselFrame, {
      keyCode: keyCodeConfig.previousSlide[0]
    });
    expect(onUserNavigation).toHaveBeenCalledTimes(2);
    _react2.fireEvent.keyDown(carouselFrame, {
      keyCode: keyCodeConfig.lastSlide[0]
    });
    expect(onUserNavigation).toHaveBeenCalledTimes(3);
    _react2.fireEvent.keyDown(carouselFrame, {
      keyCode: keyCodeConfig.firstSlide[0]
    });
    expect(onUserNavigation).toHaveBeenCalledTimes(4);

    // Simulating clicks on default controls to navigate
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
    expect(onUserNavigation).toHaveBeenCalledTimes(7);

    // Simulating drag to navigate
    _react2.fireEvent.mouseDown(carouselFrame, {
      clientX: 100
    });
    _react2.fireEvent.mouseMove(carouselFrame, {
      clientX: 100
    });
    jest.advanceTimersByTime(100);
    _react2.fireEvent.mouseMove(carouselFrame, {
      clientX: 700
    });
    _react2.fireEvent.mouseUp(carouselFrame, {
      clientX: 700
    });
    expect(onUserNavigation).toHaveBeenCalledTimes(8);

    // Simulating swipe to navigate
    _react2.fireEvent.touchStart(carouselFrame, {
      touches: [{
        pageX: 700
      }]
    });
    _react2.fireEvent.touchMove(carouselFrame, {
      touches: [{
        pageX: 700
      }]
    });
    jest.advanceTimersByTime(100);
    _react2.fireEvent.touchMove(carouselFrame, {
      touches: [{
        pageX: 100
      }]
    });
    _react2.fireEvent.touchEnd(carouselFrame, {
      touches: [{
        pageX: 100
      }]
    });
    expect(onUserNavigation).toHaveBeenCalledTimes(9);

    // Should not be triggering navigation callback when dragging didn't trigger navigation
    _react2.fireEvent.mouseDown(carouselFrame, {
      clientX: 100
    });
    _react2.fireEvent.mouseMove(carouselFrame, {
      clientX: 100
    });
    jest.advanceTimersByTime(10);
    _react2.fireEvent.mouseMove(carouselFrame, {
      clientX: 105
    });
    _react2.fireEvent.mouseUp(carouselFrame, {
      clientX: 105
    });
    expect(onUserNavigation).toHaveBeenCalledTimes(9);
  });
  it('calls default control callbacks when interacted with', function () {
    var beforeSlide = jest.fn();
    var nextButtonOnClick = jest.fn();
    var prevButtonOnClick = jest.fn();
    var pagingDotsOnClick = jest.fn();
    var slideCount = 8;
    renderCarousel({
      slideCount: slideCount,
      beforeSlide: beforeSlide,
      defaultControlsConfig: {
        nextButtonOnClick: nextButtonOnClick,
        prevButtonOnClick: prevButtonOnClick,
        pagingDotsOnClick: pagingDotsOnClick
      }
    });

    // Simulating clicks on default controls to navigate
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
    expect(pagingDotsOnClick).toHaveBeenCalledTimes(1);

    // Check that calling preventDefault in the custom callback will stop the
    // default behavior (navigation) before it happens
    var preventDefault = function preventDefault(event) {
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
  });
  it('has appropriate attributes', function () {
    var slideCount = 8;
    var id = 'roles';
    renderCarousel({
      id: id,
      slideCount: slideCount
    });
    var carouselFrame = _react2.screen.getByTestId(id);
    expect(carouselFrame).toHaveAttribute('role', 'group');
    expect(carouselFrame).toHaveAttribute('aria-roledescription', 'carousel');
    var next = _react2.screen.getByRole('button', {
      name: 'next'
    });
    expect(next).toHaveAttribute('aria-controls', "".concat(id, "-slides"));
    var prev = _react2.screen.getByRole('button', {
      name: 'previous'
    });
    expect(prev).toHaveAttribute('aria-controls', "".concat(id, "-slides"));
  });
  it('paging dots have appropriate tab roles', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var slideCount, id, _renderCarousel, container, dots, firstDot, lastDot, firstSlide;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          slideCount = 8;
          id = 'tabs';
          _renderCarousel = renderCarousel({
            id: id,
            slideCount: slideCount,
            tabbed: true
          }), container = _renderCarousel.container;
          dots = _react2.screen.getAllByRole('tab');
          firstDot = dots[0];
          expect(firstDot).toHaveAttribute('aria-controls', "".concat(id, "-slide-1"));
          expect(firstDot).toHaveAttribute('aria-selected', 'true');
          lastDot = dots[dots.length - 1];
          expect(lastDot).toHaveAttribute('aria-controls', "".concat(id, "-slide-8"));
          expect(lastDot).toHaveAttribute('aria-selected', 'false');
          expect(_react2.screen.getByRole('tablist')).toBeInTheDocument();
          firstSlide = container.querySelector("#".concat(id, "-slide-1"));
          expect(firstSlide).toHaveAttribute('role', 'tabpanel');
          expect(firstSlide).not.toHaveAttribute('aria-roledescription');
          _context.next = 16;
          return (0, _react2.waitFor)(function () {
            lastDot.click();
            expect(firstDot).toHaveAttribute('aria-selected', 'false');
            expect(lastDot).toHaveAttribute('aria-selected', 'true');
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  it('autoplay should have pause button and aria live off', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var id, _renderCarousel2, container, pauseButton;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = 'autoplay';
          _renderCarousel2 = renderCarousel({
            id: id,
            autoplay: true
          }), container = _renderCarousel2.container;
          expect(container.querySelector('[aria-live]')).toHaveAttribute('aria-live', 'off');
          pauseButton = _react2.screen.getByTestId('pause-button');
          expect(pauseButton).toHaveTextContent('Pause');
          _context2.next = 7;
          return (0, _react2.waitFor)(function () {
            pauseButton.click();
            expect(pauseButton).toHaveTextContent('Play');
          });
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  it('should render without pause button if autoplay is off', function () {
    var id = 'autoplay-off';
    var _renderCarousel3 = renderCarousel({
        id: id,
        autoplay: false
      }),
      container = _renderCarousel3.container;
    expect(container.querySelector('[aria-live]')).toHaveAttribute('aria-live', 'polite');
    expect(_react2.screen.queryByTestId('pause-button')).not.toBeInTheDocument();
  });
  it('without tabs should have appropriate roles.', function () {
    var id = 'untabbed';
    var _renderCarousel4 = renderCarousel({
        id: id,
        tabbed: false
      }),
      container = _renderCarousel4.container;
    var firstSlide = container.querySelector("#".concat(id, "-slide-1"));
    expect(firstSlide).toHaveAttribute('role', 'group');
    expect(firstSlide).toHaveAttribute('aria-roledescription', 'slide');
    expect(_react2.screen.queryByRole('tab')).not.toBeInTheDocument();
    expect(_react2.screen.queryByRole('tablist')).not.toBeInTheDocument();
    expect(_react2.screen.queryByRole('tabpanel')).not.toBeInTheDocument();
  });
});