'use strict';

describe('Carousel', function() {

  var React = require('react');
  var ReactDOM = require('react-dom');
  var TestUtils = require('react-dom/test-utils');

  var carousel, container, component;

  function setup() {
    carousel = require('carousel');
    container = document.createElement('DIV');
    document.body.appendChild(container);
  }
  function teardown() {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
    container = null;
  }

  describe('Mounting', function() {

    beforeEach(function() {
      setup();
      component = ReactDOM.render(
        React.createElement(carousel, {},
          React.createElement('p', null, 'Slide 1'),
          React.createElement('p', null, 'Slide 2'),
          React.createElement('p', null, 'Slide 3')
        ),
        container
      );
    });

    afterEach(function() {
      teardown();
    });

    it('should render into the document', function() {
      expect(component.mounted).to.be.true;
    });

  });

  describe('Build', function() {

    beforeEach(function() {
      setup();
    });

    afterEach(function() {
      teardown();
    });

    it('should render a .slider div', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );
      var list = TestUtils.scryRenderedDOMComponentsWithClass(
          component,
          'slider'
        );
      expect(list.length).to.equal(1);
    });

    it('should render a .slider-frame div', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );
      var list = TestUtils.scryRenderedDOMComponentsWithClass(
          component,
          'slider-frame'
        );
      expect(list.length).to.equal(1);
    });

    it('should render a .slider-list ul', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );
      var list = TestUtils.scryRenderedDOMComponentsWithClass(
          component,
          'slider-list'
        );
      expect(list.length).to.equal(1);
    });

    it('should render children with a .slider-slide class', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );
      var list = TestUtils.scryRenderedDOMComponentsWithClass(
          component,
          'slider-slide'
        );
      expect(list.length).to.equal(3);
    });

    it('should render a single child with the `slider-slide` class.', () => {
      component = ReactDOM.render(
          React.createElement(carousel, {},
            React.createElement('p', null, 'Slide 1'),
          ),
          container
        );
      var list = TestUtils.scryRenderedDOMComponentsWithClass(
          component,
          'slider-slide'
        );
      expect(list.length).to.equal(1);
    });

    it('should render decorators by default', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );
      var decorator1 = TestUtils.scryRenderedDOMComponentsWithClass(
          component,
          'slider-decorator-0'
        );
      var decorator2 = TestUtils.scryRenderedDOMComponentsWithClass(
          component,
          'slider-decorator-1'
        );
      var decorator3 = TestUtils.scryRenderedDOMComponentsWithClass(
          component,
          'slider-decorator-2'
        );
      expect(decorator1.length).to.equal(1);
      expect(decorator2.length).to.equal(1);
      expect(decorator3.length).to.equal(1);
    });

  });

  describe('Props', function() {

    beforeEach(function() {
      setup();
    });

    afterEach(function() {
      teardown();
    });

    it('should render with class "slider" with no props supplied', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );
      var slider = TestUtils.scryRenderedDOMComponentsWithClass(
          component,
          'slider'
        );
      expect(slider.length).to.equal(1);
    });

    it('should render with class "test" with className supplied', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {className: 'test'},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );
      var slider = TestUtils.scryRenderedDOMComponentsWithClass(
          component,
          'test'
        );
      expect(slider.length).to.equal(1);
    });

    it('should merge provided styles with the defaults', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {style: {backgroundColor: 'black'}},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );
      var slider = TestUtils.findRenderedDOMComponentWithClass(
          component,
          'slider'
        );
      expect(slider.style.backgroundColor).to.equal('black');
      expect(slider.style.display).to.equal('block');
    });

    it('should merge provided styles with the defaults', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {style: {backgroundColor: 'black'}},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );
      var slider = TestUtils.findRenderedDOMComponentWithClass(
          component,
          'slider'
        );
      expect(slider.style.backgroundColor).to.equal('black');
      expect(slider.style.display).to.equal('block');
    });

    it('should align to 0 if cellAlign is left', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {slidesToShow: 3, cellAlign: 'left', width: '500px'},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );
      var slider = TestUtils.findRenderedDOMComponentWithClass(
          component,
          'slider-list'
        );
      expect(slider.style.transform).to.equal('translate3d(0px, 0px, 0)');
    });

    it('should align to 200 if cellAlign is center', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {slidesToShow: 3, cellAlign: 'center', width: '600px'},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

      var slider = TestUtils.findRenderedDOMComponentWithClass(
        component,
          'slider-list'
        );
      expect(slider.style.transform).to.equal('translate3d(200px, 0px, 0)');
    });

    it('should align to 400 if cellAlign is right', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {slidesToShow: 3, cellAlign: 'right', width: '600px'},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

      var slider = TestUtils.findRenderedDOMComponentWithClass(
        component,
          'slider-list'
        );
      expect(slider.style.transform).to.equal('translate3d(400px, 0px, 0)');
    });

    it('should set slide width to 200 if cellSpacing is not provided', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {slidesToShow: 3, width: '600px'},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

      var slider = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
          'slider-slide'
        );
      expect(slider[0].style.width).to.equal('200px');
    });

    it('should set slide width to 180 if cellSpacing is set to 30', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {slidesToShow: 3, cellSpacing: 30, width: '600px'},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

      var slider = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
          'slider-slide'
        );
      expect(slider[0].style.width).to.equal('180px');
    });

    it('should not add mouse handlers if dragging is false', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {dragging: false},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

      var frame = TestUtils.findRenderedDOMComponentWithClass(
        component,
          'slider-frame'
        );
      expect(frame.onMouseDown).to.be.undefined;
    });

    it('should add mouse handlers if dragging is true', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {dragging: false},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

      var frame = TestUtils.findRenderedDOMComponentWithClass(
        component,
          'slider-frame'
        );
      expect(frame.onMouseDown).to.be.defined;
    });

    it('should add frame margin if framePadding is supplied a value', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {framePadding: '40px'},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

      var frame = TestUtils.findRenderedDOMComponentWithClass(
        component,
          'slider-frame'
        );
      expect(frame.style.margin).to.equal('40px');
    });

    it('should set slideWidth to 1000 if slidesToShow is 1', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {slidesToShow: 1, width: '1000px'},
            React.createElement('p', {className: 'test-slide'}, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

      var slide = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
          'slider-slide'
        );

      expect(slide[0].style.width).to.equal('1000px');
    });

    it('should set slideWidth to 200 if slidesToShow is 3', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {slidesToShow: 3, width: '600px'},
            React.createElement('p', {className: 'test-slide'}, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

      var slide = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
          'slider-slide'
        );

      expect(slide[0].style.width).to.equal('200px');
    });

    it('should have currentSlide equal 2 for 4 slides if slidesToShow is 2, slidesToScroll is 2, and it advances', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {slidesToShow: 2, slidesToScroll: 2},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3'),
            React.createElement('p', null, 'Slide 4')
          ),
          container
        );

      component.nextSlide();

      expect(component.state.currentSlide).to.equal(2);
    });

    it('should have currentSlide equal 1 for 3 slides if slidesToShow is 2, slidesToScroll is 2, and it advances', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {slidesToShow: 2, slidesToScroll: 2},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

      component.nextSlide();

      expect(component.state.currentSlide).to.equal(1);
    });

    it('should set slidesToScroll to passed in slidesToScroll', function() {
      component = ReactDOM.render(
          React.createElement(carousel, {slidesToScroll: 3, width: '600px'},
            React.createElement('p', {className: 'test-slide'}, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

      expect(component.state.slidesToScroll).to.equal(3);
    });

    it('should set slidesToScroll to 2 if slideWidth is 250px and slidesToScroll is auto',
      function() {
        component = ReactDOM.render(
          React.createElement(carousel, {slideWidth: '250px', width: '600px', slidesToScroll: 'auto'},
            React.createElement('p', {className: 'test-slide'}, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

        expect(component.state.slidesToScroll).to.equal(2);
      });

    it('should set slidesToScroll to 3 with slideWidth: 100px, cellSpacing: 100, slidesToScroll:auto',
      function() {
        component = ReactDOM.render(
          React.createElement(carousel, {
            slideWidth: '100px',
            width: '600px',
            cellSpacing: 100,
            slidesToScroll: 'auto'
          },
            React.createElement('p', {className: 'test-slide'}, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

        expect(component.state.slidesToScroll).to.equal(3);
      });

    it('should set slidesToScroll to 6 if slideWidth is 100px and slidesToScroll is auto',
      function() {
        component = ReactDOM.render(
          React.createElement(carousel, {slideWidth: '100px', width: '600px', slidesToScroll: 'auto'},
            React.createElement('p', {className: 'test-slide'}, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

        expect(component.state.slidesToScroll).to.equal(6);
      });
  });

  describe('Methods', function() {

    beforeEach(function() {
      setup();
    });

    afterEach(function() {
      teardown();
    });

    it('should advance if nextSlide() is called', function() {
      component = ReactDOM.render(
          React.createElement(carousel, null,
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

      component.nextSlide();

      expect(component.state.currentSlide).to.equal(1);
    });

    it('should not advance if nextSlide() is called and the currentSlide is the last slide', function() {
      component = ReactDOM.render(
          React.createElement(carousel, null,
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

      component.nextSlide();
      component.nextSlide();
      component.nextSlide();

      expect(component.state.currentSlide).to.equal(2);
    });

    it('should not go back if previousSlide() is called and the currentSlide is the first slide', function() {
      component = ReactDOM.render(
          React.createElement(carousel, null,
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

      component.previousSlide();

      expect(component.state.currentSlide).to.equal(0);
    });

    it('should go back if previousSlide() is called', function() {
      component = ReactDOM.render(
          React.createElement(carousel, null,
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

      component.nextSlide();
      component.previousSlide();

      expect(component.state.currentSlide).to.equal(0);
    });

    it('should go to 2 if goToSlide(2) is called', function() {
      component = ReactDOM.render(
          React.createElement(carousel, null,
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

      component.goToSlide(2);

      expect(component.state.currentSlide).to.equal(2);
    });

  });

});
