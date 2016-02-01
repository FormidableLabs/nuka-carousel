'use strict';

import Carousel from '../src/carousel';
import React from 'react';
import ReactDom from 'react-dom';

window.React = React;

const App = React.createClass({
  mixins: [Carousel.ControllerMixin],
  render() {
    return (
      <div style={{width: '100%', height: '100%'}}>
        <Carousel style={{height: '100%'}}
          frameStyle={{height: '100%'}}
          listStyle={{height: '100%'}}
          currentSlide={0}
          ref="carousel"
          data={this.setCarouselData.bind(this, 'carousel')}>
          <img src="http://placehold.it/1000x400&text=slide1"/>
          <img src="http://placehold.it/1000x400&text=slide2"/>
          <img src="http://placehold.it/1000x400&text=slide3"/>
          <img src="http://placehold.it/1000x400&text=slide4"/>
          <img src="http://placehold.it/1000x400&text=slide5"/>
          <img src="http://placehold.it/1000x400&text=slide6"/>
        </Carousel>
      </div>
    )
  }
});

const content = document.getElementById('content');

ReactDom.render(<App/>, content)
