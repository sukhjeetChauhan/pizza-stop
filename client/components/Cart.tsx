import { useContext } from 'react'

import { CartContext } from './CartProvider'

export default function Cart() {
  const cart = useContext(CartContext)

  return (
    <>
      <ul className="w-72">
        {cart.cart?.length > 0 &&
          cart.cart.map((item, i: number) => (
            <li key={`${item.name}-${i}`}>
              <div className="flex w-full justify-between">
                <p className="text-sm">{item.name}</p>
                <div className="flex gap-6">
                  <div className="flex gap-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1  rounded-full hover:bg-green-700 focus:outline-none shadow self-center"
                      onClick={() => cart.addQuantity(item.id)}
                    >
                      +
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded-full hover:bg-green-700 focus:outline-none shadow self-center"
                      onClick={() => cart.reduceQuantity(item.id)}
                    >
                      -
                    </button>
                  </div>
                  <button
                    className="bg-gray-300 text-white px-2 py-1 rounded-full hover:bg-gray-700 focus:outline-none shadow self-center"
                    onClick={() => cart.deleteItem(item.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
      {cart.cart.length > 0 && (
        <p className="text-base mt-4">{`Total Cost: $${cart.calculateTotalCost()}`}</p>
      )}
    </>
  )
}
