# Migration guide v4 to v5

### Improvements in v5

- **Support server-side rendering**. In v4 all of the slides are positioned with `position: absolute`, which doesn't render the slides appropriately when javascript is disabled and there are flickering when the front-end is hydrated. This forced users to hardcode properties for the carousel like `initialSlideHeight` and `initialSlideWidth`. In v5 all slides are positioned with dynamic width, so the slides and carousel can be fully responsive and rendered correctly on server as well.
- Rewritten the library with **TypeScript** and **React Hooks** for obvious reasons.
- **Reduce the size of the library and its dependencies**. v4 has 5 dependencies - `prop-types`, `d3-ease`, `wicg-inert`, `exenv` and `react-move`. We are looking to use only `d3-ease` in v5.1, but definitely after bumping the version of it to the latest. 
  - `prop-types` is replaced with usage of TypeScript.
  - `exenv` is not maintained anymore and is removed with v5 as a dependency of nuka-carousel.
  - `wicg-inert` doesn't have specified license, so we are going to remove it from our dependencies. [More info here](https://github.com/WICG/inert/issues/168). We are still supporting `inert` and we will have an example and more detailed documentation how you can use it with nuka-carousel v5.
  - `react-move` nothing personal, we just decided to go for our custom approach of animations in order to reduce the size of the library.
- **Fixed issues**. We fixed a lot of the issues that we have in v4. You can see the full list with fixed issues in our v5 project. [Link](https://github.com/FormidableLabs/nuka-carousel/projects/1)


### Depreceted v4 parameters

The following list of parameters are deprecated in v5. The main reason is that there is other approach which you can use to achieve the same thing, without increasing the complexity of the library. For example: `width` the width of the carousel can be easily manipulated by the parent container where developer placed the carousel. We are open for discussions if you really need some of these parameters. Feel free to raise an issue or start discussion in the repository, so we can help.

**autoGenerateStyleTag**
  > v4 documentation: *When set to true, it will generate a style tag to help ensure images are displayed properly. Set to false if you don't want or need the style tag generated.*
  
  This property basically add a style tag in the DOM with the following css
  ```
  .slider-slide > img { 
    width: 100%; 
    display: block;
  }
  .slider-slide > img:focus { 
    margin: auto; 
  }
  ```
  As the developers are controlling what it's in the slides, they can easily add such code if it's needed, it doesn't need to be in the library codebase. It's only adding coplexity.

**framePadding**
  > v4 documentation *Used to set the margin of the slider frame. Accepts any string dimension value such as "0px 20px" or "500px"*

  Such padding can be easily added via className or style property.

**getControlsContainerStyles**
  > v4 documentation *callback function to provide style to controls containers*

  We are trying to go away from providing style properties for every element in the carousel. Controls are customisable already. 

**height**
  > v4 documentation *Not documented*
  
  In v4 you can use the height property if you want to hardcode the height of the carousel. With the SSR support in v5 this is not needed. If you still want to restrict the height of the carousel, you can add wrapper div element with hardcode height or pass the height to the style property.

**heightMode**
  > v4 documentation *Change the height of the slides based either on the first slide, the current slide, or the maximum height of all slides. Overrides height set by initialSlideHeight*

  With the better support of SSR and rendering slides at all, we get rid of the heightMode property. If you still want to adapt the carousel to the height of the visible slides, you can use the new property `adaptiveHeight={true}`.

**initialSlideHeight**
  > v4 documentation *Initial height of the slides in pixels.*

  In v5 this property is obsolete, because we are supporting rendering the carousel on the server and doesn't need the developers to add `initialSlideHeight` or `initialSlideWidth` property.

**initialSlideWidth**
  > v4 documentation *Initial width of the slides in pixels*
  
  Same as above.

**slideOffset**
  > v4 documentation *While using prop animation = "zoom", you can configure space around current slide with slideOffset.*

  As the developers are controlling what it's in the slides, they can easily add a slide wrapper element and add some custom padding for example.

**slideWidth**
  > v4 documentation *Manually set slideWidth. If you want hard pixel widths, use a string like slideWidth="20px", and if you prefer a percentage of the container, use a decimal integer like slideWidth={0.8}*

  In v5 the width of the slide is generated dynamically depending on the slidesToShow property.

**transitionMode**
  > v4 documentation *Set the way slides transition from one to the next.*

  In v4 



**width**
  > v4 documentation *Used to hardcode the slider width. Accepts any string dimension value such as "80%" or "500px"*
  
  Same as `height` property. Developers can control the width of the carousel using wrapper parent element or className/style properties.
