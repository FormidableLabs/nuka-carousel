Contributing
============

## Install

```sh
$ yarn
```

## Build source

Build the publish Babel sources:

```sh
# One time build
$ yarn run build

# Watch
$ yarn run build-watch
```

## Running the demo

Run the webpack-dev-server on http://localhost:8080

```sh
$ yarn start
```

## Tests

Basics:

```sh
# Everything
$ yarn run check

# ... which really runs
$ yarn run lint
$ yarn run test
```

And E2E tests (you _must_ be on `node@8+`):

```sh
$ yarn run test-e2e
```

## Release

_(Only for project administrators)_

We use an `npm version` release workflow:

1. Run `npm version patch` (or `minor|major|ACTUAL_VERSION_NUMBER`) which runs
   tests/lint, builds all files we need to publish, mutates `package.json`,
   and does all the requisite git stuff.
2. Run `npm publish` and publish to npm if all is well.
3. Run `git push && git push --tags`
