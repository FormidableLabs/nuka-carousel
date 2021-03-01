import React, { useState, useCallback } from 'react';
import Carousel from '../src/index';
import ReactDom from 'react-dom';

// eslint-disable-next-line complexity
export default function App() {
  const colors = [
    '7732bb',
    '047cc0',
    '00884b',
    'e3bc13',
    'db7c00',
    'aa231f',
    'e3bc13',
    'db7c00',
    'aa231f'
  ];

  const [carouselState, setCarouselState] = useState({
    animation: undefined,
    autoplay: false,
    cellAlign: 'left',
    cellSpacing: 0,
    heightMode: 'max',
    length: colors.length,
    scrollMode: 'remainder',
    slideIndex: 0,
    slidesToScroll: 1,
    slidesToShow: 1,
    transitionMode: 'scroll',
    underlineHeader: false,
    withoutControls: false,
    wrapAround: false,
    zoomScale: 0.5
  });

  const handleImageClick = useCallback((index) => {
    // eslint-disable-next-line no-alert
    window.alert(`Slide ${index + 1} clicked`);
  }, []);

  const handleZoomScaleChange = useCallback((event) => {
    setCarouselState({ ...carouselState, zoomScale: event.target.value });
  }, []);

  const renderTopControls = (currentSlide) => (
    <div
      style={{
        fontFamily: 'Helvetica',
        color: '#fff',
        textDecoration: carouselState.underlineHeader ? 'underline' : 'none'
      }}
    >
      Nuka Carousel: Slide {Math.ceil(currentSlide) + 1}
    </div>
  );

  const slides = colors.slice(0, carouselState.length).map((color, index) => (
    <img
      src={`https://via.placeholder.com/400/${color}/ffffff/&text=slide${
        index + 1
      }`}
      alt={`Slide ${index + 1}`}
      key={color}
      onClick={() => handleImageClick(index)}
      style={{
        height: carouselState.heightMode === 'current' ? 100 * (index + 1) : 400
      }}
    />
  ));

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Nuka Carousel Demo</h2>
      <Carousel
        cellSpacing={carouselState.cellSpacing}
        animation={carouselState.animation}
        autoplay={carouselState.autoplay}
        cellAlign={carouselState.cellAlign}
        heightMode={carouselState.heightMode}
        scrollMode={carouselState.scrollMode}
        slideIndex={carouselState.slideIndex}
        slideListMargin={0}
        slidesToScroll={carouselState.slidesToScroll}
        slidesToShow={carouselState.slidesToShow}
        transitionMode={carouselState.transitionMode}
        withoutControls={carouselState.withoutControls}
        wrapAround={carouselState.wrapAround}
        zoomScale={Number(carouselState.zoomScale || 0)}
        renderAnnounceSlideMessage={({ currentSlide, slideCount }) => {
          return `Showing slide ${currentSlide + 1} of ${slideCount}`;
        }}
        renderTopCenterControls={({ currentSlide }) =>
          renderTopControls(currentSlide)
        }
      >
        {slides}
      </Carousel>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          margin: '10px 0'
        }}
      >
        <div>
          {slides.map((slide, idx) => (
            <button
              key={idx}
              onClick={() =>
                setCarouselState({ ...carouselState, slideIndex: idx })
              }
            >
              {idx + 1}
            </button>
          ))}
        </div>
        {carouselState.slidesToShow > 1.0 && (
          <div>
            <button
              onClick={() =>
                setCarouselState({ ...carouselState, cellAlign: 'left' })
              }
            >
              Left
            </button>
            <button
              onClick={() =>
                setCarouselState({ ...carouselState, cellAlign: 'center' })
              }
            >
              Center
            </button>
            <button
              onClick={() =>
                setCarouselState({ ...carouselState, cellAlign: 'right' })
              }
            >
              Right
            </button>
          </div>
        )}
      </div>
      <div className="wrapper" style={{ padding: '0 40px' }}>
        <div
          style={{
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-around',
            height: '100%'
          }}
        >
          <button
            onClick={() =>
              setCarouselState(({ length: prevLength }) => ({
                ...carouselState,
                length: prevLength === 9 ? 3 : 9
              }))
            }
          >
            {carouselState.length === 9
              ? 'Show 3 Slides Only'
              : 'Show 9 Slides'}
          </button>
          <button
            onClick={() =>
              setCarouselState(({ transitionMode: prevTransitionMode }) => ({
                ...carouselState,
                transitionMode:
                  prevTransitionMode === 'fade' ? 'scroll' : 'fade'
              }))
            }
          >
            Toggle Fade {carouselState.transitionMode === 'fade' ? 'Off' : 'On'}
          </button>
          <button
            onClick={() =>
              setCarouselState(({ wrapAround: prevWrapAround }) => ({
                ...carouselState,
                wrapAround: !prevWrapAround
              }))
            }
          >
            Toggle Wrap Around: {carouselState.wrapAround.toString()}
          </button>
          <button
            onClick={() =>
              setCarouselState(({ autoplay: prevAutoPlay }) => ({
                ...carouselState,
                autoplay: !prevAutoPlay
              }))
            }
          >
            Toggle Autoplay: {carouselState.autoplay === true ? 'Off' : 'On'}
          </button>
        </div>

        {carouselState.transitionMode !== 'fade' && (
          <>
            <div
              style={{
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-around',
                height: '100%'
              }}
            >
              <button
                onClick={() => {
                  setCarouselState({
                    ...carouselState,
                    slidesToShow: carouselState.slidesToShow === 3 ? 1 : 3,
                    slidesToScroll:
                      carouselState.slidesToScroll === 'auto' ? 1 : 'auto'
                  });
                }}
              >
                Toggle Drag Multiple{' '}
                {carouselState.slidesToShow > 1 &&
                carouselState.slidesToScroll === 'auto'
                  ? 'Off'
                  : 'On'}
              </button>
              <button
                onClick={() =>
                  setCarouselState(({ slidesToShow: prevSlidesToShow }) => ({
                    ...carouselState,
                    slidesToShow: prevSlidesToShow > 1.0 ? 1.0 : 1.25
                  }))
                }
              >
                Toggle Partially Visible Slides
              </button>
              <button
                onClick={() =>
                  setCarouselState(({ heightMode: prevHeightMode }) => ({
                    ...carouselState,
                    heightMode: prevHeightMode === 'current' ? 'max' : 'current'
                  }))
                }
              >
                Toggle Height Mode: {carouselState.heightMode}
              </button>
              <button
                onClick={() =>
                  setCarouselState(
                    ({ withoutControls: prevWithoutControls }) => ({
                      ...carouselState,
                      withoutControls: !prevWithoutControls
                    })
                  )
                }
              >
                Toggle Controls
              </button>
            </div>
            <div
              style={{
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-around'
              }}
            >
              {carouselState.animation === 'zoom' && (
                <input
                  type="number"
                  value={carouselState.zoomScale}
                  onChange={handleZoomScaleChange}
                />
              )}
              <button
                onClick={() => {
                  setCarouselState(({ animation: prevAnimation }) => ({
                    ...carouselState,
                    animation: prevAnimation === 'zoom' ? undefined : 'zoom',
                    cellAlign: 'center'
                  }));
                }}
              >
                Toggle Zoom Animation{' '}
                {carouselState.animation === 'zoom' ? 'Off' : 'On'}
              </button>
              <button
                onClick={() => {
                  setCarouselState(
                    ({ slidesToScroll: prevSlidesToScroll }) => ({
                      ...carouselState,
                      slidesToScroll: prevSlidesToScroll === 1 ? 2 : 1,
                      cellAlign: 'center'
                    })
                  );
                }}
              >
                Toggle SlidesToScroll{' '}
                {carouselState.slidesToScroll === 1 ? 2 : 1}
              </button>
              <button
                onClick={() => {
                  setCarouselState(({ slidesToShow: prevSlidesToShow }) => ({
                    ...carouselState,
                    slidesToShow:
                      prevSlidesToShow >= 3.0 ? 1.0 : prevSlidesToShow + 0.25
                  }));
                }}
              >
                Increase Slides to Show: {carouselState.slidesToShow}
              </button>
              <button
                onClick={() =>
                  setCarouselState(({ scrollMode: prevScrollMode }) => ({
                    ...carouselState,
                    scrollMode:
                      prevScrollMode === 'remainder' ? 'page' : 'remainder'
                  }))
                }
              >
                Toggle ScrollMode: {carouselState.scrollMode}
              </button>
              <button
                onClick={() =>
                  setCarouselState(({ cellSpacing: prevCellSpacing }) => ({
                    ...carouselState,
                    cellSpacing: prevCellSpacing > 0 ? 0 : 25
                  }))
                }
              >
                Toggle Cell Spacing:{' '}
                {carouselState.cellSpacing > 0 ? 'Off' : 'On'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

ReactDom.render(<App />, document.getElementById('content'));
