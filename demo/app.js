import Carousel from '../src/index';
import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { slideIndex: 0 };
  }

  render() {
    return (
      <div style={{ width: '50%', margin: 'auto' }}>
        <Carousel
          slideIndex={this.state.slideIndex}
          afterSlide={newSlideIndex =>
            this.setState({ slideIndex: newSlideIndex })
          }
          renderTopCenterControls={({ currentSlide }) => (
            <div>Nuka Carosel: Slide {currentSlide + 1}</div>
          )}
        >
          <img src="http://placehold.it/1000x400&text=slide1" />
          <img src="http://placehold.it/1000x400&text=slide2" />
          <img src="http://placehold.it/1000x400&text=slide3" />
          <img src="http://placehold.it/1000x400&text=slide4" />
          <img src="http://placehold.it/1000x400&text=slide5" />
          <img src="http://placehold.it/1000x400&text=slide6" />
        </Carousel>
        <button onClick={() => this.setState({ slideIndex: 0 })}>1</button>
        <button onClick={() => this.setState({ slideIndex: 1 })}>2</button>
        <button onClick={() => this.setState({ slideIndex: 2 })}>3</button>
        <button onClick={() => this.setState({ slideIndex: 3 })}>4</button>
        <button onClick={() => this.setState({ slideIndex: 4 })}>5</button>
        <button onClick={() => this.setState({ slideIndex: 5 })}>6</button>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('content'));
