'use strict';

import Carousel from '../src/carousel';
import React from 'react';
import ReactDom from 'react-dom';

window.React = React;

const ControlledCarousel = React.createClass({
  mixins: [Carousel.ControllerMixin],

  getInitialState() { return { slideIndex: 0 }; },

  render() {
    return (
      <div>
        <Carousel
          ref="carousel"
          data={this.setCarouselData.bind(this, 'carousel')}
          slideIndex={this.state.slideIndex}
          afterSlide={newSlideIndex => this.setState({ slideIndex: newSlideIndex })}>
          <img src="http://dummyimage.com/1000x400/ccc/fff.png&text=slide1"/>
          <img src="http://dummyimage.com/1000x400/ccc/fff.png&text=slide2"/>
          <img src="http://dummyimage.com/1000x400/ccc/fff.png&text=slide3"/>
          <img src="http://dummyimage.com/1000x400/ccc/fff.png&text=slide4"/>
          <img src="http://dummyimage.com/1000x400/ccc/fff.png&text=slide5"/>
          <img src="http://dummyimage.com/1000x400/ccc/fff.png&text=slide6"/>
        </Carousel>
        <button onClick={() => this.setState({ slideIndex: 0 })}>1</button>
        <button onClick={() => this.setState({ slideIndex: 1 })}>2</button>
        <button onClick={() => this.setState({ slideIndex: 2 })}>3</button>
        <button onClick={() => this.setState({ slideIndex: 3 })}>4</button>
        <button onClick={() => this.setState({ slideIndex: 4 })}>5</button>
        <button onClick={() => this.setState({ slideIndex: 5 })}>6</button>
      </div>
    )
  }
});

const makeChildren = n => {
  var children = [];
  for (let i = 0; i < n; i++) {
    children.push(
      <img key={i} src={`http://dummyimage.com/1000x400/ccc/fff.png&text=Slide${i + 1}`}/>
    );
  }
  return children;
};


const LazyCarousel = ({count, ...props}) => {
  return (
    <Carousel {...props} lazyLoad={true}>
      {makeChildren(count)}
    </Carousel>
  );
};

const VariableHeightCarousel = props => {
  const Slide = props => <div style={{border: '5px', borderStyle: 'outset'}} {...props} />;

  return <Carousel {...props}>
    <Slide>Hello</Slide>
    <Slide>Sometimes one slide needs to wrap more text than others do.</Slide>
    <Slide>Other times they may not.</Slide>
    <Slide>We would like the slider to render nicely...</Slide>
    <Slide>either way.</Slide>
    <Slide>We may even<ul><li>want more complicated slides</li><li>with nested elements</li></ul>sometimes</Slide>
    <Slide>or not</Slide>
    <Slide>just filling in space now...</Slide>
    <Slide>because I have nothing more to say here</Slide>
  </Carousel>;
};

// TODO: Is there a cleaner way to hide the dots?
const noDots = Carousel.getDefaultProps().decorators.slice(0, 2);

const App = () => (
  <div style={{width: '50%', margin: 'auto'}}>
    <h1>External controls</h1>
    <ControlledCarousel/>

    <h1>Lazy loading</h1>
    <LazyCarousel count={1000} decorators={noDots}/>

    <h1>Multiple slides</h1>
    <LazyCarousel count={10} slidesToShow={4} slidesToScroll='auto'/>

    <h1>Center mode</h1>
    <LazyCarousel count={10} slidesToShow={4} slidesToScroll='auto' cellAlign='center'/>

    <h1>Disable dragging</h1>
    <LazyCarousel count={6} dragging={false}/>

    <h1>Varying heights</h1>
    <VariableHeightCarousel slidesToShow={4}/>

    <h1>Varying heights (adaptive)</h1>
    <VariableHeightCarousel slidesToShow={4} heightMode='adaptive'/>

    <h1>Vertical slider</h1>
    <LazyCarousel count={10} vertical={true} slidesToShow={3}/>
  </div>
);


const content = document.getElementById('content');

ReactDom.render(<App/>, content)
