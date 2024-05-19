import { motion } from 'framer-motion'

import styled from 'styled-components'
import Button from '../utils/Button'

import { Container, ContentWithPaddingXl } from '../utils/Containers'

import { ReactNode } from 'react'
import { menuItem } from '../../types/menu'

interface CardImageContainerProps {
  imagesrc: string
}

interface Props {
  children: ReactNode
}

const HeaderRow: React.FC<Props> = ({ children }) => (
  <div className="flex justify-between items-center flex-col xl:flex-row">
    {children}
  </div>
)

const Card = styled(motion.a)`
  background-color: #edf2f7; /* Adjusted color to match Tailwind's bg-gray-200 */
  border-radius: 0.375rem;
  display: block;
  max-width: 20rem;
  margin: auto;

  @media (min-width: 640px) {
    max-width: none;
    margin-left: 0;
    margin-right: 0;
  }
`
const CardImageContainer = styled.div<CardImageContainerProps>`
  background-image: ${(props) => `url('${props.imagesrc}')`};
  height: 14rem; /* Equivalent to h-56 */
  @media (min-width: 1280px) {
    height: 16rem; /* Equivalent to xl:h-64 */
  }
  background-position: center;
  background-size: cover;
  position: relative;
  border-top-left-radius: 0.375rem; /* Equivalent to rounded-t */
  border-top-right-radius: 0.375rem; /* Equivalent to rounded-t */
`

const CardRatingContainer: React.FC<Props> = ({ children }) => (
  <div className="leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end">
    {children}
  </div>
)

const CardRating = styled.div`
  margin-right: 0.25rem; /* Equivalent to mr-1 */
  font-size: 0.875rem; /* Equivalent to text-sm */
  font-weight: 600; /* Equivalent to font-bold */
  display: flex;
  align-items: flex-end;

  svg {
    width: 1rem; /* Equivalent to w-4 */
    height: 1rem; /* Equivalent to h-4 */
    fill: #f59e0b; /* Equivalent to text-orange-400 */
    margin-right: 0.25rem; /* Equivalent to mr-1 */
  }
`

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CardReview: React.FC<Props> = ({ children }) => (
  <div className="font-medium text-xs text-gray-600">{children}</div>
)

const CardText: React.FC<Props> = ({ children }) => (
  <div className="p-4 text-gray-900">{children}</div>
)

const CardTitle: React.FC<Props> = ({ children }) => (
  <h5 className="text-lg font-semibold group-hover:text-primary-500">
    {children}
  </h5>
)

const CardContent: React.FC<Props> = ({ children }) => (
  <p className="mt-1 text-sm font-medium text-gray-600">{children}</p>
)

const CardPrice: React.FC<Props> = ({ children }) => (
  <p className="mt-4 text-xl font-bold">{children}</p>
)

const StarIcon = () => (
  <svg viewBox="0 0 1792 1792">
    <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5T1385 1619q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5T365 1569q0-6 2-20l86-500L89 695q-25-27-25-48 0-37 56-46l502-73L847 73q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" />
  </svg>
)

const menu: menuItem[] = [
  {
    imageSrc:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
    title: 'Veg Mixer',
    content: 'Tomato Salad & Carrot',
    price: '$5.99',
    rating: '5.0',
    reviews: '87',
    url: '#',
  },
  {
    imageSrc:
      'https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
    title: 'Macaroni',
    content: 'Cheese Pizza',
    price: '$2.99',
    rating: '4.8',
    reviews: '32',
    url: '#',
  },
  {
    imageSrc:
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327??ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
    title: 'Nelli',
    content: 'Hamburger & Fries',
    price: '$7.99',
    rating: '4.9',
    reviews: '89',
    url: '#',
  },
  {
    imageSrc:
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
    title: 'Jalapeno Poppers',
    content: 'Crispy Soyabeans',
    price: '$8.99',
    rating: '4.6',
    reviews: '12',
    url: '#',
  },
  {
    imageSrc:
      'https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
    title: 'Cajun Chicken',
    content: 'Roasted Chicken & Egg',
    price: '$7.99',
    rating: '4.2',
    reviews: '19',
    url: '#',
  },
  {
    imageSrc:
      'https://images.unsplash.com/photo-1550461716-dbf266b2a8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
    title: 'Chillie Cake',
    content: 'Deepfried Chicken',
    price: '$2.99',
    rating: '5.0',
    reviews: '61',
    url: '#',
  },
  {
    imageSrc:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
    title: 'Guacamole Mex',
    content: 'Mexican Chilli',
    price: '$3.99',
    rating: '4.2',
    reviews: '95',
    url: '#',
  },
  {
    imageSrc:
      'https://images.unsplash.com/photo-1565310022184-f23a884f29da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
    title: 'Carnet Nachos',
    content: 'Chilli Crispy Nachos',
    price: '$3.99',
    rating: '3.9',
    reviews: '26',
    url: '#',
  },
]

export default ({ heading = 'Checkout the Menu' }) => {
  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <h1>{heading}</h1>
        </HeaderRow>
        <div className="opacity-100 scale-100 flex mt-6 flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12">
          {menu.map((card, index) => (
            <div
              key={index}
              className="mt-10 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 sm:pr-10 md:pr-6 lg:pr-12"
            >
              <Card
                className="group"
                href={card.url}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <CardImageContainer imagesrc={card.imageSrc}>
                  <CardRatingContainer>
                    <CardRating>
                      <StarIcon />
                      {card.rating}
                    </CardRating>
                    <CardReview>({card.reviews})</CardReview>
                  </CardRatingContainer>
                  <CardHoverOverlay
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
                    <Button className="bg-green-500 text-white p-4 text-sm">
                      Buy Now
                    </Button>
                  </CardHoverOverlay>
                </CardImageContainer>

                <CardText>
                  <CardTitle>{card.title}</CardTitle>
                  <CardContent>{card.content}</CardContent>
                  <CardPrice>{card.price}</CardPrice>
                </CardText>
              </Card>
            </div>
          ))}
        </div>
      </ContentWithPaddingXl>
      {/* <DecoratorBlob1 /> */}
      {/* <DecoratorBlob2 /> */}
    </Container>
  )
}
