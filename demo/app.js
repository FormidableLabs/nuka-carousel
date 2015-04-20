'use strict';

import Carousel from '../src/Carousel';
import React from 'react/addons';

window.React = React;

const App = React.createClass({
  mixins: [Carousel.ControllerMixin],
  render() {
    return (
      <div style={{width: '50%', margin: 'auto'}}>
        <Carousel ref="carousel" data={this.setCarouselData.bind(this, 'carousel')}>
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

React.render(<App/>, content)

