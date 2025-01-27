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

Run docosaurus site on `localhost:3000`

```sh
$ pnpm run start:website
```

To make changes to the Nuka Carousel library and have those changes reflect in the Docosaurus demo app also run

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

We use [changesets](https://github.com/changesets/changesets) to create package versions and publish them.

### Using changsets

Our official release path is to use automation to perform the actual publishing of our packages. The steps are to:

1. A human developer adds a changeset. Ideally this is as a part of a PR that will have a version impact on a package.
2. On merge of a PR our automation system opens a "Version Packages" PR.
3. On merging the "Version Packages" PR, the automation system publishes the packages.

Here are more details:

### Add a changeset

When you would like to add a changeset (which creates a file indicating the type of change), in your branch/PR issue this command:

```sh
$ pnpm run changeset
```

to produce an interactive menu. Navigate the packages with arrow keys and hit `<space>` to select 1+ packages. Hit `<return>` when done. Select semver versions for packages and add appropriate messages. From there, you'll be prompted to enter a summary of the change. Some tips for this summary:

1. Aim for a single line, 1+ sentences as appropriate.
2. Include issue links in GH format (e.g. `#123`).
3. You don't need to reference the current pull request or whatnot, as that will be added later automatically.

After this, you'll see a new uncommitted file in `.changesets` like:

```sh
$ git status
# ....
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.changeset/flimsy-pandas-marry.md
```

Review the file, make any necessary adjustments, and commit it to source. When we eventually do a package release, the changeset notes and version will be incorporated!

### Creating versions

On a merge of a feature PR, the changesets GitHub action will open a new PR titled `"Version Packages"`. This PR is automatically kept up to date with additional PRs with changesets. So, if you're not ready to publish yet, just keep merging feature PRs and then merge the version packages PR later.

### Publishing packages

On the merge of a version packages PR, the changesets GitHub action will publish the packages to npm.
