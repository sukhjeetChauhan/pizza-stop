import { Collapse } from 'react-collapse'
// import { useGetData } from '../../data/hooks'
// import Spinner from '../utils/Spinner'
import { getUpdatedOrder } from '../../src/db'
import { DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import DashboardItems from '../utils/DashboardItems'

export function Dashboard() {
  const [audio] = useState(new Audio('/sound/level-up-191997.mp3'))
  const [newOrders, setNewOrders] = useState<DocumentData[]>([])
  const [pendingOrders, setPendingOrders] = useState<DocumentData[]>([])
  const [completedOrders, setCompletedOrders] = useState<DocumentData[]>([])

  const playAudio = () => {
    if (audio.readyState >= 2) {
      audio.currentTime = 0
      audio.play()

      // Play the audio repeatedly until 5 seconds have elapsed
      const interval = setInterval(() => {
        audio.currentTime = 0
        audio.play()
      }, audio.duration * 1000)

      // Stop the audio playback after 5 seconds
      setTimeout(() => {
        clearInterval(interval)
        audio.pause()
      }, 8000) // 5000 milliseconds = 5 seconds
    } else {
      console.error('Audio not loaded properly.')
    }
  }

  useEffect(() => {
    // Define the callback to handle updates
    const handleOrderUpdate = (updatedOrders: DocumentData[]) => {
      setNewOrders(updatedOrders)

      // Play the audio
      playAudio()
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
      playAudio()
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
      const arr = []
      for (let i = 0; i < 11; i++) {
        updatedOrders[i] && arr.push(updatedOrders[i])
      }
      console.log(arr)
      setCompletedOrders(arr)
    }

    // Get the initial orders and set up continuous updates
    const unsubscribe = getUpdatedOrder(handleOrderUpdate, 'completed')

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="bg-slate-100 w-full h-full flex flex-col items-center justify-center">
      {/* orders */}
      <div className="rounded shadow-lg w-[94%] h-[90%] bg-white overflow-y-scroll">
        <div className="flex p-3 bg-gray-200 items-center font-bold">
          <span className="w-1/5 overflow-hidden text-center">Name</span>
          <span className="w-1/5 overflow-hidden text-center">Order Id</span>
          <span className="w-1/5 overflow-hidden text-center">
            Delivery/Pickup
          </span>
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
        <button onClick={playAudio}>play audio</button>
      </div>
    </div>
  )
}
