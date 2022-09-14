# nuka-carousel

[![Maintenance Status][maintenance-image]](#maintenance-status)

Small, fast and accessibility-first React carousel library with easily customizable UI and behavior to fit your brand and site

![Nuka Carousel Animated Example](https://i.imgur.com/UwP5gle.gif)

> If you are looking for v4 documentation, you can find it [here](https://www.npmjs.com/package/nuka-carousel/v/4.8.4)

### Install

To add `nuka-carousel` to your project run the following command in your project folder.

```bash
$ yarn add nuka-carousel
```

OR

```bash
$ npm install nuka-carousel
```

> Migration guide from v4 to v5 is under development, please raise any questions in the Issues tab of the repository.

### Example

You can test nuka-carousel default behaviour. [Link](https://nuka-carousel-next.vercel.app/)

```jsx
<Carousel>
  <img src="/image1.png" />
  <img src="/image2.png" />
  <img src="/image3.png" />
  <img src="/image4.png" />
  <img src="/image5.png" />
</Carousel>
```

Infinity nuka-carousel@5 with 3 slides to show. [Link](https://nuka-carousel-next.vercel.app/?slides=6&params=%7B%22wrapAround%22:true,%22slidesToShow%22:3%7D)

```jsx
<Carousel wrapAround={true} slidesToShow={3}>
  <img src="/image1.png" />
  <img src="/image2.png" />
  <img src="/image3.png" />
  <img src="/image4.png" />
  <img src="/image5.png" />
</Carousel>
```

You can play with `&params` url parameter to add or remove any carousel parameters and see how the carousel behaves. We are looking to build a proper documentation page with many examples and code snippets.

### Improvements in v5

- **Support server-side rendering**. Currently in v4 all of the slides are positioned with `position: absolute`, which doesn't render the slides appropriately when javascript is disabled and there are flickering when the front-end is hydrated. This forced users to hardcode properties for the carousel like `initialSlideHeight` and `initialSlideWidth`. In v5 all slides are positioned with dynamic width, so the slides and carousel can be fully responsive and rendered correctly on server as well.
- Rewritten the library with **TypeScript** and **React Hooks** for obvious reasons.
- **Reduce the size of the library and its dependencies**. Currently v4 has 5 dependencies - `prop-types`, `d3-ease`, `wicg-inert`, `exenv` and `react-move`. We are looking to use only `d3-ease` in v5.1, but definitely after bumping the version of it to the latest.
  - `prop-types` is replaced with usage of TypeScript.
  - `exenv` is not maintained anymore and is removed with v5 as a dependency of nuka-carousel.
  - `wicg-inert` doesn't have specified license, so we are going to remove it from our dependencies. [More info here](https://github.com/WICG/inert/issues/168). We are still supporting `inert` and we will have an example and more detailed documentation how you can use it with nuka-carousel v5.
  - `react-move` nothing personal, we just decided to go for our custom approach of animations in order to reduce the size of the library.
- **Fixed issues**. We fixed a lot of the issues that we currently have in v4. You can see the full list with fixed issues in our v5 project. [Link](https://github.com/FormidableLabs/nuka-carousel/projects/1)

### Props

| Name | Type | Description |Default |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------- |
| adaptiveHeight | `boolean`| If it's set to true, the carousel will adapt its height to the visible slides. | `false` |
| adaptiveHeightAnimation | `boolean`| Whether to animate height changes when `adaptiveHeight` is enabled | `true` |
| afterSlide | `(index: number) => void`| Hook to be called after a slide is changed. |`() => {}`|
| animation | `'zoom' \| 'fade'`| Adds a zoom effect on the currently visible slide or change the animation to `fade`. A `transform: scale(0.85)` is set as default when you are using zoom, however, the scale can be customized using `zoomScale` prop. Property is applied on all slides except the current 1. Use `cellAlign` to align the slide with zoom effect where you'd like. ||
| autoplay | `boolean` | Autoplay mode active. | `false`|
| autoplayInterval | `number` | Interval for autoplay iteration in milliseconds. | `3000`  |
| autoplayReverse | `boolean` | Only meaningful when `autoplay` is already true. When `autoplayReverse` is also true, autorotation cycles through slides indexes from high to low. | `false` |
| beforeSlide | `(currentSlideIndex: number, endSlideIndex: number) => void` | Hook to be called before a slide is changed | `() => {}` |
| cellAlign | `'left' \| 'center' \| 'right'` | When displaying more than one slide, sets which position to anchor the current slide to. | `left` |
| cellSpacing | `number` | Space between slides, as an integer, but reflected as `px` | `0` |
| className | `string` | Slider frame class name | `''` |
| defaultControlsConfig | <pre>interface DefaultControlsConfig  { &#13; containerClassName?: string; &#13; nextButtonClassName?: string; &#13; nextButtonOnClick?: (event: React.MouseEvent) => void; &#13; nextButtonStyle?: CSSProperties; &#13; nextButtonText?: React.ReactNode; &#13; pagingDotsClassName?: string; &#13; pagingDotsContainerClassName?: string; &#13; pagingDotsOnClick?: (event: React.MouseEvent) => void; &#13; pagingDotsStyle?: CSSProperties; &#13; prevButtonClassName?: string; &#13; prevButtonOnClick?: (event: React.MouseEvent) => void; &#13; prevButtonStyle?: CSSProperties; &#13; prevButtonText?: React.ReactNode; &#13;}</pre> | This prop lets you apply custom classes and styles to the default `Container`. `Next`, `Previous`, and `Paging Dots` controls. More information on how to customize these controls can be found in the [defaultControlsConfig section](#defaultcontrolsconfig).| `{}` |
| disableAnimation | `boolean` | When set to `true`, will disable animation. | `false` |
| disableEdgeSwiping | `boolean` | When set to `true`, will disable swiping before first slide and after last slide. | `false` |
| dragging | `boolean` | Enable mouse swipe/dragging. | `true` |
| dragThreshold | `number` | The percentage (from 0 to 1) of a slide that the user needs to drag before a slide change is triggered. | `0.5` |
| easing | `(normalizedTime: number) => number` | Animation easing function. See the [Easing section](#easing-and-edgeeasing) for more details | A cubic easeOut function |
| edgeEasing | `(normalizedTime: number) => number` | Animation easing function when swipe exceeds edge. See the [Easing section](#easing-and-edgeeasing) for more details | A cubic easeOut function |
| enableKeyboardControls | `boolean` | When set to `true` will enable keyboard controls when the carousel has focus. If the carousel does not have focus, keyboard controls will be ignored. | `false` |
| frameAriaLabel | `string` | Customize the aria-label of the frame container of the carousel. This is useful when you have more than one carousel on the page. | `''` |
| innerRef | `MutableRefObject<HTMLDivElement>` | React `ref` that should be set on the carousel element | |
| keyCodeConfig | <pre>interface KeyCodeConfig { &#13;  firstSlide?: number[]; &#13;  lastSlide?: number[];&#13;  nextSlide?: number[]; &#13;  pause?: number[]; &#13;  previousSlide?: number[]; &#13;}</pre> | If `enableKeyboardControls` prop is true, you can pass configuration for the keyCode so you can override the default keyboard keys configured. | `{ nextSlide: [39, 68, 38, 87], previousSlide: [37, 65, 40, 83], firstSlide: [81], lastSlide: [69], pause: [32] }` |
| onDragStart | `(e: React.TouchEvent<HTMLDivElement> \| React.MouseEvent<HTMLDivElement>) => void;` | Adds a callback to capture event at the start of swiping/dragging slides | |
| onDrag | `(e: React.TouchEvent<HTMLDivElement> \| React.MouseEvent<HTMLDivElement>) => void;` | Adds a callback to capture swiping/dragging event on slides | |
| onDragEnd | `(e: React.TouchEvent<HTMLDivElement> \| React.MouseEvent<HTMLDivElement>) => void;` | Adds a callback to capture event at the end of swiping/dragging slides | |
| onUserNavigation | `(e: React.TouchEvent \| React.MouseEvent \| React.KeyboardEvent) => void;` | Callback called when user-triggered navigation occurs: dragging/swiping, clicking one of the controls (custom controls not included), or using a keyboard shortcut | |
| pauseOnHover | `boolean` | Pause autoPlay when mouse is over carousel. | `true` |
| renderAnnounceSlideMessage | `(props: Pick<CarouselState, 'currentSlide' \| 'count'>) => string` | Renders message in the ARIA live region that is announcing the current slide on slide change | Render function that returns `"Slide {currentSlide + 1} of {slideCount}"` |
| scrollMode | `'page' \| 'remainder'` | Set `scrollMode="remainder"` if you don't want to see the white space when you scroll to the end of a non-infinite carousel. scrollMode property is ignored when wrapAround is enabled | `'page'` |
| slideIndex | `number` | Manually set the index of the slide to be shown | |
| slidesToScroll | `number` | Slides to scroll at once. The property is overridden to `slidesToShow` when `animation="fade"` | 1 |
| slidesToShow | `number` | Number of slides to show at once. Will be cast to an `integer` when `animation="fade"` | 1 |
| speed | `number` | Animation duration/Transition speed in milliseconds | `500` |
| style  | `CSSProperties` | Add inline style to the carousel frame | `{}` |
| swiping  | `boolean` | Enable touch swipe/dragging | `true` |
| withoutControls | `boolean` | Used to remove all controls at once. Overwrites the `render[Top, Right, Bottom, Left]CenterControls()`. | `false` |
| wrapAround | `boolean` | Sets infinite wrapAround mode. An option similar to repeat or infinite in other libs. | `false` |
| zoomScale | `number` | Adds a number value to set the scale of zoom when `animation === "zoom"`. The number value should be set in a range of (0,1). | `0.85` |


#### render\*Controls

Type: `(props: ControlProps) => ReactElement`

A set of eight render props for rendering controls in different positions around the carousel.

- Valid render props for the eight positions are `renderTopLeftControls`, `renderTopCenterControls`, `renderTopRightControls`, `renderCenterLeftControls`, `renderCenterCenterControls`, `renderCenterRightControls`, `renderBottomLeftControls`, `renderBottomCenterControls`, and `renderBottomRightControls`.

- The default props are set as `renderCenterLeftControls` for `Previous` button, `renderCenterRightControls` for the `Next` button and `renderBottomCenterControls` for the "Paging dots". To change the position or remove "Paging dots", the default positions need to be disabled by setting them to null.

- You can remove all render controls using the `withoutControls` prop on `Carousel`.

- The render functions receive a `ControlProps` argument containing the following props from the Carousel props, using default values if not originally defined: 

  ```
  cellAlign
  cellSpacing
  defaultControlsConfig
  onUserNavigation
  scrollMode
  slidesToScroll
  slidesToShow
  wrapAround
  ```

  Additionally, the following data and callbacks are provided to make creating controls easier:

  | Name                 | Type                            | Description                                             |
  | :------------------- | ------------------------------- | :------------------------------------------------------ |
  | currentSlide         | `number`                        | Current slide index                                     |
  | pagingDotsIndices    | `number[]`                      | The indices for the paging dots                         |
  | goToSlide            | `(targetIndex: number) => void` | Go to a specific slide                                  |
  | nextDisabled         | `boolean`                       | Whether the "next" button should be disabled or not     |
  | nextSlide            | `() => void`                    | Go to the next slide                                    |
  | previousDisabled     | `boolean`                       | Whether the "previous" button should be disabled or not |
  | previousSlide        | `() => void`                    | Go to the previous slide                                |
  | slideCount           | `number`                        | Total number of slides                                  |

Example:

```jsx
<Carousel
  renderTopCenterControls={({ currentSlide }) => (
    <div>Slide: {currentSlide}</div>
  )}
  renderCenterLeftControls={({ previousDisabled, previousSlide }) => (
    <button onClick={previousSlide} disabled={previousDisabled}>
      Previous
    </button>
  )}
  renderCenterRightControls={({ nextDisabled, nextSlide }) => (
    <button onClick={nextSlide} disabled={nextDisabled}>
      Next
    </button>
  )}
>
  {/* Carousel Content */}
</Carousel>
```

- NOTE: The className `slide-visible` is added to the currently visible slide or slides (when `slidesToShow` > 1). The className `slide-current` is added to the currently "active" slide.

#### easing and edgeEasing

`(normalizedTime: number) => number`

A function accepting a normalized time between 0 and 1, inclusive, and returning an eased time, which equals 0 at normalizedTime==0 and equals 1 at normalizedTime==1. You can plug in your own custom easing function (e.g., `(t) => t` for a linear transition), or import functions from a different library, like [`d3-ease`](https://github.com/d3/d3-ease).
```jsx
import { easeCircleOut, easeElasticOut } from 'd3-ease';

// ...

<Carousel easing={easeCircleOut} edgeEasing={easeElasticOut}>
  {/* Carousel Content */}
</Carousel>
```

Please note that using a function for `easing` with "In" in it (ease**In**Out, easeElastic**In**, etc.) will make swiping transitions feel a bit clunky, as the velocity at the end of the swipe will suddenly drop to follow the slow startup speed of the "In" easing function. In general, when using custom easing functions, try out both swiping and clicking on the navigation buttons to see how the transitions feel.

#### renderAnnounceSlideMessage

`(props: Pick<CarouselState, 'currentSlide' \| 'count'>) => string`

`renderAnnounceSlideMessage` render prop is a special case of the `render*Controls` props. It's responsibility is to render ARIA live announcement message to improve accessibility. The prop will announce the message you pass in every time the slide changes with `VoiceOver` enabled on your machine. The function returns only `slideCount` and `currentSlide` values.

```jsx
<Carousel
  renderAnnounceSlideMessage={({ currentSlide, slideCount }) =>
    `Slide ${currentSlide + 1} of ${slideCount}`
  }
>
  {/* Carousel Content */}
</Carousel>
```

#### defaultControlsConfig

```
interface DefaultControlsConfig {
  containerClassName?: string;
  nextButtonClassName?: string;
  nextButtonOnClick?: (event: React.MouseEvent) => void;
  nextButtonStyle?: CSSProperties;
  nextButtonText?: React.ReactNode;
  pagingDotsClassName?: string;
  pagingDotsContainerClassName?: string;
  pagingDotsOnClick?: (event: React.MouseEvent) => void;
  pagingDotsStyle?: CSSProperties;
  prevButtonClassName?: string;
  prevButtonOnClick?: (event: React.MouseEvent) => void;
  prevButtonStyle?: CSSProperties;
  prevButtonText?: React.ReactNode;
}
```

The default controls used by Nuka are the `Previous` button, `Next` button, and `PagingDots` control. The visual look and text of these controls can be modified with props as described below:

- The props ending with `ClassName` let you apply a custom css class to its respective control.
- The props ending with `Style` let you apply inline styles to its respective control.
- The props ending with `OnClick` let you listen for user interaction with the controls.
- The text label for the `Previous` button and `Next` button can be customized using `prevButtonText` and `nextButtonText`, respectively.

For example, you can change the text of the `Previous` and `Next` buttons, and change the paging dots to red by passing in the following configuration:

```
defaultControlsConfig={{
  nextButtonText: 'Custom Next',
  prevButtonText: 'Custom Prev',
  pagingDotsStyle: {
    fill: 'red'
  }
}}
```

<!-- ### External Control of Carousel State

You can control the state of the carousel from your parent component as shown below:

```jsx
import React from 'react';
import Carousel from 'nuka-carousel';

export default class extends React.Component {
  state = {
    slideIndex: 0
  };

  render() {
    return (
      <Carousel
        slideIndex={this.state.slideIndex}
        afterSlide={(slideIndex) => this.setState({ slideIndex })}
      >
        <img src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide1" />
        <img src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide2" />
        <img src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide3" />
        <img src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide4" />
        <img src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide5" />
        <img src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide6" />
      </Carousel>
    );
  }
}
``` -->

### Contributing

See the [Contribution Docs](CONTRIBUTING.md).

### Maintenance Status

**Active:** Formidable is actively working on this project, and we expect to continue for work for the foreseeable future. Bug reports, feature requests and pull requests are welcome.

[maintenance-image]: https://img.shields.io/badge/maintenance-active-green.svg?color=brightgreen&style=flat
