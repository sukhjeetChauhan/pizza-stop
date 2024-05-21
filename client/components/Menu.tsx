import Button from '../utils/Button'
import * as Components from '../utils/menuPageUtils'

import { Container, ContentWithPaddingXl } from '../utils/Containers'
import { useEffect, useRef, useState } from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Modal from '../components/Modal'

import { menuItem, MenuItem } from '../../types/menu'
import CustomizedOrder from './CustomizedOrder'
// import { useParams } from 'react-router-dom'

// const menu: menuItem[] = [
//   {
//     imageSrc:
//       'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
//     title: 'Veg Mixer',
//     content: 'Tomato Salad & Carrot',
//     price: '$5.99',
//     rating: '5.0',
//     reviews: '87',
//     url: '#',
//   },
//   {
//     imageSrc:
//       'https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
//     title: 'Macaroni',
//     content: 'Cheese Pizza',
//     price: '$2.99',
//     rating: '4.8',
//     reviews: '32',
//     url: '#',
//   },
//   {
//     imageSrc:
//       'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327??ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
//     title: 'Nelli',
//     content: 'Hamburger & Fries',
//     price: '$7.99',
//     rating: '4.9',
//     reviews: '89',
//     url: '#',
//   },
//   {
//     imageSrc:
//       'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
//     title: 'Jalapeno Poppers',
//     content: 'Crispy Soyabeans',
//     price: '$8.99',
//     rating: '4.6',
//     reviews: '12',
//     url: '#',
//   },
//   {
//     imageSrc:
//       'https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
//     title: 'Cajun Chicken',
//     content: 'Roasted Chicken & Egg',
//     price: '$7.99',
//     rating: '4.2',
//     reviews: '19',
//     url: '#',
//   },
//   {
//     imageSrc:
//       'https://images.unsplash.com/photo-1550461716-dbf266b2a8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
//     title: 'Chillie Cake',
//     content: 'Deepfried Chicken',
//     price: '$2.99',
//     rating: '5.0',
//     reviews: '61',
//     url: '#',
//   },
//   {
//     imageSrc:
//       'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
//     title: 'Guacamole Mex',
//     content: 'Mexican Chilli',
//     price: '$3.99',
//     rating: '4.2',
//     reviews: '95',
//     url: '#',
//   },
//   {
//     imageSrc:
//       'https://images.unsplash.com/photo-1565310022184-f23a884f29da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
//     title: 'Carnet Nachos',
//     content: 'Chilli Crispy Nachos',
//     price: '$3.99',
//     rating: '3.9',
//     reviews: '26',
//     url: '#',
//   },
// ]

export default ({ heading = 'Checkout the Menu', data }) => {
  const menu: MenuItem[] = data
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
            <h1>{heading}</h1>
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
                  <Components.CardImageContainer imagesrc={card.imgUrl}>
                    <Components.CardRatingContainer>
                      <Components.CardRating>
                        <Components.StarIcon />
                        {card.rating}
                      </Components.CardRating>
                      <Components.CardReview>
                        ({card.rating})
                      </Components.CardReview>
                    </Components.CardRatingContainer>
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
                        Buy Now
                      </Button>
                    </Components.CardHoverOverlay>
                  </Components.CardImageContainer>

                  <Components.CardText>
                    <Components.CardTitle>{card.name}</Components.CardTitle>
                    {/* <CardContent>{card.content}</CardContent> */}
                    <Components.CardPrice>{card.price}</Components.CardPrice>
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
