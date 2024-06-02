// import { cartContext } from '../../data/cartContext'
import Button from '../utils/Button'
import CustomCarousel from './CustomCorousel'
import { MenuItem } from '../../types/menu'
import { useContext, useEffect, useState } from 'react'
import Cart from './Cart'
import { useNavigate } from 'react-router-dom'
import { CartContext } from './CartProvider'

type Props = {
  data: MenuItem[]
}

export default function Sidebar({ data }: Props) {
  const cart = useContext(CartContext)
  const navigate = useNavigate()
  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    if (cart.cart.length === 0) setIsEmpty(true)
    if (cart.cart.length > 0) setIsEmpty(false)
  }, [cart.cart.length])

  function handleCheckout() {
    if (isEmpty === false) {
      navigate('/payment')
    }
    if (isEmpty === true) {
      alert('your cart seems to be empty')
    }
  }
  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div>
        <div className="flex items-center justify-center h-20">
          <span>-------------</span>
          <h2 className="uppercase">Your Cart</h2>
          <span>-------------</span>
        </div>
        <div>
          <Cart />
        </div>
      </div>
      <div className="flex flex-col items-center max-w-full">
        <CustomCarousel data={data} />
        <Button
          onClick={handleCheckout}
          className="p-3 w-72 bg-limeGreen text-white mb-2"
        >
          Checkout
        </Button>
      </div>
    </div>
  )
}
