import { useContext } from 'react'
import { Collapse } from 'react-collapse'
import { CartContext } from './CartProvider'
import '../styles/Cart.css'
import CartItemDetails from '../utils/CartItemDetails'

export default function Cart() {
  const cart = useContext(CartContext)

  return (
    <>
      <ul className="w-72">
        {cart.cart?.length > 0 &&
          cart.cart.map((item, i: number) => (
            <li key={`${item.name}-${i}`}>
              <div className="flex w-full justify-between items-center">
                <p className="text-sm">{item.name}</p>
                <div className="flex gap-4">
                  <div className="flex gap-2 items-center">
                    <button
                      className="bg-limeGreen text-white px-2 py-1 text-sm font-bold  rounded-full hover:bg-lime-700 focus:outline-none shadow self-center"
                      onClick={() => cart.addQuantity(item.id)}
                    >
                      +
                    </button>
                    <p className="text-sm">{item.quantity}</p>
                    <button
                      className="bg-limeGreen text-white px-2 py-1 text-sm font-bold rounded-full hover:bg-lime-700 focus:outline-none shadow self-center"
                      onClick={() => cart.reduceQuantity(item.id)}
                    >
                      -
                    </button>
                  </div>
                  <button
                    className="bg-gray-300 text-white text-sm px-2 py-1 rounded-full hover:bg-gray-700 focus:outline-none shadow self-center"
                    onClick={() => cart.deleteItem(item.id)}
                  >
                    X
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm lato-300 hover:font-bold">
                  Click to view more Info
                </p>
              </div>
              <Collapse isOpened={false}>
                <CartItemDetails item={item} />
              </Collapse>
            </li>
          ))}
      </ul>
      {cart.cart.length > 0 && (
        <p className="text-base mt-4">{`Total Cost: $${cart.calculateTotalCost()}`}</p>
      )}
    </>
  )
}
