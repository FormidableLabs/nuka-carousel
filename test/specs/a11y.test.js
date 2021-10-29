import Carousel from '../../src';

const { axe, toHaveNoViolations } = require('jest-axe');
expect.extend(toHaveNoViolations);

it('should demonstrate this matcher`s usage with enzyme', async () => {
  const wrapper = mount(
    <Carousel>
      <p>Slide 1</p>
      <p>Slide 2</p>
      <p>Slide 3</p>
    </Carousel>
  );
  const results = await axe(wrapper.getDOMNode());

  expect(results).toHaveNoViolations();
});
