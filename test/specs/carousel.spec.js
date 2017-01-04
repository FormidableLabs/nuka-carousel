'use strict';

describe('Carousel', function () {

  var React = require('react');
  var ReactDOM = require('react-dom');
  var TestUtils = require('react-addons-test-utils');

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

  // helper utilities for tests
  function getComponentsWithClassName(component, classname) {
    return TestUtils.scryRenderedDOMComponentsWithClass(
      component,
      classname
    );
  }

  function getSingleComponentWithClassName(component, classname) {
    return TestUtils.findRenderedDOMComponentWithClass(
      component,
      classname
    );
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
        expect(component.isMounted()).to.be.true;
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
        var list = getComponentsWithClassName(component, 'slider');
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
        var list = getComponentsWithClassName(component, 'slider-frame');
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
        var list = getComponentsWithClassName(component, 'slider-list');
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
        var list = getComponentsWithClassName(component, 'slider-slide');
        expect(list.length).to.equal(3);
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
        var decorator1 = getComponentsWithClassName(component, 'slider-decorator-0');
        var decorator2 = getComponentsWithClassName(component, 'slider-decorator-1');
        var decorator3 = getComponentsWithClassName(component, 'slider-decorator-2');
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
        var slider = getComponentsWithClassName(component, 'slider');
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
        var slider = getComponentsWithClassName(component, 'test');
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
        var slider = getSingleComponentWithClassName(component, 'slider');
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
        var slider = getSingleComponentWithClassName(component, 'slider');
        expect(slider.style.backgroundColor).to.equal('black');
        expect(slider.style.display).to.equal('block');
    });

    it('should align to 0 if cellAlign is left', function() {
        component = ReactDOM.render(
          React.createElement(carousel, {slidesToShow: 3,cellAlign: 'left', width: "500px"},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

        var slider = getSingleComponentWithClassName(component, 'slider-list');
        expect(slider.style.transform).to.equal('translate3d(0px, 0px, 0)');
    });

    it('should align to 200 if cellAlign is center', function() {
        component = ReactDOM.render(
          React.createElement(carousel, {slidesToShow: 3,cellAlign: 'center', width: '600px'},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

        var slider = getSingleComponentWithClassName(component, 'slider-list');
        expect(slider.style.transform).to.equal('translate3d(200px, 0px, 0)');
    });

    it('should align to 400 if cellAlign is right', function() {
        component = ReactDOM.render(
          React.createElement(carousel, {slidesToShow: 3,cellAlign: 'right', width: '600px'},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

        var slider = getSingleComponentWithClassName(component, 'slider-list');
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

        var slider = getComponentsWithClassName(component, 'slider-slide');
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

        var slider = getComponentsWithClassName(component, 'slider-slide');
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

        var frame = getSingleComponentWithClassName(component, 'slider-frame');
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

        var frame = getSingleComponentWithClassName(component, 'slider-frame');
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

        var frame = getSingleComponentWithClassName(component, 'slider-frame');
        expect(frame.style.margin).to.equal('40px');
    });

    it('should set slideWidth to 1000 if slidesToShow is 1', function() {
        component = ReactDOM.render(
          React.createElement(carousel, {slidesToShow: 1, width: "1000px"},
            React.createElement('p', {className: 'test-slide'}, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

        var slide = getComponentsWithClassName(component, 'slider-slide');

        expect(slide[0].style.width).to.equal('1000px');
    });

    it('should set slideWidth to 200 if slidesToShow is 3', function() {
        component = ReactDOM.render(
          React.createElement(carousel, {slidesToShow: 3, width: "600px"},
            React.createElement('p', {className: 'test-slide'}, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

        var slide = getComponentsWithClassName(component, 'slider-slide');

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
          React.createElement(carousel, {slidesToScroll: 3, width: "600px"},
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
          React.createElement(carousel, {slideWidth: "250px", width: "600px", slidesToScroll: "auto"},
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
            slideWidth: "100px",
            width: "600px",
            cellSpacing: 100,
            slidesToScroll: "auto"
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
          React.createElement(carousel, {slideWidth: "100px", width: "600px", slidesToScroll: "auto"},
            React.createElement('p', {className: 'test-slide'}, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

        expect(component.state.slidesToScroll).to.equal(6);
    });

    it('should set lazyLoad to true if passed in lazyLoad',
      function() {
        component = ReactDOM.render(
          React.createElement(carousel, {lazyLoad: true},
            React.createElement('p', {className: 'test-slide'}, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

        expect(component.props.lazyLoad).to.equal(true);
    });

    it('should set autoPlay to true if passed in autoPlay',
      function() {
        component = ReactDOM.render(
          React.createElement(carousel, {autoplay: true},
            React.createElement('p', {className: 'test-slide'}, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

        expect(component.props.autoplay).to.equal(true);
    });

    it('should set vertical to true and set container height to "100" if passed in vertical with no slides',
      function() {
        component = ReactDOM.render(
          React.createElement(carousel, {vertical: true},
          ),
          container
        );
        var slideNode = getComponentsWithClassName(component, 'slider-frame');
        expect(slideNode.length).to.equal(1);
        expect(slideNode[0].style.height).to.equal('100px');
    });

    it('should set vertical to true and set height to "auto" passed in vertical with slides',
      function() {
        component = ReactDOM.render(
          React.createElement(carousel, {vertical: true},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );
        var slideNode = getComponentsWithClassName(component, 'slider-slide');
        expect(slideNode.length).to.equal(3);
        expect(slideNode[0].style.height).to.equal('auto');
    });

    it('should set heightMode to "max" if passed in heightMode with "max"',
      function() {
        component = ReactDOM.render(
          React.createElement(carousel, {heightMode: 'max'},
            React.createElement('p', {style: {height: '200px'}}, 'Slide 1'),
            React.createElement('p', {style: {height: '151px'}}, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );
        expect(component.props.heightMode).to.equal('max');
        expect(component.state.slideHeight).to.equal(232);
    });

    it('should set heightMode to "adaptive" passed in heightMode with "adaptive"',
      function() {
        component = ReactDOM.render(
          React.createElement(carousel, {heightMode: 'adaptive'},
            React.createElement('p', {style: {height: '200px'}}, 'Slide 1'),
            React.createElement('p', {style: {height: '151px'}}, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );
        expect(component.props.heightMode).to.equal('adaptive');
        expect(component.state.slideHeight).to.equal(232);
    });

    it('should render with decorator components if passed in',
      function() {
        function createDecorator(position, label, passedClass) {
          return {
            component: React.createClass({
              render() {
                return(<div className={passedClass}>
                  {label}
                </div>
                )
              }
            }),
            position: position,
            style: {
              padding: 20
            }
          }
        };
        var topLeftDecorator = createDecorator('TopLeft', 'TL Decorator', 'tl-dec');
        var topCenterDecorator = createDecorator('TopCenter', 'TC Decorator', 'tc-dec');
        var topRightDecorator = createDecorator('TopRight', 'TR Decorator', 'tr-dec');
        var centerCenterDecorator = createDecorator('CenterCenter', 'CC Decorator', 'cc-dec');
        var bottomRightDecorator = createDecorator('BottomRight', 'BR Decorator', 'br-dec');
        var bottomCenterDecorator = createDecorator('BottomCenter', 'BC Decorator', 'bc-dec');
        var bottomLeftDecorator = createDecorator('BottomLeft', 'BL Decorator', 'bl-dec');
        component = ReactDOM.render(
          React.createElement(carousel,
            {
              decorators: [
                topLeftDecorator,
                topCenterDecorator,
                topRightDecorator,
                centerCenterDecorator,
                bottomLeftDecorator,
                bottomCenterDecorator,
                bottomRightDecorator
              ]
            },
            React.createElement('p', {className: 'test-slide'}, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

        var trNode = getComponentsWithClassName(component, 'tr-dec');
        var tcNode = getComponentsWithClassName(component, 'tc-dec');
        var tlNode = getComponentsWithClassName(component, 'tl-dec');
        var ccNode = getComponentsWithClassName(component, 'cc-dec');
        var blNode = getComponentsWithClassName(component, 'bl-dec');
        var bcNode = getComponentsWithClassName(component, 'bc-dec');
        var brNode = getComponentsWithClassName(component, 'br-dec');

        expect(trNode.length).to.equal(1);
        expect(trNode[0].innerHTML).to.equal('TR Decorator');
        expect(tcNode.length).to.equal(1);
        expect(tcNode[0].innerHTML).to.equal('TC Decorator');
        expect(tlNode.length).to.equal(1);
        expect(tlNode[0].innerHTML).to.equal('TL Decorator');
        expect(ccNode.length).to.equal(1);
        expect(ccNode[0].innerHTML).to.equal('CC Decorator');
        expect(blNode.length).to.equal(1);
        expect(blNode[0].innerHTML).to.equal('BL Decorator');
        expect(bcNode.length).to.equal(1);
        expect(bcNode[0].innerHTML).to.equal('BC Decorator');
        expect(brNode.length).to.equal(1);
        expect(brNode[0].innerHTML).to.equal('BR Decorator');
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

    it('should advance, go back and wrap around if nextSlide() is called and wraparound is true', function() {
        component = ReactDOM.render(
          React.createElement(carousel, { wrapAround : true},
            React.createElement('p', null, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          ),
          container
        );

        component.nextSlide();
        expect(component.state.currentSlide).to.equal(1);
        component.nextSlide();
        expect(component.state.currentSlide).to.equal(2);
        component.nextSlide();
        expect(component.state.currentSlide).to.equal(0);
        component.previousSlide();
        expect(component.state.currentSlide).to.equal(2);
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

    it('should go to 2 if goToSlide(2) is called and in auto', function() {
        component = ReactDOM.render(
          React.createElement(carousel, {slidesToShow: 2, slidesToScroll: 'auto'},
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

  });

});
