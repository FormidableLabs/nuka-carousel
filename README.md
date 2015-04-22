#nuka-carousel

A Pure ReactJS Carousel Component

![http://i.imgur.com/UwP5gle.gif](http://i.imgur.com/UwP5gle.gif)

###Install

```
npm install nuka-carousel
```

###Example
```javascript
'use strict';

var React = require('react');

var Carousel = require('nuka-carousel');

const App = React.createClass({
  mixins: [Carousel.ControllerMixin],
  render() {
    return (
      <Carousel>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6"/>
      </Carousel>
    )
  }
});

module.exports = App;
```

###Props

####cellAlign
`React.PropTypes.oneOf(['left', 'center', 'right'])`

When displaying more than one slide, sets which position to anchor the current slide to.

####cellSpacing
`React.PropTypes.number`

Space between slides, as an integer, but reflected as `px`

####data
`React.PropTypes.func`

Used with the ControllerMixin to add carousel data to parent state.

####decorators
`React.PropTypes.array`

An array of objects that supply internal carousel controls.
Decorator objects have component and position properties. See below:

```javascript
var Decorators = [{
  component: React.createClass({
    render() {
      return (
        <button
          onClick={this.props.previousSlide}>
          Previous Slide
        </button>
      )
    }
  }),
  position: 'CenterLeft'
}];

// Valid position properties are TopLeft, TopCenter, TopRight
// CenterLeft, CenterCenter, CenterRight, BottomLeft, BottomCenter
// and BottomRight
```

####dragging
`React.PropTypes.bool`

Enable mouse swipe/dragging

####easing
`React.PropTypes.string`

Animation easing function. See valid easings here: [https://github.com/chenglou/tween-functions](https://github.com/chenglou/tween-functions)

####edgeEasing
`React.PropTypes.string`

Animation easing function when swipe exceeds edge. See valid easings here: [https://github.com/chenglou/tween-functions](https://github.com/chenglou/tween-functions)

####slidesToShow
`React.PropTypes.number`

Slides to show at once.

####slidesToScroll
`React.PropTypes.number`

Slides to scroll at once.

####slideWidth

`React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])`

Manually set slideWidth. If you want hard pixel widths, use a string like `slideWidth="20px"`, and if you prefer a percentage of the container, use a decimal integer like `slideWidth={0.8}`

####speed
`React.PropTypes.number`

Animation duration.

###width
`React.PropTypes.string`

Used to hardcode the slider width. Accepts any string dimension value such as `"80%"` or `"500px"`.

###ControllerMixin

The ControllerMixin provides a way to add external controllers for a carousel. To use the controller mixin, add it to your parent component as shown below:

```javascript
const App = React.createClass({
  mixins: [Carousel.ControllerMixin],
  render() {
    return (
      <Carousel ref="carousel" data={this.setCarouselData.bind(this, 'carousel')}>
        ...
      </Carousel>
    )
  }
});
```

It is required to give your component a ref value, and to pass the setCarouselData method to the data prop with the same ref as an argument.

After setting this up, your parent component has a carousels object in it's state. You can now control your carousels from other child components:

```javascript
const App = React.createClass({
  mixins: [Carousel.ControllerMixin],
  render() {
    return (
      <Carousel ref="carousel" data={this.setCarouselData.bind(this, 'carousel')}>
        ...
      </Carousel>
      {this.state.carousels.carousel ? <button type="button" onClick={this.state.carousels.carousel.goToSlide.bind(null,4)}>
        Go to slide 5
      </button> : null}
    )
  }
});

```