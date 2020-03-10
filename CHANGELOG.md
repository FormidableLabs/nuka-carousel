# Nuka Changelog

## 4.6.6 (2020-03-10)

- [#676](https://github.com/FormidableLabs/nuka-carousel/pull/676) hot-fix: flash after wraparound

## 4.6.5 (2020-03-05)

- [#674](https://github.com/FormidableLabs/nuka-carousel/pull/674) Upgrade react-move to reduce bundle size
- [#673](https://github.com/FormidableLabs/nuka-carousel/pull/673) Remove deprecated UNSAFE_componentWillReceiveProps

## 4.6.4 (2020-03-03)

- [#672](https://github.com/FormidableLabs/nuka-carousel/pull/672) Add innerRef to type definitions
- [#671](https://github.com/FormidableLabs/nuka-carousel/pull/671) Add innerRef prop
- [#670](https://github.com/FormidableLabs/nuka-carousel/pull/670) Add scrollMode prop
- [#669](https://github.com/FormidableLabs/nuka-carousel/pull/669) Fix getControlsContainerStyle prop name type in type definitions
- [#668](https://github.com/FormidableLabs/nuka-carousel/pull/668) Fix edge swipe bug
- [#666](https://github.com/FormidableLabs/nuka-carousel/pull/666) Add ability to drag to scroll multiple slides

## 4.6.3 (2020-02-12)

- [#665](https://github.com/FormidableLabs/nuka-carousel/pull/665) Revert wicg-inert changes as part of PR #643

## 4.6.2 (2020-01-29)

- [#656](https://github.com/FormidableLabs/nuka-carousel/pull/656)
- [#655](https://github.com/FormidableLabs/nuka-carousel/pull/655)
- [#653](https://github.com/FormidableLabs/nuka-carousel/pull/653) Minor clean up and fixes - update demo to use hooks, add demo title,
  fix slidesToScroll typing, cleaning up prop names, minor perf improvement
- [#652](https://github.com/FormidableLabs/nuka-carousel/pull/652) fix: add missing type annotation
- [#651](https://github.com/FormidableLabs/nuka-carousel/pull/651) Fix typo
- [#650](https://github.com/FormidableLabs/nuka-carousel/pull/650) Change touchAction for fade-transition to pinch-zoom
- [#648](https://github.com/FormidableLabs/nuka-carousel/pull/648) Add autoplay toggle to demo
- [#647](https://github.com/FormidableLabs/nuka-carousel/pull/647) Prevent fade and fadeFromSlide from reaching/equalling slideCount to solve opacity issue
- [#645](https://github.com/FormidableLabs/nuka-carousel/pull/645) Prevent swipe logic from taking over when no swipe was made
- [#644](https://github.com/FormidableLabs/nuka-carousel/pull/644) Add prop to allow for customization of defaultControls elements
- [#643](https://github.com/FormidableLabs/nuka-carousel/pull/643) Slides that are not fully visible cannot receive focus (REVERTED in 4.6.3)
- [#639](https://github.com/FormidableLabs/nuka-carousel/pull/639) Keyboard controls will only work when keyboard is in focus

## 4.6.1 (2020-01-20)

- [#632](https://github.com/FormidableLabs/nuka-carousel/pull/632) Dependency vulnerability fixed, upgrade handlebars from 4.1.2 to 4.5.3
- [#633](https://github.com/FormidableLabs/nuka-carousel/pull/633) Fixes #618 max (and first) height mode calculations
- [#635](https://github.com/FormidableLabs/nuka-carousel/pull/635) Fixes #494 Updates scroll transition logic to fix wraparound flash
- [#636](https://github.com/FormidableLabs/nuka-carousel/pull/636) Fixes #503 updates logic so Next button enables/disables correctly
- [#638](https://github.com/FormidableLabs/nuka-carousel/pull/638) Fixes #531 styling issue in Demo and some minor cleanup of the code

## 4.6.0 (2019-12-17)

- Fixes for `leftAlign` added for heightMode="current" and heightMode="max"
- [#614](https://github.com/FormidableLabs/nuka-carousel/pull/614) Remove getListItemStyles() from type definitions
- [#619](https://github.com/FormidableLabs/nuka-carousel/pull/619) Configure keyboard keyCodes so default ones can be overridden
- [#620](https://github.com/FormidableLabs/nuka-carousel/pull/620) Avoid redundant dimension calculations after a DOM mutation
- [#621](https://github.com/FormidableLabs/nuka-carousel/pull/621) Add TS definition for renderAnnounceSlideMessage
- [#625](https://github.com/FormidableLabs/nuka-carousel/pull/625) Fixes Issue 521: Initial height calculations will be repeated until successful.
- [#626](https://github.com/FormidableLabs/nuka-carousel/pull/626) Height mode 'current' uses tallest visible slide
- [#628](https://github.com/FormidableLabs/nuka-carousel/pull/628) Adding missing Type For keyCodeConfig prop

## 4.5.13 (2019-11-08)

- [#592](https://github.com/FormidableLabs/nuka-carousel/pull/592) change componentWillReceiveProps to UNSAFE_componentWillReceiveProps
- [#600](https://github.com/FormidableLabs/nuka-carousel/pull/600) Fix wraparound logic to account for cellAlign property
- [#601](https://github.com/FormidableLabs/nuka-carousel/pull/601) Change dot styling
- [#608](https://github.com/FormidableLabs/nuka-carousel/pull/608) Fix dragging issue in Safari
- [#609](https://github.com/FormidableLabs/nuka-carousel/pull/609) Prevent scroll when dragging on iOS

## 4.5.12 (2019-09-13)

- [#582](https://github.com/FormidableLabs/nuka-carousel/pull/582) Another attempt to fix the height issue by changing the default prop value for height
- [#584](https://github.com/FormidableLabs/nuka-carousel/pull/584) Fix multi-slide wraparound
- [#585](https://github.com/FormidableLabs/nuka-carousel/pull/585) Fix onDragStart, should only happen with dragging/swiping
- [#588](https://github.com/FormidableLabs/nuka-carousel/pull/588) Impossible to select last images when swiping, this fixes that

## 4.5.11 (2019-09-03)

- [#578](https://github.com/FormidableLabs/nuka-carousel/pull/578) update vulnerable deps, fix broken scroll animation
- [#576](https://github.com/FormidableLabs/nuka-carousel/pull/576) Clear timeouts when component unmounts to prevent memory leak

## 4.5.10 (2019-09-02)

- [#574](https://github.com/FormidableLabs/nuka-carousel/pull/574) Add event param to onDragStart method
- [#573](https://github.com/FormidableLabs/nuka-carousel/pull/573) Fix resizing height issue due to dynamically loaded elements and readyStateChange issues
- [#572](https://github.com/FormidableLabs/nuka-carousel/pull/572) Fix Travis configuration
- [#571](https://github.com/FormidableLabs/nuka-carousel/pull/571) Next and Previous buttons should not be submit type buttons
- [#565](https://github.com/FormidableLabs/nuka-carousel/pull/565) Add missing controls to the TypeScript library definition
- [#564](https://github.com/FormidableLabs/nuka-carousel/pull/564) Export NextButton, PreviousButton, PagingDots from main entry point to allow for easier style targeting
- [#562](https://github.com/FormidableLabs/nuka-carousel/pull/562) Allow isEdgeSwiping to work with vertical slider
- [#561](https://github.com/FormidableLabs/nuka-carousel/pull/561) Avoid the empty div wrapper for null custom controls

## 4.5.9 (2019-07-09)

- [#557](https://github.com/FormidableLabs/nuka-carousel/pull/557) Add type for animation prop
- [#555](https://github.com/FormidableLabs/nuka-carousel/pull/555) Fix wrongly calculated height for the current slide on slide change

## 4.5.8 (2019-05-23)

- [#551](https://github.com/FormidableLabs/nuka-carousel/pull/551) Add disableEdgeSwiping prop to disable white space on last and first slide when swiping
- [#549](https://github.com/FormidableLabs/nuka-carousel/pull/549) Add type=button to paging dots

## 4.5.5 (2019-05-07)

- [#545](https://github.com/FormidableLabs/nuka-carousel/pull/545) Add onDragStart to index.d.ts
- [#541](https://github.com/FormidableLabs/nuka-carousel/pull/541) Adds scroll3d to types
- [#536](https://github.com/FormidableLabs/nuka-carousel/pull/536) Add type definition for PagingDots class
- [#535](https://github.com/FormidableLabs/nuka-carousel/pull/535) Allow null to be passed to render controls

## 4.5.4 (2019-04-15)

- [#517](https://github.com/FormidableLabs/nuka-carousel/pull/517) Fix bug when changing to vertical mode, add missing prop to types
- [#524](https://github.com/FormidableLabs/nuka-carousel/pull/524) Remove extra function wrap around handleMouse methods
- [#525](https://github.com/FormidableLabs/nuka-carousel/pull/525) Fix calculation of dimensions
- [#526](https://github.com/FormidableLabs/nuka-carousel/pull/526) Add classnames to paging dots to improve styling ability
- [#529](https://github.com/FormidableLabs/nuka-carousel/pull/529) Fix IE11 error related to #525
- [#532](https://github.com/FormidableLabs/nuka-carousel/pull/532) Update README.md with OSS status

## 4.5.3 (2019-03-18)

- Resolve dependency vulnerabilities
- [#506](https://github.com/FormidableLabs/nuka-carousel/pull/506) Add Scroll3D transition mode option

## 4.5.2 (2019-03-08)

- Fixes dragging bug

## 4.5.1 (2019-03-06)

- [#511](https://github.com/FormidableLabs/nuka-carousel/pull/511) Adds style and transitionMode types
- [#510](https://github.com/FormidableLabs/nuka-carousel/pull/510) Adds new prop to allow autoplay in reverse

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
