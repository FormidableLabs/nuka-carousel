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
  const [animation, setAnimation] = useState(undefined);
  const [autoplay, setAutoplay] = useState(false);
  const [cellAlign, setCellAlign] = useState('left');
  const [cellSpacing, setCellSpacing] = useState(0);
  const [heightMode, setHeightMode] = useState('max');
  const [length, setLength] = useState(colors.length);
  const [scrollMode, setScrollMode] = useState('remainder');
  const [slideIndex, setSlideIndex] = useState(0);
  const [slidesToScroll, setSlidesToScroll] = useState(1);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [transitionMode, setTransitionMode] = useState('scroll');
  const [underlineHeader, setUnderlineHeader] = useState(false);
  const [withoutControls, setWithoutControls] = useState(false);
  const [wrapAround, setWrapAround] = useState(false);
  const [zoomScale, setZoomScale] = useState(0.5);

  const handleImageClick = useCallback(() => {
    setUnderlineHeader((prevUnderlineHeader) => !prevUnderlineHeader);
  }, []);

  const handleZoomScaleChange = useCallback((event) => {
    setZoomScale(event.target.value);
  }, []);

  const renderTopControls = (currentSlide) => {
    return (
      <div
        style={{
          fontFamily: 'Helvetica',
          color: '#fff',
          textDecoration: underlineHeader ? 'underline' : 'none'
        }}
      >
        Nuka Carousel: Slide {Math.ceil(currentSlide) + 1}
      </div>
    );
  };

  const slides = colors.slice(0, length).map((color, index) => (
    <img
      src={`https://via.placeholder.com/400/${color}/ffffff/&text=slide${
        index + 1
      }`}
      alt={`Slide ${index + 1}`}
      key={color}
      onClick={() => handleImageClick()}
      style={{
        height: heightMode === 'current' ? 100 * (index + 1) : 400
      }}
    />
  ));

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Nuka Carousel Demo</h2>
      <Carousel
        cellSpacing={cellSpacing}
        animation={animation}
        autoplay={autoplay}
        cellAlign={cellAlign}
        heightMode={heightMode}
        scrollMode={scrollMode}
        slideIndex={slideIndex}
        slideListMargin={0}
        slidesToScroll={slidesToScroll}
        slidesToShow={slidesToShow}
        transitionMode={transitionMode}
        withoutControls={withoutControls}
        wrapAround={wrapAround}
        zoomScale={Number(zoomScale || 0)}
        renderAnnounceSlideMessage={({ currentSlide, slideCount }) => {
          return `Showing slides ${currentSlide + 1} of ${slideCount}`;
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
            <button key={idx} onClick={() => setSlideIndex(idx)}>
              {idx + 1}
            </button>
          ))}
        </div>
        {slidesToShow > 1.0 && (
          <div>
            <button onClick={() => setCellAlign('left')}>Left</button>
            <button onClick={() => setCellAlign('center')}>Center</button>
            <button onClick={() => setCellAlign('right')}>Right</button>
          </div>
        )}
      </div>
      <div className="wrapper" style={{ padding: '0 40px' }}>
        <div
          style={{
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-around',
            height: '36px'
          }}
        >
          <button
            onClick={() =>
              setLength((prevLength) => (prevLength === 9 ? 3 : 9))
            }
          >
            Toggle Show 3 Slides Only
          </button>
          <button
            onClick={() =>
              setTransitionMode((prevTransitionMode) =>
                prevTransitionMode === 'fade' ? 'scroll' : 'fade'
              )
            }
          >
            Toggle Fade {transitionMode === 'fade' ? 'Off' : 'On'}
          </button>
          <button
            onClick={() => setWrapAround((prevWrapAround) => !prevWrapAround)}
          >
            Toggle Wrap Around: {wrapAround.toString()}
          </button>
          <button onClick={() => setAutoplay((prevAutoPlay) => !prevAutoPlay)}>
            Toggle Autoplay {autoplay === true ? 'Off' : 'On'}
          </button>
        </div>

        {transitionMode !== 'fade' && (
          <>
            <div
              style={{
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-around',
                height: '36px'
              }}
            >
              <button
                onClick={() => {
                  setSlidesToShow(slidesToShow === 3 ? 1 : 3);
                  setSlidesToScroll(slidesToScroll === 'auto' ? 1 : 'auto');
                }}
              >
                Toggle Drag Multiple{' '}
                {slidesToShow > 1 && slidesToScroll === 'auto' ? 'Off' : 'On'}
              </button>
              <button
                onClick={() =>
                  setSlidesToShow((prevSlidesToShow) =>
                    prevSlidesToShow > 1.0 ? 1.0 : 1.25
                  )
                }
              >
                Toggle Partially Visible Slides
              </button>
              <button
                onClick={() =>
                  setHeightMode((prevHeightMode) =>
                    prevHeightMode === 'current' ? 'max' : 'current'
                  )
                }
              >
                Toggle Height Mode: {heightMode}
              </button>
              <button
                onClick={() =>
                  setWithoutControls(
                    (prevWithoutControls) => !prevWithoutControls
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
              {animation === 'zoom' && (
                <input
                  type="number"
                  value={zoomScale}
                  onChange={handleZoomScaleChange}
                />
              )}
              <button
                onClick={() => {
                  setAnimation((prevAnimation) =>
                    prevAnimation === 'zoom' ? undefined : 'zoom'
                  );
                  setCellAlign('center');
                }}
              >
                Toggle Zoom Animation {animation === 'zoom' ? 'Off' : 'On'}
              </button>
              <button
                onClick={() => {
                  setSlidesToScroll((prevSlidesToScroll) =>
                    prevSlidesToScroll === 1 ? 2 : 1
                  );
                  setCellAlign('center');
                }}
              >
                Toggle SlidesToScroll {slidesToScroll === 1 ? 2 : 1}
              </button>
              <button
                onClick={() => {
                  setSlidesToShow((prevSlidesToShow) =>
                    prevSlidesToShow >= 3.0 ? 1.0 : prevSlidesToShow + 0.25
                  );
                }}
              >
                Increase Slides to Show: {slidesToShow}
              </button>
              <button
                onClick={() =>
                  setScrollMode((prevScrollMode) =>
                    prevScrollMode === 'remainder' ? 'page' : 'remainder'
                  )
                }
              >
                Toggle ScrollMode: {scrollMode}
              </button>
              <button
                onClick={() =>
                  setCellSpacing((prevCellSpacing) =>
                    prevCellSpacing > 0 ? 0 : 5
                  )
                }
              >
                Toggle Cellspacing {cellSpacing > 0 ? 'Off' : 'On'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

ReactDom.render(<App />, document.getElementById('content'));
