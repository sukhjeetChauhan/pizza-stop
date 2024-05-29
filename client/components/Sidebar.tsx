// import { cartContext } from '../../data/cartContext'
import Button from '../utils/Button'
import CustomCarousel from './CustomCorousel'
import { MenuItem } from '../../types/menu'
// import { useContext, useEffect, useState } from 'react'
import Cart from './Cart'
import { useContext } from 'react'
import { CartContext } from './CartProvider'

type Props = {
  data: MenuItem[]
}

export default function Sidebar({ data }: Props) {
  const cart = useContext(CartContext)
  console.log(cart.cart)
  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div className="flex items-center justify-center h-20">
        <span>-------------</span>
        <h2 className="uppercase">Your Cart</h2>
        <span>-------------</span>
      </div>
      <div>
        <Cart />
      </div>
      <div className="flex flex-col items-center max-w-full">
        <CustomCarousel data={data} />
        <Button className="p-3 w-72 bg-green-500 text-white mb-2">
          Checkout
        </Button>
      </div>
    </div>
  )
}
