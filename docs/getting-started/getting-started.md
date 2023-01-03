---
sidebar_position: 1
---

# Getting Started

### Installation

Install nuka-carousel using either `yarn` or `npm`:

```bash npm2yarn
npm install nuka-carousel
```

### First try

```playground
import Carousel from 'nuka-carousel';

const NukaCarousel = () => {
  return (
    <Carousel>
      <img
        src="https://nuka-carousel-next.vercel.app/images/1.png"
        style={{
          width: '100%',
          height: 400,
        }}
      />
      <img
        src="https://nuka-carousel-next.vercel.app/images/2.png"
        style={{
          width: '100%',
          height: 400,
        }}
      />
      <img
        src="https://nuka-carousel-next.vercel.app/images/3.png"
        style={{
          width: '100%',
          height: 400,
        }}
      />
    </Carousel>
  )
}

export default NukaCarousel
```

### Add tests

Use the [takeScreenshot](/docs/api/methods#takescreenshotname-string) and [.toMatchBaseline](/docs/api/matchers#tomatchbaselinename-string) apis to implement screenshot tests. File names must end in `.owl.ts`, `.owl.tsx`, `.owl.js` or `.owl.jsx`. [See the example app](https://github.com/FormidableLabs/react-native-owl/tree/main/example) for a more complete example.

#### Example

```tsx title="app.owl.tsx"
import { press, takeScreenshot } from 'react-native-owl';

describe('App.tsx', () => {
  it('takes a screenshot of the first screen', async () => {
    const screen = await takeScreenshot('homescreen');

    expect(screen).toMatchBaseline();
  });

  it('presses a button, then takes a screenshot', async () => {
    await press('button')

    const screen = await takeScreenshot('afterButtonPress');

    expect(screen).toMatchBaseline();
  });
});
```

### Building the app

Before the app can be tested, it must be built.

<Tabs groupId="npm2yarn">
  <TabItem value="npm" label="npm">

```bash
npx owl build --platform ios
```

  </TabItem>
  <TabItem value="yarn" label="Yarn">

```bash
yarn owl build --platform ios
```

  </TabItem>
</Tabs>

:::info

You will need to manually start the correct simulator before the tests are run.

:::


This runs the app on the simulator, either comparing screenshots with the baseline images, or updating the baseline images.

When comparing images, any difference in the current vs baseline will fail the test.

#### Examples

Test against the baseline images (will create the baseline images if they don't exist).

<Tabs  groupId="npm2yarn">
  <TabItem value="npm" label="npm">

```bash
npx owl test --platform ios
```

  </TabItem>
  <TabItem value="yarn" label="Yarn">

```bash
yarn owl test --platform ios
```

  </TabItem>
</Tabs>

Update the baseline images

<Tabs  groupId="npm2yarn">
  <TabItem value="npm" label="npm">

```bash
npx owl test --platform ios --update
```

  </TabItem>
  <TabItem value="yarn" label="Yarn">

```bash
yarn owl test --platform ios --update
```

  </TabItem>
</Tabs>

### Failed tests report

When the tests have failed any [`.toMatchBaseline()`](/docs/api/matchers) expectations, a [report is generated](/docs/cli/testing-the-app#viewing-the-report), where you can view all the screenshots, where the differences in the current vs baseline screenshots will be highlighted.
