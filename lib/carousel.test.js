"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const jest_axe_1 = require("jest-axe");
const carousel_1 = __importDefault(require("./carousel"));
function hasNoViolations(html) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, react_1.waitFor)(() => __awaiter(this, void 0, void 0, function* () {
            expect(yield (0, jest_axe_1.axe)(html)).toHaveNoViolations();
        }));
    });
}
// Fake timers using Jest
beforeEach(() => {
    jest.useFakeTimers();
});
// Running all pending timers and switching to real timers using Jest
afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
});
/**
 * Mock dimensions for the carousel for calculations where carousel dimensions
 * are used, such as with dragging thresholds
 */
const createCarouselRefWithMockedDimensions = ({ defaultWidth = 600 } = {}) => {
    let refValue = null;
    const widthGetterMock = jest.fn(() => defaultWidth);
    const carouselRef = Object.create({}, {
        current: {
            get: () => refValue,
            set(newValue) {
                refValue = newValue;
                if (refValue) {
                    Object.defineProperty(refValue, 'offsetWidth', {
                        get: widthGetterMock,
                    });
                }
            },
        },
    });
    return { ref: carouselRef, widthGetterMock };
};
describe('Carousel', () => {
    const renderCarousel = (_a = {}) => {
        var { slideCount = 5 } = _a, props = __rest(_a, ["slideCount"]);
        return (0, react_1.render)((0, jsx_runtime_1.jsx)(carousel_1.default, Object.assign({}, props, { children: [...Array(slideCount)].map((_, index) => ((0, jsx_runtime_1.jsx)("img", { src: "#", alt: `slide ${index}` }, index))) })));
    };
    it('autoplays at the right rate', () => __awaiter(void 0, void 0, void 0, function* () {
        const beforeSlide = jest.fn();
        const afterSlide = jest.fn();
        const speed = 500;
        const autoplayInterval = 1000;
        const slideCount = 2;
        const { container } = renderCarousel({
            slideCount,
            autoplay: true,
            autoplayInterval,
            speed,
            wrapAround: true,
            beforeSlide,
            afterSlide,
        });
        expect(beforeSlide).toHaveBeenCalledTimes(0);
        expect(afterSlide).toHaveBeenCalledTimes(0);
        // autoplay initiated, waiting for first interval
        (0, react_1.act)(() => {
            jest.advanceTimersByTime(autoplayInterval);
        });
        expect(beforeSlide).toHaveBeenCalledTimes(1);
        expect(afterSlide).toHaveBeenCalledTimes(0);
        const checkTimingCycle = (timesMoved) => {
            // Animation begins, and next autoplay timeout set up
            (0, react_1.act)(() => {
                jest.advanceTimersByTime(speed);
            });
            // Animation completes
            expect(beforeSlide).toHaveBeenCalledTimes(timesMoved);
            expect(afterSlide).toHaveBeenCalledTimes(timesMoved);
            expect(afterSlide).toHaveBeenLastCalledWith(timesMoved % slideCount);
            (0, react_1.act)(() => {
                jest.advanceTimersByTime(autoplayInterval - speed);
            });
            // autoplay timeout triggers
            expect(beforeSlide).toHaveBeenCalledTimes(timesMoved + 1);
            expect(afterSlide).toHaveBeenCalledTimes(timesMoved);
        };
        checkTimingCycle(1);
        checkTimingCycle(2);
        checkTimingCycle(3);
        yield hasNoViolations(container);
    }));
    it('slide change resets autoplay duration', () => __awaiter(void 0, void 0, void 0, function* () {
        const afterSlide = jest.fn();
        const speed = 500;
        const autoplayInterval = 1000;
        const slideCount = 4;
        const carouselId = 'reset-autoplay';
        const keyCodeConfig = {
            pause: [32],
        };
        let slideChangedTimes = 0;
        renderCarousel({
            slideCount,
            autoplay: true,
            autoplayInterval,
            speed,
            wrapAround: true,
            beforeSlide: afterSlide,
            keyCodeConfig,
            enableKeyboardControls: true,
            carouselId,
            resumeAfterPause: false,
        });
        (0, react_1.act)(() => {
            jest.advanceTimersByTime(speed);
        });
        const sliderFrame = react_1.screen.getByTestId(`${carouselId}-slider-frame`);
        expect(afterSlide).toHaveBeenCalledTimes(slideChangedTimes);
        // autoplay initiated, waiting for first interval
        (0, react_1.act)(() => {
            jest.advanceTimersByTime(autoplayInterval);
        });
        // Slide changed by autoplay
        expect(afterSlide).toHaveBeenCalledTimes(++slideChangedTimes);
        // Pause
        react_1.fireEvent.keyDown(sliderFrame, { keyCode: 32 });
        (0, react_1.act)(() => {
            jest.advanceTimersByTime(autoplayInterval);
        });
        // No slide change
        expect(afterSlide).toHaveBeenCalledTimes(slideChangedTimes);
        // Navigate to next slide while paused.
        yield react_1.fireEvent.click(react_1.screen.getByRole('button', { name: /next/ }));
        // Slide changed by next button
        expect(afterSlide).toHaveBeenCalledTimes(++slideChangedTimes);
        // Still paused
        (0, react_1.act)(() => {
            jest.advanceTimersByTime(autoplayInterval);
        });
        expect(afterSlide).toHaveBeenCalledTimes(slideChangedTimes);
        // Unpause
        react_1.fireEvent.keyDown(sliderFrame, { keyCode: 32 });
        /** Advance slightly to ensure slide navigated to while paused gets full duration */
        (0, react_1.act)(() => {
            jest.advanceTimersByTime(autoplayInterval - 1);
        });
        // Autoplay duration has been reset and we are still on the same slide.
        expect(afterSlide).toHaveBeenCalledTimes(slideChangedTimes);
        // Autoplay advances to the next slide.
        (0, react_1.act)(() => {
            jest.advanceTimersByTime(autoplayInterval - 1);
        });
        // Finally slide has changed.
        expect(afterSlide).toHaveBeenCalledTimes(++slideChangedTimes);
    }));
    it('autoplay duration is resumed if slide has not changed', () => __awaiter(void 0, void 0, void 0, function* () {
        const afterSlide = jest.fn();
        const speed = 500;
        const autoplayInterval = 2000;
        const slideCount = 4;
        const carouselId = 'reset-autoplay';
        const keyCodeConfig = {
            pause: [32],
        };
        let slideChangedTimes = 0;
        renderCarousel({
            slideCount,
            autoplay: true,
            autoplayInterval,
            speed,
            wrapAround: true,
            beforeSlide: afterSlide,
            keyCodeConfig,
            enableKeyboardControls: true,
            carouselId,
            resumeAfterPause: true,
        });
        (0, react_1.act)(() => {
            jest.advanceTimersByTime(speed);
        });
        const sliderFrame = react_1.screen.getByTestId(`${carouselId}-slider-frame`);
        expect(afterSlide).toHaveBeenCalledTimes(slideChangedTimes);
        // autoplay initiated, waiting for first interval
        (0, react_1.act)(() => {
            jest.advanceTimersByTime(autoplayInterval);
        });
        // Slide changed by autoplay
        expect(afterSlide).toHaveBeenCalledTimes(++slideChangedTimes);
        // Advance half the duration. Cache will be half the duration.
        (0, react_1.act)(() => {
            jest.advanceTimersByTime(autoplayInterval / 2);
        });
        expect(afterSlide).toHaveBeenCalledTimes(slideChangedTimes);
        // Pause
        react_1.fireEvent.keyDown(sliderFrame, { keyCode: 32 });
        // fireEvent.mouseOver(sliderFrame);
        (0, react_1.act)(() => {
            jest.advanceTimersByTime(autoplayInterval);
        });
        // No slide change
        expect(afterSlide).toHaveBeenCalledTimes(slideChangedTimes);
        // Unpause
        react_1.fireEvent.keyDown(sliderFrame, { keyCode: 32 });
        // fireEvent.mouseOut(sliderFrame);
        // No slide change
        expect(afterSlide).toHaveBeenCalledTimes(slideChangedTimes);
        /** Advance slightly more than the cached but less than whole duration. */
        (0, react_1.act)(() => {
            jest.advanceTimersByTime(autoplayInterval / 2 + 1);
        });
        // Autoplay duration has been resumed and slide has changed.
        expect(afterSlide).toHaveBeenCalledTimes(++slideChangedTimes);
    }));
    it('omits slides whose children are falsy', () => __awaiter(void 0, void 0, void 0, function* () {
        const { container } = (0, react_1.render)((0, jsx_runtime_1.jsxs)(carousel_1.default, { children: [(0, jsx_runtime_1.jsx)("img", { src: "#", alt: `slide 1` }), (0, jsx_runtime_1.jsx)("img", { src: "#", alt: `slide 2` }), false && (0, jsx_runtime_1.jsx)("img", { src: "#", alt: `slide 3` }), null, (0, jsx_runtime_1.jsx)("img", { src: "#", alt: `slide 5` })] }));
        expect(container.getElementsByClassName('slide').length).toBe(3);
        yield hasNoViolations(container);
    }));
    it('can be controlled with the keyboard', () => __awaiter(void 0, void 0, void 0, function* () {
        const carouselId = 'keyboard';
        const beforeSlide = jest.fn();
        const keyCodeConfig = {
            nextSlide: [39],
            previousSlide: [37],
            firstSlide: [81],
            lastSlide: [69],
            pause: [32],
        };
        const slideCount = 8;
        const { container } = renderCarousel({
            enableKeyboardControls: true,
            keyCodeConfig,
            slideCount,
            beforeSlide,
            frameAriaLabel: 'keyboard',
            landmark: true,
            carouselId,
        });
        const sliderFrame = react_1.screen.getByTestId(`${carouselId}-slider-frame`);
        react_1.fireEvent.keyDown(sliderFrame, { keyCode: keyCodeConfig.nextSlide[0] });
        expect(beforeSlide).toHaveBeenLastCalledWith(0, 1);
        react_1.fireEvent.keyDown(sliderFrame, { keyCode: keyCodeConfig.nextSlide[0] });
        expect(beforeSlide).toHaveBeenLastCalledWith(1, 2);
        react_1.fireEvent.keyDown(sliderFrame, {
            keyCode: keyCodeConfig.previousSlide[0],
        });
        expect(beforeSlide).toHaveBeenLastCalledWith(2, 1);
        react_1.fireEvent.keyDown(sliderFrame, {
            keyCode: keyCodeConfig.previousSlide[0],
        });
        expect(beforeSlide).toHaveBeenLastCalledWith(1, 0);
        react_1.fireEvent.keyDown(sliderFrame, { keyCode: keyCodeConfig.lastSlide[0] });
        expect(beforeSlide).toHaveBeenLastCalledWith(0, slideCount - 1);
        react_1.fireEvent.keyDown(sliderFrame, { keyCode: keyCodeConfig.firstSlide[0] });
        expect(beforeSlide).toHaveBeenLastCalledWith(slideCount - 1, 0);
        yield hasNoViolations(container);
    }));
    it('detects user-triggered navigation', () => __awaiter(void 0, void 0, void 0, function* () {
        const carouselId = 'user-navigation';
        const beforeSlide = jest.fn();
        const onUserNavigation = jest.fn();
        const keyCodeConfig = {
            nextSlide: [39],
            previousSlide: [37],
            firstSlide: [81],
            lastSlide: [69],
            pause: [32],
        };
        const autoplayInterval = 3000;
        const slideCount = 8;
        const { container } = renderCarousel({
            enableKeyboardControls: true,
            autoplay: true,
            autoplayInterval,
            keyCodeConfig,
            innerRef: createCarouselRefWithMockedDimensions().ref,
            slideCount,
            beforeSlide,
            onUserNavigation,
            frameAriaLabel: 'user navigation',
            landmark: true,
            carouselId,
        });
        expect(onUserNavigation).toHaveBeenCalledTimes(0);
        // Let enough time pass that autoplay triggers navigation
        (0, react_1.act)(() => {
            jest.advanceTimersByTime(autoplayInterval);
        });
        // Make sure the navigation happened, but did not trigger the
        // `onUserNavigation` callback (because it wasn't user-initiated)
        expect(onUserNavigation).toHaveBeenCalledTimes(0);
        expect(beforeSlide).toHaveBeenLastCalledWith(0, 1);
        const sliderFrame = react_1.screen.getByTestId(`${carouselId}-slider-frame`);
        // Simulating keyboard shortcut use to navigate
        react_1.fireEvent.keyDown(sliderFrame, { keyCode: keyCodeConfig.nextSlide[0] });
        expect(beforeSlide).toHaveBeenLastCalledWith(1, 2);
        expect(onUserNavigation).toHaveBeenCalledTimes(1);
        react_1.fireEvent.keyDown(sliderFrame, {
            keyCode: keyCodeConfig.previousSlide[0],
        });
        expect(onUserNavigation).toHaveBeenCalledTimes(2);
        react_1.fireEvent.keyDown(sliderFrame, { keyCode: keyCodeConfig.lastSlide[0] });
        expect(onUserNavigation).toHaveBeenCalledTimes(3);
        react_1.fireEvent.keyDown(sliderFrame, { keyCode: keyCodeConfig.firstSlide[0] });
        expect(onUserNavigation).toHaveBeenCalledTimes(4);
        // Simulating clicks on default controls to navigate
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: /next/ }));
        expect(onUserNavigation).toHaveBeenCalledTimes(5);
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: /prev/ }));
        expect(onUserNavigation).toHaveBeenCalledTimes(6);
        react_1.fireEvent.click(react_1.screen.getByRole('tab', { name: /slide 2/ }));
        expect(onUserNavigation).toHaveBeenCalledTimes(7);
        // Simulating drag to navigate
        react_1.fireEvent.mouseDown(sliderFrame, { clientX: 100 });
        react_1.fireEvent.mouseMove(sliderFrame, { clientX: 100 });
        jest.advanceTimersByTime(100);
        react_1.fireEvent.mouseMove(sliderFrame, { clientX: 700 });
        react_1.fireEvent.mouseUp(sliderFrame, { clientX: 700 });
        expect(onUserNavigation).toHaveBeenCalledTimes(8);
        // Simulating swipe to navigate
        react_1.fireEvent.touchStart(sliderFrame, { touches: [{ pageX: 700 }] });
        react_1.fireEvent.touchMove(sliderFrame, { touches: [{ pageX: 700 }] });
        jest.advanceTimersByTime(100);
        react_1.fireEvent.touchMove(sliderFrame, { touches: [{ pageX: 100 }] });
        react_1.fireEvent.touchEnd(sliderFrame, { touches: [{ pageX: 100 }] });
        expect(onUserNavigation).toHaveBeenCalledTimes(9);
        // Should not be triggering navigation callback when dragging didn't trigger navigation
        react_1.fireEvent.mouseDown(sliderFrame, { clientX: 100 });
        react_1.fireEvent.mouseMove(sliderFrame, { clientX: 100 });
        jest.advanceTimersByTime(10);
        react_1.fireEvent.mouseMove(sliderFrame, { clientX: 105 });
        react_1.fireEvent.mouseUp(sliderFrame, { clientX: 105 });
        expect(onUserNavigation).toHaveBeenCalledTimes(9);
        yield hasNoViolations(container);
    }));
    it('calls default control callbacks when interacted with', () => __awaiter(void 0, void 0, void 0, function* () {
        const beforeSlide = jest.fn();
        const nextButtonOnClick = jest.fn();
        const prevButtonOnClick = jest.fn();
        const pagingDotsOnClick = jest.fn();
        const slideCount = 8;
        const { container } = renderCarousel({
            slideCount,
            beforeSlide,
            defaultControlsConfig: {
                nextButtonOnClick,
                prevButtonOnClick,
                pagingDotsOnClick,
            },
        });
        // Simulating clicks on default controls to navigate
        expect(nextButtonOnClick).toHaveBeenCalledTimes(0);
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: /next/ }));
        expect(nextButtonOnClick).toHaveBeenCalledTimes(1);
        expect(prevButtonOnClick).toHaveBeenCalledTimes(0);
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: /prev/ }));
        expect(prevButtonOnClick).toHaveBeenCalledTimes(1);
        expect(pagingDotsOnClick).toHaveBeenCalledTimes(0);
        react_1.fireEvent.click(react_1.screen.getByRole('tab', { name: /slide 2/ }));
        expect(pagingDotsOnClick).toHaveBeenCalledTimes(1);
        // Check that calling preventDefault in the custom callback will stop the
        // default behavior (navigation) before it happens
        const preventDefault = (event) => event.preventDefault();
        nextButtonOnClick.mockImplementation(preventDefault);
        prevButtonOnClick.mockImplementation(preventDefault);
        pagingDotsOnClick.mockImplementation(preventDefault);
        expect(beforeSlide).toHaveBeenCalledTimes(3);
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: /next/ }));
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: /prev/ }));
        react_1.fireEvent.click(react_1.screen.getByRole('tab', { name: /slide 2/ }));
        expect(beforeSlide).toHaveBeenCalledTimes(3);
        yield hasNoViolations(container);
    }));
    it('has role group by default', () => __awaiter(void 0, void 0, void 0, function* () {
        const slideCount = 8;
        const carouselId = 'role-group';
        const { container } = renderCarousel({
            carouselId,
            slideCount,
        });
        const carouselFrame = react_1.screen.getByTestId(carouselId);
        expect(carouselFrame).toHaveAttribute('role', 'group');
        expect(carouselFrame).toHaveAttribute('aria-roledescription', 'carousel');
        yield hasNoViolations(container);
    }));
    it('is a region landmark', () => __awaiter(void 0, void 0, void 0, function* () {
        const slideCount = 8;
        const carouselId = 'roles';
        const { container } = renderCarousel({
            carouselId,
            slideCount,
            landmark: true,
        });
        const carouselFrame = react_1.screen.getByRole('region');
        expect(carouselFrame).toHaveAttribute('aria-roledescription', 'carousel');
        yield hasNoViolations(container);
    }));
    it('has appropriate attributes', () => __awaiter(void 0, void 0, void 0, function* () {
        const slideCount = 8;
        const carouselId = 'roles';
        const { container } = renderCarousel({
            carouselId,
            slideCount,
        });
        const carouselFrame = react_1.screen.getByRole('group');
        expect(carouselFrame).toHaveAttribute('role', 'group');
        expect(carouselFrame).toHaveAttribute('aria-roledescription', 'carousel');
        const next = react_1.screen.getByRole('button', { name: 'next' });
        expect(next).toHaveAttribute('aria-controls', `${carouselId}-slider-frame`);
        const prev = react_1.screen.getByRole('button', { name: 'previous' });
        expect(prev).toHaveAttribute('aria-controls', `${carouselId}-slider-frame`);
        yield hasNoViolations(container);
    }));
    it('paging dots have appropriate tab roles', () => __awaiter(void 0, void 0, void 0, function* () {
        const slideCount = 8;
        const carouselId = 'tabs';
        const { container } = renderCarousel({
            carouselId,
            slideCount,
            tabbed: true,
        });
        const dots = react_1.screen.getAllByRole('tab');
        const firstDot = dots[0];
        expect(firstDot).toHaveAttribute('aria-controls', `${carouselId}-slide-1`);
        expect(firstDot).toHaveAttribute('aria-selected', 'true');
        const lastDot = dots[dots.length - 1];
        expect(lastDot).toHaveAttribute('aria-controls', `${carouselId}-slide-8`);
        expect(lastDot).toHaveAttribute('aria-selected', 'false');
        const tablist = react_1.screen.getByRole('tablist');
        expect(tablist).toHaveAttribute('aria-label', 'Choose slide to display.');
        const firstSlide = container.querySelector(`#${carouselId}-slide-1`);
        expect(firstSlide).toHaveAttribute('role', 'tabpanel');
        expect(firstSlide).not.toHaveAttribute('aria-roledescription');
        yield (0, react_1.waitFor)(() => {
            lastDot.click();
            expect(firstDot).toHaveAttribute('aria-selected', 'false');
            expect(lastDot).toHaveAttribute('aria-selected', 'true');
        });
        yield hasNoViolations(container);
    }));
    it('without tabs should have appropriate roles.', () => __awaiter(void 0, void 0, void 0, function* () {
        const carouselId = 'untabbed';
        const { container } = renderCarousel({
            carouselId,
            tabbed: false,
        });
        const firstSlide = container.querySelector(`#${carouselId}-slide-1`);
        expect(firstSlide).toHaveAttribute('role', 'group');
        expect(firstSlide).toHaveAttribute('aria-roledescription', 'slide');
        expect(react_1.screen.queryByRole('tab')).not.toBeInTheDocument();
        expect(react_1.screen.queryByRole('tablist')).not.toBeInTheDocument();
        expect(react_1.screen.queryByRole('tabpanel')).not.toBeInTheDocument();
        yield hasNoViolations(container);
    }));
});
//# sourceMappingURL=carousel.test.js.map