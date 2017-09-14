'use strict';

import Carousel from '../src/carousel';
import React from 'react';
import ReactDom from 'react-dom';
import createReactClass from 'create-react-class';
// window.React = React;

const App = createReactClass({
  // mixins: [Carousel.ControllerMixin],

  getInitialState() {
    return {
      slideIndex: 0,
      // carousels: {},
    };
  },

  // setCarouselData(carousel) {
  //   var data = this.state.carousels;
  //   data[carousel] = this.refs[carousel];
  //   console.log(data)
  //   this.setState({
  //     carousels: data
  //   });
  // },

  render() {
    return (
      <div style={{width: '50%', margin: 'auto'}}>
        <Carousel
          ref="carousel"
          autoplay={false}
          wrapAround
          speed={1000}
          autoplayInterval={1000}
          resetAutoplay={false}
          swipeSpeed={35}
          slideIndex={this.state.slideIndex}
          afterSlide={newSlideIndex => this.setState({ slideIndex: newSlideIndex })}>
          <img src="http://placehold.it/1000x400&text=slide1"/>
          <img src="http://placehold.it/1000x400&text=slide2"/>
          <img src="http://placehold.it/1000x400&text=slide3"/>
          <img src="http://placehold.it/1000x400&text=slide4"/>
          <img src="http://placehold.it/1000x400&text=slide5"/>
          <img src="http://placehold.it/1000x400&text=slide6"/>
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

ReactDom.render(<App />, document.getElementById('__react-content'),)
