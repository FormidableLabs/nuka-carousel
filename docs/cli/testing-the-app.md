---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Testing the app

Use the `test` command to run the app on the simulator, either comparing screenshots with the baseline images, or updating the baseline images.

#### Options

| Name               | Required | Default           | Options/Types   | Description                                     |
| ------------------ | -------- | ----------------- | --------------- | ----------------------------------------------- |
| `--config`, `-c`   | false    | ./owl.config.json | String          | Path to the configuration file                  |
| `--platform`, `-p` | true     | -                 | `ios`,`android` | The platform the app should be built on         |
| `--update`, `-u`   | true     | false             | Boolean         | A flag about rewriting existing baseline images |

When comparing images, any difference in the current vs baseline will fail the test.

:::info

The **first** time you will run the test command, react-native-owl will generate all your baseline images. It is _very_ important to make sure these are correct before proceeding.

:::

:::info

You will need to manually start the correct simulator before the tests are run.

:::

### First run

The baseline images will be automatically generated. To regenerate the baseline images, use the `--update` option.

### Running tests

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

### Updating the baseline

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

### Using a custom config file

Update the baseline images

<Tabs  groupId="npm2yarn">
  <TabItem value="npm" label="npm">

```bash
npx owl test --platform ios --config ./owl.config.json
```

  </TabItem>
  <TabItem value="yarn" label="Yarn">

```bash
yarn owl test --platform ios --config ./owl.config.json
```

  </TabItem>
</Tabs>

### Viewing the report

When the tests have failed any [`.toMatchBaseline()`](/docs/api/matchers) expectations, a report is generated, where you can view all the screenshots, where the differences in the current vs baseline screenshots will be highlighted.

The report uri is included in the test output.

#### Example:

The following will be included in the output of failed tests:

```
...
[OWL - CLI] Generating Report
[OWL - CLI] Report was built at /Users/username/Code/FormidableLabs/react-native-owl/example/.owl/report/index.html
...
```
