import { useState, useEffect, useContext } from 'react'
import { MenuItem } from '../../types/menu'
import '../styles/CustomCorousel.css'
import Button from '../utils/Button'
import { CartContext } from '../Providers/CartProvider'
// import { Data } from '../models/models'

// type ShowModalFunction = (data: Data) => void

interface CustomCarouselProps {
  data: MenuItem[] // Specify the type for the 'data' prop
  // showModal: ShowModalFunction // Specify the type for the 'showModal' prop
}

function CustomCarousel({ data }: CustomCarouselProps) {
  const cart = useContext(CartContext)
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideDone, setSlideDone] = useState(true)
  const [timeID, setTimeID] = useState<number | null>(null)

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false)
      const timeoutId = setTimeout(() => {
        slideNext()
        setSlideDone(true)
      }, 5000)
      setTimeID(timeoutId as unknown as number)
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
    if ((timeID as number) > 0) {
      clearTimeout(timeID as number)
      // setTimeID(0)

      setSlideDone(false)
    }
  }

  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true)
    }
  }
  if (data) {
    return (
      <div
        className="container__slider"
        onMouseEnter={AutoPlayStop}
        onMouseLeave={AutoPlayStart}
      >
        {data.map((product, index) => {
          return (
            <div
              className={
                'slider__item slider__item-active-' + (activeIndex + 1)
              }
              key={index}
            >
              <div key={`${product.name} ${index}`} className="max-w-full flex">
                <div className="w-1/3">
                  <img
                    key={index}
                    src={product.imgUrl}
                    alt={product.name}
                    className="w-full h-full"
                  />
                </div>
                <div className="bg-lime-50 w-2/3 flex items-center">
                  <div className="w-2/3">
                    <p className="text-sm font-medium p-2 min-w-full">
                      {product.name}
                    </p>
                    <p className="p-2 text-sm">{product.price}</p>
                  </div>
                  <div className="mt-2 ">
                    <Button
                      onClick={() => cart.addToCart(product)}
                      className="bg-limeGreen p-2 text-white text-sm"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <button
          className="slider__btn-next text-limeGreen font-bold "
          onClick={(e) => {
            e.preventDefault()
            slideNext()
          }}
        >
          {'>'}
        </button>
        <button
          className="slider__btn-prev text-limeGreen font-bold"
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
}

export default CustomCarousel
