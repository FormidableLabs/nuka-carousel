import AnnounceSlide, {
  defaultRenderAnnounceSlideMessage
} from '../../src/announce-slide';

describe('<AnnounceSlide />', () => {
  it('allows you to set props', () => {
    const wrapper = mount(<AnnounceSlide message="I am a message." />);
    expect(wrapper.props().message).toBe('I am a message.');
    wrapper.setProps({ message: 'New message.' });
    expect(wrapper.props().message).toBe('New message.');
  });
});

describe('defaultRenderAnnounceSlideMessage', () => {
  it('creates default announce message', () => {
    const message = defaultRenderAnnounceSlideMessage({
      currentSlide: 0,
      slideCount: 5
    });

    expect(message).toBe('Slide 1 of 5');
  });
});
