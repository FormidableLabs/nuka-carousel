/*eslint max-nested-callbacks: ["error", 5]*/
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

    it('should render a single child with the `slider-slide` class.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
        </Carousel>
      );
      const children = wrapper.find('.slider-slide');
      expect(children).toHaveLength(1);
    });

    it('should render visible child with the `slide-visible` class.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const children = wrapper.find('.slide-visible');
      expect(children).toHaveLength(1);
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

    it('should ignore non-component child elements', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          {null}
          {undefined}
          {false}
          {true}
        </Carousel>
      );

      expect(wrapper.find('.slider-list').children()).toHaveLength(3);
    });

    it('should not render child elements if logic to generate slides does not return valid components', () => {
      let showSlide = true;
      let wrapper = mount(<Carousel>{showSlide && <p>Slide 1</p>}</Carousel>);
      expect(wrapper.find('.slider-list').children()).toHaveLength(1);

      showSlide = false;
      wrapper = mount(<Carousel>{showSlide && <p>Slide 1</p>}</Carousel>);
      expect(wrapper.find('.slider-list').children()).toHaveLength(0);
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

    it('should set slideHeight to max value by default', () => {
      const firstSlideNode = document.createElement('div');
      const secondSlideNode = document.createElement('div');
      const thirdSlideNode = document.createElement('div');
      Object.defineProperties(firstSlideNode, {
        offsetHeight: { value: 100 },
        style: {}
      });
      Object.defineProperties(secondSlideNode, {
        offsetHeight: { value: 200 },
        style: {}
      });
      Object.defineProperties(thirdSlideNode, {
        offsetHeight: { value: 300 },
        style: {}
      });
      jest
        .spyOn(Carousel.prototype, 'getChildNodes')
        .mockReturnValue([firstSlideNode, secondSlideNode, thirdSlideNode]);
      const wrapper = mount(
        <Carousel>
          <div style={{ height: '100px' }}>Slide 1</div>
          <div style={{ height: '200px' }}>Slide 1</div>
          <div style={{ height: '300px' }}>Slide 1</div>
        </Carousel>
      );
      Carousel.prototype.getChildNodes.mockRestore();
      expect(wrapper).toHaveState({ slideHeight: 300 });
    });

    it('should render with right height when supplied an initialSlideHeight prop.', () => {
      const wrapper = render(
        <Carousel initialSlideHeight={64} slidesToShow={2}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const frame = wrapper.find('.slider-frame');
      expect(frame.html()).toContain('height:64px;');
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

    it('should allow navigation to the last slide for center align and > 1 slidesToShow.', () => {
      const wrapper = mount(
        <Carousel cellAlign="center" slidesToShow={3}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          <p>Slide 4</p>
          <p>Slide 5</p>
          <p>Slide 6</p>
        </Carousel>
      );
      const nextButton = wrapper.find('.slider-control-centerright button');
      jest.useFakeTimers();

      for (let i = 0; i < 5; i++) {
        nextButton.simulate('click');
        jest.advanceTimersByTime(500);
      }

      expect(wrapper).toHaveState({ currentSlide: 5 });
    });

    it('should allow navigation to the last slide for right align and > 1 slidesToShow.', () => {
      const wrapper = mount(
        <Carousel cellAlign="right" slidesToShow={2}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          <p>Slide 4</p>
          <p>Slide 5</p>
          <p>Slide 6</p>
        </Carousel>
      );
      const nextButton = wrapper.find('.slider-control-centerright button');
      jest.useFakeTimers();

      for (let i = 0; i < 5; i++) {
        nextButton.simulate('click');
        jest.advanceTimersByTime(500);
      }

      expect(wrapper).toHaveState({ currentSlide: 5 });
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

    it('should set slideHeight to max value when `heightMode` is `max`', () => {
      const firstSlideNode = document.createElement('div');
      const secondSlideNode = document.createElement('div');
      const thirdSlideNode = document.createElement('div');
      Object.defineProperties(firstSlideNode, {
        offsetHeight: { value: 100 },
        style: {}
      });
      Object.defineProperties(secondSlideNode, {
        offsetHeight: { value: 200 },
        style: {}
      });
      Object.defineProperties(thirdSlideNode, {
        offsetHeight: { value: 300 },
        style: {}
      });
      jest
        .spyOn(Carousel.prototype, 'getChildNodes')
        .mockReturnValue([firstSlideNode, secondSlideNode, thirdSlideNode]);
      const wrapper = mount(
        <Carousel heightMode="max">
          <div style={{ height: '100px' }}>Slide 1</div>
          <div style={{ height: '200px' }}>Slide 1</div>
          <div style={{ height: '300px' }}>Slide 1</div>
        </Carousel>
      );
      Carousel.prototype.getChildNodes.mockRestore();
      expect(wrapper).toHaveState({ slideHeight: 300 });
    });

    it("should set slideHeight to first slide's height when `heightMode` is `first`", () => {
      const firstSlideNode = document.createElement('div');
      const secondSlideNode = document.createElement('div');
      const thirdSlideNode = document.createElement('div');
      Object.defineProperties(firstSlideNode, {
        offsetHeight: { value: 100 },
        style: {}
      });
      Object.defineProperties(secondSlideNode, {
        offsetHeight: { value: 200 },
        style: {}
      });
      Object.defineProperties(thirdSlideNode, {
        offsetHeight: { value: 300 },
        style: {}
      });
      jest
        .spyOn(Carousel.prototype, 'getChildNodes')
        .mockReturnValue([firstSlideNode, secondSlideNode, thirdSlideNode]);
      const wrapper = mount(
        <Carousel heightMode="first">
          <div style={{ height: '100px' }}>Slide 1</div>
          <div style={{ height: '200px' }}>Slide 1</div>
          <div style={{ height: '300px' }}>Slide 1</div>
        </Carousel>
      );
      Carousel.prototype.getChildNodes.mockRestore();
      expect(wrapper).toHaveState({ slideHeight: 100 });
    });

    it('should set height to current slide height when `heightMode` is `current`', () => {
      const firstSlideNode = document.createElement('div');
      const secondSlideNode = document.createElement('div');
      const thirdSlideNode = document.createElement('div');
      Object.defineProperties(firstSlideNode, {
        offsetHeight: { value: 100 },
        style: {}
      });
      Object.defineProperties(secondSlideNode, {
        offsetHeight: { value: 200 },
        style: {}
      });
      Object.defineProperties(thirdSlideNode, {
        offsetHeight: { value: 300 },
        style: {}
      });
      jest
        .spyOn(Carousel.prototype, 'getChildNodes')
        .mockReturnValue([firstSlideNode, secondSlideNode, thirdSlideNode]);
      const wrapper = mount(
        <Carousel heightMode="current" slideIndex={1}>
          <div style={{ height: '100px' }}>Slide 1</div>
          <div style={{ height: '200px' }}>Slide 1</div>
          <div style={{ height: '300px' }}>Slide 1</div>
        </Carousel>
      );
      Carousel.prototype.getChildNodes.mockRestore();
      expect(wrapper).toHaveState({ slideHeight: 200 });
    });

    it('should correctly render controls after props being updated.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      let previousButton = wrapper.find('.slider-control-centerleft button');
      expect(previousButton).toExist();

      const nextButton = wrapper.find('.slider-control-centerright button');
      expect(nextButton).toExist();

      const indicator = wrapper.find('.slider-control-bottomcenter button');
      expect(indicator).toExist();

      let topCenterControl = wrapper.find('.slider-control-topcenter button');
      expect(topCenterControl).not.toExist();

      wrapper.setProps({ renderCenterLeftControls: null });
      previousButton = wrapper.find('.slider-control-centerleft button');
      expect(previousButton).not.toExist();

      wrapper.setProps({
        renderTopCenterControls: () => <button>Top center control</button>
      });
      topCenterControl = wrapper.find('.slider-control-topcenter button');
      expect(topCenterControl).toExist();
      expect(topCenterControl.html()).toContain('Top center control');
    });

    it('should correctly count number of slides after props being updated.', () => {
      const elems = ['Slide 2', 'Slide 3', 'Slide 4'];
      const wrapper = mount(
        <Carousel>
          <p key="Static Slide">Static Slide</p>
          {elems.map(e => (
            <p key={e}>{e}</p>
          ))}
        </Carousel>
      );
      expect(wrapper).toHaveState({ slideCount: 4 });
      const children = wrapper
        .props()
        .children.concat(<p key="Slide 5">Slide 4</p>);
      wrapper.setProps({ children });
      expect(wrapper).toHaveState({ slideCount: 5 });
    });

    it('should default autoGenerateStyleTag to true', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
        </Carousel>
      );

      expect(wrapper).toHaveProp({ autoGenerateStyleTag: true });
    });

    it('should generate style tag when autoGenerateStyle tag is true', () => {
      const wrapper = mount(
        <Carousel autoGenerateStyleTag>
          <p>Slide 1</p>
          <p>Slide 2</p>
        </Carousel>
      );

      const styleTag = wrapper.find('style');
      expect(styleTag).toExist();
    });

    it('should not generate style tag when autoGenerateStyle tag is false', () => {
      const wrapper = mount(
        <Carousel autoGenerateStyleTag={false}>
          <p>Slide 1</p>
          <p>Slide 2</p>
        </Carousel>
      );

      const styleTag = wrapper.find('style');
      expect(styleTag).not.toExist();
    });

    it('should set slideCount to equal the amount of valid react children', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          {null}
          {undefined}
        </Carousel>
      );

      expect(wrapper).toHaveState({ slideCount: 3 });
    });

    it('should set slideCount to 0 if logic to render slides does not return valid components', () => {
      let showSlide = true;
      let wrapper = mount(<Carousel>{showSlide && <p>Slide 1</p>}</Carousel>);
      expect(wrapper).toHaveState({ slideCount: 1 });

      showSlide = false;
      wrapper = mount(<Carousel>{showSlide && <p>Slide 1</p>}</Carousel>);
      expect(wrapper).toHaveState({ slideCount: 0 });
    });

    it('should call beforeSlide and afterSlide when slide change', async () => {
      const speed = 500;
      const beforeSlideSpy = jest.fn();
      const afterSlideSpy = jest.fn();

      const wrapper = mount(
        <Carousel
          slideIndex={0}
          beforeSlide={beforeSlideSpy}
          afterSlide={afterSlideSpy}
          speed={speed}
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      wrapper.instance().goToSlide(1);
      jest.advanceTimersByTime(speed);
      expect(beforeSlideSpy).toBeCalledWith(0, 1);
      expect(afterSlideSpy).toBeCalledWith(1);
    });

    describe('enableKeyboardControls', () => {
      it('should move to next slide when pressing right arrow key', () => {
        const map = {};
        document.addEventListener = jest.fn((event, cb) => {
          map[event] = cb;
        });

        const wrapper = mount(
          <Carousel enableKeyboardControls>
            <p>Slide1</p>
            <p>Slide2</p>
            <p>Slide3</p>
          </Carousel>
        );
        expect(wrapper).toHaveState({ currentSlide: 0 });
        map.keydown({ keyCode: 39 });
        expect(wrapper).toHaveState({ currentSlide: 1 });
      });

      it('should not move to next slide when pressing right arrow key when enableKeyboardControls is set to false/not passed in', () => {
        const map = {};
        document.addEventListener = jest.fn((event, cb) => {
          map[event] = cb;
        });

        const wrapper = mount(
          <Carousel>
            <p>Slide1</p>
            <p>Slide2</p>
            <p>Slide3</p>
          </Carousel>
        );
        expect(wrapper).toHaveState({ currentSlide: 0 });
        map.keydown({ keyCode: 39 });
        expect(wrapper).toHaveState({ currentSlide: 0 });
      });
    });
  });

  describe('transitionModes', () => {
    describe('scroll', () => {
      it('should default to scroll mode', () => {
        const wrapper = mount(
          <Carousel>
            <p>Slide 1</p>
          </Carousel>
        );

        expect(wrapper).toHaveProp({ transitionMode: 'scroll' });
      });

      it('should allow users to set fractional slidesToShow', () => {
        const wrapper = mount(
          <Carousel slidesToShow={1.5}>
            <p>Slide 1</p>
          </Carousel>
        );

        expect(wrapper).toHaveState({ slidesToShow: 1.5 });
      });

      it('should not set slidesToScroll automatically equal to slidesToShow', () => {
        const wrapper = mount(
          <Carousel slidesToShow={2}>
            <p>Slide 1</p>
          </Carousel>
        );

        expect(wrapper).toHaveState({ slidesToScroll: 1 });
      });

      it('should set cellAlign state to prop value', () => {
        const centerWrapper = mount(
          <Carousel cellAlign="center">
            <p>Slide 1</p>
          </Carousel>
        );

        expect(centerWrapper).toHaveState({ cellAlign: 'center' });

        const rightWrapper = mount(
          <Carousel cellAlign="right">
            <p>Slide 1</p>
          </Carousel>
        );

        expect(rightWrapper).toHaveState({ cellAlign: 'right' });

        const defaultWrapper = mount(
          <Carousel>
            <p>Slide 1</p>
          </Carousel>
        );

        expect(defaultWrapper).toHaveState({ cellAlign: 'left' });
      });
    });

    describe('fade', () => {
      it('should allow user to set transitionMode to fade', () => {
        const wrapper = mount(
          <Carousel transitionMode="fade">
            <p>Slide 1</p>
          </Carousel>
        );

        expect(wrapper).toHaveProp({ transitionMode: 'fade' });
      });

      it('should not allow users to set fractional slidesToShow', () => {
        const wrapper = mount(
          <Carousel transitionMode="fade" slidesToShow={1.5}>
            <p>Slide 1</p>
          </Carousel>
        );

        expect(wrapper).toHaveState({ slidesToShow: 1 });
      });

      it('should default slidesToScroll equal to slidesToShow', () => {
        const wrapper = mount(
          <Carousel transitionMode="fade" slidesToShow={2}>
            <p>Slide 1</p>
          </Carousel>
        );

        expect(wrapper).toHaveState({ slidesToScroll: 2 });
      });

      it('should override slidesToScroll value with slidesToShow value', () => {
        const wrapper = mount(
          <Carousel transitionMode="fade" slidesToShow={2} slidesToScroll={3}>
            <p>Slide 1</p>
          </Carousel>
        );

        expect(wrapper).toHaveState({ slidesToScroll: 2 });
      });

      it('should set cellAlign to "left" regardless of prop', () => {
        const centerWrapper = mount(
          <Carousel transitionMode="fade" cellAlign="center">
            <p>Slide 1</p>
          </Carousel>
        );

        expect(centerWrapper).toHaveState({ cellAlign: 'left' });

        const rightWrapper = mount(
          <Carousel transitionMode="fade" cellAlign="right">
            <p>Slide 1</p>
          </Carousel>
        );

        expect(rightWrapper).toHaveState({ cellAlign: 'left' });

        const defaultWrapper = mount(
          <Carousel transitionMode="fade">
            <p>Slide 1</p>
          </Carousel>
        );

        expect(defaultWrapper).toHaveState({ cellAlign: 'left' });
      });
    });
  });

  describe('methods', () => {
    it('should call setDimensions callback after setState', () => {
      const onResizeSpy = jest.fn();
      const wrapper = mount(
        <Carousel cellAlign="left" onResize={onResizeSpy}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      wrapper.instance().onResize();
      expect(onResizeSpy).toHaveBeenCalled();
    });

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

      jest.useFakeTimers();

      for (let i = 0; i < 2; i++) {
        wrapper.instance().nextSlide();
        jest.advanceTimersByTime(500);
      }

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
    it('should default withoutControls to false', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
        </Carousel>
      );
      expect(wrapper).toHaveProp({ withoutControls: false });
    });
    it('should render with no controls when set to true.', () => {
      const wrapper = mount(
        <Carousel withoutControls>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper).toHaveProp({ withoutControls: true });
      const { renderControls } = wrapper.instance();
      expect(renderControls().every(element => element === null));
    });
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

    it('should reset slide height and width once one of the child nodes is mutated by style attr', async () => {
      const firstSlideNode = document.createElement('div');
      const secondSlideNode = document.createElement('div');
      jest
        .spyOn(Carousel.prototype, 'getChildNodes')
        .mockReturnValue([firstSlideNode, secondSlideNode]);
      const wrapper = mount(
        <Carousel>
          <span style={{ height: '1px' }}>Slide 1</span>
          <span style={{ height: '2px' }}>Slide 2</span>
        </Carousel>
      );
      const instance = wrapper.instance();
      const childNodesCount = instance.getChildNodes().length;
      jest.spyOn(instance, 'setSlideHeightAndWidth');
      expect(instance.setSlideHeightAndWidth).not.toBeCalled();
      firstSlideNode.setAttribute('style', {});
      // jest.advanceTimersByTime(1000);
      await jest.setTimeout(0);
      expect(instance.setSlideHeightAndWidth).toBeCalledTimes(childNodesCount);
      instance.setSlideHeightAndWidth.mockClear();
      firstSlideNode.setAttribute('style', { height: 1 });
      await jest.setTimeout(0);
      expect(instance.setSlideHeightAndWidth).toBeCalledTimes(childNodesCount);
      instance.setSlideHeightAndWidth.mockClear();
      firstSlideNode.setAttribute('data-fake-attr', '');
      await jest.setTimeout(0);
      expect(instance.setSlideHeightAndWidth).not.toBeCalled();
      Carousel.prototype.getChildNodes.mockRestore();
    });

    it('should update slide width and height only when current slide image is loaded on slide change', () => {
      const image = new Image();
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>
            <img src="/test.jpg" />
          </p>
        </Carousel>
      );
      const instance = wrapper.instance();
      image.addEventListener = jest.fn();
      image.removeEventListener = jest.fn();
      instance.getCurrentChildNodeImg = jest.fn(() => image);
      wrapper.setState({ currentSlide: 1 });
      expect(image.addEventListener).toBeCalledWith(
        'load',
        instance.setSlideHeightAndWidth
      );
      expect(image.removeEventListener).toBeCalledWith(
        'load',
        instance.setSlideHeightAndWidth
      );
    });
  });
});
