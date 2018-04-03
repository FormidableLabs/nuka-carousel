import Carousel from '../../src';

const createSlidesData = (numberOfSlides = 3) => Array.from({ length: numberOfSlides }, (v, k) => `Slide ${k + 1}`);

const data = createSlidesData(3)
const Slide = ({ text }) => <p>{text}</p>
const Placeholder = ({ text }) => <p>{`Placeholder for ${text}`}</p>

describe('<Carousel />', () => {
  describe('Rendering and Mounting', () => {
    it('should correctly mount with children.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide}>
          {data}
        </Carousel>
      );
      const children = wrapper.find('p');
      expect(children).toHaveLength(3);
    });

    it('should render a div with the class `slider`.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide}>
          {data}
        </Carousel>
      );
      const sliderDiv = wrapper.find('div.slider');
      expect(sliderDiv).toHaveLength(1);
    });

    it('should render a div with the class `slider-frame`.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide}>
          {data}
        </Carousel>
      );
      const sliderFrameDiv = wrapper.find('div.slider-frame');
      expect(sliderFrameDiv).toHaveLength(1);
    });

    it('should render an ul with the class `slider-list`.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide}>
          {data}
        </Carousel>
      );
      const sliderListUl = wrapper.find('ul.slider-list');
      expect(sliderListUl).toHaveLength(1);
    });

    it('should render children with the `slider-slide` class.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide}>
          {data}
        </Carousel>
      );
      const children = wrapper.find('.slider-slide');
      expect(children).toHaveLength(3);
    });

    it('should render controls by default.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide}>
          {data}
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
        <Carousel Slide={Slide}>
          {data}
        </Carousel>
      );
      const slider = wrapper.find('div.slider');
      expect(slider).toHaveLength(1);
    });

    it('should render with the class `test` with className supplied.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} className="test">
          {data}
        </Carousel>
      );
      const slider = wrapper.find('div.test');
      expect(slider).toHaveLength(1);
    });

    it('should merge provided styles with default styles.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} style={{ backgroundColor: 'black' }}>
          {data}
        </Carousel>
      );
      const slider = wrapper.find('div.slider');
      expect(slider).toHaveStyle('backgroundColor', 'black');
      expect(slider).toHaveStyle('display', 'block');
    });

    it('should align to 0 when `cellAlign` is `left`.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} cellAlign="left">
          {data}
        </Carousel>
      );
      const slider = wrapper.find('.slider-list');
      expect(slider).toHaveStyle('transform', 'translate3d(0px, 0px, 0)');
    });

    it('should allow navigation to the last slide for center align and > 1 slidesToShow.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} cellAlign="center" slidesToShow={3}>
          {createSlidesData(6)}
        </Carousel>
      );
      const nextButton = wrapper.find('.slider-control-centerright button');
      nextButton.simulate('click');
      nextButton.simulate('click');
      nextButton.simulate('click');
      nextButton.simulate('click');
      nextButton.simulate('click');
      expect(wrapper).toHaveState({ currentSlide: 5 });
    });

    it('should allow navigation to the last slide for right align and > 1 slidesToShow.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} cellAlign="right" slidesToShow={2}>
          {createSlidesData(6)}
        </Carousel>
      );
      const nextButton = wrapper.find('.slider-control-centerright button');
      nextButton.simulate('click');
      nextButton.simulate('click');
      nextButton.simulate('click');
      nextButton.simulate('click');
      nextButton.simulate('click');
      expect(wrapper).toHaveState({ currentSlide: 5 });
    });

    it('should adjust the slide index when children count change.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} slideIndex={2}>
          {data}
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
        <Carousel Slide={Slide} slideIndex={2}>
          {data}
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
      jest
        .spyOn(Carousel.prototype, 'getChildNodes')
        .mockReturnValue([
          { offsetHeight: 100, style: {} },
          { offsetHeight: 200, style: {} },
          { offsetHeight: 300, style: {} }
        ]);
      const CustomSlide = ({ text, height }) =>  <div style={{ height }}>{text}</div>
      const wrapper = mount(
        <Carousel Slide={CustomSlide} heightMode="max">
          {[
            {
              text: 'Slide 1',
              height: '100px'
            },
            {
              text: 'Slide 2',
              height: '200px'
            },
            {
              text: 'Slide 3',
              height: '300px'
            }
          ]}
        </Carousel>
      );
      Carousel.prototype.getChildNodes.mockRestore();
      expect(wrapper).toHaveState({ slideHeight: 300 });
    });

    it("should set slideHeight to first slide's height when `heightMode` is `first`", () => {
      jest
        .spyOn(Carousel.prototype, 'getChildNodes')
        .mockReturnValue([
          { offsetHeight: 100, style: {} },
          { offsetHeight: 200, style: {} },
          { offsetHeight: 300, style: {} }
        ]);
      const CustomSlide = ({ text, height }) =>  <div style={{ height }}>{text}</div>
      const wrapper = mount(
        <Carousel Slide={CustomSlide} heightMode="first">
          {[
            {
              text: 'Slide 1',
              height: '100px'
            },
            {
              text: 'Slide 2',
              height: '200px'
            },
            {
              text: 'Slide 3',
              height: '300px'
            }
          ]}
        </Carousel>
      );
      Carousel.prototype.getChildNodes.mockRestore();
      expect(wrapper).toHaveState({ slideHeight: 100 });
    });

    it('should set height to current slide height when `heightMode` is `current`', () => {
      jest
        .spyOn(Carousel.prototype, 'getChildNodes')
        .mockReturnValue([
          { offsetHeight: 100, style: {} },
          { offsetHeight: 200, style: {} },
          { offsetHeight: 300, style: {} }
        ]);
      const CustomSlide = ({ text, height }) =>  <div style={{ height }}>{text}</div>
      const wrapper = mount(
        <Carousel Slide={CustomSlide} heightMode="current" slideIndex={1}>
          {[
            {
              text: 'Slide 1',
              height: '100px'
            },
            {
              text: 'Slide 2',
              height: '200px'
            },
            {
              text: 'Slide 3',
              height: '300px'
            }
          ]}
        </Carousel>
      );
      Carousel.prototype.getChildNodes.mockRestore();
      expect(wrapper).toHaveState({ slideHeight: 200 });
    });
  });

  describe('methods', () => {
    it('should advance if nextSlide() is called.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} cellAlign="left">
          {data}
        </Carousel>
      );
      expect(wrapper).toHaveState({ currentSlide: 0 });
      wrapper.instance().nextSlide();
      expect(wrapper).toHaveState({ currentSlide: 1 });
    });

    it('should not advance past the last slide.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} cellAlign="left">
          {data}
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
        <Carousel Slide={Slide} cellAlign="left">
          {data}
        </Carousel>
      );
      expect(wrapper).toHaveState({ currentSlide: 0 });
      wrapper.instance().previousSlide();
      expect(wrapper).toHaveState({ currentSlide: 0 });
    });

    it('should go back to the previous slide when `previousSlide` is called.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} cellAlign="left">
          {data}
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
        <Carousel Slide={Slide} cellAlign="left">
          {data}
        </Carousel>
      );
      expect(wrapper).toHaveState({ currentSlide: 0 });
      wrapper.instance().goToSlide(2);
      expect(wrapper).toHaveState({ currentSlide: 2 });
    });

    it('should go to the last slide from the first when wrapAround is true`.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} wrapAround>
          {data}
        </Carousel>
      );
      const previousButton = wrapper.find('.slider-control-centerleft button');
      expect(wrapper).toHaveState({ currentSlide: 0 });
      previousButton.simulate('click');
      expect(wrapper).toHaveState({ currentSlide: 2 });
    });

    it('should go to the first slide from the last when wrapAround is true`.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} wrapAround>
          {data}
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
    it('should render a custom left control.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} renderCustomLeftControls={() => <div>Custom Left</div>}>
          {data}
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Custom Left</div>);
    });

    it('should render a custom right control.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} renderCustomRightControls={() => <div>Custom Right</div>}>
          {data}
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Custom Right</div>);
    });

    it('should render a custom top left control.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} renderTopLeftControls={() => <div>Top Left</div>}>
          {data}
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Top Left</div>);
    });

    it('should render a custom top center control.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} renderTopCenterControls={() => <div>Top Center</div>}>
          {data}
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Top Center</div>);
    });

    it('should render a custom top right control.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} renderTopRightControls={() => <div>Top Right</div>}>
          {data}
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Top Right</div>);
    });

    it('should render a custom center left control.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} renderCenterLeftControls={() => <div>Center Left</div>}>
          {data}
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Center Left</div>);
    });

    it('should render a custom center center control.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} renderCenterCenterControls={() => <div>Center Center</div>}>
          {data}
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Center Center</div>);
    });

    it('should render a custom center right control.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} renderCenterRightControls={() => <div>Center Right</div>}>
          {data}
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Center Right</div>);
    });

    it('should render a custom bottom left control.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} renderBottomLeftControls={() => <div>Bottom Left</div>}>
          {data}
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Bottom Left</div>);
    });

    it('should render a custom bottom center control.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} renderBottomCenterControls={() => <div>Bottom Center</div>}>
          {data}
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Bottom Center</div>);
    });

    it('should render a custom bottom right control.', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} renderBottomRightControls={() => <div>Bottom Right</div>}>
          {data}
        </Carousel>
      );
      expect(wrapper).toContainReact(<div>Bottom Right</div>);
    });

    it('should render controls with control props.', () => {
      const CustomControls = () => <div>Custom Controls</div>;
      const wrapper = mount(
        <Carousel
          Slide={Slide}
          wrapAround
          renderCenterCenterControls={props => <CustomControls {...props} />}
        >
          {data}
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
          Slide={Slide}
          renderCenterCenterControls={({ nextSlide }) => (
            <button id="custom-next-btn" onClick={nextSlide}>
              Next
            </button>
          )}
        >
          {data}
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
          Slide={Slide}
          slideIndex={1}
          renderCenterCenterControls={({ previousSlide }) => (
            <button id="custom-prev-btn" onClick={previousSlide}>
              Next
            </button>
          )}
        >
          {data}
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
          Slide={Slide}
          renderCenterCenterControls={({ goToSlide }) => (
            <button id="custom-goto-btn" onClick={() => goToSlide(2)}>
              Go to Slide 3
            </button>
          )}
        >
          {data}
        </Carousel>
      );
      const spy = jest.spyOn(wrapper.instance(), 'goToSlide');
      wrapper.update();
      const button = wrapper.find('#custom-goto-btn');
      button.simulate('click');
      expect(spy).toHaveBeenCalledWith(2);
    });

    it('should render all Slides', () => {
      const wrapper = mount(
        <Carousel Slide={Slide}>
          {createSlidesData(6)}
        </Carousel>
      );

      expect(wrapper.instance().shouldRenderSlide(0)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(1)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(2)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(3)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(4)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(5)).toEqual(true);
    });

    it('should render all Slides when placeholderMode is not activated', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} Placeholder={Placeholder}>
          {createSlidesData(6)}
        </Carousel>
      );

      expect(wrapper.instance().shouldRenderSlide(0)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(1)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(2)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(3)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(4)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(5)).toEqual(true);
    });

    it('should render Slides and Placeholders when placeholderMode is activated (preloadedChildrenLevel is taken in consideration)', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} Placeholder={Placeholder} placeholderMode>
          {createSlidesData(6)}
        </Carousel>
      );

      expect(wrapper.instance().shouldRenderSlide(0)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(1)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(2)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(3)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(4)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(5)).toEqual(false);
    });

    it('should render Slides and Placeholders when placeholderMode is activated and wrapAround is set (preloadedChildrenLevel is taken in consideration)', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} Placeholder={Placeholder} placeholderMode wrapAround>
          {createSlidesData(6)}
        </Carousel>
      );

      expect(wrapper.instance().shouldRenderSlide(0)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(1)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(2)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(3)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(4)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(5)).toEqual(true);
    });

    it('should render Slides and Placeholders when placeholderMode is activated and preloadedChildrenLevel is set', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} Placeholder={Placeholder} placeholderMode preloadedChildrenLevel={2}>
          {createSlidesData(6)}
        </Carousel>
      );

      expect(wrapper.instance().shouldRenderSlide(0)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(1)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(2)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(3)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(4)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(5)).toEqual(false);
    });

    it('should render Slides and Placeholders when placeholderMode is activated and wrapAround and preloadedChildrenLevel are set', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} Placeholder={Placeholder} placeholderMode preloadedChildrenLevel={2} wrapAround>
          {createSlidesData(6)}
        </Carousel>
      );

      expect(wrapper.instance().shouldRenderSlide(0)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(1)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(2)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(3)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(4)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(5)).toEqual(true);
    });

    it('should render all Slides when placeholderMode is activated and preloadedChildrenLevel is set (preloadedChildrenLevel covers all slides)', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} Placeholder={Placeholder} placeholderMode preloadedChildrenLevel={5}>
          {createSlidesData(6)}
        </Carousel>
      );

      expect(wrapper.instance().shouldRenderSlide(0)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(1)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(2)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(3)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(4)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(5)).toEqual(true);
    });

    it('should render all Slides when placeholderMode is activated and wrapAround and preloadedChildrenLevel are set (preloadedChildrenLevel covers all slides)', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} Placeholder={Placeholder} placeholderMode preloadedChildrenLevel={3} wrapAround>
          {createSlidesData(6)}
        </Carousel>
      );

      expect(wrapper.instance().shouldRenderSlide(0)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(1)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(2)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(3)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(4)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(5)).toEqual(true);
    });

    it('should render Slide when placeholderMode is activated and there is only one slide', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} Placeholder={Placeholder} placeholderMode>
          {createSlidesData(1)}
        </Carousel>
      );

      expect(wrapper.instance().shouldRenderSlide(0)).toEqual(true);
    });

    it('should render all Slide when placeholderMode is activated and there are 2 slides', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} Placeholder={Placeholder} placeholderMode>
          {createSlidesData(2)}
        </Carousel>
      );

      expect(wrapper.instance().shouldRenderSlide(0)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(1)).toEqual(true);
    });

    it('should render Slides and Placeholders when placeholderMode is activated and preloadedChildrenLevel is 0', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} Placeholder={Placeholder} placeholderMode preloadedChildrenLevel={0}>
          {createSlidesData(6)}
        </Carousel>
      );

      expect(wrapper.instance().shouldRenderSlide(0)).toEqual(true);
      expect(wrapper.instance().shouldRenderSlide(1)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(2)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(3)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(4)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(5)).toEqual(false);
    });

    it('should render Placeholders when placeholderMode is activated and preloadedChildrenLevel is -1', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} Placeholder={Placeholder} placeholderMode preloadedChildrenLevel={-1}>
          {createSlidesData(6)}
        </Carousel>
      );

      expect(wrapper.instance().shouldRenderSlide(0)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(1)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(2)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(3)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(4)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(5)).toEqual(false);
    });

    it('should render Placeholders when placeholderMode is activated and wrapAround is set and preloadedChildrenLevel is -2', () => {
      const wrapper = mount(
        <Carousel Slide={Slide} Placeholder={Placeholder} placeholderMode preloadedChildrenLevel={-2} wrapAround>
          {createSlidesData(6)}
        </Carousel>
      );

      expect(wrapper.instance().shouldRenderSlide(0)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(1)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(2)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(3)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(4)).toEqual(false);
      expect(wrapper.instance().shouldRenderSlide(5)).toEqual(false);
    });
  });
});
