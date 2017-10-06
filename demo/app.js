import ReactDom from 'react-dom';
import React from 'react';
import Carousel from '../src/carousel';
import Decorators from '../src/decorators'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slideIndex: 0,
      carousels: {}
    }
  }

  setCarouselData = () => {
    this.setState({
      carousels: {
        carousel: this.carouselComponent
      }
    })
  }

  render() {
    return (
      <div style={{width: '50%', margin: 'auto'}}>
        <Carousel
          ref={ref => { this.carouselComponent = ref }}
          data={this.setCarouselData}
          slideIndex={this.state.slideIndex}
          afterSlide={newSlideIndex => this.setState({ slideIndex: newSlideIndex })}
          decorators={Decorators}
        >
          <img src="http://placehold.it/1000x400&text=slide1"/>
          <img src="http://placehold.it/1000x400&text=slide2"/>
          <img src="http://placehold.it/1000x400&text=slide3"/>
          <img src="http://placehold.it/1000x400&text=slide4"/>
          <img src="http://placehold.it/1000x400&text=slide5"/>
          <img src="http://placehold.it/1000x400&text=slide6"/>
        </Carousel>
        <button onClick={() => this.carouselComponent.goToSlide(0)}>1</button>
        <button onClick={() => this.carouselComponent.goToSlide(1)}>2</button>
        <button onClick={() => this.carouselComponent.goToSlide(2)}>3</button>
        <button onClick={() => this.carouselComponent.goToSlide(3)}>4</button>
        <button onClick={() => this.carouselComponent.goToSlide(4)}>5</button>
        <button onClick={() => this.carouselComponent.goToSlide(5)}>6</button>
      </div>
    )
  }
}

const content = document.getElementById('content');

ReactDom.render(<App/>, content)
