# Nuka Changelog

## 4.4.9 (2019-03-04)

- [#508](https://github.com/FormidableLabs/nuka-carousel/pull/508) Fix speed slide flicker/blinking

## 4.4.8 (2019-02-21)

- [#501](https://github.com/FormidableLabs/nuka-carousel/pull/501) Add cellAlign type to CarouselSlideRenderControlProps interface
- [#500](https://github.com/FormidableLabs/nuka-carousel/pull/500) Animation performance enhancements
- [#496](https://github.com/FormidableLabs/nuka-carousel/pull/496) Upgrade react-move
- [#492](https://github.com/FormidableLabs/nuka-carousel/pull/492) Fix Paging Dots sync, fix 'Next' button validation
- [#490](https://github.com/FormidableLabs/nuka-carousel/pull/490) Disable animation for an initial slide when non-default slideIndex prop is passed
- [#489](https://github.com/FormidableLabs/nuka-carousel/pull/489) Disable animation prop created
- [#488](https://github.com/FormidableLabs/nuka-carousel/pull/488) Configurable zoom scale prop
- [#487](https://github.com/FormidableLabs/nuka-carousel/pull/487) updates to README

## 4.4.7 (2019-01-21)

- [#480](https://github.com/FormidableLabs/nuka-carousel/pull/480) Add Types to build
- [#486](https://github.com/FormidableLabs/nuka-carousel/pull/486) Fix mouse event handling to account for click events within the slide

## 4.4.6 (2019-01-12)

- [#477](https://github.com/FormidableLabs/nuka-carousel/pull/477) Add TypeScript types
- [#475](https://github.com/FormidableLabs/nuka-carousel/pull/475) Fix click event handler on button within slide element
- [#473](https://github.com/FormidableLabs/nuka-carousel/pull/473) Add zoom effect prop

## 4.4.5 (2018-12-31)

- [#469](https://github.com/FormidableLabs/nuka-carousel/pull/469) Fix initial height issue

## 4.4.4 (2018-12-07)

- [#460](https://github.com/FormidableLabs/nuka-carousel/pull/460) Ability to configure aria-live message with prop
- [#458](https://github.com/FormidableLabs/nuka-carousel/pull/458) Fix flicker in wrap-around
- [#453](https://github.com/FormidableLabs/nuka-carousel/pull/453) Fix issue involving updating props on beforeSlide

## 4.4.3 (2018-11-16)

- [#451](https://github.com/FormidableLabs/nuka-carousel/pull/451) Allow clicks with modifier present
- [#446](https://github.com/FormidableLabs/nuka-carousel/pull/446) Fix for demo (toggle between 2 and 6 slides showing)
- [#445](https://github.com/FormidableLabs/nuka-carousel/pull/445) Add `disableKeyboardControls` prop to allow users to disable keyboard controls
- [#441](https://github.com/FormidableLabs/nuka-carousel/pull/441) Start work on removing deprecated lifecycle methods
- [#439](https://github.com/FormidableLabs/nuka-carousel/pull/439) Allow `pauseOnHover` to work when swiping/dragging is disabled
- [#436](https://github.com/FormidableLabs/nuka-carousel/pull/436) Refactoring

## 4.4.2 (2018-10-29)

- [#425](https://github.com/FormidableLabs/nuka-carousel/pull/425) Accessibility features added

1. Adding keyboard controls
2. Reader lets you know what slide you are on
3. Slide that is being display will be read by reader

- [#435](https://github.com/FormidableLabs/nuka-carousel/pull/435) Fix issues where `clickDisabled` is set to true too often
- [#433](https://github.com/FormidableLabs/nuka-carousel/pull/433) add function to add ariaProps to all visible slides
- [#432](https://github.com/FormidableLabs/nuka-carousel/pull/432) Add `slide-visible` class to all currently visible slides
- [#431](https://github.com/FormidableLabs/nuka-carousel/pull/431) Carousel would go into an infinite loop between two slide. Added a isTransitioning check to wait until afterSlide is finish.

## 4.4.1 (2018-10-08)

- [#423](https://github.com/FormidableLabs/nuka-carousel/pull/423) Prevent click events only when swiping
