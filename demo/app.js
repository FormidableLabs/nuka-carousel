import Carousel from '../src/index';
import React from 'react';
import ReactDom from 'react-dom';

const colors = ['7732bb', '047cc0', '00884b', 'e3bc13', 'db7c00', 'aa231f'];

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { slideIndex: 0, length: 6 };
  }

  render() {
    return (
      <div style={{ width: '50%', margin: 'auto' }}>
        <Carousel
          slideIndex={this.state.slideIndex}
          afterSlide={slideIndex => this.setState({ slideIndex })}
          renderTopCenterControls={({ currentSlide }) => (
            <div style={{ fontFamily: 'Helvetica', color: '#fff' }}>
              Nuka Carousel: Slide {currentSlide + 1}
            </div>
          )}
        >
          {[...Array(this.state.length).keys()].map(key => (
            <img
              src={`http://placehold.it/1000x400/${
                colors[key]
              }/ffffff/&text=slide${key + 1}`}
              key={key}
            />
          ))}
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
