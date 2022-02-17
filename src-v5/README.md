# [v5] nuka-carousel

nuka-carousel@5 is live and you can use it as well. We are appreciating your feedback, feel free to raise issues or discussions.


**Usage**
`npm install nuka-carousel@5.0.2`
or
`yarn add nuka-carousel@5.0.2`

> Migration guide from v4 to v5 is under development, please raise any questions in the Issues tab of the repository.

**Demo**
- You can test nuka-carousel@5 default behaviour [here](https://nuka-carousel.vercel.app/)
```
  <Carousel>
    <img src="/image1.png" />
    <img src="/image2.png" />
    <img src="/image3.png" />
    <img src="/image4.png" />
    <img src="/image5.png" />
  </Carousel>
```

- Infinity nuka-carousel@5 with 3 slides to show. [link](https://nuka-carousel.vercel.app/?slides=6&params=%7B%22wrapAround%22:true,%22slidesToShow%22:3%7D)
```
  <Carousel
    wrapAround={true}
    slidesToShow={3}
  >
    <img src="/image1.png" />
    <img src="/image2.png" />
    <img src="/image3.png" />
    <img src="/image4.png" />
    <img src="/image5.png" />
  </Carousel> 
```

- You can play with `&params` url parameter to add or remove any carousel parameters and see how the carousel behaves. We are looking to build a proper documentation page with many examples and code snippets.

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
- SlidesToShow to support decimal numbers
- Easing


