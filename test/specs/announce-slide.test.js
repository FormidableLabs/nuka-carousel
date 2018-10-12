import AnnounceSlide from '../../src/announce-slide';

describe('<AnnounceSlide />', () => {
  it('allows you to set props', () => {
    const wrapper = mount(<AnnounceSlide message="I am a message." />);
    expect(wrapper.props().message).toBe('I am a message.');
    wrapper.setProps({ message: 'New message.' });
    expect(wrapper.props().message).toBe('New message.');
  });
});
