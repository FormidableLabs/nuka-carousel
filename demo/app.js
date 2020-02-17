import React, { useState, useCallback } from 'react';
import Carousel from '../src/index';
import ReactDom from 'react-dom';

export default function App() {
  const colors = ['7732bb', '047cc0', '00884b', 'e3bc13', 'db7c00', 'aa231f'];
  const [animation, setAnimation] = useState(undefined);
  const [autoplay, setAutoplay] = useState(false);
  const [cellAlign, setCellAlign] = useState('left');
  const [heightMode, setHeightMode] = useState('max');
  const [length, setLength] = useState(6);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slidesToScroll, setSlidesToScroll] = useState('auto');
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [transitionMode, setTransitionMode] = useState('scroll');
  const [underlineHeader, setUnderlineHeader] = useState(false);
  const [withoutControls, setWithoutControls] = useState(false);
  const [wrapAround, setWrapAround] = useState(false);
  const [zoomScale, setZoomScale] = useState(0.5);

  const handleImageClick = useCallback(() => {
    setUnderlineHeader(prevUnderlineHeader => !prevUnderlineHeader);
  }, []);

  const handleZoomScaleChange = useCallback(event => {
    setZoomScale(event.target.value);
  }, []);

  const renderTopControls = currentSlide => {
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
      src={`https://via.placeholder.com/400/${color}/ffffff/&text=slide${index +
        1}`}
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
      <Carousel
        animation={animation}
        autoplay={autoplay}
        cellAlign={cellAlign}
        heightMode={heightMode}
        slideIndex={slideIndex}
        slideListMargin={0}
        slidesToScroll={slidesToScroll}
        slidesToShow={slidesToShow}
        transitionMode={transitionMode}
        withoutControls={withoutControls}
        wrapAround={wrapAround}
        zoomScale={Number(zoomScale || 0)}
        renderAnnounceSlideMessage={({ currentSlide, slideCount }) => {
          return `Showing slide ${currentSlide + 1} of ${slideCount}`;
        }}
        renderTopCenterControls={({ currentSlide }) =>
          renderTopControls(currentSlide)
        }
      >
        {slides}
      </Carousel>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <button onClick={() => setSlideIndex(0)}>1</button>
          <button onClick={() => setSlideIndex(1)}>2</button>
          <button onClick={() => setSlideIndex(2)}>3</button>
          <button onClick={() => setSlideIndex(3)}>4</button>
          <button onClick={() => setSlideIndex(4)}>5</button>
          <button onClick={() => setSlideIndex(5)}>6</button>
        </div>
        <div>
          <button
            onClick={() => setLength(prevLength => (prevLength === 6 ? 3 : 6))}
          >
            Toggle Show 3 Slides Only
          </button>
          <button
            onClick={() =>
              setTransitionMode(prevTransitionMode =>
                prevTransitionMode === 'fade' ? 'scroll' : 'fade'
              )
            }
          >
            Toggle Fade {transitionMode === 'fade' ? 'Off' : 'On'}
          </button>
          <button
            onClick={() => setWrapAround(prevWrapAround => !prevWrapAround)}
          >
            Toggle Wrap Around
          </button>
          <button onClick={() => setAutoplay(prevAutoPlay => !prevAutoPlay)}>
            Toggle Autoplay {autoplay === true ? 'Off' : 'On'}
          </button>
        </div>
      </div>
      {transitionMode !== 'fade' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {slidesToShow > 1.0 && (
              <div>
                <button onClick={() => setCellAlign('left')}>Left</button>
                <button onClick={() => setCellAlign('center')}>Center</button>
                <button onClick={() => setCellAlign('right')}>Right</button>
              </div>
            )}
            <div style={{ marginLeft: 'auto' }}>
              <button
                onClick={() =>
                  setSlidesToShow(prevSlidesToShow =>
                    prevSlidesToShow > 1.0 ? 1.0 : 1.25
                  )
                }
              >
                Toggle Partially Visible Slides
              </button>
              <button
                onClick={() =>
                  setHeightMode(prevHeightMode =>
                    prevHeightMode === 'current' ? 'max' : 'current'
                  )
                }
              >
                Toggle Height Mode Current
              </button>
              <button
                onClick={() =>
                  setWithoutControls(
                    prevWithoutControls => !prevWithoutControls
                  )
                }
              >
                Toggle Controls
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {animation === 'zoom' && (
              <input
                type="number"
                value={zoomScale}
                onChange={handleZoomScaleChange}
              />
            )}
            <button
              onClick={() => {
                setAnimation(prevAnimation =>
                  prevAnimation === 'zoom' ? undefined : 'zoom'
                );
                setCellAlign('center');
              }}
            >
              Toggle Zoom Animation {animation === 'zoom' ? 'Off' : 'On'}
            </button>
            <button
              onClick={() => {
                setSlidesToScroll(prevSlidesToScroll =>
                  prevSlidesToScroll === 1 ? 2 : 1
                );
                setCellAlign('center');
              }}
            >
              Toggle SlidesToScroll {slidesToScroll === 1 ? 2 : 1}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

ReactDom.render(<App />, document.getElementById('content'));
