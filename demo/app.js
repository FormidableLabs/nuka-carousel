'use strict';

import Carousel from '../src/carousel';
import React from 'react';
import ReactDom from 'react-dom';
import createReactClass from 'create-react-class';

window.React = React;

const App = createReactClass({
  mixins: [Carousel.ControllerMixin],

  getInitialState() { return { slideIndex: 0 }; },

  render() {
    return (
      <div style={{width: '50%', margin: 'auto'}}>
        <Carousel
          ref="carousel"
          data={this.setCarouselData.bind(this, 'carousel')}
          slideIndex={this.state.slideIndex}
          afterSlide={newSlideIndex => this.setState({ slideIndex: newSlideIndex })}>
          <img src="http://placehold.it/1000x400&text=slide1" draggable="false"/>
          <img src="http://placehold.it/1000x400&text=slide2" draggable="false"/>
          <img src="http://placehold.it/1000x400&text=slide3" draggable="false"/>
          <img src="http://placehold.it/1000x400&text=slide4" draggable="false"/>
          <img src="http://placehold.it/1000x400&text=slide5" draggable="false"/>
          <img src="http://placehold.it/1000x400&text=slide6" draggable="false"/>
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

const content = document.getElementById('content');

ReactDom.render(<App/>, content)
