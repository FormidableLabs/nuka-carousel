import Carousel from '../../src';

describe('<Carousel />', () => {
  describe('Rendering and Mounting', () => {
    it('should correctly mount with children.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const children = wrapper.find('p');
      expect(children).toHaveLength(3);
    });

    it('should render a div with the class `slider`.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const sliderDiv = wrapper.find('div.slider');
      expect(sliderDiv).toHaveLength(1);
    });

    it('should render a div with the class `slider-frame`.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const sliderFrameDiv = wrapper.find('div.slider-frame');
      expect(sliderFrameDiv).toHaveLength(1);
    });

    it('should render an ul with the class `slider-list`.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const sliderListUl = wrapper.find('ul.slider-list');
      expect(sliderListUl).toHaveLength(1);
    });

    it('should render children with the `slider-slide` class.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const children = wrapper.find('.slider-slide');
      expect(children).toHaveLength(3);
    });

    it('should render controls by default.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const decorator1 = wrapper.find('.slider-control-centerleft');
      const decorator2 = wrapper.find('.slider-control-centerright');
      const decorator3 = wrapper.find('.slider-control-bottomcenter');
      expect(decorator1).toHaveLength(1);
      expect(decorator2).toHaveLength(1);
      expect(decorator3).toHaveLength(1);
    });
  });

  describe('Props', () => {
    it('should render with the class `slider` when no props are supplied.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const slider = wrapper.find('div.slider');
      expect(slider).toHaveLength(1);
    });

    it('should render with the class `test` with className supplied.', () => {
      const wrapper = mount(
        <Carousel className="test">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const slider = wrapper.find('div.test');
      expect(slider).toHaveLength(1);
    });

    it('should merge provided styles with default styles.', () => {
      const wrapper = mount(
        <Carousel style={{ backgroundColor: 'black' }}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const slider = wrapper.find('div.slider');
      expect(slider).toHaveStyle('backgroundColor', 'black');
      expect(slider).toHaveStyle('display', 'block');
    });

    it('should align to 0 when `cellAlign` is `left`.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const slider = wrapper.find('.slider-list');
      expect(slider).toHaveStyle('transform', 'translate3d(0px, 0px, 0)');
    });

    it('should adjust the slide index when children count change.', () => {
      const wrapper = mount(
        <Carousel slideIndex={2}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper).toHaveState('currentSlide', 2);
      wrapper.setProps({
        children: [<p key={1}>Slide 1</p>, <p key={2}>Slide 2</p>]
      });
      expect(wrapper).toHaveState('currentSlide', 1);
    });

    it('should disable controls when children are updated to have a length of 0.', () => {
      const wrapper = mount(
        <Carousel slideIndex={2}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper).toHaveState('currentSlide', 2);
      wrapper.setProps({ children: [] });
      expect(wrapper).toHaveState('currentSlide', 0);

      const previousButton = wrapper.find('.slider-control-centerleft button');
      const nextButton = wrapper.find('.slider-control-centerright button');
      expect(previousButton).toHaveProp('disabled', true);
      expect(nextButton).toHaveProp('disabled', true);
    });
  });

  describe('methods', () => {
    it('should advance if nextSlide() is called.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper).toHaveState({ currentSlide: 0 });
      wrapper.instance().nextSlide();
      expect(wrapper).toHaveState({ currentSlide: 1 });
    });

    it('should not advance past the last slide.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      wrapper.instance().nextSlide();
      wrapper.instance().nextSlide();
      expect(wrapper).toHaveState({ currentSlide: 2 });
      wrapper.instance().nextSlide();
      expect(wrapper).toHaveState({ currentSlide: 2 });
    });

    it('should not go back to the previous slide when index is 0.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper).toHaveState({ currentSlide: 0 });
      wrapper.instance().previousSlide();
      expect(wrapper).toHaveState({ currentSlide: 0 });
    });

    it('should go back to the previous slide when `previousSlide` is called.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper).toHaveState({ currentSlide: 0 });
      wrapper.instance().nextSlide();
      wrapper.instance().nextSlide();
      wrapper.instance().previousSlide();
      expect(wrapper).toHaveState({ currentSlide: 1 });
    });

    it('should go to correct slide when `goToSlide` is called.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper).toHaveState({ currentSlide: 0 });
      wrapper.instance().goToSlide(2);
      expect(wrapper).toHaveState({ currentSlide: 2 });
    });

    it('should go to the last slide from the first when wrapAround is true`.', () => {
      const wrapper = mount(
        <Carousel wrapAround>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const previousButton = wrapper.find('.slider-control-centerleft button');
      expect(wrapper).toHaveState({ currentSlide: 0 });
      previousButton.simulate('click');
      expect(wrapper).toHaveState({ currentSlide: 2 });
    });

    it('should go to the first slide from the last when wrapAround is true`.', () => {
      const wrapper = mount(
        <Carousel wrapAround>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      wrapper.setState({ currentSlide: 2 });
      const nextButton = wrapper.find('.slider-control-centerright button');
      expect(wrapper).toHaveState({ currentSlide: 2 });
      nextButton.simulate('click');
      expect(wrapper).toHaveState({ currentSlide: 0 });
    });
  });

  describe('Controls', () => {
    it('should render a custom top left control.', () => {
      const wrapper = mount(
        <Carousel renderTopLeftControls={() => <div>Top Left</div>}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Top Left</div>);
    });

    it('should render a custom top center control.', () => {
      const wrapper = mount(
        <Carousel renderTopCenterControls={() => <div>Top Center</div>}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Top Center</div>);
    });

    it('should render a custom top right control.', () => {
      const wrapper = mount(
        <Carousel renderTopRightControls={() => <div>Top Right</div>}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Top Right</div>);
    });

    it('should render a custom center left control.', () => {
      const wrapper = mount(
        <Carousel renderCenterLeftControls={() => <div>Center Left</div>}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Center Left</div>);
    });

    it('should render a custom center center control.', () => {
      const wrapper = mount(
        <Carousel renderCenterCenterControls={() => <div>Center Center</div>}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Center Center</div>);
    });

    it('should render a custom center right control.', () => {
      const wrapper = mount(
        <Carousel renderCenterRightControls={() => <div>Center Right</div>}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Center Right</div>);
    });

    it('should render a custom bottom left control.', () => {
      const wrapper = mount(
        <Carousel renderBottomLeftControls={() => <div>Bottom Left</div>}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Bottom Left</div>);
    });

    it('should render a custom bottom center control.', () => {
      const wrapper = mount(
        <Carousel renderBottomCenterControls={() => <div>Bottom Center</div>}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Bottom Center</div>);
    });

    it('should render a custom bottom right control.', () => {
      const wrapper = mount(
        <Carousel renderBottomRightControls={() => <div>Bottom Right</div>}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Bottom Right</div>);
    });

    it('should render controls with control props.', () => {
      const CustomControls = () => <div>Custom Controls</div>;
      const wrapper = mount(
        <Carousel
          wrapAround
          renderCenterCenterControls={props => <CustomControls {...props} />}
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const controls = wrapper.find('CustomControls');
      expect(controls).toHaveProp('currentSlide', 0);
      expect(controls).toHaveProp('slideCount', 3);
      expect(controls).toHaveProp('wrapAround', true);
      expect(controls).toHaveProp('nextSlide');
      expect(controls).toHaveProp('previousSlide');
      expect(controls).toHaveProp('goToSlide');
    });

    it('should call the internal nextSlide func from a control using the nextSlide prop.', () => {
      const wrapper = mount(
        <Carousel
          renderCenterCenterControls={({ nextSlide }) => (
            <button id="custom-next-btn" onClick={nextSlide}>
              Next
            </button>
          )}
        >
          >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const spy = jest.spyOn(wrapper.instance(), 'nextSlide');
      wrapper.update();
      const button = wrapper.find('#custom-next-btn');
      button.simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('should call the internal previousSlide func from a control using the previousSlide prop.', () => {
      const wrapper = mount(
        <Carousel
          slideIndex={1}
          renderCenterCenterControls={({ previousSlide }) => (
            <button id="custom-prev-btn" onClick={previousSlide}>
              Next
            </button>
          )}
        >
          >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const spy = jest.spyOn(wrapper.instance(), 'previousSlide');
      wrapper.update();
      const button = wrapper.find('#custom-prev-btn');
      button.simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('should call the internal goToSlide func from a control using the goToSlide prop.', () => {
      const wrapper = mount(
        <Carousel
          renderCenterCenterControls={({ goToSlide }) => (
            <button id="custom-goto-btn" onClick={() => goToSlide(2)}>
              Go to Slide 3
            </button>
          )}
        >
          >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const spy = jest.spyOn(wrapper.instance(), 'goToSlide');
      wrapper.update();
      const button = wrapper.find('#custom-goto-btn');
      button.simulate('click');
      expect(spy).toHaveBeenCalledWith(2);
    });
  });
});
