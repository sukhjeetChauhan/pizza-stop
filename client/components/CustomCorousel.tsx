import { useState, useEffect } from 'react'
import { MenuItem } from '../../types/menu'
import '../styles/CustomCorousel.css'
// import { Data } from '../models/models'

// type ShowModalFunction = (data: Data) => void

interface CustomCarouselProps {
  data: MenuItem[] // Specify the type for the 'data' prop
  // showModal: ShowModalFunction // Specify the type for the 'showModal' prop
}

function CustomCarousel({ data }: CustomCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideDone, setSlideDone] = useState(true)
  const [timeID, setTimeID] = useState(0)

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false)
      setTimeID(
        setTimeout(() => {
          slideNext()
          setSlideDone(true)
        }, 5000)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideDone])

  const slideNext = () => {
    setActiveIndex((val) => {
      if (val >= data.length - 1) {
        return 0
      } else {
        return val + 1
      }
    })
  }

  const slidePrev = () => {
    setActiveIndex((val) => {
      if (val <= 0) {
        return data.length - 1
      } else {
        return val - 1
      }
    })
  }

  const AutoPlayStop = () => {
    if (timeID > 0) {
      clearTimeout(timeID)
      // setTimeID(0)

      setSlideDone(false)
    }
  }

  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true)
    }
  }

  return (
    <div
      className="container__slider"
      onMouseEnter={AutoPlayStop}
      onMouseLeave={AutoPlayStart}
    >
      {data.map((product, index) => {
        return (
          <div
            className={'slider__item slider__item-active-' + (activeIndex + 1)}
            key={index}
          >
            <div key={`${product.name} ${index}`} className="product-container">
              <button
                className="product-btn"
                // onClick={() => showModal(product)}
              >
                <img key={index} src={product.imgUrl} alt={product.name} />
              </button>
            </div>
          </div>
        )
      })}

      <button
        className="slider__btn-next"
        onClick={(e) => {
          e.preventDefault()
          slideNext()
        }}
      >
        {'>'}
      </button>
      <button
        className="slider__btn-prev"
        onClick={(e) => {
          e.preventDefault()
          slidePrev()
        }}
      >
        {'<'}
      </button>
    </div>
  )
}

export default CustomCarousel
