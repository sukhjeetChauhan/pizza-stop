// import { cartContext } from '../../data/cartContext'
import Button from '../utils/Button'
import CustomCarousel from './CustomCorousel'
import { MenuItem } from '../../types/menu'
import { useContext, useEffect, useState } from 'react'
import Cart from './Cart'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../Providers/CartProvider'
import { ControllerContext } from '../Providers/ControllerProvider'

type Props = {
  data: MenuItem[]
}

export default function Sidebar({ data }: Props) {
  const cart = useContext(CartContext)
  const { controllers } = useContext(ControllerContext)
  const navigate = useNavigate()
  const [isEmpty, setIsEmpty] = useState(true)

  const acceptingOrders = controllers.orderState

  useEffect(() => {
    if (cart.cart.length === 0) setIsEmpty(true)
    if (cart.cart.length > 0) setIsEmpty(false)
  }, [cart.cart.length])

  function handleCheckout() {
    // Create a new Date object
    const now = new Date()
    // Get the current hour
    const currentHour = now.getHours()
    const currentMins = now.getMinutes()
    const currentTimeInMinutes = currentHour * 60 + currentMins

    // const openingTime = 11 * 60 + 30
    // const closingTime = 20 * 60 + 45
    const openingTime = 0
    const closingTime = 24 * 60
    if (acceptingOrders) {
      if (isEmpty === true) {
        alert('your cart seems to be empty')
      } else if (
        openingTime < currentTimeInMinutes &&
        currentTimeInMinutes < closingTime
      ) {
        if (isEmpty === false) {
          navigate('/payment')
        }
      } else {
        alert('Sorry, We only accept orders between 11:30am and 8:45pm')
      }
    } else {
      alert('We are not accepting online orders right now')
    }
  }
  return (
    <div className="flex flex-col items-center justify-between h-screen-10rem md:h-full bg-white">
      <div className="min-w-full p-4 h-full">
        <div className="flex items-center justify-center mt-5 mb-5 lg:text-md text-base">
          <span>---------</span>
          <h2 className="uppercase">Your Cart</h2>
          <span>---------</span>
        </div>
        <div className="overflow-y-auto max-h-[23rem]">
          {acceptingOrders ? (
            <Cart />
          ) : (
            <p className="text-base font-bold mt-10">
              We are not accepting online orders right now. Please call us on
              <span className="text-red-500"> 09 601 6100 </span> to Order.
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center max-w-full">
        <CustomCarousel data={data} />
        <Button
          onClick={handleCheckout}
          className={`p-3 w-72 max-w-full ${
            controllers.orderState ? 'bg-limeGreen' : 'bg-gray-700'
          } text-white mb-2`}
        >
          Checkout
        </Button>
      </div>
    </div>
  )
}
