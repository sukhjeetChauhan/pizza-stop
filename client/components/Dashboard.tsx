import { Collapse } from 'react-collapse'
// import { useGetData } from '../../data/hooks'
// import Spinner from '../utils/Spinner'
import { getUpdatedOrder } from '../../src/db'
import { DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import DashboardItems from '../utils/DashboardItems'

export function Dashboard() {
  const [newOrders, setNewOrders] = useState<DocumentData[]>([])
  const [pendingOrders, setPendingOrders] = useState<DocumentData[]>([])
  const [completedOrders, setCompletedOrders] = useState<DocumentData[]>([])

  useEffect(() => {
    // Define the callback to handle updates
    const handleOrderUpdate = (updatedOrders: DocumentData[]) => {
      setNewOrders(updatedOrders)
    }

    // Get the initial orders and set up continuous updates
    const unsubscribe = getUpdatedOrder(handleOrderUpdate, 'ordered')

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      unsubscribe()
    }
  }, [])
  useEffect(() => {
    // Define the callback to handle updates
    const handleOrderUpdate = (updatedOrders: DocumentData[]) => {
      setPendingOrders(updatedOrders)
    }

    // Get the initial orders and set up continuous updates
    const unsubscribe = getUpdatedOrder(handleOrderUpdate, 'preparing')

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      unsubscribe()
    }
  }, [])
  useEffect(() => {
    // Define the callback to handle updates
    const handleOrderUpdate = (updatedOrders: DocumentData[]) => {
      setCompletedOrders(updatedOrders)
    }

    // Get the initial orders and set up continuous updates
    const unsubscribe = getUpdatedOrder(handleOrderUpdate, 'completed')

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      unsubscribe()
    }
  }, [])
  console.log(newOrders)
  return (
    <div className="bg-slate-100 w-full h-full flex flex-col items-center justify-center">
      {/* orders */}
      <div className="rounded shadow-lg w-[94%] h-[90%] bg-white">
        <div className="flex p-3 bg-gray-200 items-center font-bold">
          <span className="w-1/5 overflow-hidden text-center">Name</span>
          <span className="w-1/5 overflow-hidden text-center">Order Id</span>
          <span className="w-1/5 overflow-hidden text-center">Details</span>
          <span className="w-1/5 overflow-hidden text-center">Time</span>
          <span className="w-1/5 overflow-hidden text-center">Status</span>
        </div>
        <Collapse isOpened={true}>
          <DashboardItems data={newOrders} />
        </Collapse>
        <Collapse isOpened={true}>
          <DashboardItems data={pendingOrders} />
        </Collapse>
        <Collapse isOpened={true}>
          <DashboardItems data={completedOrders} />
        </Collapse>
      </div>
    </div>
  )
}
