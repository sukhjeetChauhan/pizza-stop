import { Collapse } from 'react-collapse'
import { DocumentData } from 'firebase/firestore'
import { CartItemWithId } from '../components/CartProvider'
import { sendmail } from '../../src/appApi'
import { updateData } from '../../src/db'
import { useState } from 'react'

interface DataProp {
  data: DocumentData[]
}

const calculateOrderAmount = (items: CartItemWithId[]) => {
  const total = items.reduce(
    (accumulator: number, currentItem: CartItemWithId) => {
      return accumulator + currentItem.price * currentItem.quantity
    },
    0
  )
  return total.toFixed(2)
}

0

export default function DashboardItems({ data }: DataProp) {
  const [id, setId] = useState('')

  const bgColor = (item: DocumentData) => {
    const res =
      item.status === 'ordered'
        ? 'bg-red-200'
        : item.status === 'preparing'
        ? 'bg-yellow-200'
        : item.status === 'completed'
        ? 'bg-green-200'
        : ''
    return res
  }

  async function acceptOrder(id: string): Promise<void> {
    const email = 'chauhansukhjeet@gmail.com'
    const content = 'Your order has been accepted and is being prepared'
    const sub = 'Order accepted'
    setId('')
    await sendmail(email, sub, content)
    await updateData('orders', id, { status: 'preparing' })
  }
  async function completeOrder(id: string): Promise<void> {
    const email = 'chauhansukhjeet@gmail.com'
    const content = 'Your order is ready'
    const sub = 'Order ready'
    setId('')
    await sendmail(email, sub, content)
    await updateData('orders', id, { status: 'completed' })
  }

  function handleDetailWindow(orderId: string): void {
    if (id === orderId) {
      setId('')
    } else {
      setId(orderId)
    }
  }
  // function sortArray(data: DocumentData[]) {
  //   data.sort(function (x, y) {
  //     return y.timestamp.seconds - x.timestamp.seconds
  //   })
  //   return data
  // }

  return (
    <div>
      {data.map((order, i) => (
        <div className="my-1" key={`${order.name}${i}`}>
          <div
            onClick={() => handleDetailWindow(order.id)}
            className={`flex justify-around p-3 ${bgColor(
              order
            )} items-center font-bold rounded w-full`}
          >
            <span className="w-1/5 overflow-hidden text-center">
              {order.name}
            </span>
            <span className="w-1/5 overflow-hidden text-center">
              {order.id}
            </span>
            <span className="w-1/5 overflow-hidden text-center text-lime-700">
              {order.orderType}
            </span>
            <span className="w-1/5 overflow-hidden text-center">
              {`${new Date(order.timestamp.seconds * 1000).toLocaleString(
                'en-GB',
                { hour12: true }
              )}`}
            </span>
            <span className="w-1/5 overflow-hidden text-center">
              {order.status}
            </span>
          </div>
          <Collapse isOpened={id === order.id ? true : false}>
            <div className="py-2 px-2 w-full ">
              {JSON.parse(order.cart).map((item: CartItemWithId, i: number) => (
                <div
                  key={i}
                  className="flex border-b-2 border-slate-300 border-dotted py-2 w-full"
                >
                  <div className="w-1/4">
                    <p className="font-bold text-lime-700">{`${item.name}  x  ${item.quantity}`}</p>
                    <p className="text-sm text-gray-600">{item.upgrades}</p>
                  </div>
                  <div className="w-1/4">
                    {item.toppings.length !== 0 && (
                      <div>
                        <p className="font-bold text-lime-700">Toppings</p>
                        <p className="text-sm text-gray-600">
                          {item.toppings.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-1/4">
                    {item.swirls.length !== 0 && (
                      <div>
                        <p className="font-bold text-lime-700">Swirls</p>
                        <p className="text-sm text-gray-600">
                          {item.swirls.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-1/4">
                    <p className="font-bold text-lime-700">Price</p>
                    <p className="text-sm text-gray-600">{`$${item.price}`}</p>
                  </div>
                </div>
              ))}
              <div className="p-3 bg-slate-100 flex justify-between">
                <div>
                  <p>
                    <span className="font-bold">Phone no:</span>
                    {` ${order.phone}`}
                  </p>
                  <p>
                    <span className="font-bold">Address:</span>
                    {` ${order.address}`}
                  </p>
                  <p>
                    <span className="font-bold">Total Cost:</span>
                    {` $${
                      Number(calculateOrderAmount(JSON.parse(order.cart))) +
                      (order.orderType === 'Deliver' ? 5.99 : 0)
                    }`}
                  </p>
                </div>
                <div className="h-full flex gap-2 items-center self-center">
                  {order.status === 'ordered' && (
                    <>
                      <button className="bg-red-500 rounded py-4 px-5 text-white font-bold text-lg">
                        Reject
                      </button>
                      <button
                        onClick={() => acceptOrder(order.id)}
                        className="bg-limeGreen rounded py-4 px-6 text-white font-bold text-lg"
                      >
                        Accept
                      </button>
                    </>
                  )}
                  {order.status === 'preparing' && (
                    <button
                      onClick={() => completeOrder(order.id)}
                      className="bg-limeGreen rounded py-4 px-6 text-white font-bold text-lg"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  )
}
