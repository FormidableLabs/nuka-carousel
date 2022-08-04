# Contributing

## Install

```sh
$ pnpm install
```

## Build source

Build the published Babel sources:

```sh
# One time build
$ pnpm run build
```

## Running the demos

Run the NextJS example on `localhost:3000`

```sh
$ pnpm run start:nextjs
```

To make changes to the Nuka Carousel library and have those changes reflect in the NextJS demo app also run

```sh
$ pnpm run build:watch
```

Run Storybook on `localhost:6006`

```sh
$ pnpm run start:storybook
```

## Tests

Basics:

```sh
# Everything
$ pnpm run check

# ... which really runs
$ pnpm run lint
$ pnpm run test
```

And E2E tests (you _must_ be on `node@8+`):

```sh
$ pnpm run test
```

## Release

_(Only for project administrators)_

We use an `npm version` release workflow:

1. Run `npm version patch` (or `minor|major|ACTUAL_VERSION_NUMBER`) which runs
   tests/lint, builds all files we need to publish, mutates `package.json`,
   and does all the requisite git stuff.
2. Run `npm publish` and publish to npm if all is well.
3. Run `git push && git push --tags`
