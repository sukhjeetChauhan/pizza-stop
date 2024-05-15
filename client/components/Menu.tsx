// import React, { useState } from "react";
import { motion } from 'framer-motion'
// import tw from 'twin.macro'
import styled from 'styled-components'
import Button from '../utils/Button'
// import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from '../utils/Containers'
// import { SectionHeading } from "components/misc/Headings.js";
// import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
// import { ReactComponent as StarIcon } from "images/star-icon.svg";
import SvgDecoratorBlob1 from 'images/svg-decorator-blob-5.svg'
import SvgDecoratorBlob2 from 'images/svg-decorator-blob-7.svg'
import { useState } from 'react'

interface PropImage {
  imageSrc: string
}

const HeaderRow = ({ children }) => (
  <div className="flex justify-between items-center flex-col xl:flex-row">
    {children}
  </div>
)

const TabsControl = ({ children }) => (
  <div className="flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0">
    {children}
  </div>
)

const TabControl = styled.div`
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.25rem;
  transition: background-color 300ms;
  text-align: center;

  &:hover {
    background-color: #d1d5db;
  }

  ${({ active }) =>
    active &&
    `
    background-color: #3b82f6;
    color: #ffffff;
  `}
`

const TabContent = ({ children }) => (
  <motion.div className="mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12">
    {children}
  </motion.div>
)

const CardContainer = ({ children }) => (
  <div className="mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12">
    {children}
  </div>
)

const Card = ({ children }) => (
  <a className="block bg-gray-300 rounded-b max-w-xs mx-auto">{children}</a>
)

const CardImageContainer = ({ imageSrc }) => (
  <div
    className="bg-cover bg-center h-56 xl:h-64 relative rounded-t"
    style={{ backgroundImage: `url(${imageSrc})` }}
  />
)

const CardRatingContainer = ({ children }) => (
  <div className="bg-gray-100 inline-flex bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end">
    {children}
  </div>
)

const CardRating = ({ children }) => (
  <div className="mr-1 text-sm font-bold flex items-end">
    {children}
    <svg
      className="w-4 h-4 fill-current text-orange-400 mr-1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93V15h2v4.93c-3.27-.47-6-3.2-6.47-6.47H7v2h4.47c.09.67.26 1.32.53 1.93zM17 12h-4l1.34-4H17V8h-3l-1 3H9.97L9 11H7v1h3l-1 3h3l1.34-4H17v-1z" />
    </svg>
  </div>
)

const CardHoverOverlay = ({ children }) => (
  <motion.div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
    {children}
  </motion.div>
)

const CardReview = ({ children }) => (
  <div className="font-medium text-xs text-gray-600">{children}</div>
)

const CardText = ({ children }) => (
  <div className="p-4 text-gray-900">{children}</div>
)

const CardTitle = ({ children }) => (
  <h5 className="text-lg font-semibold group-hover:text-primary-500">
    {children}
  </h5>
)

const CardContent = ({ children }) => (
  <p className="mt-1 text-sm font-medium text-gray-600">{children}</p>
)

const CardPrice = ({ children }) => (
  <p className="mt-4 text-xl font-bold">{children}</p>
)

const DecoratorBlob1 = () => (
  <img
    src={SvgDecoratorBlob1}
    className="pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400"
  />
)

const DecoratorBlob2 = () => (
  <img
    src={SvgDecoratorBlob2}
    className="pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500"
  />
)

export default ({
  heading = 'Checkout the Menu',
  tabs = {
    Starters: [
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
    ],
    Main: getRandomCards(),
    Soup: getRandomCards(),
    Desserts: getRandomCards(),
  },
}) => {
  /*
   * To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab
   * as the key and value of the key will be its content (as an array of objects).
   * To see what attributes are configurable of each object inside this array see the example above for "Starters".
   */
  const tabsKeys = Object.keys(tabs)
  const [activeTab, setActiveTab] = useState(tabsKeys[0])

  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <h1>{heading}</h1>
          <TabsControl>
            {Object.keys(tabs).map((tabName, index) => (
              <TabControl
                key={index}
                active={activeTab === tabName}
                onClick={() => setActiveTab(tabName)}
              >
                {tabName}
              </TabControl>
            ))}
          </TabsControl>
        </HeaderRow>

        {tabsKeys.map((tabKey, index) => (
          <TabContent
            key={index}
            variants={{
              current: {
                opacity: 1,
                scale: 1,
                display: 'flex',
              },
              hidden: {
                opacity: 0,
                scale: 0.8,
                display: 'none',
              },
            }}
            transition={{ duration: 0.4 }}
            initial={activeTab === tabKey ? 'current' : 'hidden'}
            animate={activeTab === tabKey ? 'current' : 'hidden'}
          >
            {tabs[tabKey].map((card, index) => (
              <CardContainer key={index}>
                <Card
                  className="group"
                  href={card.url}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <CardImageContainer imageSrc={card.imageSrc}>
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
                      <Button>Buy Now</Button>
                    </CardHoverOverlay>
                  </CardImageContainer>
                  <CardText>
                    <CardTitle>{card.title}</CardTitle>
                    <CardContent>{card.content}</CardContent>
                    <CardPrice>{card.price}</CardPrice>
                  </CardText>
                </Card>
              </CardContainer>
            ))}
          </TabContent>
        ))}
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  )
}

/* This function is only there for demo purposes. It populates placeholder cards */
const getRandomCards = () => {
  const cards = [
    {
      imageSrc:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
      title: 'Chicken Chilled',
      content: 'Chicken Main Course',
      price: '$5.99',
      rating: '5.0',
      reviews: '87',
      url: '#',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1582254465498-6bc70419b607?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
      title: 'Samsa Beef',
      content: 'Fried Mexican Beef',
      price: '$3.99',
      rating: '4.5',
      reviews: '34',
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
  ]

  // Shuffle array
  return cards.sort(() => Math.random() - 0.5)
}
