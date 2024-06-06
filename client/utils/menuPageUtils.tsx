import { ReactNode } from 'react'
import { motion } from 'framer-motion'

import styled from 'styled-components'

interface CardImageContainerProps {
  imagesrc: string
}

interface Props {
  children: ReactNode
}

export const HeaderRow: React.FC<Props> = ({ children }) => (
  <div className="flex justify-between items-center flex-col xl:flex-row">
    {children}
  </div>
)

export const Card = styled(motion.a)`
  background-color: #edf2f7; /* Adjusted color to match Tailwind's bg-gray-200 */
  border-radius: 0.375rem;
  overflow: hidden;
  display: block;
  max-width: 20rem;
  margin: auto;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  @media (min-width: 640px) {
    max-width: none;
    margin-left: 0;
    margin-right: 0;
  }
`
export const CardImageContainer = styled.div<CardImageContainerProps>`
  background-image: ${(props) => `url('${props.imagesrc}')`};
  height: 14rem; /* Equivalent to h-56 */
  @media (min-width: 1280px) {
    height: 16rem; /* Equivalent to xl:h-64 */
  }
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  border-top-left-radius: 0.375rem; /* Equivalent to rounded-t */
  border-top-right-radius: 0.375rem; /* Equivalent to rounded-t */
`

export const CardRatingContainer: React.FC<Props> = ({ children }) => (
  <div className="leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end">
    {children}
  </div>
)

export const CardRating = styled.div`
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

export const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
`

export const CardReview: React.FC<Props> = ({ children }) => (
  <div className="font-medium text-xs text-gray-600">{children}</div>
)

export const CardText: React.FC<Props> = ({ children }) => (
  <div className="p-4 text-white bg-limeGreen h-32">{children}</div>
)

export const CardTitle: React.FC<Props> = ({ children }) => (
  <h5 className="text-lg font-bold group-hover:text-primary-500">{children}</h5>
)

export const CardPrice: React.FC<Props> = ({ children }) => (
  <p className="mt-4 text-xl font-semibold">{children}</p>
)

export const StarIcon = () => (
  <svg viewBox="0 0 1792 1792">
    <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5T1385 1619q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5T365 1569q0-6 2-20l86-500L89 695q-25-27-25-48 0-37 56-46l502-73L847 73q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" />
  </svg>
)
