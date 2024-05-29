import { useContext, useEffect, useState } from 'react'
import Button from '../utils/Button'
import { CartContext } from './CartProvider'

export default function Cart() {
  const cart = useContext(CartContext)
  // const [cartItems, setCartItems] = useState({})
  // useEffect(() => {
  //   setCartItems(cartData.cart)
  // }, [cartData])
  return (
    <ul>
      {cart.cart?.length > 0 &&
        cart.cart.map((item) => (
          <li>
            <div className="flex w-full justify-between p-4">
              <div className="flex gap-4">
                <p className="text-xl">{item.name}</p>
                <div>
                  <Button onClick={() => cart.addQuantity(item.id)}>+</Button>
                  <p>{item.quantity}</p>
                  <Button onClick={() => cart.reduceQuantity(item.id)}>
                    -
                  </Button>
                </div>
              </div>
              <button onClick={() => cart.deleteItem(item.name)}>X</button>
            </div>
          </li>
        ))}
    </ul>
  )
}
