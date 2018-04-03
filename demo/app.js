import Carousel from '../src/index';
import React from 'react';
import ReactDom from 'react-dom';

const colors = ['7732bb', '047cc0', '00884b', 'e3bc13', 'db7c00', 'aa231f'];

const Slide = ({ imgSrc }) => <img src={imgSrc} />
const Placeholder = ({ imgSrc }) => <div>{imgSrc}</div>

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      slideIndex: 0,
      length: 6,
      wrapAround: false,
      placeholderMode: false,
      preloadedChildrenLevel: undefined
    };
  }

  _updateSlideIndex = slideIndex => this.setState({ slideIndex })

  render() {
    return (
      <div style={{ width: '70%', margin: 'auto' }}>
        <Carousel
          Slide={Slide}
          Placeholder={Placeholder}
          placeholderMode={this.state.placeholderMode}
          preloadedChildrenLevel={this.state.preloadedChildrenLevel}
          heightMode='max'
          wrapAround={this.state.wrapAround}
          slideIndex={this.state.slideIndex}
          afterSlide={this._updateSlideIndex}
          renderTopCenterControls={({ currentSlide }) => (
            <div style={{ fontFamily: 'Helvetica', color: '#fff' }}>
              Nuka Carousel: Slide {currentSlide + 1}
            </div>
          )}
        >
          {colors
            .slice(0, this.state.length)
            .map((color, index) => ({ imgSrc: `http://placehold.it/1000x400/${color}/ffffff/&text=slide${index + 1}` }))}
        </Carousel>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <button onClick={() => this.setState({ slideIndex: 0 })}>1</button>
            <button onClick={() => this.setState({ slideIndex: 1 })}>2</button>
            <button onClick={() => this.setState({ slideIndex: 2 })}>3</button>
            <button onClick={() => this.setState({ slideIndex: 3 })}>4</button>
            <button onClick={() => this.setState({ slideIndex: 4 })}>5</button>
            <button onClick={() => this.setState({ slideIndex: 5 })}>6</button>
          </div>
          <div>
            <button
              onClick={() =>
                this.setState({
                  length: 2
                })
              }
            >
              2 Slides Only
            </button>
            <button
              onClick={() =>
                this.setState(prevState => ({
                  wrapAround: !prevState.wrapAround
                }))
              }
            >
              Toggle Wrap Around
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            preloadedChildrenLevel:
            <button onClick={() => this.setState({ preloadedChildrenLevel: 1 })}>1</button>
            <button onClick={() => this.setState({ preloadedChildrenLevel: 2 })}>2</button>
            <button onClick={() => this.setState({ preloadedChildrenLevel: 3 })}>3</button>
            <button onClick={() => this.setState({ preloadedChildrenLevel: 4 })}>4</button>
            <button onClick={() => this.setState({ preloadedChildrenLevel: 5 })}>5</button>
            <button onClick={() => this.setState({ preloadedChildrenLevel: 6 })}>6</button>
          </div>
          <div>
            <button
              onClick={() =>
                this.setState(prevState => ({
                  placeholderMode: !prevState.placeholderMode
                }))
              }
            >
              Toggle placeholderMode
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('content'));
