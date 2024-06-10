import { useContext, useState } from 'react'
import { Collapse } from 'react-collapse'
import { CartContext } from './CartProvider'
import '../styles/Cart.css'
import CartItemDetails from '../utils/CartItemDetails'
import { getLocalStorage, setLocalStorage } from '../../data/localStorage'

export default function Cart() {
  const cart = useContext(CartContext)
  let order = getLocalStorage()
  const [window, setWindow] = useState('')
  const [address, setAddress] = useState<string>('')
  const [isOpen, setIsopen] = useState(false)
  const [orderStatus, setOrderStatus] = useState(order?.order)

  const deliveryCharges: number = orderStatus === 'Deliver' ? 5.99 : 0

  function showDetails(item: string): void {
    if (window === item) {
      setWindow('')
    } else {
      setWindow(item)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value)
  }
  console.log(order)

  function handleClick(): void {
    if (order === null) {
      setLocalStorage({ name: '', number: '', address: '', order: 'Pickup' })
      order = getLocalStorage()
    }
    if (order?.order === 'Deliver') {
      setLocalStorage({ ...order, address: '', order: 'Pickup' })
      setOrderStatus('Pickup')
    }
    if (order?.order === 'Pickup') {
      setIsopen(true)
    }
  }

  function handleAddress(): void {
    if (address === '') {
      alert('please enter an address')
    } else {
      setLocalStorage({ ...order, address: address, order: 'Deliver' })
      setOrderStatus('Deliver')
      setIsopen(false)
    }
  }

  return (
    <>
      <ul>
        {cart.cart?.length > 0 &&
          cart.cart.map((item, i: number) => (
            <li key={`${item.name}-${i}`}>
              <div className="flex w-full justify-between items-center">
                <p className="lg:text-sm text-xs">{item.name}</p>
                <div className="flex gap-4">
                  <div className="flex gap-2 items-center">
                    <button
                      className="bg-limeGreen text-white px-2 py-1 text-sm font-bold  rounded-full hover:bg-lime-700 focus:outline-none shadow self-center lg:text-sm text-xs"
                      onClick={() => cart.addQuantity(item.id)}
                    >
                      +
                    </button>
                    <p className="lg:text-sm text-xs">{item.quantity}</p>
                    <button
                      className="bg-limeGreen text-white px-2 py-1 text-sm font-bold rounded-full hover:bg-lime-700 focus:outline-none shadow self-center lg:text-sm text-xs"
                      onClick={() => cart.reduceQuantity(item.id)}
                    >
                      -
                    </button>
                  </div>
                  <button
                    className="bg-gray-300 text-white text-sm px-2 py-1 rounded-full hover:bg-gray-700 focus:outline-none shadow self-center lg:text-sm text-xs"
                    onClick={() => cart.deleteItem(item.id)}
                  >
                    X
                  </button>
                </div>
              </div>
              <div>
                <p
                  onClick={() => showDetails(item.name)}
                  className="text-sm lato-300 hover:font-bold cursor-pointer lg:text-sm text-xs"
                >
                  Click to view more Info
                </p>
              </div>
              <Collapse isOpened={window === item.name ? true : false}>
                <div className="w-full overflow-hidden">
                  <CartItemDetails item={item} />
                </div>
              </Collapse>
            </li>
          ))}
      </ul>
      {cart.cart.length > 0 && (
        <>
          <div className="mt-4 flex justify-between">
            {orderStatus === 'Deliver' ? (
              <p className="lg:text-sm text-xs">Delivery Charges: $5.99</p>
            ) : (
              <p className="lg:text-sm text-xs">Pick Up</p>
            )}
            <button
              onClick={handleClick}
              className="text-sm leto-100 text-limeGreen hover:text-lime-800 lg:text-sm text-xs"
            >
              {`Change to ${
                order?.order === 'Deliver' ? 'Pick Up' : 'Delivery'
              }`}
            </button>
          </div>
          <Collapse isOpened={isOpen}>
            <div className="mt-2 p-2 bg-gray-100">
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs`}
                id="address"
                type="text"
                onChange={handleChange}
                value={address}
                placeholder="Enter your address"
              />
              <button
                onClick={handleAddress}
                className="p-1 rounded text-white bg-limeGreen mt-2"
              >
                Done
              </button>
            </div>
          </Collapse>

          <p className="text-base mt-4 lg:text-sm text-xs">{`Total Cost: $${(
            Number(cart.calculateTotalCost()) + Number(deliveryCharges)
          ).toFixed(2)}`}</p>
        </>
      )}
    </>
  )
}
