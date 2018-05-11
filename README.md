# nuka-carousel

A Pure ReactJS Carousel Component

![Nuka Carousel Animated Example](https://i.imgur.com/UwP5gle.gif)

### Install

```bash
$ yarn add @todaytix/nuka-carousel
```

### Example

```jsx
import React from 'react';
import Carousel from 'nuka-carousel';

export default class extends React.Component {
  render() {
    return (
      <Carousel>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6" />
      </Carousel>
    );
  }
}
```

### How is this differen than [nuka-carousel](https://github.com/FormidableLabs/nuka-carousel)?
There is a bug in the current version, v4.0.2, of Nuka Carousel that prevents a user from clicking DOM elements inside a carousel whose dragging prop is false. More information [here](https://github.com/FormidableLabs/nuka-carousel/pull/347).

### Running demo locally

The demo can be launched on local machine via `webpack-dev-server`. Run the following:

```bash
yarn start
```

Now, you can access the application on your localhost at following url: <a href="http://localhost:8080/demo" target="_blank">Demo</a>

### Props

#### afterSlide

`React.PropTypes.func`

Hook to be called after a slide is changed.

#### autoplay

`React.PropTypes.bool`

Autoplay mode active. Defaults to false.

#### autoplayInterval

`React.PropTypes.number`

Interval for autoplay iteration. Defaults to 3000.

#### beforeSlide

`React.PropTypes.func`

Hook to be called before a slide is changed.

#### cellAlign

`React.PropTypes.oneOf(['left', 'center', 'right'])`

When displaying more than one slide, sets which position to anchor the current slide to.

#### cellSpacing

`React.PropTypes.number`

Space between slides, as an integer, but reflected as `px`

#### dragging

`React.PropTypes.bool`

Enable mouse swipe/dragging

#### easing

`React.PropTypes.string`

Animation easing function. See valid easings here: [D3 Easing Functions](https://github.com/d3/d3-ease).

#### framePadding

`React.PropTypes.string`

Used to set the margin of the slider frame. Accepts any string dimension value such as `"0px 20px"` or `"500px"`.

#### frameOverflow

`React.PropTypes.string`

Used to set overflow style property on slider frame. Defaults to `hidden`.

#### edgeEasing

`React.PropTypes.string`

Animation easing function when swipe exceeds edge. See valid easings here: [D3 Easing Functions](https://github.com/d3/d3-ease).

### heightMode

`React.PropTypes.oneOf(['first', 'current', 'max'])`

Change the height of the slides based either on the first slide, the current slide, or the maximum height of all slides.

#### initialSlideHeight

`React.PropTypes.number`

Initial height of the slides in pixels.

#### initialSlideWidth

`React.PropTypes.number`

Initial width of the slides in pixels.

#### render\*Controls

`React.PropTypes.func`

A set of eight render props for rendering controls in different positions around the carousel.

* Valid render props for the eight positions are `renderTopLeftControls`, `renderTopCenterControls`, `renderTopRightControls`, `renderCenterLeftControls`, `renderCenterCenterControls`, `renderCenterRightControls`, `renderBottomLeftControls`, `renderBottomCenterControls`, and `renderBottomRightControls`.

```jsx
<Carousel
  renderTopCenterControls={({ currentSlide }) => (
    <div>Slide: {currentSlide}</div>
  )}
  renderCenterLeftControls={({ previousSlide }) => (
    <button onClick={previousSlide}>Previous</button>
  )}
  renderCenterRightControls={({ nextSlide }) => (
    <button onClick={nextSlide}>Next</button>
  )}
>
  {/* Carousel Content */}
</Carousel>
```

* The function returns the props for `goToSlide`, `nextSlide` and `previousSlide` functions in addition to `slideCount` and `currentSlide` values.

#### slideIndex

`React.PropTypes.number`

Manually set the index of the slide to be shown.

#### slidesToShow

`React.PropTypes.number`

Slides to show at once.

#### slidesToScroll

```
slidesToScroll: React.PropTypes.oneOfType([
  React.PropTypes.number,
  React.PropTypes.oneOf(['auto'])
])
```

Slides to scroll at once. Set to `"auto"` to always scroll the current number of visible slides.

#### slideWidth

`React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])`

Manually set slideWidth. If you want hard pixel widths, use a string like `slideWidth="20px"`, and if you prefer a percentage of the container, use a decimal integer like `slideWidth={0.8}`

#### speed

`React.PropTypes.number`

Animation duration.

#### swiping

`React.PropTypes.bool`

Enable touch swipe/dragging

#### vertical

`React.PropTypes.bool`

Enable the slides to transition vertically.

#### width

`React.PropTypes.string`

Used to hardcode the slider width. Accepts any string dimension value such as `"80%"` or `"500px"`.

#### wrapAround

`React.PropTypes.bool`

Sets infinite wrapAround mode. Defaults to `false`

### External Control of Carousel State

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
        afterSlide={slideIndex => this.setState({ slideIndex })}
      >
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6" />
      </Carousel>
    );
  }
}
```

### Contributing

See the [Contribution Docs](CONTRIBUTING.md).
