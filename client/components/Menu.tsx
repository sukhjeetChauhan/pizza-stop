import Button from '../utils/Button'
import * as Components from '../utils/menuPageUtils'

import { Container, ContentWithPaddingXl } from '../utils/Containers'
import { useEffect, useRef, useState } from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Modal from '../components/Modal'

import { MenuItem } from '../../types/menu'
import CustomizedOrder from './CustomizedOrder'

interface MenuProp {
  data: MenuItem[]
  title: string
}

export default ({ data, title }: MenuProp) => {
  const menu: MenuItem[] = data
  console.log(menu)
  const [modalStatus, setModalStatus] = useState(false)
  const [modalData, setModalData] = useState<MenuItem>()
  const modalRef = useRef(null)
  useEffect(() => {
    if (modalRef.current) {
      modalStatus
        ? disableBodyScroll(modalRef.current)
        : enableBodyScroll(modalRef.current)
    }
  }, [modalStatus])

  function handleClick(data: MenuItem) {
    setModalStatus(true)
    console.log(data)
    setModalData(data)
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
            <h1 className="text-3xl font-bold">{title.toUpperCase()}</h1>
          </Components.HeaderRow>
          <div className="opacity-100 scale-100 flex mt-6 flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12">
            {menu.map((card, index) => (
              <div
                key={index}
                className="mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12"
              >
                <Components.Card
                  className="group"
                  // href={card.url}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <Components.CardImageContainer imagesrc="/images/about-us.webp">
                    {/* <Components.CardRatingContainer>
                      <Components.CardRating>
                        <Components.StarIcon />
                        {card.rating}
                      </Components.CardRating>
                      <Components.CardReview>
                        ({card.rating})
                      </Components.CardReview>
                    </Components.CardRatingContainer> */}
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
                        onClick={() => handleClick(card)}
                        className="bg-green-500 text-white p-4 text-sm"
                      >
                        Add to Cart
                      </Button>
                    </Components.CardHoverOverlay>
                  </Components.CardImageContainer>

                  <Components.CardText>
                    <Components.CardTitle>{card.name}</Components.CardTitle>
                    {/* <CardContent>{card.description}</CardContent> */}
                    <Components.CardPrice>{`$ ${
                      card.price ? card.price : (card.price_large as string)
                    }`}</Components.CardPrice>
                  </Components.CardText>
                </Components.Card>
              </div>
            ))}
          </div>
        </ContentWithPaddingXl>
        {/* <DecoratorBlob1 /> */}
        {/* <DecoratorBlob2 /> */}
      </Container>
    </div>
  )
}
