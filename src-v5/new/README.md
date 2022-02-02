
> This page is under construction! Expect new updates soon!

# [v5] nuka-carousel

The goal for nuka-carousel v5 is to refactor the whole library, build it with TypeScript and React hooks, address most of the active issues, reduce the size of the library and support server-side rendering.


**Improvements**

- **Support server-side rendering**. Currently in v4 all of the slides are positioned with `position: absolute`, which doesn't render the slides appropriately when javascript is disabled and there are flickering when the front-end is hydrated. This forced users to hardcode properties for the carousel like `initialSlideHeight` and `initialSlideWidth`. In v5 all slides are positioned with dynamic width, so the slides and carousel can be fully responsive and rendered correctly on server as well.
- Rewritten the library with **TypeScript** and **React Hooks** for obvious reasons.
- **Reduce the size of the library and its dependencies**. Currently v4 has 5 dependencies - `prop-types`, `d3-ease`, `wicg-inert`, `exenv` and `react-move`. We are looking to use only `d3-ease` in v5, but definitely after bumping the version of it to the latest. 
  - `prop-types` is replaced with usage of TypeScript.
  - `exenv` is not maintained anymore and will be removed with v5 as a dependency of nuka-carousel.
  - `wicg-inert` doesn't have specified license, so we are going to remove it from our dependencies. [More info here](https://github.com/WICG/inert/issues/168). We are still supporting `inert` and we will have an example and more detailed documentation how you can use it with nuka-carousel v5.
  - `react-move` nothing personal, we just decided to go for our custom approach of animations in order to reduce the size of the library.
- **Fixed issues**. We fixed a lot of the issues that we currently have in v4. Short list here: [#735](https://github.com/FormidableLabs/nuka-carousel/issues/735), [#743](https://github.com/FormidableLabs/nuka-carousel/issues/743), [#821](https://github.com/FormidableLabs/nuka-carousel/issues/821), [#778](https://github.com/FormidableLabs/nuka-carousel/issues/778), [#755](https://github.com/FormidableLabs/nuka-carousel/issues/755), [#786](https://github.com/FormidableLabs/nuka-carousel/issues/786)


**Depreceted parameters**

The following list of parameters will be deprecated in v5. The main reason is that there is other approach which you can use to achieve the same thing, without increasing the complexity of the library. For example: `width` the width of the carousel can be easily manipulated by the parent container where developer placed the carousel. `scrollMode` can be achieved easily with `slidesToScroll` property and etc. We are open for discussions if you really need some of these parameters. Feel free to raise an issue or start discussion in the repository, so we can help.

- autoGenerateStyleTag
- framePadding
- getControlsContainerStyles
- height
- heightMode
- initialSlideHeight
- initialSlideWidth
- scrollMode
- slideOffset
- slideWidth
- transitionMode
- width

**What about v5.1**

- Vertical carousel
- Responsive object for slidesToShow property
- 

