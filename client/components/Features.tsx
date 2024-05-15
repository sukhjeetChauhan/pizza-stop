// import React from 'react';

const Container = ({ children }) => <div className="relative">{children}</div>

const SingleColumn = ({ children }) => (
  <div className="max-w-screen-xl mx-auto py-20 lg:py-24">{children}</div>
)

const HeadingInfoContainer = ({ children }) => (
  <div className="flex flex-col items-center">{children}</div>
)

const HeadingDescription = ({ children }) => (
  <p className="mt-4 font-medium text-gray-600 text-center max-w-sm">
    {children}
  </p>
)

const Content = ({ children }) => <div className="mt-16">{children}</div>

const Card = ({ children, reversed }) => (
  <div
    className={`mt-24 md:flex justify-center items-center ${
      reversed ? 'flex-row-reverse' : 'flex-row'
    }`}
  >
    {children}
  </div>
)

const Image = ({ imageSrc }) => (
  <div
    className="rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-cover bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-8"
    style={{ backgroundImage: `url("${imageSrc}")` }}
  />
)

const Details = ({ children }) => (
  <div className="mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8">
    {children}
  </div>
)

const Subtitle = ({ children }) => (
  <div className="font-bold tracking-wide text-secondary-100">{children}</div>
)

const Title = ({ children }) => (
  <h4 className="text-3xl font-bold text-gray-900">{children}</h4>
)

const Description = ({ children }) => (
  <p className="mt-2 text-sm leading-loose">{children}</p>
)

const Link = ({ href, children }) => (
  <a
    href={href}
    className="inline-block mt-4 text-sm text-primary-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500"
  >
    {children}
  </a>
)

const PopularEvents = () => {
  const cards = [
    {
      imageSrc:
        'https://images.unsplash.com/photo-1550699026-4114bbf4fb49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80',
      subtitle: 'Paid',
      title: 'Loachella, NYC',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      url: 'https://timerse.com',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1543423924-b9f161af87e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      subtitle: 'Free',
      title: 'Rock In Rio, Upstate',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      url: 'https://timerse.com',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=658&q=80',
      subtitle: 'Exclusive',
      title: 'Lollapalooza, Manhattan',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      url: 'https://timerse.com',
    },
  ]

  return (
    <Container>
      <SingleColumn>
        <HeadingInfoContainer>
          <h2>Popular Events</h2>
          <HeadingDescription>
            Here are some of the most popular events in New York City curated by
            professionals.
          </HeadingDescription>
        </HeadingInfoContainer>
        <Content>
          {cards.map((card, i) => (
            <Card key={i} reversed={i % 2 === 1}>
              <Image imageSrc={card.imageSrc} />
              <Details>
                <Subtitle>{card.subtitle}</Subtitle>
                <Title>{card.title}</Title>
                <Description>{card.description}</Description>
                <Link href={card.url}>See Event Details</Link>
              </Details>
            </Card>
          ))}
        </Content>
      </SingleColumn>
    </Container>
  )
}

export default PopularEvents
