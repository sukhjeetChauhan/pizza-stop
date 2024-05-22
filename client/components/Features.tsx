// import React from 'react';

import { ReactNode } from 'react'

interface ChildrenProps {
  children: ReactNode
}
interface ImageContainer {
  imageSrc: string
}

interface Card extends ChildrenProps {
  reversed: boolean
  key: string
}

const Container: React.FC<ChildrenProps> = ({ children }) => (
  <div className="relative">{children}</div>
)

const SingleColumn: React.FC<ChildrenProps> = ({ children }) => (
  <div className="max-w-screen-xl mx-auto py-20 lg:py-24">{children}</div>
)

const HeadingInfoContainer: React.FC<ChildrenProps> = ({ children }) => (
  <div className="flex flex-col items-center">{children}</div>
)

const HeadingDescription: React.FC<ChildrenProps> = ({ children }) => (
  <p className="mt-4 font-medium text-gray-600 text-base text-center max-w-sm">
    {children}
  </p>
)

const Content: React.FC<ChildrenProps> = ({ children }) => (
  <div className="mt-16">{children}</div>
)

const Card: React.FC<Card> = ({ children, reversed, key }) => (
  <div
    key={key}
    className={`mt-24 md:flex justify-center items-center ${
      reversed ? 'flex-row-reverse' : 'flex-row'
    }`}
  >
    {children}
  </div>
)

const Image: React.FC<ImageContainer> = ({ imageSrc }) => (
  <div
    className="rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-cover bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-8"
    style={{ backgroundImage: `url("${imageSrc}")` }}
  />
)

const Details: React.FC<ChildrenProps> = ({ children }) => (
  <div className="mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8">
    {children}
  </div>
)

// const Subtitle: React.FC<ChildrenProps> = ({ children }) => (
//   <div className="font-bold tracking-wide text-secondary-100">{children}</div>
// )

// const Title: React.FC<ChildrenProps> = ({ children }) => (
//   <h4 className="text-3xl font-bold text-gray-900">{children}</h4>
// )

const Description: React.FC<ChildrenProps> = ({ children }) => (
  <p className="mt-2 text-sm leading-loose">{children}</p>
)

// const Link = ({ href, children }) => (
//   <a
//     href={href}
//     className="inline-block mt-4 text-sm text-primary-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500"
//   >
//     {children}
//   </a>
// )

const PopularEvents = () => {
  const cards = [
    {
      imageSrc: '/images/about-us.webp',
      subtitle: 'Paid',
      title: 'Loachella, NYC',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      imageSrc: '/images/klara-kulikova-QATxlTPJImo-unsplash.jpg',
      subtitle: 'Free',
      title: 'Rock In Rio, Upstate',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      imageSrc: '/images/roberto-valdivia-rcUw6b4iYe0-unsplash.jpg',
      subtitle: 'Exclusive',
      title: 'Lollapalooza, Manhattan',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ]

  return (
    <Container>
      <SingleColumn>
        <HeadingInfoContainer>
          <h2 className="text-4xl font-bold">About Us</h2>
          <HeadingDescription>
            Here are some reasons why you should choose us.
          </HeadingDescription>
        </HeadingInfoContainer>
        <Content>
          {cards.map((card, i) => (
            <Card key={i.toString()} reversed={i % 2 === 1}>
              <Image imageSrc={card.imageSrc} />
              <Details>
                {/* <Subtitle>{card.subtitle}</Subtitle> */}
                {/* <Title>{card.title}</Title> */}
                <Description>{card.description}</Description>
              </Details>
            </Card>
          ))}
        </Content>
      </SingleColumn>
    </Container>
  )
}

export default PopularEvents
