---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Building the app

Before the app can be tested, it must be built.

#### Options

| Name             | Required | Default           | Options/Types   | Description                             |
| ---------------- | -------- | ----------------- | --------------- | --------------------------------------- |
| `config`, `-c`   | false    | ./owl.config.json | String          | Path to the configuration file          |
| `platform`, `-p` | true     | -                 | `ios`,`android` | The platform the app should be built on |

#### Examples

<Tabs  groupId="npm2yarn">
  <TabItem value="npm" label="npm">

```bash
npx owl build --platform ios --config ./owl.config.json
```

  </TabItem>
  <TabItem value="yarn" label="Yarn">

```bash
yarn owl build --platform ios --config ./owl.config.json
```

  </TabItem>
</Tabs>
