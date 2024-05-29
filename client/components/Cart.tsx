import { useContext, useEffect, useState } from 'react'
import Button from '../utils/Button'
import { CartContext } from './CartProvider'

export default function Cart() {
  const cart = useContext(CartContext)

  return (
    <ul className="w-72">
      {cart.cart?.length > 0 &&
        cart.cart.map((item, i: number) => (
          <li key={`${item.name}-${i}`}>
            <div className="flex w-full justify-between">
              <div className="flex gap-6">
                <p className="text-sm">{item.name}</p>
                <div className="flex gap-2">
                  <Button
                    className="bg-gray-100 p-1 rounded"
                    onClick={() => cart.addQuantity(item.id)}
                  >
                    +
                  </Button>
                  <p>{item.quantity}</p>
                  <Button
                    className="bg-gray-100 p-1 rounded"
                    onClick={() => cart.reduceQuantity(item.id)}
                  >
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
