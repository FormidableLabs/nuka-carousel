---
sidebar_position: 1
---

# Methods

### takeScreenshot(name: string)

Grabs a screenshot from the simulator and stores it under `latest` screenshots(ie. `./owl/latest/ios/`) using the specified filename (no extension required). If running the tests using the `--update` or `-u` flag, or its the first time its being run, this will store the screenshot under the `baseline` directory.

#### Example

```js title="__tests__/App.owl.tsx"
import { takeScreenshot } from 'react-native-owl';

describe('App.tsx', () => {
  it('takes a screenshot of the first screen', async () => {
    // highlight-next-line
    const screen = await takeScreenshot('homescreen');

    expect(screen).toMatchBaseline();
  });
});
```

The first time this test is run, or when run with the `--update` flag, the screenshot will be stored at `./owl/baseline/ios/homescreen.png` (or `/android/` is testing on Android).

On subsequent test runs, the screenshot will be stored at `./owl/current/ios/homescreen.png`.

### toExist(testID: string)

Waits for an element to exist where its `testID` prop matches the methods `testID` argument.

If there is no matching element, it will retry for 10 seconds before throwing an Error.

#### Example

```js title="App.tsx"
...
const [isLoaded, setIsLoaded] = React.useState(false);

React.useEffect(() => {
  setTimeout(() => {
    setIsLoaded(true);
  }, 1000);
}, []);

<>
  {isLoaded && (
    <TextInput testId="testInput" />
  )}
</>
...
```

```js title="__tests__/App.owl.tsx"
import { toExist, takeScreenshot } from 'react-native-owl';

describe('App.tsx', () => {
  it('waits for an element, then takes a screenshot', async () => {
    // highlight-next-line
    await toExist('testInput');

    const screen = await takeScreenshot('textInputExists');

    expect(screen).toMatchBaseline();
  });
});
```

### press(testID: string)

Calls the `onPress` prop callback of the element where its `testID` prop matches the methods `testID` argument.

If there is no matching element, it will retry for 10 seconds before throwing an Error.

The element must have a `onPress` prop, or an Error will be thrown.

#### Example

```js title="App.tsx"
...
<Button title="Press Me" testID="button" onPress={() => {
  // Will be called by the react-native-owl `press` method
}} />
...
```

```js title="__tests__/App.owl.tsx"
import { press, takeScreenshot } from 'react-native-owl';

describe('App.tsx', () => {
  it('presses a button with testID = `button` then takes a screenshot', async () => {
    // highlight-next-line
    await press('button');

    const screen = await takeScreenshot('afterButtonPress');

    expect(screen).toMatchBaseline();
  });
});
```

### longPress(testID: string)

Calls the `onLongPress` prop callback of the element where its `testID` prop matches the methods `testID` argument.

If there is no matching element, it will retry for 10 seconds before throwing an Error.

The element must have a `onLongPress` prop, or an Error will be thrown.

#### Example

```js title="App.tsx"
...
<Button title="Long press Me" testID="button" onLongPress={() => {
  // Will be called by the react-native-owl `longPress` method
}} />
...
```

```js title="__tests__/App.owl.tsx"
import { longPress, takeScreenshot } from 'react-native-owl';

describe('App.tsx', () => {
  it('long presses a button with testID = `button` then takes a screenshot', async () => {
    // highlight-next-line
    await longPress('button');

    const screen = await takeScreenshot('afterButtonLongPress');

    expect(screen).toMatchBaseline();
  });
});
```

### changeText(testID: string, text: string)

Calls the `onChangeText` prop callback of the element where its `testID` prop matches the methods `testID` argument.

If there is no matching element, it will retry for 10 seconds before throwing an Error.

The element must have a `onChangeText` prop, or an Error will be thrown.

#### Example

```js title="App.tsx"
...
<TextInput
  testID="email"
  placeholder="Enter email address"
  onChangeText={setEmail}
  value={email}
/>
...
```

```js title="__tests__/App.owl.tsx"
import { changeText, takeScreenshot } from 'react-native-owl';

describe('App.tsx', () => {
  it('changes text in a TextInput with testID = `email` then takes a screenshot', async () => {
    // highlight-next-line
    await changeText('email', 'john.smith@example.com');

    const screen = await takeScreenshot('afterChangeText');

    expect(screen).toMatchBaseline();
  });
});
```

### scrollTo(testID: string, position: {x?: number, y?: number})

Calls the `scrollTo` method of the element where its `testID` prop matches the methods `testID` argument.

If there is no matching element, it will retry for 10 seconds before throwing an Error.

The element must have a `scrollTo` method (i.e `ScrollView`), or an Error will be thrown.

#### Example

```js title="App.tsx"
...
<ScrollView testID="scrollView">
  ...
</ScrollView>
...
```

```js title="__tests__/App.owl.tsx"
import { scrollTo, takeScreenshot } from 'react-native-owl';

describe('App.tsx', () => {
  it('scroll down the screen a bit then takes a screenshot', async () => {
    // highlight-next-line
    await scrollTo('scrollView', {y: 50});

    const screen = await takeScreenshot('afterScrollTo');

    expect(screen).toMatchBaseline();
  });
});
```

### scrollToEnd(testID: string)

Calls the `scrollToEnd` method of the element where its `testID` prop matches the methods `testID` argument.

If there is no matching element, it will retry for 10 seconds before throwing an Error.

The element must have a `scrollToEnd` method (i.e `ScrollView`), or an Error will be thrown.

#### Example

```js title="App.tsx"
...
<ScrollView testID="scrollView">
  ...
</ScrollView>
...
```

```js title="__tests__/App.owl.tsx"
import { scrollToEnd, takeScreenshot } from 'react-native-owl';

describe('App.tsx', () => {
  it('scroll down the screen a bit then takes a screenshot', async () => {
    // highlight-next-line
    await scrollToEnd('scrollView');

    const screen = await takeScreenshot('afterScrollToEnd');

    expect(screen).toMatchBaseline();
  });
});
```

### reload()

Terminates the app in the emulator/simulator, and restarts it.

This is useful when you want to complete a set of tests and nove onto a new set of tests.

Depending on your use-case, you could call `reload` in a `beforeAll`, or `beforeEach` callback, or within a test case, to get the app into a clean state before each set of tests for example.


#### Example


```js title="__tests__/App.owl.tsx"
import { reload } from 'react-native-owl';

describe('App.tsx', () => {
  describe('the checkout flow', () => {
    beforeAll(async () => {
      // highlight-next-line
      await reload();
    }),

    it('adds product to cart', async () => {
      ...
    });

    it('starts checkout flow', async () => {
      ...
    });
  });
});
```
