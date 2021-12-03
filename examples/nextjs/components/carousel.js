import React, { useEffect, useRef, useState } from "react"

const Slide = ({ children, slideWidth, transition, index }) => {
  const [startNextAnimation, setStartNextAnimation] = useState(false)
  const [startPrevAnimation, setStarPrevAnimation] = useState(false)

  useEffect(() => {
    if (transition.move === 'next') {
      if (index === transition.currSlide) {

      }
      if (index === transition.nextSlide) {

      }
    }
    if (transition.move === 'prev') {
      if (index === transition.currSlide) {

      }
      if (index === transition.prevSlide) {

      }
    }

  }, [transition])

  return (
    <div style={{
      width: slideWidth,
      display: 'inline-block',
      transform: 'translate3d(0, 0, 0)',
    }}>
      {children}
    </div>
  )
}

const Carousel = ({ children }) => {
  const length = React.Children.count(children)
  const [trackWidth, setTrackWidth] = useState(`${100 * length}%`)
  const [slideWidth, setSlideWidth] = useState(`${100 / length}%`)
  const [transition, setTransition] = useState({
    currSlide: 0,
    nextSlide: 1,
    prevSlide: length - 1,
    move: null
  })
  const ref = useRef()

  useEffect(() => {
    console.log(ref.current.offsetWidth, 'width')
    setTrackWidth(`${ref.current.offsetWidth * length}px`)
    setSlideWidth(`${ref.current.offsetWidth}px`)
  }, [])

  const nextSlide = () => {

  }

  return (
    <>
      <button onClick={nextSlide}>Next</button>
      <div ref={ref} style={{
        overflow: 'hidden',
        width: '100%',
        border: '1px solid red',
      }}>
        <div style={{
          width: trackWidth,
        }}>
          {React.Children.map(children, (child, index) => {
            return (
              <Slide
                key={index}
                slideWidth={slideWidth}
                index={index}
                transition={transition}
              >
                {child}
              </Slide>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Carousel