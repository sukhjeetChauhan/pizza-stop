import Button from '../utils/Button'
import * as Components from '../utils/menuPageUtils'
import { Container, ContentWithPaddingXl } from '../utils/Containers'
import { useEffect, useRef, useState } from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Modal from '../components/Modal'
import { useContext } from 'react'
import { CartContext } from './CartProvider'
import { MenuItem } from '../../types/menu'
import CustomizedOrder from './CustomizedOrder'

interface MenuProp {
  data: MenuItem[]
  title: string
  type: string
}

export default ({ data, title, type }: MenuProp) => {
  const menu: MenuItem[] = data
  const cart = useContext(CartContext)
  const [modalStatus, setModalStatus] = useState(false)
  const [modalData, setModalData] = useState<MenuItem>()
  const modalRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [touchActive, setTouchActive] = useState(false)

  useEffect(() => {
    if (modalRef.current) {
      modalStatus
        ? disableBodyScroll(modalRef.current)
        : enableBodyScroll(modalRef.current)
    }
  }, [modalStatus])

  const cardWidth =
    title === 'deals'
      ? 'sm:w-1/2 md:w-1/2 lg:w-1/2'
      : 'w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4' // set card width based on type of menu

  function handleClick(data: MenuItem, index: number) {
    if (
      type === 'pizzas' ||
      type === 'deals' ||
      data.name === 'Loaded Fries' ||
      data.name === 'Loaded Wedges'
    ) {
      setModalStatus(true)
      setModalData(data)
      if (hoveredIndex === index) {
        setHoveredIndex(null)
      }
    } else {
      cart.addToCart(data)
    }
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  const handleTouchStart = (index: number) => {
    setTouchActive(true)
    setHoveredIndex(index) // Toggle on
  }

  function handleTouchState() {
    setHoveredIndex(null)
    setTouchActive(false)
  }

  return (
    <div ref={modalRef}>
      {modalStatus && (
        <div className="fixed top-0 left-0 z-10 h-screen w-screen bg-gray-800 opacity-50"></div>
      )}
      {modalStatus && (
        <Modal>
          <CustomizedOrder
            data={modalData as MenuItem}
            setModalStatus={setModalStatus}
          />
        </Modal>
      )}
      <Container>
        <ContentWithPaddingXl>
          <Components.HeaderRow>
            <h1 className="text-5xl font-bold text-red-600 font-caveat">
              {title.toUpperCase()}
            </h1>
          </Components.HeaderRow>
          <div className="opacity-100 scale-100 flex  justify-start md:justify-start mt-6 flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12">
            {menu?.map((card, index) => (
              <div
                key={index}
                className={`mt-10 ${cardWidth} pr-6 sm:pr-10 md:pr-6 lg:pr-12`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onTouchStart={() => handleTouchStart(index)}
              >
                <Components.Card
                  className="group"
                  initial="visible"
                  animate={hoveredIndex === index ? 'hover' : 'rest'}
                  variants={{
                    hover: {
                      opacity: 1,
                      height: 'auto',
                    },
                    rest: {
                      opacity: 1, // Make sure the card is visible by default
                      height: 'auto', // Keep height auto to ensure it's not zero
                    },
                  }}
                >
                  <Components.CardImageContainer imagesrc={card.imgUrl}>
                    <Components.CardHoverOverlay
                      variants={{
                        hover: {
                          opacity: 1,
                          height: 'auto',
                        },
                        rest: {
                          opacity: 0,
                          height: 0,
                        },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        onClick={() => handleClick(card, index)}
                        className="bg-limeGreen text-white p-4 text-sm"
                      >
                        Add to Cart
                      </Button>
                      {touchActive && (
                        <button
                          className="mt-8 font-bold bg-slate-500 bg-opacity-80 text-white uppercase text-lg px-2 py-2 w-36 rounded  focus:outline-none shadow"
                          onClick={() => handleTouchState()}
                        >
                          Close
                        </button>
                      )}
                    </Components.CardHoverOverlay>
                  </Components.CardImageContainer>
                  <Components.CardText>
                    <Components.CardTitle>{card.name}</Components.CardTitle>
                    {card.type === 'deals' && <p>{card.description}</p>}
                    <Components.CardPrice>{`$ ${
                      card.price ? card.price : (card.price_large as string)
                    }`}</Components.CardPrice>
                  </Components.CardText>
                </Components.Card>
              </div>
            ))}
          </div>
        </ContentWithPaddingXl>
      </Container>
    </div>
  )
}
