import { Collapse } from 'react-collapse'
// import { useGetData } from '../../data/hooks'
// import Spinner from '../utils/Spinner'
import { getUpdatedOrder } from '../../src/db'
import { DocumentData } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import DashboardItems from '../utils/DashboardItems'

export function Dashboard() {
  const [audio] = useState(new Audio('/sound/level-up-191997.mp3'))
  const [mute, setMute] = useState(true)
  const [newOrders, setNewOrders] = useState<DocumentData[]>([])
  const [pendingOrders, setPendingOrders] = useState<DocumentData[]>([])
  const [completedOrders, setCompletedOrders] = useState<DocumentData[]>([])
  const checkerRef = useRef<DocumentData[]>([])

  audio.muted = mute // assign value of mute variable

  const playAudio = () => {
    setMute(false)
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
      }, 5000) // 5000 milliseconds = 5 seconds
    } else {
      console.error('Audio not loaded properly.')
    }
  }
  ////////////////////////////////////////////////////////////
  function sortArray(data: DocumentData[]) {
    data.sort(function (x, y) {
      return y.timestamp.seconds - x.timestamp.seconds
    })
    return data
  }

  ///////////////////////////////////

  checkerRef.current = newOrders

  /////////////////////////////////////////////////
  useEffect(() => {
    // Define the callback to handle updates
    const handleOrderUpdate = (updatedOrders: DocumentData[]) => {
      setNewOrders(sortArray(updatedOrders))
      // console.log(checkerRef.current)
      // console.log(updatedOrders)
      if (
        // JSON.stringify(checkerRef.current) !== JSON.stringify(newOrders)
        updatedOrders.length > checkerRef.current.length
      ) {
        // Play the audio
        playAudio()
        // console.log(audio.muted)
      }
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
      setPendingOrders(sortArray(updatedOrders))
      // playAudio()
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
      const sortedOrders = sortArray(updatedOrders)
      const arr = []
      for (let i = 0; i < 10; i++) {
        sortedOrders[i] && arr.push(sortedOrders[i])
      }
      // console.log(arr)
      setCompletedOrders(arr)
    }

    // Get the initial orders and set up continuous updates
    const unsubscribe = getUpdatedOrder(handleOrderUpdate, 'completed')

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      unsubscribe()
    }
  }, [])

  function muteAudio(): void {
    setMute(true)
  }

  function playSound(): void {
    setMute(false)
    audio.currentTime = 0
    audio.play()
  }

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
        {mute && (
          <button
            className="absolute top-3 right-6 border-2 border-slate-300 p-4 w-[4.5rem]"
            onClick={playSound}
          >
            <img src="/volume.png" />
          </button>
        )}
        {!mute && (
          <button
            className="absolute top-3 right-6 border-2 border-slate-300 p-4 w-[4.5rem]"
            onClick={muteAudio}
          >
            <img src="/mute.png" />
          </button>
        )}
      </div>
    </div>
  )
}
